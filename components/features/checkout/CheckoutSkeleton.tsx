// components/features/checkout/CheckoutSkeleton.tsx

function OrderSummarySkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 shadow-none animate-pulse">
      {/* Vehicle info */}
      <div className="h-5 w-24 rounded bg-gray-200 mb-4" />
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b border-gray-100">
        <div className="w-full md:w-48 shrink-0 bg-gray-50 rounded-xl p-4 h-32 flex items-center justify-center">
          <div className="w-full h-full rounded bg-gray-200" />
        </div>
        <div className="flex-grow w-full space-y-2">
          <div className="h-5 w-3/4 rounded bg-gray-200" />
          <div className="h-3.5 w-32 rounded bg-gray-100" />
          <div className="space-y-1.5 mt-3">
            <div className="h-3.5 w-40 rounded bg-gray-100" />
            <div className="h-3.5 w-44 rounded bg-gray-100" />
          </div>
          <div className="h-9 w-28 rounded-lg bg-gray-100 mt-4" />
        </div>
      </div>

      {/* Date timeline */}
      <div className="py-6 border-b border-gray-100">
        <div className="h-3.5 w-36 rounded bg-gray-200 mb-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-10 rounded bg-gray-200" />
            <div className="space-y-1.5">
              <div className="h-3 w-16 rounded bg-gray-100" />
              <div className="h-3.5 w-14 rounded bg-gray-100" />
            </div>
          </div>
          <div className="flex-grow mx-8 hidden md:block border-t border-dashed border-gray-200" />
          <div className="flex items-center gap-3">
            <div className="space-y-1.5 items-end flex flex-col">
              <div className="h-3 w-16 rounded bg-gray-100" />
              <div className="h-3.5 w-14 rounded bg-gray-100" />
            </div>
            <div className="h-9 w-10 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="py-6 border-b border-gray-100">
        <div className="h-3.5 w-44 rounded bg-gray-200 mb-3" />
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gray-100 shrink-0" />
          <div className="h-3.5 w-40 rounded bg-gray-100" />
        </div>
      </div>

      {/* Things to remember */}
      <div className="pt-6">
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="h-3.5 w-36 rounded bg-gray-200 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-3.5 w-28 rounded bg-gray-200" />
                <div className="h-3.5 w-16 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FareDetailsSkeleton() {
  return (
    <div className="bg-gray-50 md:bg-white border md:border-gray-200 rounded-md p-6 shadow-none animate-pulse">
      <div className="h-5 w-28 rounded bg-gray-200 mb-4" />

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="h-3.5 w-24 rounded bg-gray-200" />
          <div className="h-3.5 w-16 rounded bg-gray-200" />
        </div>
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between items-center">
            <div className="h-4 w-14 rounded bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>
          <div className="flex justify-between items-center pl-6">
            <div className="h-3.5 w-32 rounded bg-gray-100" />
            <div className="h-3.5 w-14 rounded bg-gray-100" />
          </div>
          <div className="flex justify-between items-center pl-6">
            <div className="h-3.5 w-24 rounded bg-gray-100" />
            <div className="h-3.5 w-14 rounded bg-gray-100" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-4 w-36 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>
        <div className="flex justify-between items-start mt-4">
          <div className="space-y-1.5">
            <div className="h-3.5 w-28 rounded bg-gray-100" />
            <div className="h-3 w-40 rounded bg-gray-100" />
          </div>
          <div className="h-3.5 w-16 rounded bg-gray-100" />
        </div>
      </div>

      {/* Checkbox row */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-5 h-5 rounded bg-gray-200 mt-0.5 shrink-0" />
        <div className="h-3.5 w-48 rounded bg-gray-100" />
      </div>

      {/* Pay Now button — kept visibly disabled-styled, not a tappable
          shape, since no real price/quantity data exists yet */}
      <div className="w-full py-3.5 rounded-xl bg-gray-200 h-[50px]" />
    </div>
  );
}

/**
 * Full skeleton for the checkout page, mirroring CheckoutClient's
 * grid-cols-12 layout exactly (OrderSummary in 8 cols, FareDetails in
 * 4 cols) so the real content swaps in without layout shift.
 *
 * The Pay Now button here is intentionally rendered in its disabled
 * gray state only — never the yellow "ready to pay" treatment — since
 * this is a payment flow and no real amount/quantity data exists
 * until CheckoutSummary resolves. It should never look interactive
 * before it is.
 */
export default function CheckoutSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8">
        <OrderSummarySkeleton />
      </div>
      <div className="lg:col-span-4">
        <FareDetailsSkeleton />
      </div>
    </div>
  );
}
