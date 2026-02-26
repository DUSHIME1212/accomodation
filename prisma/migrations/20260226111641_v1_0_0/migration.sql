/*
  Warnings:

  - You are about to drop the column `price` on the `Apartment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sanityId]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `basePrice` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sanityId` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Apartment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "price",
ADD COLUMN     "basePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bookingBuffer" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxNights" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "minNights" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "sanityId" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_sanityId_key" ON "Apartment"("sanityId");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_slug_key" ON "Apartment"("slug");
