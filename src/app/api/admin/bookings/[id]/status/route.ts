import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { BookingStatus } from "@prisma/client";

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
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 },
      );
    }

    const statusMap: Record<string, BookingStatus> = {
      confirmed: BookingStatus.CONFIRMED,
      "checked-in": BookingStatus.CHECKED_IN,
      "checked-out": BookingStatus.CHECKED_OUT,
      pending: BookingStatus.PENDING,
      cancelled: BookingStatus.CANCELLED,
      completed: BookingStatus.COMPLETED,
      "no-show": BookingStatus.NO_SHOW,
    };

    const mappedStatus = statusMap[status.toLowerCase()];
    if (!mappedStatus) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: mappedStatus },
    });

    return NextResponse.json(updatedBooking);
  } catch (error: any) {
    console.error("Update booking status error:", error);
    return NextResponse.json(
      { error: "Failed to update booking status" },
      { status: 500 },
    );
  }
}
