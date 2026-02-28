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
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;

    const where: any = {};
    if (search) {
      where.OR = [
        { guestFirstName: { contains: search, mode: "insensitive" } },
        { guestLastName: { contains: search, mode: "insensitive" } },
        { guestEmail: { contains: search, mode: "insensitive" } },
        { confirmationNumber: { contains: search, mode: "insensitive" } },
      ];
    }
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
        include: { apartment: true },
        orderBy: { checkInDate: "desc" },
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({ bookings, total, page, limit });
  } catch (error: any) {
    console.error("Fetch guests error:", error);
    return NextResponse.json(
      { error: "Failed to fetch guests" },
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
      children = 0,
      address = "N/A",
      city = "N/A",
      zipCode = "N/A",
      country = "N/A",
      paymentMethod = "pay-at-property",
    } = body;

    const apartment = await prisma.apartment.findUnique({
      where: { id: apartmentId },
    });
    if (!apartment)
      return NextResponse.json(
        { error: "Apartment not found" },
        { status: 404 },
      );

    const nights = Math.ceil(
      (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    const basePrice = apartment.basePrice * nights;
    const cleaningFee = 50;
    const serviceFee = 30;
    const taxAmount = (basePrice + cleaningFee + serviceFee) * 0.1;
    const totalPrice = basePrice + cleaningFee + serviceFee + taxAmount;

    const booking = await prisma.booking.create({
      data: {
        apartment: { connect: { id: apartmentId } },
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        numberOfNights: nights,
        guestFirstName,
        guestLastName,
        guestEmail: guestEmail.toLowerCase(),
        guestPhone,
        address,
        city,
        zipCode,
        country,
        adults,
        children,
        basePrice,
        subtotal: basePrice,
        cleaningFee,
        serviceFee,
        taxAmount,
        totalPrice,
        numberOfNightsCounted: nights,
        paymentMethod,
        status: BookingStatus.CONFIRMED,
        bookingSource: "admin",
      },
      include: { apartment: true },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    console.error("Create booking error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create booking" },
      { status: 500 },
    );
  }
}
