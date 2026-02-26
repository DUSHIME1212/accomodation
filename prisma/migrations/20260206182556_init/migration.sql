/*
  Warnings:

  - You are about to drop the column `bookingReference` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `checkIn` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `checkOut` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Booking` table. All the data in the column will be lost.
  - The `status` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[confirmationNumber]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bookingAccessToken]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basePrice` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkInDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkOutDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - The required column `confirmationNumber` was added to the `Booking` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `country` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestEmail` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestFirstName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestLastName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestPhone` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfNights` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfNightsCounted` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxAmount` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `paymentMethod` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropIndex
DROP INDEX "Booking_apartmentId_idx";

-- DropIndex
DROP INDEX "Booking_bookingReference_key";

-- DropIndex
DROP INDEX "Booking_checkIn_checkOut_idx";

-- DropIndex
DROP INDEX "Booking_userId_idx";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookingReference",
DROP COLUMN "checkIn",
DROP COLUMN "checkOut",
DROP COLUMN "paymentStatus",
DROP COLUMN "userId",
ADD COLUMN     "accessibleRoom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "ageVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "airportTransferNeeded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "assignedRoomNumber" TEXT,
ADD COLUMN     "basePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bedTypePreference" TEXT,
ADD COLUMN     "bookingAccessToken" TEXT,
ADD COLUMN     "bookingSource" TEXT NOT NULL DEFAULT 'website',
ADD COLUMN     "breakfastGuests" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "breakfastIncluded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cancellationFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "cancellationPolicyAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "cardExpiry" TEXT,
ADD COLUMN     "cardLastFour" TEXT,
ADD COLUMN     "cardName" TEXT,
ADD COLUMN     "celebrationDetails" TEXT,
ADD COLUMN     "checkInDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkOutDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "cleaningFee" DOUBLE PRECISION NOT NULL DEFAULT 50,
ADD COLUMN     "confirmationNumber" TEXT NOT NULL,
ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "cribRequested" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "depositPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "depositRequired" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "dietaryRestrictions" TEXT,
ADD COLUMN     "earlyCheckInRequest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "emergencyContactName" TEXT,
ADD COLUMN     "emergencyContactPhone" TEXT,
ADD COLUMN     "emergencyRelationship" TEXT,
ADD COLUMN     "estimatedArrivalTime" TEXT,
ADD COLUMN     "extraBedRequested" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "flightNumber" TEXT,
ADD COLUMN     "floorPreference" TEXT,
ADD COLUMN     "guestDateOfBirth" TIMESTAMP(3),
ADD COLUMN     "guestEmail" TEXT NOT NULL,
ADD COLUMN     "guestFirstName" TEXT NOT NULL,
ADD COLUMN     "guestLastName" TEXT NOT NULL,
ADD COLUMN     "guestNationality" TEXT,
ADD COLUMN     "guestPassportId" TEXT,
ADD COLUMN     "guestPhone" TEXT NOT NULL,
ADD COLUMN     "infantsUnder2" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "internalNotes" TEXT,
ADD COLUMN     "lateCheckOutRequest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "marketingOptIn" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "numberOfNights" INTEGER NOT NULL,
ADD COLUMN     "numberOfNightsCounted" INTEGER NOT NULL,
ADD COLUMN     "numberOfVehicles" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "parkingRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "preferredLanguage" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "purposeOfStay" TEXT,
ADD COLUMN     "refundAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sendEmailConfirmation" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sendSMSConfirmation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "serviceFee" DOUBLE PRECISION NOT NULL DEFAULT 30,
ADD COLUMN     "smokingRoom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "staffAssignedTo" TEXT,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "taxAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "taxRate" DOUBLE PRECISION NOT NULL DEFAULT 0.10,
ADD COLUMN     "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "termsAcceptedAt" TIMESTAMP(3),
ADD COLUMN     "transferDropoffTime" TEXT,
ADD COLUMN     "transferPickupTime" TEXT,
ADD COLUMN     "viewPreference" TEXT,
ADD COLUMN     "zipCode" TEXT NOT NULL,
ALTER COLUMN "adults" SET DEFAULT 1,
ALTER COLUMN "children" SET DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "loyaltyNumber" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferredLanguage" TEXT NOT NULL DEFAULT 'en',
    "floorPreference" TEXT,
    "roomViewPref" TEXT,
    "bedTypePreference" TEXT,
    "marketingEmails" BOOLEAN NOT NULL DEFAULT false,
    "marketingSMS" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_confirmationNumber_key" ON "Booking"("confirmationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingAccessToken_key" ON "Booking"("bookingAccessToken");

-- CreateIndex
CREATE INDEX "Booking_confirmationNumber_idx" ON "Booking"("confirmationNumber");

-- CreateIndex
CREATE INDEX "Booking_guestEmail_idx" ON "Booking"("guestEmail");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_checkInDate_idx" ON "Booking"("checkInDate");

-- CreateIndex
CREATE INDEX "Booking_bookingAccessToken_idx" ON "Booking"("bookingAccessToken");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
