"use client";

import { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import OrderSummary from "./OrderSummary";
import FareDetails from "./FareDetails";
import { createBookingOrderAction } from "@/actions/bookings.actions";
import type { CheckoutSummary } from "@/services/checkout.service";
import { useRouter } from "next/navigation";

interface Props {
  summary: CheckoutSummary;
  paymentMode: "partial" | "full";
}

export default function CheckoutClient({ summary, paymentMode }: Props) {
  const router = useRouter();

  useEffect(() => {
    function handlePageShow(event: PageTransitionEvent) {
      // event.persisted is true when the page was restored from
      // bfcache (e.g. via the back button) rather than freshly loaded.
      // Refresh so the checkout summary, availability, and any prior
      // payment attempt's state are re-validated against the server.
      if (event.persisted) {
        router.refresh();
      }
    }
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [router]);

  const [quantity, setQuantity] = useState(1);
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const maxQuantity = Math.max(summary.available_count, 1);

  const rentAmount = summary.unit_rent_amount * quantity;
  const refundableDeposit = summary.unit_refundable_deposit * quantity;

  const effectiveMode = summary.can_pay_partial ? paymentMode : "full";
  const advancePayment =
    effectiveMode === "partial" && summary.partial_payment_percentage !== null
      ? rentAmount * (summary.partial_payment_percentage / 100)
      : rentAmount;
  const remainingRent = rentAmount - advancePayment;

  function increment() {
    setQuantity((q) => Math.min(q + 1, maxQuantity));
  }
  function decrement() {
    setQuantity((q) => Math.max(q - 1, 1));
  }

  async function handlePayNow() {
    setPayError(null);
    setIsPaying(true);
    try {
      const result = await createBookingOrderAction({
        listing_id: summary.listing_id,
        package_id: summary.package_id,
        pickup_datetime: summary.pickup_datetime,
        dropoff_datetime: summary.dropoff_datetime,
        quantity,
        payment_mode: effectiveMode === "partial" ? "PARTIAL" : "FULL",
      });

      if (!result.success || !result.data) {
        throw new Error(result.message || "Unable to start payment.");
      }

      const cashfree = await load({
        mode:
          process.env.NEXT_PUBLIC_CASHFREE_ENV === "production"
            ? "production"
            : "sandbox",
      });
      if (!cashfree) {
        throw new Error("Failed to load payment SDK");
      }

      await cashfree.checkout({
        paymentSessionId: result.data.payment_session_id,
        redirectTarget: "_self",
      });
    } catch (err) {
      setPayError(
        err instanceof Error
          ? err.message
          : "Unable to start payment. Please try again.",
      );
      setIsPaying(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8">
        <OrderSummary
          summary={summary}
          quantity={quantity}
          maxQuantity={maxQuantity}
          rentAmount={rentAmount}
          refundableDeposit={refundableDeposit}
          onIncrement={increment}
          onDecrement={decrement}
        />
      </div>
      <div className="lg:col-span-4">
        <FareDetails
          rentAmount={rentAmount}
          remainingRent={remainingRent}
          advancePayment={advancePayment}
          refundableDeposit={refundableDeposit}
          onPayNow={handlePayNow}
          isPaying={isPaying}
          payError={payError}
        />
      </div>
    </div>
  );
}
