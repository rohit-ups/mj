
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const BASE_URL = process.env.BASE_URL || 'https://surfschool.com';

interface PaymentLinkParams {
  bookingId: string;
  amount: number;
  customerEmail: string;
  customerName: string;
}

interface PaymentLinkResponse {
  id: string;
  short_url: string;
  amount: number;
  currency: string;
  status: string;
}

async function createRazorpayRequest(endpoint: string, body: Record<string, unknown>) {
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

export async function createPaymentLink(
  bookingId: string,
  amount: number,
  customerEmail: string,
  customerName: string
): Promise<PaymentLinkResponse> {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials not configured');
  }

  const depositAmount = Math.round(amount * 0.5 * 100);

  const paymentLink = await createRazorpayRequest('payment_links', {
    amount: depositAmount,
    currency: 'USD',
    accept_partial: false,
    description: `Surf School Booking - ${bookingId}`,
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
