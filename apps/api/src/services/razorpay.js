const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function createRazorpayRequest(endpoint, body) {
  const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

  const response = await fetch(`https://api.razorpay.com/v1/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.description || 'Razorpay API error');
  }

  return response.json();
}

async function createPaymentLink(
  bookingId,
  amount,
  customerEmail,
  customerName
) {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    console.log('Skipping payment link creation (RAZORPAY_KEY_ID/SECRET not set)');
    return {
      id: 'mock_pl_id',
      short_url: 'https://razorpay.com/mock_link',
      amount: amount * 0.5,
      currency: 'INR',
      status: 'created'
    };
  }

  // Mambo Jambo takes 50% advance. Razorpay amounts are in paise (x100)
  const depositAmount = Math.round(amount * 0.5 * 100);

  const paymentLink = await createRazorpayRequest('payment_links', {
    amount: depositAmount,
    currency: 'INR',
    accept_partial: false,
    description: `Mambo Jambo Surf Booking - ${bookingId}`,
    customer: {
      name: customerName,
      email: customerEmail,
    },
    notify: {
      sms: false,
      email: true,
    },
    reminder_enable: true,
    notes: {
      booking_id: bookingId,
    },
    callback_url: `${BASE_URL}/payment/callback?booking_id=${bookingId}`,
    callback_method: 'get',
  });

  return {
    id: paymentLink.id,
    short_url: paymentLink.short_url,
    amount: paymentLink.amount / 100,
    currency: paymentLink.currency,
    status: paymentLink.status,
  };
}

module.exports = {
  createPaymentLink
};
