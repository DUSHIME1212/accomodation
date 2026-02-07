// lib/services/booking.service.ts
// Service for creating and managing bookings with race condition prevention

import { prisma } from '@/lib/prisma'
import { Prisma, BookingStatus, PaymentMethod, PaymentStatus } from '@prisma/client'
import { AvailabilityService } from './availability.service'

export interface CreateBookingData {
  apartmentId: string
  checkIn: Date
  checkOut: Date
  
  // Guest information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Address
  address: string
  city: string
  zipCode: string
  country: string
  
  // Guest counts
  adults: number
  children: number
  
  // Payment
  paymentMethod: PaymentMethod
  cardLast4?: string
  cardBrand?: string
  
  // Optional
  specialRequests?: string
  source?: string
  ipAddress?: string
  userAgent?: string
}

export interface UpdateBookingData {
  status?: BookingStatus
  paymentStatus?: PaymentStatus
  specialRequests?: string
}

export class BookingService {
  /**
   * Create a new booking with race condition prevention
   * Uses database transaction and row-level locking
   */
  static async createBooking(data: CreateBookingData) {
    // Calculate nights
    const nights = Math.ceil(
      (data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (nights < 1) {
      throw new Error('Invalid booking duration')
    }

    // Use a transaction to prevent race conditions
    return await prisma.$transaction(
      async (tx:any) => {
        // 1. Lock the apartment row (prevents concurrent bookings)
        const apartment = await tx.apartment.findUnique({
          where: { id: data.apartmentId },
        })

        if (!apartment || !apartment.isActive) {
          throw new Error('Apartment not available for booking')
        }

        // 2. Validate minimum/maximum nights
        if (nights < apartment.minNights) {
          throw new Error(`Minimum stay is ${apartment.minNights} nights`)
        }

        if (nights > apartment.maxNights) {
          throw new Error(`Maximum stay is ${apartment.maxNights} nights`)
        }

        // 3. Validate capacity
        if (data.adults + data.children > apartment.capacity) {
          throw new Error(
            `Maximum capacity is ${apartment.capacity} guests`
          )
        }

        // 4. Double-check availability within transaction
        const conflictingBookings = await tx.booking.count({
          where: {
            apartmentId: data.apartmentId,
            status: {
              in: ['PENDING', 'CONFIRMED', 'CHECKED_IN'],
            },
            checkIn: { lt: data.checkOut },
            checkOut: { gt: data.checkIn },
          },
        })

        if (conflictingBookings > 0) {
          throw new Error(
            'Apartment is no longer available for selected dates'
          )
        }

        // 5. Check for blocked dates
        const blockedDates = await tx.apartmentAvailability.count({
          where: {
            apartmentId: data.apartmentId,
            type: 'BLOCKED',
            startDate: { lt: data.checkOut },
            endDate: { gt: data.checkIn },
          },
        })

        if (blockedDates > 0) {
          throw new Error('Selected dates are blocked')
        }

        // 6. Check booking buffer
        if (apartment.bookingBuffer > 0) {
          const bufferCheckIn = new Date(data.checkIn)
          bufferCheckIn.setDate(
            bufferCheckIn.getDate() - apartment.bookingBuffer
          )

          const bufferCheckOut = new Date(data.checkOut)
          bufferCheckOut.setDate(
            bufferCheckOut.getDate() + apartment.bookingBuffer
          )

          const adjacentBookings = await tx.booking.count({
            where: {
              apartmentId: data.apartmentId,
              status: { in: ['PENDING', 'CONFIRMED', 'CHECKED_IN'] },
              OR: [
                {
                  AND: [
                    { checkOut: { gt: bufferCheckIn } },
                    { checkOut: { lte: data.checkIn } },
                  ],
                },
                {
                  AND: [
                    { checkIn: { gte: data.checkOut } },
                    { checkIn: { lt: bufferCheckOut } },
                  ],
                },
              ],
            },
          })

          if (adjacentBookings > 0) {
            throw new Error(
              `Booking buffer of ${apartment.bookingBuffer} day(s) required`
            )
          }
        }

        // 7. Calculate pricing
        const basePrice = apartment.basePrice.toNumber() * nights
        const cleaningFee = 50
        const serviceFee = 30
        const totalPrice = basePrice + cleaningFee + serviceFee

        // 8. Create the booking
        const booking = await tx.booking.create({
          data: {
            apartmentId: data.apartmentId,
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            nights,
            
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email.toLowerCase(),
            phone: data.phone,
            
            address: data.address,
            city: data.city,
            zipCode: data.zipCode,
            country: data.country,
            
            adults: data.adults,
            children: data.children,
            
            basePrice,
            cleaningFee,
            serviceFee,
            totalPrice,
            
            paymentMethod: data.paymentMethod,
            paymentStatus: 'PENDING',
            cardLast4: data.cardLast4,
            cardBrand: data.cardBrand,
            
            specialRequests: data.specialRequests,
            
            status: 'PENDING',
            source: data.source || 'web',
            ipAddress: data.ipAddress,
            userAgent: data.userAgent,
          },
          include: {
            apartment: true,
          },
        })

        // 9. Create audit log
        await tx.auditLog.create({
          data: {
            entity: 'booking',
            entityId: booking.id,
            action: 'created',
            userEmail: data.email,
            metadata: {
              bookingReference: booking.bookingReference,
              apartmentId: data.apartmentId,
              checkIn: data.checkIn,
              checkOut: data.checkOut,
            },
          },
        })

        return booking
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000, // Maximum wait time for transaction
        timeout: 10000, // Maximum transaction time
      }
    )
  }

  /**
   * Get booking by reference
   */
  static async getBookingByReference(bookingReference: string) {
    return await prisma.booking.findUnique({
      where: { bookingReference },
      include: {
        apartment: true,
      },
    })
  }

  /**
   * Get booking by ID
   */
  static async getBookingById(id: string) {
    return await prisma.booking.findUnique({
      where: { id },
      include: {
        apartment: true,
      },
    })
  }

  /**
   * Get bookings by email
   */
  static async getBookingsByEmail(email: string) {
    return await prisma.booking.findMany({
      where: {
        email: email.toLowerCase(),
      },
      include: {
        apartment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  /**
   * Update booking status
   */
  static async updateBooking(
    id: string,
    data: UpdateBookingData,
    adminEmail?: string
  ) {
    return await prisma.$transaction(async (tx:any) => {
      const booking = await tx.booking.update({
        where: { id },
        data,
        include: {
          apartment: true,
        },
      })

      // Create audit log
      await tx.auditLog.create({
        data: {
          entity: 'booking',
          entityId: id,
          action: 'updated',
          userEmail: adminEmail || booking.email,
          changes: data,
        },
      })

      return booking
    })
  }

  /**
   * Confirm booking (usually after payment)
   */
  static async confirmBooking(id: string, adminEmail?: string) {
    return await this.updateBooking(
      id,
      {
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
      },
      adminEmail
    )
  }

  /**
   * Cancel booking
   */
  static async cancelBooking(
    id: string,
    reason?: string,
    adminEmail?: string
  ) {
    return await prisma.$transaction(async (tx: any) => {
      const booking = await tx.booking.update({
        where: { id },
        data: {
          status: 'CANCELLED',
          cancelledAt: new Date(),
          cancellationReason: reason,
        },
        include: {
          apartment: true,
        },
      })

      // Create audit log
      await tx.auditLog.create({
        data: {
          entity: 'booking',
          entityId: id,
          action: 'cancelled',
          userEmail: adminEmail || booking.email,
          metadata: {
            reason,
            cancelledAt: new Date(),
          },
        },
      })

      return booking
    })
  }

  /**
   * Get all bookings with filters
   */
  static async getBookings(filters?: {
    apartmentId?: string
    status?: BookingStatus
    startDate?: Date
    endDate?: Date
    email?: string
    limit?: number
    offset?: number
  }) {
    const where: Prisma.BookingWhereInput = {}

    if (filters?.apartmentId) {
      where.apartmentId = filters.apartmentId
    }

    if (filters?.status) {
      where.status = filters.status
    }

    if (filters?.email) {
      where.email = filters.email.toLowerCase()
    }

    if (filters?.startDate || filters?.endDate) {
      where.AND = []
      
      if (filters.startDate) {
        where.AND.push({ checkIn: { gte: filters.startDate } })
      }
      
      if (filters.endDate) {
        where.AND.push({ checkOut: { lte: filters.endDate } })
      }
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          apartment: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: filters?.limit || 50,
        skip: filters?.offset || 0,
      }),
      prisma.booking.count({ where }),
    ])

    return {
      bookings,
      total,
      limit: filters?.limit || 50,
      offset: filters?.offset || 0,
    }
  }

  /**
   * Get booking statistics
   */
  static async getBookingStats(apartmentId?: string) {
    const where: Prisma.BookingWhereInput = apartmentId
      ? { apartmentId }
      : {}

    const [total, confirmed, pending, cancelled, revenue] = await Promise.all([
      prisma.booking.count({ where }),
      prisma.booking.count({
        where: { ...where, status: 'CONFIRMED' },
      }),
      prisma.booking.count({
        where: { ...where, status: 'PENDING' },
      }),
      prisma.booking.count({
        where: { ...where, status: 'CANCELLED' },
      }),
      prisma.booking.aggregate({
        where: {
          ...where,
          status: { in: ['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT'] },
        },
        _sum: {
          totalPrice: true,
        },
      }),
    ])

    return {
      total,
      confirmed,
      pending,
      cancelled,
      revenue: revenue._sum.totalPrice?.toNumber() || 0,
    }
  }
}