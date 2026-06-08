"use client";
import { useState } from "react";

export default function FareDetails() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div className="bg-gray-50 md:bg-white border md:border-gray-200 rounded-md p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6 ">Fare Details</h3>

      {/* Price Breakdown */}
      <div className="space-y-4 text-sm mb-6">
        <div className="flex justify-between items-center text-gray-600">
          <div className="flex items-center gap-2">
            <button className="w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center text-gray-500 hover:bg-gray-100">
              <span className="text-[10px]">+</span>
            </button>
            <span>Rent Amount</span>
          </div>
          <span>₹ 998.00</span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center font-medium text-gray-900 mb-3">
            <span>Total</span>
            <span>₹ 998.00</span>
          </div>

          <div className="flex justify-between items-center text-gray-500 pl-6 mb-2">
            <span>
              Rent Remaining{" "}
              <span className="text-xs ml-1">
                (To be paid at the time of Pickup)
              </span>
            </span>
            <span>₹ 798.40</span>
          </div>

          <div className="flex justify-between items-center text-gray-500 pl-6">
            <span>Advance Payment</span>
            <span>₹ 199.60</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center text-base font-bold text-gray-900 mb-2">
          <span>Total Payable Amount</span>
          <span>₹ 199.60</span>
        </div>

        <div className="flex justify-between items-start text-sm text-gray-500 mt-4">
          <div className="flex flex-col">
            <span>Refundable Deposit</span>
            <span className="text-xs">(To be paid at the time of pickup)</span>
          </div>
          <span>₹ 0.00</span>
        </div>
      </div>

      {/* Terms Checkbox */}
      <label className="flex items-start gap-3 mb-6 cursor-pointer group">
        <div className="mt-0.5">
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400 cursor-pointer"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
        </div>
        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">
          I have read the terms and conditions
        </span>
      </label>

      {/* Pay Button */}
      <button
        disabled={!acceptedTerms}
        className={`w-full py-3.5 px-4 rounded-xl font-bold text-center transition duration-200 ${
          acceptedTerms
            ? "bg-yellow-400 hover:bg-yellow-500 text-black shadow-md"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Pay Now
      </button>
    </div>
  );
}
