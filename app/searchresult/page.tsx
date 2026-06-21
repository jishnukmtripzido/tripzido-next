// app/searchresult/page.tsx
import { getCitiesCached } from "@/lib/cache";
import SearchResultsShell from "@/components/features/searchresult/SearchResultsShell";
import SearchResultsData from "@/components/features/searchresult/SearchResultsData";

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

  // Cities are cached/fast — safe to await directly, doesn't block streaming.
  const { cities, error: citiesError } = await getCitiesCached();

  return (
    <SearchResultsShell
      city={city_name ?? ""}
      cityId={city_id ? Number(city_id) : null}
      pickup={pickup ?? ""}
      dropoff={dropoff ?? ""}
      cities={cities}
      citiesError={citiesError}
    >
      {/*
        SearchResultsData is a Server Component that awaits
        searchVehiclesApi. Passed as children into the client
        SearchResultsShell, its slow await stays on the server and
        streams in under the <Suspense> boundary that
        SearchResultsShell wraps around {children} — the shell itself
        (header, search bar, filter/sort buttons) renders instantly,
        not blocked by this fetch.
      */}
      <SearchResultsData cityId={city_id} pickup={pickup} dropoff={dropoff} />
    </SearchResultsShell>
  );
}
