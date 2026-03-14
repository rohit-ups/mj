interface BookingFormData {
  duration: number;
  stayId: string;
  startDate: string;
}

export interface ActionResult {
  success: boolean;
  error?: string;
  field?: string;
  bookingId?: string;
}

export async function submitBooking(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const duration = formData.get("duration") as string;
  const stayId = formData.get("stayId") as string;
  const startDate = formData.get("startDate") as string;

  if (!duration) {
    return { success: false, error: "Please select a course duration", field: "duration" };
  }

  if (!stayId) {
    return { success: false, error: "Please select an accommodation", field: "stay" };
  }

  if (!startDate) {
    return { success: false, error: "Please select a start date", field: "startDate" };
  }

  const parsedDate = new Date(startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsedDate < today) {
    return { success: false, error: "Start date cannot be in the past", field: "startDate" };
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const stayPrices: Record<string, number> = {
    "1": 25,
    "2": 85,
    "3": 55,
  };

  const durationPrices: Record<string, number> = {
    "3": 150,
    "5": 250,
    "7": 350,
    "14": 600,
    "30": 1200,
  };

  const nights = Math.ceil(
    (new Date(startDate).getTime() + parseInt(duration) * 24 * 60 * 60 * 1000 - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const totalPrice = (stayPrices[stayId] || 0) * parseInt(duration) + (durationPrices[duration] || 0);

  return {
    success: true,
    bookingId: `BK-${Date.now()}`,
  };
}
