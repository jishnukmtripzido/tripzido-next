// components/features/vehicledetails/VehicleDetailsSkeleton.tsx
import { CancellationPolicySkeleton, ReviewsSkeleton } from "./Skeletons";

function BreadcrumbsSkeleton() {
  return (
    <div className="hidden md:flex items-center gap-2 animate-pulse">
      <div className="h-3.5 w-10 rounded bg-gray-200" />
      <span className="text-gray-200">›</span>
      <div className="h-3.5 w-28 rounded bg-gray-200" />
      <span className="text-gray-200">›</span>
      <div className="h-3.5 w-20 rounded bg-gray-200" />
    </div>
  );
}

function VehicleHeaderSkeleton() {
  return (
    <div className="bg-white pb-6 border-b border-gray-200 mb-4 md:mb-8 animate-pulse">
      {/* ── MOBILE SKELETON ── */}
      <div className="flex flex-col md:hidden pt-5">
        <div className="h-6 w-48 rounded bg-gray-200 mb-2" />
        <div className="h-4 w-24 rounded bg-gray-200 mb-6" />

        <div className="grid grid-cols-[1fr_150px] gap-4 items-start">
          <div className="space-y-4 mt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-gray-200 shrink-0" />
                <div className="h-3.5 w-24 rounded bg-gray-200" />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-24 rounded bg-gray-200" />
            <div className="flex gap-2">
              <div className="w-10 h-8 rounded bg-gray-200 shrink-0" />
              <div className="w-10 h-8 rounded bg-gray-200 shrink-0" />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="h-4 w-32 rounded bg-gray-200 mb-2" />
          <div className="h-3 w-48 rounded bg-gray-100" />
        </div>
      </div>

      {/* ── DESKTOP SKELETON (Unchanged) ── */}
      <div className="hidden md:flex flex-row gap-8">
        {/* Image gallery */}
        <div className="w-6/12">
          <div className="md:bg-gray-50 md:rounded-md flex items-center justify-center p-6 md:border border-gray-100 h-72">
            <div className="w-full h-full rounded bg-gray-200" />
          </div>
          <div className="flex gap-3 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-20 h-16 rounded-md bg-gray-200 shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Right side: title, specs */}
        <div className="w-7/12 flex flex-col justify-start">
          <div className="h-5 w-32 rounded bg-gray-200 mb-3" />
          <div className="h-7 w-2/3 rounded bg-gray-200 mb-2" />
          <div className="h-3.5 w-28 rounded bg-gray-200 mb-6" />

          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-gray-200 shrink-0" />
                <div className="h-3.5 w-24 rounded bg-gray-200" />
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100">
            <div className="h-4 w-40 rounded bg-gray-200 mb-2" />
            <div className="h-3 w-56 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

// function ThingsToRememberSkeleton() {
//   return (
//     <div className="mb-8 animate-pulse">
//       <div className="h-5 w-44 rounded bg-gray-200 mb-5" />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 bg-white border border-gray-200 lg:border-none rounded-md p-6 lg:p-0">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <div key={i} className="flex items-center gap-3">
//             <div className="w-5 h-5 rounded bg-gray-200 shrink-0" />
//             <div className="h-3.5 w-36 rounded bg-gray-200" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

function ThingsToRememberSkeleton() {
  return (
    <div className="mb-8 animate-pulse">
      <div className="h-5 w-44 rounded bg-gray-200 mb-5" />
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-y-4 md:gap-x-8 bg-white border border-gray-200 lg:border-none rounded-md p-6 lg:p-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded bg-gray-200 shrink-0" />
            <div className="h-3.5 w-36 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TermsAndConditionsSkeleton() {
  return (
    <div className="mb-8 animate-pulse">
      <div className="h-5 w-48 rounded bg-gray-200 mb-4" />
      <div className="bg-white border border-gray-200 lg:border-none rounded-md p-6 lg:p-0 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded bg-gray-200 shrink-0 mt-0.5" />
            <div
              className="h-3.5 rounded bg-gray-200"
              style={{ width: `${60 + ((i * 13) % 30)}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PickupLocationSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-5 w-40 rounded bg-gray-200 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1 space-y-2">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-3 w-full rounded bg-gray-100" />
        </div>
        <div className="md:col-span-2 bg-gray-200 rounded-xl h-48" />
      </div>
    </div>
  );
}

/**
 * Matches BookingWidget's actual structure: package picker, fare
 * breakdown (4 rows), divider, "amount payable today" row, green
 * deposit banner, and the Book Now button. The conditional payment-
 * option toggle (only shown when canPayPartially is true) is omitted
 * since we don't know payAtPickupEnabled/advancePercentage until the
 * real fetch resolves — the skeleton stays in its "without toggle"
 * shape, which is the shorter of the two real states, so worst case
 * the toggle appears and pushes content down slightly on swap.
 *
 * The fixed mobile bottom bar from the real BookingWidget is
 * intentionally NOT replicated here — it's driven by an
 * IntersectionObserver watching scroll position, not part of initial
 * layout, so skeletoning it would be misleading.
 */
function BookingWidgetSkeleton() {
  return (
    <div className="bg-white border-b border-gray-200 md:border-none pb-6 animate-pulse">
      {/* "Select a Package" + dropdown trigger */}
      <div className="h-4 w-32 rounded bg-gray-200 mb-4" />
      <div className="h-[46px] w-full rounded-lg border border-gray-200 bg-gray-100 mb-6" />

      {/* "Fare Details" + rows */}
      <div className="h-4 w-24 rounded bg-gray-200 mb-4" />
      <div className="space-y-3 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3.5 w-28 rounded bg-gray-100" />
            <div className="h-3.5 w-16 rounded bg-gray-100" />
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 my-4" />

      {/* Amount payable today */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-4 w-36 rounded bg-gray-200" />
        <div className="h-4 w-20 rounded bg-gray-200" />
      </div>

      {/* Deposit banner */}
      <div className="h-10 w-full rounded-lg bg-green-50 mb-6" />

      {/* Book Now button */}
      <div className="h-12 w-full rounded-xl bg-gray-200" />

      <div className="mt-4 flex justify-center">
        <div className="h-3.5 w-32 rounded bg-gray-100" />
      </div>
    </div>
  );
}

/**
 * Matches SearchModifyBar's bordered-card shape: location name +
 * date/time block(s), an info line, and an Edit button — separate
 * markup for mobile (stacked) vs desktop (location/arrow/location row).
 */
function SearchModifyBarSkeleton() {
  return (
    <div className="w-full md:bg-gray-500 pt-4 md:py-2 md:pt-2 animate-pulse">
      <div className="xl:mx-[80.5px] mx-auto px-4 xl:px-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-2 md:border-3 border-gray-200 rounded-md p-3 md:px-4 md:py-3 bg-white gap-3 md:gap-0">
          {/* ── MOBILE ── */}
          <div className="flex flex-col w-full md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <div className="h-4 w-28 rounded bg-gray-200" />
                <div className="h-3.5 w-36 rounded bg-gray-100" />
              </div>
              <div className="h-9 w-16 rounded-md bg-gray-200 shrink-0 ml-4" />
            </div>
            <div className="h-3.5 w-52 rounded bg-gray-100 mt-3" />
          </div>

          {/* ── DESKTOP ── */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col gap-1.5">
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-3.5 w-32 rounded bg-gray-100" />
            </div>
            <div className="w-5 h-5 rounded bg-gray-100 shrink-0" />
            <div className="flex flex-col gap-1.5">
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-3.5 w-32 rounded bg-gray-100" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="h-3.5 w-52 rounded bg-gray-100" />
            <div className="h-10 w-20 rounded-md bg-gray-200 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Full-page skeleton for the vehicle details route, mirroring
 * page.tsx's exact grid-cols-12 structure so the real content swaps
 * in with minimal shift. Cancellation/Reviews skeletons are reused
 * here too so the very first paint already shows the full intended
 * shape, even though those two sections get their own independent
 * Suspense boundaries once VehicleDetailsData mounts.
 */
export default function VehicleDetailsSkeleton() {
  return (
    <>
      <SearchModifyBarSkeleton />
      <div className="min-h-screen">
        <main className="xl:mx-[80.5px] mx-auto px-4 xl:px-0 pb-4 md:py-4 xl:py-5 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column */}
          <div className="lg:col-span-8 space-y-5 order-1 lg:order-none">
            <BreadcrumbsSkeleton />
            <VehicleHeaderSkeleton />

            <div className="block lg:hidden">
              <BookingWidgetSkeleton />
            </div>

            <ThingsToRememberSkeleton />
            <div className="lg:border-t lg:border-gray-200" />
            <TermsAndConditionsSkeleton />
            <div className="lg:border-t lg:border-gray-200" />
            <CancellationPolicySkeleton />
            <div className="lg:border-t lg:border-gray-200" />
            <PickupLocationSkeleton />
            <ReviewsSkeleton />
          </div>

          {/* Right column — desktop sticky */}
          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="sticky top-[40px]">
              <BookingWidgetSkeleton />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
