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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const limit = 20;
    const skip = (page - 1) * limit;

    const where: any = {
      OR: [
        { guestFirstName: { contains: search, mode: "insensitive" } },
        { guestLastName: { contains: search, mode: "insensitive" } },
        { guestEmail: { contains: search, mode: "insensitive" } },
        { confirmationNumber: { contains: search, mode: "insensitive" } },
      ],
    };

    if (status !== "all") {
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
      if (mappedStatus) {
        where.status = mappedStatus;
      }
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          apartment: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({ bookings, total });
  } catch (error: any) {
    console.error("Fetch reservations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      guestFirstName,
      guestLastName,
      guestEmail,
      guestPhone,
      apartmentId,
      checkInDate,
      checkOutDate,
      adults,
      children,
      paymentMethod,
    } = body;

    // basic validation
    if (
      !guestFirstName ||
      !guestLastName ||
      !guestEmail ||
      !apartmentId ||
      !checkInDate ||
      !checkOutDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const apartment = await prisma.apartment.findUnique({
      where: { id: apartmentId },
    });

    if (!apartment) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    const basePrice = apartment.basePrice;
    const subtotal = basePrice * nights;
    const taxAmount = subtotal * 0.1;
    const totalPrice = subtotal + taxAmount + 50 + 30; // subtotal + tax + cleaning + service

    // create booking
    const booking = await prisma.booking.create({
      data: {
        guestFirstName,
        guestLastName,
        guestEmail,
        guestPhone: guestPhone || "N/A",
        apartmentId,
        checkInDate: start,
        checkOutDate: end,
        numberOfNights: nights,
        adults: parseInt(adults) || 1,
        children: parseInt(children) || 0,
        status: BookingStatus.CONFIRMED,
        basePrice,
        numberOfNightsCounted: nights,
        subtotal,
        taxAmount,
        totalPrice,
        address: "Manual Entry (Admin)",
        city: "N/A",
        zipCode: "N/A",
        country: "N/A",
        paymentMethod: paymentMethod || "pay-at-property",
        confirmationNumber: `ADM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      },
    });

    return NextResponse.json(booking);
  } catch (error: any) {
    console.error("Create reservation error:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 },
    );
  }
}
