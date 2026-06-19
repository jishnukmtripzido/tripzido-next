"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getBookingPaymentStatusAction } from "@/actions/bookings.actions";

export default function ProcessingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("order_id");
  const [message, setMessage] = useState("Confirming your payment...");

  useEffect(() => {
    if (!orderId) {
      setMessage("Missing order reference.");
      return;
    }

    let attempts = 0;
    const maxAttempts = 10;

    const interval = setInterval(async () => {
      attempts += 1;
      const result = await getBookingPaymentStatusAction(orderId);

      if (!result.success || !result.data) {
        return; // transient error — let it retry on the next tick
      }

      if (result.data.status === "SUCCESS") {
        clearInterval(interval);
        router.push(
          `/booking-confirmed?ref=${result.data.booking_references.join(",")}`,
        );
      } else if (result.data.status === "FAILED") {
        clearInterval(interval);
        setMessage("Payment failed. Please try again from your cart.");
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        setMessage(
          "Still confirming your payment — this can take a minute. Check your bookings page shortly.",
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [orderId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
}
