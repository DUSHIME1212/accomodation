// app/api/bookings/[id]/route.ts
// API endpoint for individual booking operations (get, update, cancel)

import { NextRequest, NextResponse } from "next/server";
import { BookingService } from "@/lib/services/booking.service";
import { BookingStatus, PaymentStatus } from "@/generated/prisma/client";
import { z } from "zod";

const updateBookingSchema = z.object({
  status: z
    .enum([
      "PENDING",
      "CONFIRMED",
      "CHECKED_IN",
      "CHECKED_OUT",
      "CANCELLED",
      "NO_SHOW",
    ])
    .optional(),
  paymentStatus: z
    .enum(["PENDING", "AUTHORIZED", "PAID", "REFUNDED", "FAILED"])
    .optional(),
  specialRequests: z.string().optional(),
});

const cancelBookingSchema = z.object({
  reason: z.string().optional(),
});

// Get a single booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const booking = await BookingService.getBookingById(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error: any) {
    console.error("Get booking error:", error);

    return NextResponse.json(
      {
        error: "Failed to get booking",
        message: error.message,
      },
      { status: 500 },
    );
  }
}

// Update a booking
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validation = updateBookingSchema.safeParse(body);

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

    // TODO: Add admin authentication check here
    const adminEmail = request.headers.get("x-admin-email") || undefined;

    const booking = await BookingService.updateBooking(
      id,
      {
        ...data,
        status: data.status as BookingStatus,
        paymentStatus: data.paymentStatus as PaymentStatus,
      },
      adminEmail,
    );

    return NextResponse.json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error: any) {
    console.error("Update booking error:", error);

    return NextResponse.json(
      {
        error: "Failed to update booking",
        message: error.message,
      },
      { status: 500 },
    );
  }
}

// Delete/Cancel a booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    // Validate input
    const validation = cancelBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: validation.error.errors,
        },
        { status: 400 },
      );
    }

    const { reason } = validation.data;

    // TODO: Add admin authentication check here
    const adminEmail = request.headers.get("x-admin-email") || undefined;

    const booking = await BookingService.cancelBooking(id, reason, adminEmail);

    return NextResponse.json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error: any) {
    console.error("Cancel booking error:", error);

    return NextResponse.json(
      {
        error: "Failed to cancel booking",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
