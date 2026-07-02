import { unstable_cache } from "next/cache";
import { getCitiesApi } from "@/services/location.service";
import { getOffersApi, getPopularRentalsApi } from "@/services/vehicle.service";
import type { City } from "@/types/locations.types";
import type { Offer, PopularRental } from "@/types/search.types";

export const getCitiesCached = unstable_cache(
  async (): Promise<City[]> => {
    return await getCitiesApi();
  },
  ["cities-list"],
  { revalidate: 1209600, tags: ["cities-list"] },
);

export const getOffersCached = unstable_cache(
  async (): Promise<Offer[]> => {
    return await getOffersApi();
  },
  ["offers-list"],
  { revalidate: 1209600, tags: ["offers-list"] },
);

export const getPopularRentalsCached = unstable_cache(
  async (cityId: number): Promise<PopularRental[]> => {
    return await getPopularRentalsApi(cityId);
  },
  ["popular-rentals"],
  { revalidate: 1209600, tags: ["popular-rentals"] },
);
