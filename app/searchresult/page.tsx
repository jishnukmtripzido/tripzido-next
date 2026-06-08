// app/(search)/searchresult/page.tsx
import { getCitiesCached } from "@/lib/cache";
import { searchVehiclesApi } from "@/services/vehicle.service";
import SearchResultsClient from "@/components/features/searchresult/SearchResultsClient";
import Header from "@/components/layout/Header";
import type { VehicleSearchResult } from "@/types/vehicles.types";

interface Props {
  searchParams: Promise<{
    city_id?: string;
    city_name?: string;
    pickup?: string;
    dropoff?: string;
  }>;
}

export default async function SearchResultPage({ searchParams }: Props) {
  const { city_id, city_name, pickup, dropoff } = await searchParams;
  const { cities, error: citiesError } = await getCitiesCached();

  let vehicles: VehicleSearchResult[] = [];

  if (city_id && pickup && dropoff) {
    vehicles = await searchVehiclesApi({
      city_id,
      pickup_datetime: pickup,
      dropoff_datetime: dropoff,
    }).catch(() => []);
  }

  return (
    <SearchResultsClient
      bikes={vehicles}
      city={city_name ?? ""}
      cityId={city_id ? Number(city_id) : null}
      pickup={pickup ?? ""}
      dropoff={dropoff ?? ""}
      cities={cities}
      citiesError={citiesError}
    />
  );
}
