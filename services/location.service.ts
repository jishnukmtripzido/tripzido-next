// services/location.service.ts
import { api } from "@/lib/api";
import type { City } from "@/types/locations.types";

type CityListResponse = {
  data: { results: City[] };
};

export async function getCitiesApi(): Promise<City[]> {
  const data = await api.get<CityListResponse>("/api/locations/cities/");
  return data.data.results;
}
