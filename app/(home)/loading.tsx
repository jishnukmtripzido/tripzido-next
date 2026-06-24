import HeroSectionSkeleton from "@/components/features/search/HeroSectionSkeleton";
import SearchWidgetSkeleton from "@/components/features/search/SearchWidgetSkeleton";
import OffersSectionSkeleton from "@/components/features/search/OffersSectionSkeleton";
import PopularRentalsSkeleton from "@/components/features/search/PopularRentalsSkeleton";

/**
 * Next.js route-level loading UI — shown instantly on every navigation
 * to the home page while page.tsx resolves getCitiesCached().
 * Covers the above-the-fold sections that the user sees first.
 */
export default function Loading() {
  return (
    <div className="bg-white min-h-screen">
      {/* ── Nav placeholder ─────────────────────────────────────── */}
      <div className="w-full h-[53px] border-b border-gray-100 bg-white" />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <HeroSectionSkeleton />

      {/* ── Search widget (overlaps hero via -mt-12) ────────────── */}
      <SearchWidgetSkeleton />

      {/* ── Offers carousel ─────────────────────────────────────── */}
      <OffersSectionSkeleton />

      {/* ── Why Tripzido — simple 3-col bar ─────────────────────── */}
      <div className="bg-gray-50 border-t border-b border-gray-200 py-4 md:py-12">
        <div className="mx-auto px-4 lg:px-8 xl:mx-[121.5px] xl:px-0 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-5 py-6 md:py-0 md:px-8"
              >
                <div className="shrink-0 w-20 h-20 rounded-full bg-gray-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-200 rounded" />
                  <div className="h-3 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ placeholder ──────────────────────────────────────── */}
      <div className="pt-12 px-4 lg:px-8 mx-auto xl:mx-[121.5px] xl:px-0 animate-pulse space-y-4">
        <div className="h-7 w-64 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-14 bg-gray-100 border border-gray-200 rounded-md" />
          ))}
        </div>
      </div>

      {/* ── Popular rentals carousel ─────────────────────────────── */}
      <PopularRentalsSkeleton />
    </div>
  );
}
