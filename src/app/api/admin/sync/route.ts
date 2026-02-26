// app/api/admin/sync/route.ts
// API endpoint for syncing Sanity data to Prisma

import { NextRequest, NextResponse } from 'next/server'
import { SyncService } from '@/lib/services/sync.service'

// Sync a single apartment
export async function POST(request: NextRequest) {
  try {
    // TODO: Add admin authentication middleware here
    
    const body = await request.json()
    const { sanityId } = body

    if (!sanityId) {
      return NextResponse.json(
        { error: 'Missing required field: sanityId' },
        { status: 400 }
      )
    }

    const apartment = await SyncService.syncApartment(sanityId)

    return NextResponse.json({
      message: 'Apartment synced successfully',
      apartment,
    })
  } catch (error: any) {
    console.error('Sync apartment error:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to sync apartment',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

// Sync all apartments
export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication middleware here
    
    const result = await SyncService.syncAllApartments()

    // Also cleanup deleted apartments
    const cleanup = await SyncService.cleanupDeletedApartments()

    return NextResponse.json({
      message: 'Sync completed',
      sync: result,
      cleanup,
    })
  } catch (error: any) {
    console.error('Sync all apartments error:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to sync apartments',
        message: error.message,
      },
      { status: 500 }
    )
  }
}