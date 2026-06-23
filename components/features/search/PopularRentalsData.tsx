import { getPopularRentalsApi } from "@/services/vehicle.service";
import { FALLBACK_POPULAR_RENTALS } from "@/lib/constants";
import PopularRentals from "./PopularRentals";

interface Props {
  cityId: number;
}

/**
 * Async Server Component — awaits the popular-rentals API then hands
 * resolved data to the client PopularRentals carousel.
 * Falls back to hardcoded data if the API errors or returns nothing.
 */
export default async function PopularRentalsData({ cityId }: Props) {
  let rentals = FALLBACK_POPULAR_RENTALS;
  let cityName = FALLBACK_POPULAR_RENTALS[0]?.city_name ?? "your city";

  try {
    const apiRentals = await getPopularRentalsApi(cityId);
    if (apiRentals && apiRentals.length > 0) {
      rentals = apiRentals;
      cityName = apiRentals[0].city_name;
    }
  } catch {
    // API unavailable — silently use fallbacks
  }

  return <PopularRentals rentals={rentals} cityName={cityName} />;
}
