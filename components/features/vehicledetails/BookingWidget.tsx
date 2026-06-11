"use client";

import Link from "next/link";
import { useState } from "react";
import type { VehiclePackage, FareDetails } from "@/types/vehicleDetails.types";

interface Props {
  packages: VehiclePackage[];
  fareDetails: FareDetails;
  payAtPickupEnabled: boolean;
  pickup: string;
  dropoff: string;
  vehicleId: number;
  locationId: number;
}

export default function BookingWidget({
  packages,
  fareDetails,
  payAtPickupEnabled,
  vehicleId,
  locationId,
  pickup,
  dropoff,
}: Props) {
  const [selectedPackageId, setSelectedPackageId] = useState<number>(
    packages[0]?.id ?? 0,
  );

  return (
    <div className="bg-white border-b border-gray-200 md:border-none  pb-6">
      <h3 className=" font-bold text-font-main-sub mb-4">Select a Package</h3>

      <div className="relative mb-6">
        <select
          value={selectedPackageId}
          onChange={(e) => setSelectedPackageId(Number(e.target.value))}
          className="w-full appearance-none bg-white border border-gray-300 text-font-main-sub py-3 px-4 pr-8 rounded-lg outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-medium"
        >
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.label ??
                `${pkg.name} (₹ ${pkg.price_per_day.toLocaleString("en-IN")} per Day)`}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      <h3 className="font-bold text-font-main-sub mb-4">Fare Details</h3>

      <div className="space-y-3 text-sm text-font-main-sub mb-4">
        <div className="flex justify-between">
          <span>Rent Amount</span>
          <span className="text-font-main-sub">
            ₹ {fareDetails.rent_amount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Total</span>
          <span className=" text-font-main-sub">
            ₹ {fareDetails.total.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-font-main-sub">
          <span>
            Remaining Rent{" "}
            <span className="text-xs">(To be paid at pickup)</span>
          </span>
          <span>₹ {fareDetails.remaining_rent.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-font-main-sub">
          <span>Advance Payment</span>
          <span>₹ {fareDetails.advance_payment.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4" />

      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold text-font-main-sub">
          Amount Payable Today
        </span>
        <span className="text-xl font-bold text-font-main-sub">
          ₹ {fareDetails.advance_payment.toFixed(2)}
        </span>
      </div>

      <div className="bg-green-50 text-green-700 text-xs font-medium px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        Refundable Deposit - ₹{fareDetails.refundable_deposit.toFixed(0)} (To be
        paid at pickup)
      </div>

      <Link
        href="/checkout"
        className="w-full inline-block text-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-xl transition duration-200"
      >
        Book Now
      </Link>

      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Cancellation Policy
        </a>
      </div>
    </div>
  );
}
