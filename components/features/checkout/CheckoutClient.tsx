"use client";

import { useState } from "react";
import OrderSummary from "./OrderSummary";
import FareDetails from "./FareDetails";
import type { CheckoutSummary } from "@/services/checkout.service";

interface Props {
  summary: CheckoutSummary;
  paymentMode: "partial" | "full";
}

export default function CheckoutClient({ summary, paymentMode }: Props) {
  const [quantity, setQuantity] = useState(1);

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
        />
      </div>
    </div>
  );
}
