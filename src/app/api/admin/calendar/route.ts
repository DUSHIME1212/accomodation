// app/api/admin/calendar/route.ts
// API endpoint for managing calendar and blocking dates

import { NextRequest, NextResponse } from 'next/server'
import { AvailabilityService } from '@/lib/services/availability.service'
import { z } from 'zod'

const blockDatesSchema = z.object({
  apartmentId: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  reason: z.string().optional(),
})

const getCalendarSchema = z.object({
  apartmentId: z.string().min(1),
  month: z.string().datetime(),
})

// Get calendar view for an apartment
export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication middleware here
    
    const searchParams = request.nextUrl.searchParams
    const apartmentId = searchParams.get('apartmentId')
    const month = searchParams.get('month')

    if (!apartmentId || !month) {
      return NextResponse.json(
        {
          error: 'Missing required parameters: apartmentId, month',
        },
        { status: 400 }
      )
    }

    const calendar = await AvailabilityService.getBookingCalendar(
      apartmentId,
      new Date(month)
    )

    return NextResponse.json(calendar)
  } catch (error: any) {
    console.error('Get calendar error:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to get calendar',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

// Block dates for maintenance or personal use
export async function POST(request: NextRequest) {
  try {
    // TODO: Add admin authentication middleware here
    
    const body = await request.json()
    
    // Validate input
    const validation = blockDatesSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: validation.error.errors,
        },
        { status: 400 }
      )
    }

    const { apartmentId, startDate, endDate, reason } = validation.data

    const block = await AvailabilityService.blockDates(
      apartmentId,
      new Date(startDate),
      new Date(endDate),
      reason
    )

    return NextResponse.json({
      message: 'Dates blocked successfully',
      block,
    })
  } catch (error: any) {
    console.error('Block dates error:', error)
    
    // Handle specific errors
    if (error.message.includes('confirmed booking')) {
      return NextResponse.json(
        {
          error: 'Cannot block dates',
          message: error.message,
        },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      {
        error: 'Failed to block dates',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

// Unblock dates
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Add admin authentication middleware here
    
    const searchParams = request.nextUrl.searchParams
    const blockId = searchParams.get('blockId')

    if (!blockId) {
      return NextResponse.json(
        { error: 'Missing required parameter: blockId' },
        { status: 400 }
      )
    }

    await AvailabilityService.unblockDates(blockId)

    return NextResponse.json({
      message: 'Dates unblocked successfully',
    })
  } catch (error: any) {
    console.error('Unblock dates error:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to unblock dates',
        message: error.message,
      },
      { status: 500 }
    )
  }
}