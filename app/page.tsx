import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchWidget from "@/components/SearchWidget";
import OffersSection from "@/components/OffersSection";
import WhyTripzido from "@/components/WhyTripzido";
import FAQSection from "@/components/FAQSection";
import PopularRentals from "@/components/PopularRentals";
import HowItWorks from "@/components/HowItWorks";
import TrendingDestinations from "@/components/TrendingDestinations";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-white text-[#1a1a1a] font-sans min-h-screen">
      {/* 1. Top navigation bar */}
      <Header />

      {/* 2. Hero banner with background image */}
      <HeroSection />

      {/* 3. Floating search widget (overlaps hero bottom) */}
      <SearchWidget />

      {/* 4. Offers / "Travel more spend less" carousel */}
      <OffersSection />

      {/* 5. Trust features — support, cancellation, reviews */}
      <WhyTripzido />

      {/* 6. Expandable FAQ accordion */}
      <FAQSection />

      {/* 7. Bike cards carousel + filter tabs */}
      <PopularRentals />

      {/* 8. 4-step how-it-works explainer */}
      <HowItWorks />

      {/* 9. Destination image grid */}
      <TrendingDestinations />

      {/* 10. Site footer */}
      <Footer />
    </main>
  );
}
