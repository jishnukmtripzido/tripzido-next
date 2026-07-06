import { unstable_cache } from "next/cache";
import { getCitiesApi } from "@/services/location.service";
import {
  getOffersApi,
  getPopularRentalsApi,
  getAnnouncementBannerApi,
} from "@/services/vehicle.service";
import type { City } from "@/types/locations.types";
import type {
  Offer,
  PopularRental,
  AnnouncementBanner,
  AnnouncementBannerPage,
} from "@/types/search.types";
import {
  CancellationPolicy,
  getCancellationPolicyApi,
  getLocationTimingApi,
  LocationTiming,
} from "@/services/vehicleDetails.service";

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

export const getAnnouncementBannerCached = unstable_cache(
  async (page: AnnouncementBannerPage): Promise<AnnouncementBanner | null> => {
    return await getAnnouncementBannerApi(page);
  },
  ["announcement-banner"],
  { revalidate: 1209600, tags: ["announcement-banner"] },
);

export const getCancellationPolicyCached = unstable_cache(
  async (vehicleId: number): Promise<CancellationPolicy> => {
    return await getCancellationPolicyApi(vehicleId);
  },
  ["cancellation-policy"],
  { revalidate: 1209600, tags: ["cancellation-policy"] },
);

export function getLocationTimingCached(
  listingId: string | number,
): Promise<LocationTiming | null> {
  return unstable_cache(
    async (): Promise<LocationTiming | null> => {
      return await getLocationTimingApi(listingId);
    },
    [`location-timing-${listingId}`],
    { revalidate: 3600, tags: [`location-timing-${listingId}`] },
  )();
}
