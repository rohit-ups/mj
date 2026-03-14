/**
 * Mambo Jambo WhatsApp Auto-Responder Service
 * Handles inbound FAQ messages based on keyword matching.
 */

const FAQ_RESPONSES: Record<string, string> = {
  price: "Mambo Jambo Packages:\n- 3 Day: ₹6,000 (2 nights stay)\n- 5 Day: ₹9,700 (4 nights stay)\n- 7 Day: ₹13,700 (6 nights stay)\n- 10 Day: ₹18,700 (9 nights stay)\nAll packages include surf lessons, AC dorm bed, and a heavy brunch! 🏄‍♂️🍳",
  pricing: "Mambo Jambo Packages:\n- 3 Day: ₹6,000 (2 nights stay)\n- 5 Day: ₹9,700 (4 nights stay)\n- 7 Day: ₹13,700 (6 nights stay)\n- 10 Day: ₹18,700 (9 nights stay)\nAll packages include surf lessons, AC dorm bed, and a heavy brunch! 🏄‍♂️🍳",
  
  timing: "Our surf lessons happen daily between 7:30 AM and 12:30 PM. The exact batch depends on the tide and wave conditions for the day. 🌊",
  times: "Our surf lessons happen daily between 7:30 AM and 12:30 PM. The exact batch depends on the tide and wave conditions for the day. 🌊",
  
  location: "We are located at: Kolachikambla Road, Karnad, Mulki, Karnataka, India.\nFind us on Google Maps: https://shorturl.at/wcRl8 📍",
  where: "We are located at: Kolachikambla Road, Karnad, Mulki, Karnataka, India.\nFind us on Google Maps: https://shorturl.at/wcRl8 📍",
  
  swim: "No, you don't need to know how to swim! Our lessons happen in shoulder-deep water with floating boards and instructors right by your side. 🏊‍♂️❌",
  swimming: "No, you don't need to know how to swim! Our lessons happen in shoulder-deep water with floating boards and instructors right by your side. 🏊‍♂️❌",
  
  food: "We provide tea and fruits before your surf session and a heavy, delicious brunch afterwards! For dinner, we have an open kitchen and local delivery options available. 🍎☕️",
  brunch: "We provide tea and fruits before your surf session and a heavy, delicious brunch afterwards! For dinner, we have an open kitchen and local delivery options available. 🍎☕️",
  
  contact: "You can reach us at (+91) 7022129460 or email us at mambojambosurf@gmail.com 🤙",
};

export function getAutoResponse(message: string): string {
  const normalizedMessage = message.toLowerCase();
  
  for (const [keyword, response] of Object.entries(FAQ_RESPONSES)) {
    if (normalizedMessage.includes(keyword)) {
      return response;
    }
  }
  
  return "Thanks for reaching out to Mambo Jambo Surf School! 🏄‍♂️\n\nTry asking about 'price', 'timing', 'location', 'swimming', or 'food'.\n\nAlternatively, you can reach our team directly at (+91) 7022129460. Slow down and catch a breath!";
}
