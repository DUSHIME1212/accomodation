import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { BookingStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rooms = await prisma.apartment.findMany({
      include: {
        bookings: {
          where: {
            checkInDate: { lte: new Date() },
            checkOutDate: { gte: new Date() },
            status: { in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN] },
          },
          take: 1,
        },
      },
      orderBy: { name: "asc" },
    });

    const populatedRooms = rooms.map((room) => {
      // Use the database status as the source of truth
      // But map it to lowercase for the frontend consistency if needed
      // RoomStatus enum: AVAILABLE, OCCUPIED, TO_CLEAN, OUT_OF_SERVICE, REPAIR
      const status = room.status ? room.status.toLowerCase() : "available";

      return {
        id: room.id,
        name: room.name,
        number:
          room.sanityId?.split("-").pop()?.toUpperCase() ||
          room.id?.substring(0, 4).toUpperCase() ||
          "N/A",
        rate: `${room.basePrice}$`,
        lastMaintenance: "Jan 12, 2025",
        status: status,
        assignedStaffId: room.assignedStaffId,
        image:
          room.image ||
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1974",
      };
    });

    return NextResponse.json(populatedRooms);
  } catch (error: any) {
    console.error("Fetch rooms error:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 },
    );
  }
}
