// app/api/admin/stats/route.ts
// API endpoint for admin dashboard statistics

import { NextRequest, NextResponse } from 'next/server'
import { BookingService } from '@/lib/services/booking.service'
import prisma from '@/lib/prisma'


export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication middleware here
    
    const searchParams = request.nextUrl.searchParams
    const apartmentId = searchParams.get('apartmentId') || undefined

    // Get booking statistics
    const bookingStats = await BookingService.getBookingStats(apartmentId)

    // Get recent bookings
    const recentBookings = await BookingService.getBookings({
      apartmentId,
      limit: 10,
      offset: 0,
    })

    // Get apartment statistics
    const apartmentStats = await prisma.apartment.groupBy({
      by: ['isActive'],
      _count: {
        id: true,
      },
    })

    // Get upcoming check-ins (next 7 days)
    const upcomingCheckIns = await prisma.booking.findMany({
      where: {
        apartmentId,
        status: 'CONFIRMED',
        checkIn: {
          gte: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        apartment: true,
      },
      orderBy: {
        checkIn: 'asc',
      },
    })

    // Get current guests (checked in)
    const currentGuests = await prisma.booking.findMany({
      where: {
        apartmentId,
        status: 'CHECKED_IN',
      },
      include: {
        apartment: true,
      },
    })

    return NextResponse.json({
      bookingStats,
      recentBookings: recentBookings.bookings,
      apartmentStats: {
        active: apartmentStats.find((s:any) => s.isActive)?._count.id || 0,
        inactive: apartmentStats.find((s:any) => !s.isActive)?._count.id || 0,
        total: apartmentStats.reduce((sum:number, s:any) => sum + s._count.id, 0),
      },
      upcomingCheckIns,
      currentGuests,
    })
  } catch (error: any) {
    console.error('Get admin stats error:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to get statistics',
        message: error.message,
      },
      { status: 500 }
    )
  }
}