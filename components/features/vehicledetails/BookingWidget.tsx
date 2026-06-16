"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
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
  const [packageOpen, setPackageOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  const selectedPackage = packages.find((p) => p.id === selectedPackageId);

  // Close on outside click / Escape
  useEffect(() => {
    if (!packageOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setPackageOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setPackageOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [packageOpen]);

  // Scroll selected item into view when opened
  useEffect(() => {
    if (packageOpen && selectedRef.current) {
      const list = selectedRef.current.closest(".overflow-y-auto");
      if (list) {
        const itemTop = selectedRef.current.offsetTop;
        list.scrollTop = itemTop - list.clientHeight / 2;
      }
    }
  }, [packageOpen]);

  function getPackageLabel(pkg: VehiclePackage) {
    return (
      pkg.label ??
      `${pkg.name} (₹ ${pkg.price_per_day.toLocaleString("en-IN")} per Day)`
    );
  }

  return (
    <div className="bg-white border-b border-gray-200 md:border-none pb-6">
      <h3 className="font-bold text-font-main-sub mb-4">Select a Package</h3>

      {/* Package picker */}
      <div className="relative mb-6" ref={dropdownRef}>
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setPackageOpen((o) => !o)}
          className={`w-full hover:cursor-pointer flex items-center justify-between bg-white border rounded-lg py-3 px-4 text-sm font-medium text-font-main-sub outline-none transition-colors
            ${
              packageOpen
                ? "border-yellow-400 ring-1 ring-yellow-400"
                : "border-gray-300 hover:border-gray-400"
            }`}
        >
          <span className="truncate">
            {selectedPackage
              ? getPackageLabel(selectedPackage)
              : "Select a package"}
          </span>
          <svg
            className={`w-4 h-4 ml-2 shrink-0 text-gray-500 transition-transform ${packageOpen ? "rotate-180" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>

        {/* Dropdown */}
        {packageOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-full left-0 z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-dropdown-in"
          >
            <div className="overflow-y-auto max-h-64 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
              {packages.map((pkg) => {
                const isSelected = pkg.id === selectedPackageId;
                return (
                  <button
                    key={pkg.id}
                    ref={isSelected ? selectedRef : undefined}
                    type="button"
                    onClick={() => {
                      setSelectedPackageId(pkg.id);
                      setPackageOpen(false);
                    }}
                    className={`w-full  flex items-center justify-between px-3 py-2 text-sm transition-colors hover:cursor-pointer
                      ${
                        isSelected
                          ? "bg-[#ffc107] text-black font-normal"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <span className="text-left">{getPackageLabel(pkg)}</span>
                    {isSelected && (
                      <svg
                        className="w-3.5 h-3.5 shrink-0 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
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
          <span className="text-font-main-sub">
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
        <span className="font-bold text-font-main-sub">
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
