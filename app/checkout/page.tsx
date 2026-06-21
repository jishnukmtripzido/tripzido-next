// app/checkout/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import CheckoutData from "@/components/features/checkout/CheckoutData";
import CheckoutSkeleton from "@/components/features/checkout/CheckoutSkeleton";

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

  // Required-param check stays synchronous and fetch-free, same as
  // before — no reason to delay a 404 behind Suspense.
  if (!listing_id || !package_id || !pickup || !dropoff) notFound();

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col overflow-x-hidden pb-10 bg-gray-50">
      <main className="xl:mx-[80.5px] flex-grow mx-auto px-4 lg:px-0 py-4">
        <Suspense fallback={<CheckoutSkeleton />}>
          {/*
            CheckoutData awaits getCheckoutSummaryApi and preserves the
            exact try/catch + inline error UI from the original
            page.tsx. That await now streams under this boundary
            instead of blocking the whole route.
          */}
          <CheckoutData
            listingId={listing_id}
            packageId={package_id}
            pickup={pickup}
            dropoff={dropoff}
            paymentMode={payment_mode === "full" ? "full" : "partial"}
          />
        </Suspense>
      </main>
    </div>
  );
}
