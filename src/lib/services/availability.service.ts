// lib/services/availability.service.ts
// Service for checking apartment availability with race condition prevention

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export interface AvailabilityCheck {
  apartmentId: string
  checkIn: Date
  checkOut: Date
}

export interface AvailabilityResult {
  isAvailable: boolean
  conflicts?: Array<{
    type: 'booking' | 'blocked' | 'buffer'
    startDate: Date
    endDate: Date
    reason?: string
  }>
}

export class AvailabilityService {
  /**
   * Check if an apartment is available for given dates
   * This is the main method to use before creating a booking
   */
  static async checkAvailability({
    apartmentId,
    checkIn,
    checkOut,
  }: AvailabilityCheck): Promise<AvailabilityResult> {
    // Validate dates
    if (checkIn >= checkOut) {
      return {
        isAvailable: false,
        conflicts: [
          {
            type: 'booking',
            startDate: checkIn,
            endDate: checkOut,
            reason: 'Check-out date must be after check-in date',
          },
        ],
      }
    }

    if (checkIn < new Date()) {
      return {
        isAvailable: false,
        conflicts: [
          {
            type: 'booking',
            startDate: checkIn,
            endDate: checkOut,
            reason: 'Cannot book dates in the past',
          },
        ],
      }
    }

    // Get apartment with booking settings
    const apartment = await prisma.apartment.findUnique({
      where: { id: apartmentId },
      include: {
        bookings: {
          where: {
            status: {
              in: ['PENDING', 'CONFIRMED', 'CHECKED_IN'],
            },
            OR: [
              {
                // Booking overlaps with requested dates
                AND: [
                  { checkIn: { lt: checkOut } },
                  { checkOut: { gt: checkIn } },
                ],
              },
            ],
          },
        },
        availability: {
          where: {
            type: 'BLOCKED',
            AND: [
              { startDate: { lt: checkOut } },
              { endDate: { gt: checkIn } },
            ],
          },
        },
      },
    })

    if (!apartment || !apartment.isActive) {
      return {
        isAvailable: false,
        conflicts: [
          {
            type: 'blocked',
            startDate: checkIn,
            endDate: checkOut,
            reason: 'Apartment not available',
          },
        ],
      }
    }

    const conflicts: AvailabilityResult['conflicts'] = []

    // Check for booking conflicts
    if (apartment.bookings.length > 0) {
      apartment.bookings.forEach((booking:any) => {
        conflicts.push({
          type: 'booking',
          startDate: booking.checkIn,
          endDate: booking.checkOut,
          reason: `Already booked (Ref: ${booking.bookingReference})`,
        })
      })
    }

    // Check for blocked dates
    if (apartment.availability.length > 0) {
      apartment.availability.forEach((block:any) => {
        conflicts.push({
          type: 'blocked',
          startDate: block.startDate,
          endDate: block.endDate,
          reason: block.reason || 'Blocked for maintenance',
        })
      })
    }

    // Check booking buffer (if there are adjacent bookings)
    if (apartment.bookingBuffer > 0) {
      const bufferCheckIn = new Date(checkIn)
      bufferCheckIn.setDate(bufferCheckIn.getDate() - apartment.bookingBuffer)

      const bufferCheckOut = new Date(checkOut)
      bufferCheckOut.setDate(bufferCheckOut.getDate() + apartment.bookingBuffer)

      const adjacentBookings = await prisma.booking.findMany({
        where: {
          apartmentId,
          status: { in: ['PENDING', 'CONFIRMED', 'CHECKED_IN'] },
          OR: [
            {
              AND: [
                { checkOut: { gt: bufferCheckIn } },
                { checkOut: { lte: checkIn } },
              ],
            },
            {
              AND: [
                { checkIn: { gte: checkOut } },
                { checkIn: { lt: bufferCheckOut } },
              ],
            },
          ],
        },
      })

      if (adjacentBookings.length > 0) {
        adjacentBookings.forEach((booking:any) => {
          conflicts.push({
            type: 'buffer',
            startDate: booking.checkIn,
            endDate: booking.checkOut,
            reason: `Cleaning buffer required (${apartment.bookingBuffer} days)`,
          })
        })
      }
    }

    return {
      isAvailable: conflicts.length === 0,
      conflicts: conflicts.length > 0 ? conflicts : undefined,
    }
  }

  /**
   * Get available dates for a specific apartment in a date range
   */
  static async getAvailableDateRanges(
    apartmentId: string,
    startDate: Date,
    endDate: Date
  ) {
    const bookings = await prisma.booking.findMany({
      where: {
        apartmentId,
        status: { in: ['PENDING', 'CONFIRMED', 'CHECKED_IN'] },
        checkIn: { lt: endDate },
        checkOut: { gt: startDate },
      },
      orderBy: { checkIn: 'asc' },
    })

    const blockedDates = await prisma.apartmentAvailability.findMany({
      where: {
        apartmentId,
        type: 'BLOCKED',
        startDate: { lt: endDate },
        endDate: { gt: startDate },
      },
      orderBy: { startDate: 'asc' },
    })

    // Merge all unavailable periods
    const unavailable = [
      ...bookings.map((b:any) => ({ start: b.checkIn, end: b.checkOut })),
      ...blockedDates.map((b:any) => ({ start: b.startDate, end: b.endDate })),
    ].sort((a, b) => a.start.getTime() - b.start.getTime())

    // Find gaps (available periods)
    const available: Array<{ start: Date; end: Date }> = []
    let currentDate = new Date(startDate)

    for (const period of unavailable) {
      if (currentDate < period.start) {
        available.push({
          start: new Date(currentDate),
          end: new Date(period.start),
        })
      }
      currentDate = period.end > currentDate ? period.end : currentDate
    }

    // Add final period if there's a gap
    if (currentDate < endDate) {
      available.push({
        start: new Date(currentDate),
        end: new Date(endDate),
      })
    }

    return available
  }

  /**
   * Get calendar view of bookings for an apartment
   */
  static async getBookingCalendar(apartmentId: string, month: Date) {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)

    const bookings = await prisma.booking.findMany({
      where: {
        apartmentId,
        status: { in: ['PENDING', 'CONFIRMED', 'CHECKED_IN'] },
        checkIn: { lte: endOfMonth },
        checkOut: { gte: startOfMonth },
      },
      select: {
        id: true,
        bookingReference: true,
        checkIn: true,
        checkOut: true,
        status: true,
        firstName: true,
        lastName: true,
      },
      orderBy: { checkIn: 'asc' },
    })

    const blockedDates = await prisma.apartmentAvailability.findMany({
      where: {
        apartmentId,
        type: 'BLOCKED',
        startDate: { lte: endOfMonth },
        endDate: { gte: startOfMonth },
      },
    })

    return {
      month: month.toISOString(),
      bookings,
      blockedDates,
    }
  }

  /**
   * Block dates for maintenance or personal use
   */
  static async blockDates(
    apartmentId: string,
    startDate: Date,
    endDate: Date,
    reason?: string
  ) {
    // First check if there are any confirmed bookings in this period
    const conflictingBookings = await prisma.booking.count({
      where: {
        apartmentId,
        status: { in: ['CONFIRMED', 'CHECKED_IN'] },
        checkIn: { lt: endDate },
        checkOut: { gt: startDate },
      },
    })

    if (conflictingBookings > 0) {
      throw new Error(
        `Cannot block dates - ${conflictingBookings} confirmed booking(s) exist in this period`
      )
    }

    return await prisma.apartmentAvailability.create({
      data: {
        apartmentId,
        startDate,
        endDate,
        type: 'BLOCKED',
        reason,
      },
    })
  }

  /**
   * Unblock previously blocked dates
   */
  static async unblockDates(blockId: string) {
    return await prisma.apartmentAvailability.delete({
      where: { id: blockId },
    })
  }
}