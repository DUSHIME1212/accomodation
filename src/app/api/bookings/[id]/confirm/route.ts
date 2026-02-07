// app/api/bookings/[id]/confirm/route.ts
// API endpoint for confirming a booking (after payment)

import { NextRequest, NextResponse } from 'next/server'
import { BookingService } from '@/lib/services/booking.service'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add payment verification here
    // This would integrate with Stripe, PayPal, etc.
    
    // TODO: Add admin authentication check here
    const adminEmail = request.headers.get('x-admin-email') || undefined

    const booking = await BookingService.confirmBooking(params.id, adminEmail)

    // TODO: Send confirmation email here
    // await sendBookingConfirmationEmail(booking)

    return NextResponse.json({
      message: 'Booking confirmed successfully',
      booking,
    })
  } catch (error: any) {
    console.error('Confirm booking error:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to confirm booking',
        message: error.message,
      },
      { status: 500 }
    )
  }
}