import { notFound } from "next/navigation";
import { getCheckoutSummaryApi } from "@/services/checkout.service";
import type { CheckoutSummary } from "@/services/checkout.service";
import CheckoutClient from "@/components/features/checkout/CheckoutClient";

interface Props {
  searchParams: Promise<{
    listing_id?: string;
    package_id?: string;
    pickup?: string;
    dropoff?: string;
    payment_mode?: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: Props) {
  const { listing_id, package_id, pickup, dropoff, payment_mode } =
    await searchParams;

  if (!listing_id || !package_id || !pickup || !dropoff) notFound();

  let summary: CheckoutSummary | null = null;
  let errorMessage: string | null = null;

  try {
    summary = await getCheckoutSummaryApi({
      listing_id,
      package_id,
      pickup_datetime: pickup,
      dropoff_datetime: dropoff,
    });
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "Unable to load checkout details.";
  }

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col overflow-x-hidden pb-10 bg-gray-50">
      <main className="xl:mx-[80.5px] flex-grow mx-auto px-4 lg:px-0 py-4">
        {summary ? (
          <CheckoutClient
            summary={summary}
            paymentMode={payment_mode === "full" ? "full" : "partial"}
          />
        ) : (
          <div className="max-w-lg mx-auto text-center py-20">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Unable to load checkout
            </p>
            <p className="text-sm text-gray-500">
              {errorMessage ??
                "This booking could not be completed. Please go back and try again."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
