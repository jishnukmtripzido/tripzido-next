/**
 * Suspense fallback for PopularRentalsData.
 * Mirrors the real PopularRentals layout — heading, subtitle, 4 cards
 * in the carousel row — so there's no layout shift on stream-in.
 */
export default function PopularRentalsSkeleton() {
  return (
    <section className="pt-12 px-4 lg:px-8 mx-auto xl:mx-[121.5px] xl:px-0 animate-pulse">
      {/* Heading + subtitle */}
      <div className="mb-7 space-y-2">
        <div className="h-6 w-64 bg-gray-200 rounded" />
        <div className="h-4 w-52 bg-gray-200 rounded" />
      </div>

      {/* Card carousel row */}
      <div className="flex gap-5 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`border border-gray-100 rounded-md overflow-hidden flex-shrink-0 min-w-[240px] md:min-w-0 md:flex-1 ${
              i > 1 ? "hidden md:block" : ""
            }`}
          >
            {/* Image area */}
            <div className="h-48 bg-gray-200" />
            {/* Content area */}
            <div className="p-4 space-y-3">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
              <div className="flex items-end justify-between pt-3 border-t border-gray-100 mt-3">
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                  <div className="h-6 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-9 w-24 bg-gray-200 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
