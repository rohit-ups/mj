export interface PriceBreakdown {
  packageCost: number;
  additionalCost: number;
  total: number;
}

const PACKAGE_PRICES: Record<number, number> = {
  3: 6000,
  5: 9700,
  7: 13700,
  10: 18700,
};

/**
 * Calculates the total price for a Mambo Jambo package.
 * Mambo Jambo uses integrated pricing (Surf + Stay + Brunch).
 */
export function calculateTotal(
  courseDays: number,
  additionalServicesCost: number = 0
): PriceBreakdown {
  const packageCost = PACKAGE_PRICES[courseDays] || courseDays * 2000; // Fallback to day-based if not a standard package
  const total = packageCost + additionalServicesCost;

  return { 
    packageCost, 
    additionalCost: additionalServicesCost, 
    total 
  };
}
