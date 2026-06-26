import { Suspense } from "react";
import { getCitiesCached } from "@/lib/cache";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/features/search/HeroSection";
import SearchWidget from "@/components/features/search/SearchWidget";
import WhyTripzido from "@/components/features/search/WhyTripzido";
import FAQSection from "@/components/features/search/FAQSection";
import HowItWorks from "@/components/features/search/HowItWorks";
import TrendingDestinations from "@/components/features/search/TrendingDestinations";
import OffersSectionData from "@/components/features/search/OffersSectionData";
import PopularRentalsData from "@/components/features/search/PopularRentalsData";
import OffersSectionSkeleton from "@/components/features/search/OffersSectionSkeleton";
import PopularRentalsSkeleton from "@/components/features/search/PopularRentalsSkeleton";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { cities, error } = await getCitiesCached();

  return (
    <>
      <Header headerValues="w-full px-0 py-2 border-b border-gray-100 relative z-30 shadow-header" />

      <HeroSection />
      <SearchWidget cities={cities} citiesError={error} />

      {/* Offers — streams in under skeleton while API resolves */}
      <Suspense fallback={<OffersSectionSkeleton />}>
        <OffersSectionData />
      </Suspense>

      <WhyTripzido />
      <FAQSection />

      {/* Popular Rentals — streams in under skeleton while API resolves */}
      <Suspense fallback={<PopularRentalsSkeleton />}>
        {/*
          Default city_id=1; in a real flow you'd derive this from
          the user's selected city (cookie / geolocation). For now
          it falls back to hardcoded data when the API returns nothing.
        */}
        <PopularRentalsData cityId={1} />
      </Suspense>

      <HowItWorks />
      <TrendingDestinations />
    </>
  );
}
