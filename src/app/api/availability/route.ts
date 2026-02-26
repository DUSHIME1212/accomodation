// app/api/availability/route.ts
// API endpoint for checking apartment availability

import { NextRequest, NextResponse } from 'next/server'
import { AvailabilityService } from '@/lib/services/availability.service'
import { z } from 'zod'

const availabilitySchema = z.object({
  apartmentId: z.string().min(1),
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = availabilitySchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: validation.error.errors,
        },
        { status: 400 }
      )
    }

    const { apartmentId, checkIn, checkOut } = validation.data

    // Check availability
    const result = await AvailabilityService.checkAvailability({
      apartmentId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Availability check error:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to check availability',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

// Get available date ranges
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const apartmentId = searchParams.get('apartmentId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!apartmentId || !startDate || !endDate) {
      return NextResponse.json(
        {
          error: 'Missing required parameters: apartmentId, startDate, endDate',
        },
        { status: 400 }
      )
    }

    const availableDates = await AvailabilityService.getAvailableDateRanges(
      apartmentId,
      new Date(startDate),
      new Date(endDate)
    )

    return NextResponse.json({ availableDates })
  } catch (error: any) {
    console.error('Get available dates error:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to get available dates',
        message: error.message,
      },
      { status: 500 }
    )
  }
}