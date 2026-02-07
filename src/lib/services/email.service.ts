// lib/services/email.service.ts
// Email service for booking notifications

import { Booking, Apartment } from '@prisma/client'

type BookingWithApartment = Booking & {
  apartment: Apartment
}

export class EmailService {
  /**
   * Send booking confirmation email to guest
   */
  static async sendBookingConfirmation(booking: BookingWithApartment) {
    const emailData = {
      to: booking.email,
      subject: `Booking Confirmation - ${booking.apartment.name}`,
      templateData: {
        guestName: `${booking.firstName} ${booking.lastName}`,
        apartmentName: booking.apartment.name,
        bookingReference: booking.bookingReference,
        checkIn: booking.checkIn.toLocaleDateString(),
        checkOut: booking.checkOut.toLocaleDateString(),
        nights: booking.nights,
        totalPrice: booking.totalPrice.toNumber(),
        adults: booking.adults,
        children: booking.children,
      },
    }

    // TODO: Implement actual email sending
    // Examples:
    // - Nodemailer
    // - SendGrid
    // - AWS SES
    // - Postmark
    // - Resend

    console.log('Sending booking confirmation email:', emailData)

    // Example with Resend (modern choice):
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'bookings@yourdomain.com',
    //   to: emailData.to,
    //   subject: emailData.subject,
    //   react: BookingConfirmationEmail(emailData.templateData),
    // })

    return emailData
  }

  /**
   * Send booking cancellation email
   */
  static async sendBookingCancellation(booking: BookingWithApartment) {
    const emailData = {
      to: booking.email,
      subject: `Booking Cancelled - ${booking.bookingReference}`,
      templateData: {
        guestName: `${booking.firstName} ${booking.lastName}`,
        apartmentName: booking.apartment.name,
        bookingReference: booking.bookingReference,
        cancellationReason: booking.cancellationReason,
      },
    }

    console.log('Sending cancellation email:', emailData)

    return emailData
  }

  /**
   * Send check-in reminder (day before)
   */
  static async sendCheckInReminder(booking: BookingWithApartment) {
    const emailData = {
      to: booking.email,
      subject: `Check-in Tomorrow - ${booking.apartment.name}`,
      templateData: {
        guestName: `${booking.firstName} ${booking.lastName}`,
        apartmentName: booking.apartment.name,
        checkIn: booking.checkIn.toLocaleDateString(),
        bookingReference: booking.bookingReference,
      },
    }

    console.log('Sending check-in reminder:', emailData)

    return emailData
  }

  /**
   * Send admin notification for new booking
   */
  static async sendAdminNotification(booking: BookingWithApartment) {
    const emailData = {
      to: process.env.ADMIN_EMAIL || 'admin@yourdomain.com',
      subject: `New Booking - ${booking.bookingReference}`,
      templateData: {
        bookingReference: booking.bookingReference,
        guestName: `${booking.firstName} ${booking.lastName}`,
        apartmentName: booking.apartment.name,
        checkIn: booking.checkIn.toLocaleDateString(),
        checkOut: booking.checkOut.toLocaleDateString(),
        totalPrice: booking.totalPrice.toNumber(),
      },
    }

    console.log('Sending admin notification:', emailData)

    return emailData
  }
}