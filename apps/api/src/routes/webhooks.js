const express = require('express');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const { handleIncomingWhatsAppMessage } = require('../services/whatsapp-auto-responder');
const { sendBookingConfirmation, sendWaiverLink } = require('../services/email');

const router = express.Router();
const prisma = new PrismaClient();

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'my_verify_token';
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

function verifyRazorpaySignature(body, signature) {
  if (!RAZORPAY_WEBHOOK_SECRET) {
    console.error('RAZORPAY_WEBHOOK_SECRET is not configured');
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

router.post('/razorpay', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];

    if (!signature) {
      return res.status(400).json({ error: 'Missing Razorpay signature' });
    }

    const isValid = verifyRazorpaySignature(req.body, signature);

    if (!isValid) {
      console.error('Invalid Razorpay webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const event = JSON.parse(req.body.toString());
    const { event: eventType, payload } = event;

    console.log('Razorpay webhook received:', eventType);

    if (eventType === 'payment.captured') {
      const payment = payload.payment?.entity;

      if (payment?.notes?.booking_id) {
        const bookingId = payment.notes.booking_id;
        const razorpayPaymentId = payment.id;

        await prisma.booking.update({
          where: { id: bookingId },
          data: {
            status: 'confirmed',
            paymentStatus: 'paid',
            razorpayPaymentId,
          },
        });

        const booking = await prisma.booking.findUnique({
          where: { id: bookingId },
          include: {
            course: true,
            stayOption: true,
          },
        });

        if (booking) {
          const bookingDate = booking.startDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          const lessonType = booking.course?.name || 'Surf Session';
          const stayDetails = booking.stayOption 
            ? `\nAccommodation: ${booking.stayOption.name}` 
            : '';

          await sendBookingConfirmation({
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            bookingDate,
            lessonType,
            participants: 1,
          });

          const waiverToken = crypto.randomUUID();
          await sendWaiverLink({
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            waiverToken,
          });
        }

        console.log(`Booking ${bookingId} confirmed after payment capture`);
      }
    } else if (eventType === 'payment.failed') {
      const payment = payload.payment?.entity;

      if (payment?.notes?.booking_id) {
        const bookingId = payment.notes.booking_id;

        await prisma.booking.update({
          where: { id: bookingId },
          data: {
            paymentStatus: 'failed',
          },
        });

        console.log(`Booking ${bookingId} payment failed`);
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Razorpay webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

router.get('/whatsapp', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': verifyToken } = req.query;

  if (mode === 'subscribe' && verifyToken === WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.status(403).json({ error: 'Verification failed' });
});

router.post('/whatsapp', async (req, res) => {
  const body = req.body;

  if (body.entry && body.entry[0]?.changes) {
    const messages = body.entry[0].changes[0]?.value?.messages;
    if (messages && messages.length > 0) {
      for (const msg of messages) {
        console.log('Processing WhatsApp message:', msg.id);
        try {
          await handleIncomingWhatsAppMessage(msg);
        } catch (error) {
          console.error('Error handling message:', error);
        }
      }
    }
  }

  return res.status(200).json({ status: 'ok' });
});

module.exports = router;
