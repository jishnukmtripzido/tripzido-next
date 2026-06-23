// // services/vehicle.service.ts

import { api } from "@/lib/api";
import type { VehicleSearchResult } from "@/types/vehicles.types";
import type { Offer, PopularRental } from "@/types/search.types";

export type VehicleSearchParams = {
  city_id: string;
  pickup_datetime: string;
  dropoff_datetime: string;
  vehicle_type_id?: string;
};

export async function searchVehiclesApi(
  params: VehicleSearchParams,
): Promise<VehicleSearchResult[]> {
  const query = new URLSearchParams({
    city_id: params.city_id,
    pickup_datetime: params.pickup_datetime,
    dropoff_datetime: params.dropoff_datetime,
    ...(params.vehicle_type_id && { vehicle_type_id: params.vehicle_type_id }),
  });

  const data = await api.get<{ data: VehicleSearchResult[] }>(
    `/api/vehicles/search/?${query.toString()}`,
    { cache: "no-store" },
  );

  return data.data;
}

export async function getOffersApi(): Promise<Offer[]> {
  const data = await api.get<{ data: Offer[] }>(
    "/api/administrations/offers/",
    {
      // Offers rarely change — revalidate every 10 minutes
      revalidate: 600,
    },
  );
  return data.data;
}

export async function getPopularRentalsApi(
  cityId: number,
): Promise<PopularRental[]> {
  const data = await api.get<{ data: PopularRental[] }>(
    `/api/administrations/popular-rentals/?city_id=${cityId}`,
    { revalidate: 600 },
  );
  return data.data;
}
