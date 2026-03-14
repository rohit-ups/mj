const axios = require('axios');

const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

const FAQ_RESPONSES = [
  {
    keyword: 'timing',
    response: '🕐 Our surf lessons run daily at 7:00 AM, 9:00 AM, and 2:00 PM. Sessions last 2 hours. We recommend morning sessions for calmer waters!',
  },
  {
    keyword: 'price',
    response: '💰 Pricing: Private lesson $120, Semi-private $90/person (min 2), Group lesson $60/person. All prices include equipment rental!',
  },
  {
    keyword: 'location',
    response: '📍 We operate at Main Beach, just a 5-minute walk from the parking lot. Look for our bright blue tent! Free parking available.',
  },
  {
    keyword: 'contact',
    response: '📞 Reach us at +1-555-SURF-123 or reply to this message. We respond within 24 hours! You can also book online at surfschool.com',
  },
];

const DEFAULT_RESPONSE =
  "Thanks for reaching out! For bookings, visit surfschool.com or call +1-555-SURF-123. We're happy to help with any questions!";

function matchFAQKeyword(messageText) {
  const lowerText = messageText.toLowerCase();

  for (const faq of FAQ_RESPONSES) {
    if (lowerText.includes(faq.keyword)) {
      return faq.response;
    }
  }

  return null;
}

async function sendWhatsAppMessage(to, message, replyToMessageId = null) {
  if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
    console.error('WhatsApp credentials not configured');
    return;
  }

  try {
    const payload = {
      messaging_product: 'whatsapp',
      to,
      text: { body: message },
    };

    if (replyToMessageId) {
      payload.context = { message_id: replyToMessageId };
    }

    await axios.post(
      `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`WhatsApp message sent to ${to}`);
  } catch (error) {
    if (error.response) {
      console.error('WhatsApp API error:', error.response.data);
    } else {
      console.error('WhatsApp send error:', error.message);
    }
    throw error;
  }
}

async function handleIncomingWhatsAppMessage(message) {
  const messageText = message.text?.body || message.image?.caption || '';

  if (!messageText.trim()) {
    return;
  }

  const reply = matchFAQKeyword(messageText) || DEFAULT_RESPONSE;
  await sendWhatsAppMessage(message.from, reply, message.id);
}

function createFAQHandler() {
  return async (messages) => {
    for (const message of messages) {
      try {
        await handleIncomingWhatsAppMessage(message);
      } catch (error) {
        console.error(`Failed to process message ${message.id}:`, error);
      }
    }
  };
}

module.exports = {
  handleIncomingWhatsAppMessage,
  sendWhatsAppMessage,
  createFAQHandler,
  matchFAQKeyword,
};
