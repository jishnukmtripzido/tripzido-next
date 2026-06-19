"use client";
import { useState } from "react";

interface Props {
  rentAmount: number;
  remainingRent: number;
  advancePayment: number;
  refundableDeposit: number;
  onPayNow: () => void;
  isPaying: boolean;
  payError: string | null;
}

export default function FareDetails({
  rentAmount,
  remainingRent,
  advancePayment,
  refundableDeposit,
  onPayNow,
  isPaying,
  payError,
}: Props) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div className="bg-gray-50 md:bg-white border md:border-gray-200 rounded-md p-6 shadow-none">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Fare Details</h3>

      <div className="space-y-4 text-sm mb-6">
        <div className="flex justify-between items-center text-font-main-sub">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center text-gray-500">
              <span className="text-[10px]">+</span>
            </span>
            <span>Rent Amount</span>
          </div>
          <span>₹ {rentAmount.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center font-medium text-font-main-sub mb-3">
            <span>Total</span>
            <span>₹ {rentAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-font-main-sub pl-6 mb-2">
            <span>
              Rent Remaining{" "}
              <span className="text-xs ml-1">
                (To be paid at the time of Pickup)
              </span>
            </span>
            <span>₹ {remainingRent.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-font-main-sub pl-6">
            <span>Advance Payment</span>
            <span>₹ {advancePayment.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center text-base font-bold text-font-main-sub mb-2">
          <span>Total Payable Amount</span>
          <span>₹ {advancePayment.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-start text-sm text-font-main-sub mt-4">
          <div className="flex flex-col">
            <span>Refundable Deposit</span>
            <span className="text-xs">(To be paid at the time of pickup)</span>
          </div>
          <span>₹ {refundableDeposit.toFixed(2)}</span>
        </div>
      </div>

      <label className="flex items-start gap-3 mb-6 cursor-pointer group">
        <div className="mt-0.5">
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400 cursor-pointer"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
        </div>
        <span className="text-sm text-gray-600 group-hover:text-font-main-sub transition">
          I have read the terms and conditions
        </span>
      </label>

      {payError && <p className="text-sm text-red-500 mb-4">{payError}</p>}

      <button
        onClick={onPayNow}
        disabled={!acceptedTerms || isPaying}
        className={`w-full py-3.5 px-4 rounded-xl font-bold text-center transition duration-200 ${
          acceptedTerms && !isPaying
            ? "bg-yellow-400 hover:bg-yellow-500 text-black shadow-md"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isPaying ? "Redirecting to payment..." : "Pay Now"}
      </button>
    </div>
  );
}
