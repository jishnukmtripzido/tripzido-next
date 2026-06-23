// app/page.tsx
import { getCitiesCached } from "@/lib/cache";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/features/search/HeroSection";
import SearchWidget from "@/components/features/search/SearchWidget";
import OffersSection from "@/components/features/search/OffersSection";
import WhyTripzido from "@/components/features/search/WhyTripzido";
import FAQSection from "@/components/features/search/FAQSection";
import PopularRentals from "@/components/features/search/PopularRentals";
import HowItWorks from "@/components/features/search/HowItWorks";
import TrendingDestinations from "@/components/features/search/TrendingDestinations";

export default async function HomePage() {
  const { cities, error } = await getCitiesCached();

  return (
    <>
      <Header headerValues="w-full px-0 py-2 border-b border-gray-100 relative z-30 shadow-header" />

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
