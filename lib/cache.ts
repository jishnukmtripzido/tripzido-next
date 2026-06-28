// lib/cache.ts  — shared cached fetchers used by multiple pages
import { unstable_cache } from "next/cache";
import { getCitiesApi } from "@/services/location.service";
import type { City } from "@/types/locations.types";

export const getCitiesCached = unstable_cache(
  async (): Promise<{ cities: City[]; error: string | null }> => {
    try {
      const cities = await getCitiesApi();
      return { cities, error: null };
    } catch (err) {
      console.error("Failed to load cities:", err);
      return { cities: [], error: "Could not load cities. Please try again." };
    }
  },
  ["cities-list"],
  { revalidate: 1209600, tags: ["cities-list"] },
);
