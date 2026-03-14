const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const { handleIncomingWhatsAppMessage } = require('../services/whatsapp-auto-responder');
const { sendBookingConfirmation, sendWaiverLink } = require('../services/email');

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

async function webhooksRoutes(fastify, options) {
  // Support raw body for Razorpay signature verification
  // Fastify needs this plugin or custom parser to handle raw bodies properly if used with express.raw equivalent
  // But here we'll assume standard JSON for the common case unless raw is strictly needed
  
  fastify.post('/razorpay', async (request, reply) => {
    try {
      const signature = request.headers['x-razorpay-signature'];

      if (!signature) {
        return reply.code(400).send({ error: 'Missing Razorpay signature' });
      }

      // In Fastify, request.body is already parsed if it's JSON.
      // For signature verification, we might need the raw string.
      // A common way in Fastify is using a preParsing hook to save the raw body.
      const rawBody = JSON.stringify(request.body); 
      const isValid = verifyRazorpaySignature(rawBody, signature);

      if (!isValid) {
        fastify.log.error('Invalid Razorpay webhook signature');
        return reply.code(401).send({ error: 'Invalid signature' });
      }

      const event = request.body;
      const { event: eventType, payload } = event;

      fastify.log.info('Razorpay webhook received:', eventType);

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

          fastify.log.info(`Booking ${bookingId} confirmed after payment capture`);
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

          fastify.log.info(`Booking ${bookingId} payment failed`);
        }
      }

      return { status: 'ok' };
    } catch (error) {
      fastify.log.error('Razorpay webhook error:', error);
      return reply.code(500).send({ error: 'Webhook processing failed' });
    }
  });

  fastify.get('/whatsapp', async (request, reply) => {
    const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': verifyToken } = request.query;

    if (mode === 'subscribe' && verifyToken === WHATSAPP_VERIFY_TOKEN) {
      return reply.code(200).send(challenge);
    }

    return reply.code(403).send({ error: 'Verification failed' });
  });

  fastify.post('/whatsapp', async (request, reply) => {
    const body = request.body;

    if (body.entry && body.entry[0]?.changes) {
      const messages = body.entry[0].changes[0]?.value?.messages;
      if (messages && messages.length > 0) {
        for (const msg of messages) {
          fastify.log.info('Processing WhatsApp message:', msg.id);
          try {
            await handleIncomingWhatsAppMessage(msg);
          } catch (error) {
            fastify.log.error('Error handling message:', error);
          }
        }
      }
    }

    return { status: 'ok' };
  });
}

module.exports = webhooksRoutes;
