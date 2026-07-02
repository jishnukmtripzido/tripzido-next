import { getCitiesCached } from "@/lib/cache";
import SearchResultsShell from "@/components/features/searchresult/SearchResultsShell";
import SearchResultsData from "@/components/features/searchresult/SearchResultsData";
import AnnouncementBannerData from "@/components/features/searchresult/AnnouncementBannerData";
import type { City } from "@/types/locations.types";

interface Props {
  searchParams: Promise<{
    city_id?: string;
    city_name?: string;
    pickup?: string;
    dropoff?: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function SearchResultPage({ searchParams }: Props) {
  const { city_id, city_name, pickup, dropoff } = await searchParams;

  let cities: City[] = [];
  let citiesError: string | null = null;
  try {
    cities = await getCitiesCached();
  } catch {
    citiesError = "Could not load cities. Please try again.";
  }

  return (
    <SearchResultsShell
      city={city_name ?? ""}
      cityId={city_id ? Number(city_id) : null}
      pickup={pickup ?? ""}
      dropoff={dropoff ?? ""}
      cities={cities}
      citiesError={citiesError}
      banner={<AnnouncementBannerData page="search_result" />}
    >
      <SearchResultsData cityId={city_id} pickup={pickup} dropoff={dropoff} />
    </SearchResultsShell>
  );
}
