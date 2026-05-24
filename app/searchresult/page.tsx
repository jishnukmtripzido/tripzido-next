// // import SearchResultsClient from "@/components/searchresult/SearchResultsClient";
 
// // export default function SearchResultPage() {
// //   return <SearchResultsClient />;
// // }
 



// // app/searchresult/page.tsx
// import SearchResultsClient from "@/components/searchresult/SearchResultsClient";
// import { VehicleSearchResult } from "@/actions/searchVehicles";

// interface Props {
//   searchParams: {
//     city_id?: string;
//     city_name?: string;
//     pickup?: string;
//     dropoff?: string;
//   };
// }

// export default async function SearchResultPage({ searchParams }: Props) {
//   const { city_id, city_name, pickup, dropoff } = searchParams;

//   let data: VehicleSearchResult[] = [];

//   if (city_id && pickup && dropoff) {
//     const params = new URLSearchParams({
//       city_id: city_id,
//       pickup_datetime: pickup,
//       dropoff_datetime: dropoff,
//     });

//     try {
//       const res = await fetch(
//         `${process.env.DRF_BASE_URL}/vehicles/search/?${params.toString()}`,
//         { cache: "no-store" }
//       );

//       if (res.ok) {
//         data = await res.json();
//       }
//     } catch (err) {
//       console.error("Failed to fetch vehicles:", err);
//     }
//   }

//   return (
//     <SearchResultsClient
//       bikes={data}
//       city={city_name ?? ""}
//       pickup={pickup ?? ""}
//       dropoff={dropoff ?? ""}
//     />
//   );
// }


// import SearchResultsClient from "@/components/searchresult/SearchResultsClient";
// import { VehicleSearchResult } from "@/actions/searchVehicles";
// import { unstable_cache } from "next/cache";
// import { City } from "@/types/city";

// const getCities = unstable_cache(
//   async (): Promise<{ cities: City[]; error: string | null }> => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations/cities/`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const json = await res.json();
//       return { cities: json.data.results as City[], error: null };
//     } catch (err) {
//       console.error("Failed to load cities:", err);
//       return { cities: [], error: "Could not load cities. Please try again." };
//     }
//   },
//   ["cities-list"],
//   { revalidate: 36000 }
// );

// interface Props {
//   searchParams: {
//     city_id?: string;
//     city_name?: string;
//     pickup?: string;
//     dropoff?: string;
//   };
// }

// export default async function SearchResultPage({ searchParams }: Props) {
//   const { city_id, city_name, pickup, dropoff } = searchParams;
//   const { cities, error: citiesError } = await getCities();

//   let data: VehicleSearchResult[] = [];

//   if (city_id && pickup && dropoff) {
//     const params = new URLSearchParams({
//       city_id,
//       pickup_datetime: pickup,
//       dropoff_datetime: dropoff,
//     });

//     try {
//       const res = await fetch(
//         `${process.env.DRF_BASE_URL}/vehicles/search/?${params.toString()}`,
//         { cache: "no-store" }
//       );
//       if (res.ok) {
//         data = await res.json();
//       }
//     } catch (err) {
//       console.error("Failed to fetch vehicles:", err);
//     }
//   }

//   return (
//     <SearchResultsClient
//       bikes={data}
//       city={city_name ?? ""}
//       cityId={city_id ? Number(city_id) : null}
//       pickup={pickup ?? ""}
//       dropoff={dropoff ?? ""}
//       cities={cities}
//       citiesError={citiesError}
//     />
//   );
// }


// import { unstable_cache } from "next/cache";
// import HeroSection from "@/components/search/HeroSection";
// import SearchWidget from "@/components/search/SearchWidget";
// import OffersSection from "@/components/search/OffersSection";
// import WhyTripzido from "@/components/search/WhyTripzido";
// import FAQSection from "@/components/search/FAQSection";
// import PopularRentals from "@/components/search/PopularRentals";
// import HowItWorks from "@/components/search/HowItWorks";
// import TrendingDestinations from "@/components/search/TrendingDestinations";
// import Header from "@/components/layout/Header";
// import { City } from "@/types/city";

// const getCities = unstable_cache(
//   async (): Promise<{ cities: City[]; error: string | null }> => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations/cities/`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const json = await res.json();
//       return { cities: json.data.results as City[], error: null };
//     } catch (err) {
//       console.error("Failed to load cities:", err);
//       return { cities: [], error: "Could not load cities. Please try again." };
//     }
//   },
//   ["cities-list"],
//   { revalidate: 36000 } // cache for 1 hour
// );

// export default async function HomePage() {
//   const { cities, error } = await getCities();

//   return (
//     <>
//      <Header />
//       <HeroSection />
//       <SearchWidget cities={cities} citiesError={error} />
//       <OffersSection />
//       <WhyTripzido />
//       <FAQSection />
//       <PopularRentals />
//       <HowItWorks />
//       <TrendingDestinations />
//     </>
//   );
// }



import SearchResultsClient from "@/components/searchresult/SearchResultsClient";
import { VehicleSearchResult } from "@/actions/searchVehicles";
import { unstable_cache } from "next/cache";
import { City } from "@/types/city";

const getCities = unstable_cache(
  async (): Promise<{ cities: City[]; error: string | null }> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations/cities/`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return { cities: json.data.results as City[], error: null };
    } catch (err) {
      console.error("Failed to load cities:", err);
      return { cities: [], error: "Could not load cities. Please try again." };
    }
  },
  ["cities-list"],
  { revalidate: 36000 }
);

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
  const { cities, error: citiesError } = await getCities();

  let data: VehicleSearchResult[] = [];

  if (city_id && pickup && dropoff) {
    const params = new URLSearchParams({
      city_id,
      pickup_datetime: pickup,
      dropoff_datetime: dropoff,
    });

   

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vehicles/search/?${params.toString()}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        data = await res.json();

        console.log("out put",data)
      }
    } catch (err) {
      console.error("Failed to fetch vehicles:", err);
    }
  }

  return (
    <SearchResultsClient
      bikes={data['data']}
      city={city_name ?? ""}
      cityId={city_id ? Number(city_id) : null}
      pickup={pickup ?? ""}
      dropoff={dropoff ?? ""}
      cities={cities}
      citiesError={citiesError}
    />
  );
}