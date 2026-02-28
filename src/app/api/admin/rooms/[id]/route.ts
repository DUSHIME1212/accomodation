import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { BookingStatus } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const room = await prisma.apartment.findUnique({
      where: { id },
      include: {
        bookings: {
          orderBy: { checkInDate: "desc" },
          take: 10,
        },
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Determine current booking for quick checkout info
    const currentBooking = await prisma.booking.findFirst({
      where: {
        apartmentId: id,
        checkInDate: { lte: new Date() },
        checkOutDate: { gte: new Date() },
        status: { in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN] },
      },
      include: {
        apartment: true,
      },
    });

    return NextResponse.json({
      ...room,
      status: room.status ? room.status.toLowerCase() : "available",
      number:
        room.sanityId?.split("-").pop()?.toUpperCase() ||
        room.id.substring(0, 4).toUpperCase(),
      currentBooking,
    });
  } catch (error: any) {
    console.error("Fetch room details error:", error);
    return NextResponse.json(
      { error: "Failed to fetch room details" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, assignedStaffId } = body;

    const updatedRoom = await prisma.apartment.update({
      where: { id },
      data: {
        ...(status && { status: status.toUpperCase() }),
        ...(assignedStaffId !== undefined && { assignedStaffId }),
      },
    });

    return NextResponse.json(updatedRoom);
  } catch (error: any) {
    console.error("Update room error:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 },
    );
  }
}
