import type { VehicleLocation } from "@/types/vehicles.types";

export function getLocationPrice(loc: VehicleLocation): number | null {
  if (loc.pricing_packages.length > 0) {
    const prices = loc.pricing_packages
      .map((p) => parseFloat(p.price))
      .filter((n) => !isNaN(n));
    if (prices.length > 0) return Math.min(...prices);
  }
  if (loc.daily_price !== null && loc.daily_price !== undefined) {
    const parsed = parseFloat(loc.daily_price);
    if (!isNaN(parsed)) return parsed;
  }
  return null;
}
