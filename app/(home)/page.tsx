import { Suspense } from "react";
import { getCitiesCached, getPopularRentalsCached } from "@/lib/cache";
import { FALLBACK_POPULAR_RENTALS } from "@/lib/constants";
import { CityProvider } from "@/contexts/CityContext";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/features/search/HeroSection";
import SearchWidget from "@/components/features/search/SearchWidget";
import PopularRentals from "@/components/features/search/PopularRentals";
import WhyTripzido from "@/components/features/search/WhyTripzido";
import FAQSection from "@/components/features/search/FAQSection";
import HowItWorks from "@/components/features/search/HowItWorks";
import TrendingDestinations from "@/components/features/search/TrendingDestinations";
import OffersSectionData from "@/components/features/search/OffersSectionData";
import OffersSectionSkeleton from "@/components/features/search/OffersSectionSkeleton";
import PopularRentalsSkeleton from "@/components/features/search/PopularRentalsSkeleton";
import type { City } from "@/types/locations.types";
import type { PopularRental } from "@/types/search.types";

export default async function HomePage() {
  let cities: City[] = [];
  let citiesError: string | null = null;
  try {
    cities = await getCitiesCached();
  } catch {
    citiesError = "Could not load cities. Please try again.";
  }

  const initialCityId = cities[0]?.id ?? 1;
  const initialCityName = cities[0]?.name ?? "your city";

  let initialRentals: PopularRental[] = FALLBACK_POPULAR_RENTALS;
  try {
    const rentals = await getPopularRentalsCached(initialCityId);
    if (rentals.length > 0) initialRentals = rentals;
  } catch {
    // use fallback
  }

  return (
    <CityProvider
      initialCityId={initialCityId}
      initialCityName={initialCityName}
    >
      <Header headerValues="w-full px-0 py-2 border-b border-gray-100 relative z-30 shadow-header" />
      <HeroSection />
      <SearchWidget cities={cities} citiesError={citiesError} />

      <Suspense fallback={<OffersSectionSkeleton />}>
        <OffersSectionData />
      </Suspense>

      <WhyTripzido />
      <FAQSection />

      <Suspense fallback={<PopularRentalsSkeleton />}>
        <PopularRentals initialRentals={initialRentals} />
      </Suspense>

      <HowItWorks />
      <TrendingDestinations />
    </CityProvider>
  );
}
