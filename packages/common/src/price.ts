const COURSE_PRICE_PER_DAY = 1300;

export interface PriceBreakdown {
  courseCost: number;
  stayCost: number;
  total: number;
}

export function calculateTotal(
  courseDays: number,
  stayOptionPricePerNight: number
): PriceBreakdown {
  const courseCost = courseDays * COURSE_PRICE_PER_DAY;
  const stayCost = stayOptionPricePerNight * courseDays;
  const total = courseCost + stayCost;

  return { courseCost, stayCost, total };
}
