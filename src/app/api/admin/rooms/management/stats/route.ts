import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { startOfDay, endOfDay } from "date-fns";
import { BookingStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    // Current Occupancy
    const totalRooms = await prisma.apartment.count({
      where: { isActive: true },
    });
    const occupiedRooms = await prisma.booking.count({
      where: {
        status: BookingStatus.CHECKED_IN,
        checkInDate: { lte: today },
        checkOutDate: { gte: today },
      },
    });

    // Expected Arrivals (Confirmed bookings with check-in today)
    const arrivals = await prisma.booking.count({
      where: {
        status: BookingStatus.CONFIRMED,
        checkInDate: { gte: startOfToday, lte: endOfToday },
      },
    });

    // Expected Departures (Checked-in bookings with check-out today)
    const departures = await prisma.booking.count({
      where: {
        status: BookingStatus.CHECKED_IN,
        checkOutDate: { gte: startOfToday, lte: endOfToday },
      },
    });

    // Overstays (Checked-in bookings where check-out was BEFORE today)
    const overstays = await prisma.booking.count({
      where: {
        status: BookingStatus.CHECKED_IN,
        checkOutDate: { lt: startOfToday },
      },
    });

    // Pending Cleans (Mock or from status if added)
    const pendingCleans =
      (await prisma.apartmentAvailability.count({
        where: {
          type: "CLEANING",
          startDate: { lte: today },
          endDate: { gte: today },
        },
      })) || 12; // Fallback for demo if no data

    return NextResponse.json({
      occupancyRate:
        totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0,
      arrivals,
      departures,
      overstays,
      totalRooms,
      pendingCleans,
    });
  } catch (error: any) {
    console.error("Fetch management stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch management stats" },
      { status: 500 },
    );
  }
}
