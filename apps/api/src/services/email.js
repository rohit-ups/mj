const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

const FROM_EMAIL = 'Mambo Jambo Surf <noreply@mambojambosurf.com>';

async function sendBookingConfirmation(details) {
  const { customerName, customerEmail, bookingDate, lessonType, participants } = details;

  if (!process.env.RESEND_API_KEY) {
    console.log('Skipping email send (RESEND_API_KEY not set)');
    return { id: 'mock_id' };
  }

  return resend.emails.send({
    from: FROM_EMAIL,
    to: customerEmail,
    subject: `Booking Confirmed - ${lessonType} on ${bookingDate}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid black; padding: 20px;">
        <h1 style="text-transform: uppercase;">Booking Confirmed!</h1>
        <p>Hi ${customerName},</p>
        <p>Your ${lessonType} is confirmed for <strong>${bookingDate}</strong>.</p>
        <div style="background: #fbf8f1; padding: 15px; border: 1px solid black;">
          <p><strong>Details:</strong></p>
          <ul style="list-style: none; padding: 0;">
            <li>🏄‍♂️ Package: ${lessonType}</li>
            <li>📅 Date: ${bookingDate}</li>
            <li>👥 Participants: ${participants}</li>
          </ul>
        </div>
        <p>We'll see you at the beach! Slow down and catch a breath.</p>
        <p>🤙<br>The Mambo Jambo Team</p>
      </div>
    `,
  });
}

async function sendWaiverLink(details) {
  const { customerName, customerEmail, waiverToken } = details;
  const waiverUrl = `https://mambojambosurf.com/waiver/${waiverToken}`;

  if (!process.env.RESEND_API_KEY) {
    return { id: 'mock_id' };
  }

  return resend.emails.send({
    from: FROM_EMAIL,
    to: customerEmail,
    subject: 'Complete Your Mambo Jambo Waiver',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid black; padding: 20px;">
        <h1 style="text-transform: uppercase;">Complete Your Waiver</h1>
        <p>Hi ${customerName},</p>
        <p>Before your surf session, please complete our liability waiver.</p>
        <p style="margin: 30px 0;">
          <a href="${waiverUrl}" style="background: #ff5c00; color: white; padding: 12px 24px; text-decoration: none; border: 2px solid black; font-weight: bold; text-transform: uppercase;">Sign Waiver</a>
        </p>
        <p>Or copy this link: ${waiverUrl}</p>
        <p>🤙<br>The Mambo Jambo Team</p>
      </div>
    `,
  });
}

module.exports = {
  sendBookingConfirmation,
  sendWaiverLink
};
