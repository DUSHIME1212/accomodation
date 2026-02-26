// lib/services/email.service.ts
// Email service for booking notifications

import type { Booking, Apartment } from "@/generated/prisma/client";

type BookingWithApartment = Booking & {
  apartment: Apartment;
};

export class EmailService {
  /**
   * Send booking confirmation email to guest
   */
  static async sendBookingConfirmation(booking: BookingWithApartment) {
    const emailData = {
      to: booking.guestEmail,
      subject: `Booking Confirmation - ${booking.apartment.name}`,
      templateData: {
        guestName: `${booking.guestFirstName} ${booking.guestLastName}`,
        apartmentName: booking.apartment.name,
        bookingReference: booking.confirmationNumber,
        checkIn: booking.checkInDate.toLocaleDateString(),
        checkOut: booking.checkOutDate.toLocaleDateString(),
        nights: booking.numberOfNights,
        totalPrice: booking.totalPrice,
        adults: booking.adults,
        children: booking.children,
      },
    };

    // TODO: Implement actual email sending
    // Examples:
    // - Nodemailer
    // - SendGrid
    // - AWS SES
    // - Postmark
    // - Resend

    console.log("Sending booking confirmation email:", emailData);

    // Example with Resend (modern choice):
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'bookings@yourdomain.com',
    //   to: emailData.to,
    //   subject: emailData.subject,
    //   react: BookingConfirmationEmail(emailData.templateData),
    // })

    return emailData;
  }

  /**
   * Send booking cancellation email
   */
  static async sendBookingCancellation(booking: BookingWithApartment) {
    const emailData = {
      to: booking.guestEmail,
      subject: `Booking Cancelled - ${booking.confirmationNumber}`,
      templateData: {
        guestName: `${booking.guestFirstName} ${booking.guestLastName}`,
        apartmentName: booking.apartment.name,
        bookingReference: booking.confirmationNumber,
        cancellationReason: booking.cancellationReason,
      },
    };

    console.log("Sending cancellation email:", emailData);

    return emailData;
  }

  /**
   * Send check-in reminder (day before)
   */
  static async sendCheckInReminder(booking: BookingWithApartment) {
    const emailData = {
      to: booking.guestEmail,
      subject: `Check-in Tomorrow - ${booking.apartment.name}`,
      templateData: {
        guestName: `${booking.guestFirstName} ${booking.guestLastName}`,
        apartmentName: booking.apartment.name,
        checkIn: booking.checkInDate.toLocaleDateString(),
        bookingReference: booking.confirmationNumber,
      },
    };

    console.log("Sending check-in reminder:", emailData);

    return emailData;
  }

  /**
   * Send admin notification for new booking
   */
  static async sendAdminNotification(booking: BookingWithApartment) {
    const emailData = {
      to: process.env.ADMIN_EMAIL || "admin@yourdomain.com",
      subject: `New Booking - ${booking.confirmationNumber}`,
      templateData: {
        bookingReference: booking.confirmationNumber,
        guestName: `${booking.guestFirstName} ${booking.guestLastName}`,
        apartmentName: booking.apartment.name,
        checkIn: booking.checkInDate.toLocaleDateString(),
        checkOut: booking.checkOutDate.toLocaleDateString(),
        totalPrice: booking.totalPrice,
      },
    };

    console.log("Sending admin notification:", emailData);

    return emailData;
  }
}
