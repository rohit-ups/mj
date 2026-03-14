import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

const FROM_EMAIL = 'Surf School <noreply@surfschool.com>';

interface BookingDetails {
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  lessonType: string;
  participants: number;
}

export async function sendBookingConfirmation(details: BookingDetails) {
  const { customerName, customerEmail, bookingDate, lessonType, participants } = details;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: customerEmail,
    subject: `Booking Confirmed - ${lessonType} on ${bookingDate}`,
    html: `
      <h1>Booking Confirmed!</h1>
      <p>Hi ${customerName},</p>
      <p>Your ${lessonType} lesson is confirmed for <strong>${bookingDate}</strong>.</p>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Lesson Type: ${lessonType}</li>
        <li>Date: ${bookingDate}</li>
        <li>Participants: ${participants}</li>
      </ul>
      <p>We'll see you at the beach!</p>
      <p>Mahalo,<br>The Surf School Team</p>
    `,
  });
}

interface WaiverDetails {
  customerName: string;
  customerEmail: string;
  waiverToken: string;
}

export async function sendWaiverLink(details: WaiverDetails) {
  const { customerName, customerEmail, waiverToken } = details;
  const waiverUrl = `https://surfschool.com/waiver/${waiverToken}`;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: customerEmail,
    subject: 'Please Complete Your Waiver',
    html: `
      <h1>Complete Your Waiver</h1>
      <p>Hi ${customerName},</p>
      <p>Before your surf lesson, please complete our liability waiver.</p>
      <p><a href="${waiverUrl}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Sign Waiver</a></p>
      <p>Or copy this link: ${waiverUrl}</p>
      <p>Mahalo,<br>The Surf School Team</p>
    `,
  });
}
