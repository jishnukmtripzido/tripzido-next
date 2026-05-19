import HeroSection from "@/components/search/HeroSection";
import SearchWidget from "@/components/search/SearchWidget";
import OffersSection from "@/components/search/OffersSection";
import WhyTripzido from "@/components/search/WhyTripzido";
import FAQSection from "@/components/search/FAQSection";
import PopularRentals from "@/components/search/PopularRentals";
import HowItWorks from "@/components/search/HowItWorks";
import TrendingDestinations from "@/components/search/TrendingDestinations";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchWidget />
      <OffersSection />
      <WhyTripzido />
      <FAQSection />
      <PopularRentals />
      <HowItWorks />
      <TrendingDestinations />
    </>
  );
}