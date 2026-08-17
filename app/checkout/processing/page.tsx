"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getBookingPaymentStatusAction } from "@/actions/bookings.actions";

type Status = "loading" | "failed" | "timeout" | "missing";

function Spinner() {
  return (
    <svg
      className="h-10 w-10 animate-spin text-blue-600"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function AnimatedDots() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // fixed width so the text doesn't shift as dots grow/shrink
  return <span className="inline-block w-4 text-left">{dots}</span>;
}

export default function ProcessingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("order_id");

  const [status, setStatus] = useState<Status>(orderId ? "loading" : "missing");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!orderId) return;

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
        // Was: `/booking-confirmed?ref=${result.data.booking_references.join(",")}`
        // A bulk booking creates multiple Booking rows sharing one
        // booking_group_id but each with its own booking_reference — a
        // reference (or joined list of them) can't be looked up as a
        // single unit on the confirmation page. booking_group_id can.
        router.push(`/booking-confirmed?group=${result.data.booking_group_id}`);
      } else if (result.data.status === "FAILED") {
        clearInterval(interval);
        setStatus("failed");
        setMessage("Payment failed. Please try again from your cart.");
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        setStatus("timeout");
        setMessage(
          "Still confirming your payment — this can take a minute. Check your bookings page shortly.",
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [orderId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {status === "loading" && (
          <>
            <Spinner />
            <p className="text-gray-600 text-sm flex">
              Confirming your payment
              <AnimatedDots />
            </p>
          </>
        )}

        {status === "missing" && (
          <p className="text-gray-600 text-sm">Missing order reference.</p>
        )}

        {status === "failed" && (
          <p className="text-red-600 text-sm">{message}</p>
        )}

        {status === "timeout" && (
          <p className="text-gray-600 text-sm">{message}</p>
        )}
      </div>
    </div>
  );
}
