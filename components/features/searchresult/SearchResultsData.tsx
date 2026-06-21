// components/features/searchresult/SearchResultsData.tsx

import { searchVehiclesApi } from "@/services/vehicle.service";
import SearchResultsClient from "./SearchResultsClient";
import type { VehicleSearchResult } from "@/types/vehicles.types";

interface Props {
  cityId: string | undefined;
  pickup: string | undefined;
  dropoff: string | undefined;
}

/**
 * Isolates the slow searchVehiclesApi await behind its own async
 * server component so Suspense can stream everything else (header,
 * search bar, filter/sort buttons) immediately, then swap this in
 * once vehicles resolve.
 */
export default async function SearchResultsData({
  cityId,
  pickup,
  dropoff,
}: Props) {
  let vehicles: VehicleSearchResult[] = [];

  if (cityId && pickup && dropoff) {
    vehicles = await searchVehiclesApi({
      city_id: cityId,
      pickup_datetime: pickup,
      dropoff_datetime: dropoff,
    }).catch(() => []);
  }

  return (
    <SearchResultsClient
      bikes={vehicles}
      pickup={pickup ?? ""}
      dropoff={dropoff ?? ""}
    />
  );
}
