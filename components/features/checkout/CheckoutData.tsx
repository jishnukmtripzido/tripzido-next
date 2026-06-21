// components/features/checkout/CheckoutData.tsx
import { getCheckoutSummaryApi } from "@/services/checkout.service";
import type { CheckoutSummary } from "@/services/checkout.service";
import CheckoutClient from "@/components/features/checkout/CheckoutClient";

interface Props {
  listingId: string;
  packageId: string;
  pickup: string;
  dropoff: string;
  paymentMode: "partial" | "full";
}

/**
 * Isolates the slow getCheckoutSummaryApi await behind its own async
 * server component so Suspense in page.tsx can stream a skeleton
 * immediately, swapping in the real content (or the inline error
 * state) once the fetch settles.
 *
 * Error handling is intentionally unchanged from the original
 * page.tsx: a thrown error here is caught locally and rendered as the
 * same inline "Unable to load checkout" message — this does NOT call
 * notFound() or let the error propagate to error.tsx, matching the
 * original behavior exactly, since this was an explicit requirement
 * (checkout failures shouldn't look like a 404 or a hard crash).
 */
export default async function CheckoutData({
  listingId,
  packageId,
  pickup,
  dropoff,
  paymentMode,
}: Props) {
  let summary: CheckoutSummary | null = null;
  let errorMessage: string | null = null;

  try {
    summary = await getCheckoutSummaryApi({
      listing_id: listingId,
      package_id: packageId,
      pickup_datetime: pickup,
      dropoff_datetime: dropoff,
    });
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "Unable to load checkout details.";
  }

  if (!summary) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <p className="text-lg font-semibold text-gray-900 mb-2">
          Unable to load checkout
        </p>
        <p className="text-sm text-gray-500">
          {errorMessage ??
            "This booking could not be completed. Please go back and try again."}
        </p>
      </div>
    );
  }

  return <CheckoutClient summary={summary} paymentMode={paymentMode} />;
}
