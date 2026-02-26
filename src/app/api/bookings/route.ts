// app/api/bookings/route.ts
// API endpoint for creating and listing bookings

import { NextRequest, NextResponse } from "next/server";
import { BookingService } from "@/lib/services/booking.service";
import { AvailabilityService } from "@/lib/services/availability.service";
import { z } from "zod";
import { PaymentMethod } from "@/generated/prisma/client";

const createBookingSchema = z.object({
  apartmentId: z.string().min(1),
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime(),

  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),

  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  country: z.string().min(1),

  adults: z.number().int().min(1),
  children: z.number().int().min(0).default(0),

  paymentMethod: z.enum(["CREDIT_CARD", "PAY_AT_PROPERTY", "BANK_TRANSFER"]),
  cardLast4: z.string().optional(),
  cardBrand: z.string().optional(),

  specialRequests: z.string().optional(),
});

// Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = createBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: validation.error.errors,
        },
        { status: 400 },
      );
    }

    const data = validation.data;

    // First, check availability
    const availability = await AvailabilityService.checkAvailability({
      apartmentId: data.apartmentId,
      checkIn: new Date(data.checkIn),
      checkOut: new Date(data.checkOut),
    });

    if (!availability.isAvailable) {
      return NextResponse.json(
        {
          error: "Apartment not available",
          conflicts: availability.conflicts,
        },
        { status: 409 },
      );
    }

    // Get IP and User Agent for security
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Create the booking
    const booking = await BookingService.createBooking({
      apartmentId: data.apartmentId,
      checkInDate: new Date(data.checkIn),
      checkOutDate: new Date(data.checkOut),
      guestFirstName: data.firstName,
      guestLastName: data.lastName,
      guestEmail: data.email,
      guestPhone: data.phone,
      address: data.address,
      city: data.city,
      zipCode: data.zipCode,
      country: data.country,
      adults: data.adults,
      children: data.children,
      paymentMethod: data.paymentMethod as PaymentMethod,
      cardLastFour: data.cardLast4,
      specialRequests: data.specialRequests,
      source: "web",
      ipAddress,
      userAgent,
    });

    // Don't return sensitive data
    const { cardLastFour, ...safeBooking } = booking;

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking: {
          ...safeBooking,
          cardLast4: cardLastFour ? `****${cardLastFour}` : undefined,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Booking creation error:", error);

    // Handle specific errors
    if (
      error.message.includes("not available") ||
      error.message.includes("Minimum stay") ||
      error.message.includes("Maximum stay") ||
      error.message.includes("Maximum capacity") ||
      error.message.includes("buffer")
    ) {
      return NextResponse.json(
        {
          error: "Booking validation failed",
          message: error.message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create booking",
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    );
  }
}

// Get bookings (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters = {
      apartmentId: searchParams.get("apartmentId") || undefined,
      status: (searchParams.get("status") as any) || undefined,
      email: searchParams.get("email") || undefined,
      startDate: searchParams.get("startDate")
        ? new Date(searchParams.get("startDate")!)
        : undefined,
      endDate: searchParams.get("endDate")
        ? new Date(searchParams.get("endDate")!)
        : undefined,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!)
        : 50,
      offset: searchParams.get("offset")
        ? parseInt(searchParams.get("offset")!)
        : 0,
    };

    const result = await BookingService.getBookings(filters);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Get bookings error:", error);

    return NextResponse.json(
      {
        error: "Failed to get bookings",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
