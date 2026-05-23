// import SearchResultsClient from "@/components/searchresult/SearchResultsClient";
 
// export default function SearchResultPage() {
//   return <SearchResultsClient />;
// }
 



// app/searchresult/page.tsx
import SearchResultsClient from "@/components/searchresult/SearchResultsClient";
import { VehicleSearchResult } from "@/actions/searchVehiclesAction";

interface Props {
  searchParams: {
    city_id?: string;
    city_name?: string;
    pickup?: string;
    dropoff?: string;
  };
}

export default async function SearchResultPage({ searchParams }: Props) {
  const { city_id, city_name, pickup, dropoff } = searchParams;

  let data: VehicleSearchResult[] = [];

  if (city_id && pickup && dropoff) {
    const params = new URLSearchParams({
      city_id: city_id,
      pickup_datetime: pickup,
      dropoff_datetime: dropoff,
    });

    try {
      const res = await fetch(
        `${process.env.DRF_BASE_URL}/vehicles/search/?${params.toString()}`,
        { cache: "no-store" }
      );

      if (res.ok) {
        data = await res.json();
      }
    } catch (err) {
      console.error("Failed to fetch vehicles:", err);
    }
  }

  return (
    <SearchResultsClient
      bikes={data}
      city={city_name ?? ""}
      pickup={pickup ?? ""}
      dropoff={dropoff ?? ""}
    />
  );
}