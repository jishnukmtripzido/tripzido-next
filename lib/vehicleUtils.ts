import type { VehicleLocation } from "@/types/vehicles.types";

export function getLocationPrice(loc: VehicleLocation): string | null {
  if (loc.pricing_packages.length > 0) {
    return loc.pricing_packages[0].total_price;
  }

  return null;
}
