// // components/features/searchresult/SearchResultsData.tsx

// import { searchVehiclesApi } from "@/services/vehicle.service";
// import SearchResultsClient from "./SearchResultsClient";
// import type { VehicleSearchResult } from "@/types/vehicles.types";

// interface Props {
//   cityId: string | undefined;
//   pickup: string | undefined;
//   dropoff: string | undefined;
// }

// /**
//  * Isolates the slow searchVehiclesApi await behind its own async
//  * server component so Suspense can stream everything else (header,
//  * search bar, filter/sort buttons) immediately, then swap this in
//  * once vehicles resolve.
//  */
// export default async function SearchResultsData({
//   cityId,
//   pickup,
//   dropoff,
// }: Props) {
//   let vehicles: VehicleSearchResult[] = [];

//   if (cityId && pickup && dropoff) {
//     vehicles = await searchVehiclesApi({
//       city_id: cityId,
//       pickup_datetime: pickup,
//       dropoff_datetime: dropoff,
//     }).catch(() => []);
//   }

//   return (
//     <SearchResultsClient
//       bikes={vehicles}
//       pickup={pickup ?? ""}
//       dropoff={dropoff ?? ""}
//     />
//   );
// }

// components/features/searchresult/SearchResultsData.tsx
// Replace the existing file entirely.

import { searchVehiclesApi } from "@/services/vehicle.service";
import SearchResultsClient from "./SearchResultsClient";
import type { VehicleSearchResult } from "@/types/vehicles.types";

interface Props {
  cityId: string | undefined;
  pickup: string | undefined;
  dropoff: string | undefined;
}

/**
 * Server component — fetches only page 1 and passes it down.
 * SearchResultsClient handles loading the rest via infinite scroll.
 */
export default async function SearchResultsData({
  cityId,
  pickup,
  dropoff,
}: Props) {
  let initialBikes: VehicleSearchResult[] = [];
  let initialHasNext = false;

  if (cityId && pickup && dropoff) {
    try {
      const data = await searchVehiclesApi({
        city_id: cityId,
        pickup_datetime: pickup,
        dropoff_datetime: dropoff,
        page: 1,
      });
      initialBikes = data.results;
      initialHasNext = data.pagination.has_next;
    } catch {
      // leaves initialBikes = [] — empty state handled in client
    }
  }

  return (
    <SearchResultsClient
      initialBikes={initialBikes}
      initialHasNext={initialHasNext}
      cityId={cityId ?? ""}
      pickup={pickup ?? ""}
      dropoff={dropoff ?? ""}
    />
  );
}
