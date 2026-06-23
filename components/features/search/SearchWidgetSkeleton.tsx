/**
 * Skeleton for SearchWidget.
 * Mirrors the real widget exactly:
 *   - Same -mt-12 overlap over the hero
 *   - Same yellow border card with shadow
 *   - Same field layout: city → date → time → dropoff date → dropoff time → button
 *   - Mobile: 2-column grid for date/time pairs
 *   - Desktop: single unwrapped row
 */
export default function SearchWidgetSkeleton() {
  return (
    <section className="relative z-20 px-4 lg:px-8 -mt-12 mx-auto xl:mx-[121.5px] xl:px-0">
      <div
        className="bg-white rounded-md p-4 border-3 border-brand-yellow animate-pulse"
        style={{
          boxShadow:
            "rgba(50,50,93,0.25) 0px 13px 27px -5px, rgba(0,0,0,0.3) 0px 8px 16px -8px",
        }}
      >
        {/* "Grab Your Next Ride!" heading */}
        <div className="h-6 w-48 bg-gray-200 rounded mb-4" />

        <div className="flex flex-wrap md:flex-nowrap items-end gap-2">

          {/* City */}
          <div className="w-full md:flex-1 min-w-0 space-y-1">
            <div className="h-3 w-16 bg-gray-200 rounded ml-1" />
            <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-md" />
          </div>

          {/* Date + time fields — 2-col on mobile, inline on md+ */}
          <div className="grid grid-cols-2 gap-2 w-full md:contents">

            {/* Pickup date */}
            <div className="w-full md:w-[130px] md:shrink-0 space-y-1">
              <div className="h-3 w-20 bg-gray-200 rounded ml-1" />
              <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-md" />
            </div>

            {/* Pickup time */}
            <div className="w-full md:w-[120px] md:shrink-0 space-y-1">
              <div className="h-3 w-8 bg-gray-200 rounded ml-1" />
              <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-md" />
            </div>

            {/* Dropoff date */}
            <div className="w-full md:w-[130px] md:shrink-0 space-y-1">
              <div className="h-3 w-24 bg-gray-200 rounded ml-1" />
              <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-md" />
            </div>

            {/* Dropoff time */}
            <div className="w-full md:w-[120px] md:shrink-0 space-y-1">
              <div className="h-3 w-8 bg-gray-200 rounded ml-1" />
              <div className="h-11 w-full bg-gray-100 border border-gray-200 rounded-md" />
            </div>

          </div>

          {/* Search button */}
          <div className="shrink-0 w-full md:w-auto">
            <div className="h-11 w-full md:w-[88px] bg-brand-yellow opacity-50 rounded-md" />
          </div>

        </div>
      </div>
    </section>
  );
}
