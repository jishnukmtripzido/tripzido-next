import { unstable_cache } from "next/cache";
import HeroSection from "@/components/search/HeroSection";
import SearchWidget from "@/components/search/SearchWidget";
import OffersSection from "@/components/search/OffersSection";
import WhyTripzido from "@/components/search/WhyTripzido";
import FAQSection from "@/components/search/FAQSection";
import PopularRentals from "@/components/search/PopularRentals";
import HowItWorks from "@/components/search/HowItWorks";
import TrendingDestinations from "@/components/search/TrendingDestinations";
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
  { revalidate: 3600 } // cache for 1 hour
);

export default async function HomePage() {
  const { cities, error } = await getCities();

  return (
    <>
      <HeroSection />
      <SearchWidget cities={cities} citiesError={error} />
      <OffersSection />
      <WhyTripzido />
      <FAQSection />
      <PopularRentals />
      <HowItWorks />
      <TrendingDestinations />
    </>
  );
}