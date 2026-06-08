// services/vehicle.service.ts
import { api } from "@/lib/api";
import type { VehicleSearchResult } from "@/types/vehicles.types";

export type VehicleSearchParams = {
  city_id: string;
  pickup_datetime: string;
  dropoff_datetime: string;
};

export async function searchVehiclesApi(
  params: VehicleSearchParams,
): Promise<VehicleSearchResult[]> {
  const query = new URLSearchParams({
    city_id: params.city_id,
    pickup_datetime: params.pickup_datetime,
    dropoff_datetime: params.dropoff_datetime,
  });

  const data = await api.get<{ data: VehicleSearchResult[] }>(
    `/api/vehicles/search/?${query.toString()}`,
    { cache: "no-store" },
  );

  return data.data;
}
