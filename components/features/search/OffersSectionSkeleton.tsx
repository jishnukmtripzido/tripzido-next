/**
 * Suspense fallback for OffersSectionData.
 * Mirrors the real OffersSection layout exactly — same section padding,
 * same heading row, same 4-card row — so there's zero layout shift when
 * the real content streams in.
 */
export default function OffersSectionSkeleton() {
  return (
    <section className="px-4 lg:px-8 py-12 mx-auto xl:mx-[121.5px] xl:px-0 animate-pulse">
      {/* Heading row */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-40 bg-gray-200 rounded" />
        <div className="hidden md:block h-4 w-44 bg-gray-200 rounded" />
      </div>

      {/* Card row */}
      <div className="flex gap-4 overflow-hidden">
        {/* Featured card (yellow-tinted) */}
        <div className="rounded-md h-28 flex-shrink-0 min-w-[260px] md:min-w-0 md:flex-1 bg-yellow-100" />
        {/* Plain cards */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-md h-28 flex-shrink-0 min-w-[260px] md:min-w-0 md:flex-1 bg-gray-100 hidden md:block"
          />
        ))}
      </div>
    </section>
  );
}
