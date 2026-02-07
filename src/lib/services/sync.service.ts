// lib/services/sync.service.ts
// Service to sync Sanity apartment data to Prisma

import { prisma } from '@/lib/prisma'
import { sanityClient, apartmentQueries } from '@/lib/sanity.client'

export class SyncService {
  /**
   * Sync a single apartment from Sanity to Prisma
   */
  static async syncApartment(sanityId: string) {
    try {
      // Fetch apartment from Sanity
      const sanityApartment = await sanityClient.fetch(
        apartmentQueries.getById,
        { id: sanityId }
      )

      if (!sanityApartment) {
        throw new Error(`Apartment not found in Sanity: ${sanityId}`)
      }

      // Upsert to Prisma
      const apartment = await prisma.apartment.upsert({
        where: { sanityId },
        update: {
          name: sanityApartment.name,
          slug: sanityApartment.slug.current,
          basePrice: sanityApartment.basePrice,
          capacity: sanityApartment.capacity,
          isActive: sanityApartment.isActive ?? true,
          minNights: sanityApartment.bookingSettings?.minNights ?? 1,
          maxNights: sanityApartment.bookingSettings?.maxNights ?? 30,
          bookingBuffer: sanityApartment.bookingSettings?.bookingBuffer ?? 0,
        },
        create: {
          sanityId,
          name: sanityApartment.name,
          slug: sanityApartment.slug.current,
          basePrice: sanityApartment.basePrice,
          capacity: sanityApartment.capacity,
          isActive: sanityApartment.isActive ?? true,
          minNights: sanityApartment.bookingSettings?.minNights ?? 1,
          maxNights: sanityApartment.bookingSettings?.maxNights ?? 30,
          bookingBuffer: sanityApartment.bookingSettings?.bookingBuffer ?? 0,
        },
      })

      return apartment
    } catch (error) {
      console.error('Error syncing apartment:', error)
      throw error
    }
  }

  /**
   * Sync all apartments from Sanity to Prisma
   */
  static async syncAllApartments() {
    try {
      const sanityApartments = await sanityClient.fetch(apartmentQueries.getAllActive)

      const results = await Promise.allSettled(
        sanityApartments.map((apt: any) => this.syncApartment(apt._id))
      )

      const succeeded = results.filter((r:any) => r.status === 'fulfilled').length
      const failed = results.filter((r:any) => r.status === 'rejected').length

      return {
        total: sanityApartments.length,
        succeeded,
        failed,
        results,
      }
    } catch (error) {
      console.error('Error syncing all apartments:', error)
      throw error
    }
  }

  /**
   * Deactivate apartments in Prisma that are no longer in Sanity
   */
  static async cleanupDeletedApartments() {
    try {
      const sanityApartments = await sanityClient.fetch(
        `*[_type == "apartment"]._id`
      )
      const sanityIds = new Set(sanityApartments)

      // Find apartments in Prisma that don't exist in Sanity
      const prismaApartments = await prisma.apartment.findMany({
        select: { id: true, sanityId: true },
      })

      const toDeactivate = prismaApartments.filter(
        (apt:any) => !sanityIds.has(apt.sanityId)
      )

      if (toDeactivate.length > 0) {
        await prisma.apartment.updateMany({
          where: {
            id: { in: toDeactivate.map((apt:any) => apt.id) },
          },
          data: {
            isActive: false,
          },
        })
      }

      return {
        deactivated: toDeactivate.length,
        apartments: toDeactivate,
      }
    } catch (error) {
      console.error('Error cleaning up apartments:', error)
      throw error
    }
  }

  /**
   * Get apartment by Sanity ID, syncing if necessary
   */
  static async getApartmentBySanityId(sanityId: string) {
    let apartment = await prisma.apartment.findUnique({
      where: { sanityId },
    })

    // If not found or outdated, sync from Sanity
    if (!apartment) {
      apartment = await this.syncApartment(sanityId)
    }

    return apartment
  }

  /**
   * Get apartment by slug, syncing if necessary
   */
  static async getApartmentBySlug(slug: string) {
    let apartment = await prisma.apartment.findUnique({
      where: { slug },
    })

    if (!apartment) {
      // Try to fetch from Sanity and sync
      const sanityApartment = await sanityClient.fetch(
        apartmentQueries.getBySlug,
        { slug }
      )

      if (sanityApartment) {
        apartment = await this.syncApartment(sanityApartment._id)
      }
    }

    return apartment
  }
}