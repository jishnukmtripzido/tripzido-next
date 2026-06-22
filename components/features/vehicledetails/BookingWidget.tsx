// "use client";

// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import type { FareDetails } from "@/types/vehicleDetails.types";
// import { useSelectedPackage } from "@/contexts/PackageSelectionContext";

// interface Props {
//   fareDetails: FareDetails;
//   payAtPickupEnabled: boolean;
//   pickup: string;
//   dropoff: string;
//   vehicleId: number;
//   locationId: number;
//   isAvailable?: boolean;
//   availabilityMessage?: string | null;
// }

// export default function BookingWidget({
//   fareDetails,
//   payAtPickupEnabled,
//   vehicleId,
//   locationId,
//   pickup,
//   dropoff,
//   isAvailable = true,
//   availabilityMessage,
// }: Props) {
//   const { packages, selectedPackageId, setSelectedPackageId, selectedPackage } =
//     useSelectedPackage();

//   const [packageOpen, setPackageOpen] = useState(false);
//   const [paymentMode, setPaymentMode] = useState<"partial" | "full">("partial");

//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const selectedRef = useRef<HTMLButtonElement>(null);

//   const rentAmount = selectedPackage ? Number(selectedPackage.total_price) : 0;

//   const advancePercentage = selectedPackage?.partial_payment_percentage ?? null;
//   const canPayPartially = payAtPickupEnabled && advancePercentage !== null;
//   const effectiveMode = canPayPartially ? paymentMode : "full";

//   const advancePayment =
//     effectiveMode === "partial" && advancePercentage !== null
//       ? rentAmount * (advancePercentage / 100)
//       : rentAmount;
//   const remainingRent = rentAmount - advancePayment;

//   // Close on outside click / Escape
//   useEffect(() => {
//     if (!packageOpen) return;
//     function handleClick(e: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setPackageOpen(false);
//       }
//     }
//     function handleKey(e: KeyboardEvent) {
//       if (e.key === "Escape") setPackageOpen(false);
//     }
//     document.addEventListener("mousedown", handleClick);
//     document.addEventListener("keydown", handleKey);
//     return () => {
//       document.removeEventListener("mousedown", handleClick);
//       document.removeEventListener("keydown", handleKey);
//     };
//   }, [packageOpen]);

//   // Scroll selected item into view when opened
//   useEffect(() => {
//     if (packageOpen && selectedRef.current) {
//       const list = selectedRef.current.closest(".overflow-y-auto");
//       if (list) {
//         const itemTop = selectedRef.current.offsetTop;
//         list.scrollTop = itemTop - list.clientHeight / 2;
//       }
//     }
//   }, [packageOpen]);

//   function getPackageLabel(pkg: typeof selectedPackage) {
//     if (!pkg) return "";
//     return (
//       pkg.label ??
//       `${pkg.name} (₹ ${pkg.price_per_day.toLocaleString("en-IN")} per Day)`
//     );
//   }

//   function buildCheckoutUrl() {
//     const params = new URLSearchParams();
//     params.set("listing_id", String(vehicleId));
//     params.set("package_id", String(selectedPackageId));
//     if (pickup) params.set("pickup", pickup);
//     if (dropoff) params.set("dropoff", dropoff);
//     params.set("payment_mode", effectiveMode);
//     return `/checkout?${params.toString()}`;
//   }

//   return (
//     <div className="bg-white border-b border-gray-200 md:border-none pb-6">
//       {/* ── Unavailability banner ─────────────────────────────────── */}
//       {!isAvailable && (
//         <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
//           <svg
//             className="w-4 h-4 mt-0.5 shrink-0"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v4a1 1 0 11-2 0V9zm1-4a1 1 0 100 2 1 1 0 000-2z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <p>
//             {availabilityMessage ??
//               "This vehicle is not available for the selected dates and times."}{" "}
//             Please adjust your pickup and drop-off times using the Edit button
//             above.
//           </p>
//         </div>
//       )}

//       <h3 className="font-bold text-font-main-sub mb-4">Select a Package</h3>

//       {/* Package picker */}
//       <div className="relative mb-6" ref={dropdownRef}>
//         <button
//           type="button"
//           onClick={() => setPackageOpen((o) => !o)}
//           className={`w-full hover:cursor-pointer flex items-center justify-between bg-white border rounded-lg py-3 px-4 text-sm font-medium text-font-main-sub outline-none transition-colors
//             ${
//               packageOpen
//                 ? "border-yellow-400 ring-1 ring-yellow-400"
//                 : "border-gray-300 hover:border-gray-400"
//             }`}
//         >
//           <span className="truncate">
//             {selectedPackage
//               ? getPackageLabel(selectedPackage)
//               : "Select a package"}
//           </span>
//           <svg
//             className={`w-4 h-4 ml-2 shrink-0 text-gray-500 transition-transform ${packageOpen ? "rotate-180" : ""}`}
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//           </svg>
//         </button>

//         {packageOpen && (
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="absolute top-full left-0 z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-dropdown-in"
//           >
//             <div className="overflow-y-auto max-h-64 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
//               {packages.map((pkg) => {
//                 const isSelected = pkg.id === selectedPackageId;
//                 return (
//                   <button
//                     key={pkg.id}
//                     ref={isSelected ? selectedRef : undefined}
//                     type="button"
//                     onClick={() => {
//                       setSelectedPackageId(pkg.id);
//                       setPackageOpen(false);
//                     }}
//                     className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors hover:cursor-pointer
//                       ${
//                         isSelected
//                           ? "bg-brand-yellow text-black font-normal"
//                           : "text-gray-700 hover:bg-gray-50"
//                       }`}
//                   >
//                     <span className="text-left">{getPackageLabel(pkg)}</span>
//                     {isSelected && (
//                       <svg
//                         className="w-3.5 h-3.5 shrink-0 ml-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           d="M5 13l4 4L19 7"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2.5"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Partial payment toggle — only when backend says this package supports it */}
//       {canPayPartially && (
//         <div className="mb-6">
//           <h3 className="font-bold text-font-main-sub mb-3">Payment Option</h3>
//           <div className="grid grid-cols-2 gap-3">
//             <button
//               type="button"
//               onClick={() => setPaymentMode("partial")}
//               className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-colors hover:cursor-pointer
//                 ${
//                   paymentMode === "partial"
//                     ? "border-yellow-400 bg-yellow-50 text-font-main-sub"
//                     : "border-gray-300 text-font-main-sub hover:border-gray-400"
//                 }`}
//             >
//               Partial Payment
//               <span className="block text-xs text-font-dim">
//                 Pay {advancePercentage}% now
//               </span>
//             </button>
//             <button
//               type="button"
//               onClick={() => setPaymentMode("full")}
//               className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-colors hover:cursor-pointer
//                 ${
//                   paymentMode === "full"
//                     ? "border-yellow-400 bg-yellow-50 text-font-main-sub"
//                     : "border-gray-300 text-font-main-sub hover:border-gray-400"
//                 }`}
//             >
//               Pay Now
//               <span className="block text-xs text-font-dim">
//                 Pay full amount
//               </span>
//             </button>
//           </div>
//         </div>
//       )}

//       <h3 className="font-bold text-font-main-sub mb-4">Fare Details</h3>

//       <div className="space-y-3 text-sm text-font-main-sub mb-4">
//         <div className="flex justify-between">
//           <span>Rent Amount</span>
//           <span className="text-font-main-sub">₹ {rentAmount.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Total</span>
//           <span className="text-font-main-sub">₹ {rentAmount.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-font-main-sub">
//           <span>
//             Remaining Rent{" "}
//             <span className="text-xs">(To be paid at pickup)</span>
//           </span>
//           <span>₹ {remainingRent.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-font-main-sub">
//           <span>Advance Payment</span>
//           <span>₹ {advancePayment.toFixed(2)}</span>
//         </div>
//       </div>

//       <div className="border-t border-gray-200 my-4" />

//       <div className="flex justify-between items-center mb-6">
//         <span className="font-semibold text-font-main-sub">
//           Amount Payable Today
//         </span>
//         <span className="font-bold text-font-main-sub">
//           ₹ {advancePayment.toFixed(2)}
//         </span>
//       </div>

//       <div className="bg-green-50 text-green-700 text-xs font-medium px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
//         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//           <path
//             fillRule="evenodd"
//             d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//             clipRule="evenodd"
//           />
//         </svg>
//         Refundable Deposit - ₹{fareDetails.refundable_deposit.toFixed(0)} (To be
//         paid at pickup)
//       </div>

//       {/* ── Book Now — disabled when unavailable ─────────────────── */}
//       {isAvailable && selectedPackage ? (
//         <Link
//           href={buildCheckoutUrl()}
//           className="w-full inline-block text-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-xl transition duration-200"
//         >
//           Book Now
//         </Link>
//       ) : (
//         <button
//           disabled
//           className="w-full text-center bg-gray-200 text-gray-400 font-bold py-3 px-4 rounded-xl cursor-not-allowed"
//         >
//           {!isAvailable ? "Not Available" : "Book Now"}
//         </button>
//       )}

//       <div className="mt-4 text-center">
//         <a href="#" className="text-sm text-blue-600 hover:underline">
//           Cancellation Policy
//         </a>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import type { FareDetails } from "@/types/vehicleDetails.types";
import { useSelectedPackage } from "@/contexts/PackageSelectionContext";

interface Props {
  fareDetails: FareDetails;
  payAtPickupEnabled: boolean;
  pickup: string;
  dropoff: string;
  vehicleId: number;
  locationId: number;
  isAvailable?: boolean;
  availabilityMessage?: string | null;
}

export default function BookingWidget({
  fareDetails,
  payAtPickupEnabled,
  vehicleId,
  locationId,
  pickup,
  dropoff,
  isAvailable = true,
  availabilityMessage,
}: Props) {
  const { packages, selectedPackageId, setSelectedPackageId, selectedPackage } =
    useSelectedPackage();

  const [packageOpen, setPackageOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState<"partial" | "full">("partial");

  // Tracks whether the real "Book Now" button (below) is currently on screen.
  // The fixed mobile bar shows only when this is false.
  const [realButtonVisible, setRealButtonVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const bookNowAnchorRef = useRef<HTMLDivElement>(null);

  const rentAmount = selectedPackage ? Number(selectedPackage.total_price) : 0;

  const advancePercentage = selectedPackage?.partial_payment_percentage ?? null;
  const canPayPartially = payAtPickupEnabled && advancePercentage !== null;
  const effectiveMode = canPayPartially ? paymentMode : "full";

  const advancePayment =
    effectiveMode === "partial" && advancePercentage !== null
      ? rentAmount * (advancePercentage / 100)
      : rentAmount;
  const remainingRent = rentAmount - advancePayment;

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

  // Observe the real Book Now button — only relevant on small screens, but
  // cheap enough to just always run. When it's visible in the viewport, hide
  // the fixed mobile bar; when it scrolls out of view, show the bar again.
  useEffect(() => {
    const target = bookNowAnchorRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setRealButtonVisible(entry.isIntersecting);
      },
      {
        // small bottom margin so the bar doesn't flicker right at the edge
        rootMargin: "0px 0px -8px 0px",
        threshold: 0,
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  function getPackageLabel(pkg: typeof selectedPackage) {
    if (!pkg) return "";
    return (
      pkg.label ??
      `${pkg.name} (₹ ${pkg.price_per_day.toLocaleString("en-IN")} per Day)`
    );
  }

  function buildCheckoutUrl() {
    const params = new URLSearchParams();
    params.set("listing_id", String(vehicleId));
    params.set("package_id", String(selectedPackageId));
    if (pickup) params.set("pickup", pickup);
    if (dropoff) params.set("dropoff", dropoff);
    params.set("payment_mode", effectiveMode);
    return `/checkout?${params.toString()}`;
  }

  const showMobileBar = !realButtonVisible;

  return (
    <div className="bg-white border-b border-gray-200 md:border-none pb-6">
      {/* ── Unavailability banner ─────────────────────────────────── */}
      {!isAvailable && (
        <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          <svg
            className="w-4 h-4 mt-0.5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v4a1 1 0 11-2 0V9zm1-4a1 1 0 100 2 1 1 0 000-2z"
              clipRule="evenodd"
            />
          </svg>
          <p>
            {availabilityMessage ??
              "This vehicle is not available for the selected dates and times."}{" "}
            Please adjust your pickup and drop-off times using the Edit button
            above.
          </p>
        </div>
      )}

      <h3 className="font-bold text-font-main-sub mb-4">Select a Package</h3>

      {/* Package picker */}
      <div className="relative mb-6" ref={dropdownRef}>
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
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors hover:cursor-pointer
                      ${
                        isSelected
                          ? "bg-brand-yellow text-black font-normal"
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

      {/* Partial payment toggle — only when backend says this package supports it */}
      {canPayPartially && (
        <div className="mb-6">
          <h3 className="font-bold text-font-main-sub mb-3">Payment Option</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMode("partial")}
              className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-colors hover:cursor-pointer
                ${
                  paymentMode === "partial"
                    ? "border-yellow-400 bg-yellow-50 text-font-main-sub"
                    : "border-gray-300 text-font-main-sub hover:border-gray-400"
                }`}
            >
              Partial Payment
              <span className="block text-xs text-font-dim">
                Pay {advancePercentage}% now
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMode("full")}
              className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-colors hover:cursor-pointer
                ${
                  paymentMode === "full"
                    ? "border-yellow-400 bg-yellow-50 text-font-main-sub"
                    : "border-gray-300 text-font-main-sub hover:border-gray-400"
                }`}
            >
              Pay Now
              <span className="block text-xs text-font-dim">
                Pay full amount
              </span>
            </button>
          </div>
        </div>
      )}

      <h3 className="font-bold text-font-main-sub mb-4">Fare Details</h3>

      <div className="space-y-3 text-sm text-font-main-sub mb-4">
        <div className="flex justify-between">
          <span>Rent Amount</span>
          <span className="text-font-main-sub">₹ {rentAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total</span>
          <span className="text-font-main-sub">₹ {rentAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-font-main-sub">
          <span>
            Remaining Rent{" "}
            <span className="text-xs">(To be paid at pickup)</span>
          </span>
          <span>₹ {remainingRent.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-font-main-sub">
          <span>Advance Payment</span>
          <span>₹ {advancePayment.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4" />

      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold text-font-main-sub">
          Amount Payable Today
        </span>
        <span className="font-bold text-font-main-sub">
          ₹ {advancePayment.toFixed(2)}
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

      {/* ── Real Book Now — disabled when unavailable ────────────────
          Wrapped in a div with a ref so we can observe its visibility
          and toggle the fixed mobile bar accordingly. */}
      <div ref={bookNowAnchorRef}>
        {isAvailable && selectedPackage ? (
          <Link
            href={buildCheckoutUrl()}
            className="w-full inline-block text-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-xl transition duration-200"
          >
            Book Now
          </Link>
        ) : (
          <button
            disabled
            className="w-full text-center bg-gray-200 text-gray-400 font-bold py-3 px-4 rounded-xl cursor-not-allowed"
          >
            {!isAvailable ? "Not Available" : "Book Now"}
          </button>
        )}
      </div>

      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Cancellation Policy
        </a>
      </div>

      {/* ── Fixed mobile bottom bar ────────────────────────────────
          Shown only on small screens, only while the real Book Now
          button above is scrolled out of view. */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]
          px-4 py-3 flex items-center justify-between gap-4
          transition-transform duration-300 ease-in-out
          ${showMobileBar ? "translate-y-0" : "translate-y-full"}`}
        style={{
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        }}
        aria-hidden={!showMobileBar}
      >
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] text-font-dim">
            Amount Payable Today
          </span>
          <span className="font-bold text-font-main-sub text-base">
            ₹ {advancePayment.toFixed(2)}
          </span>
        </div>

        {isAvailable && selectedPackage ? (
          <Link
            href={buildCheckoutUrl()}
            className="shrink-0 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-xl transition duration-200 text-center"
            tabIndex={showMobileBar ? 0 : -1}
          >
            Book Now
          </Link>
        ) : (
          <button
            disabled
            tabIndex={-1}
            className="shrink-0 bg-gray-200 text-gray-400 font-bold py-3 px-6 rounded-xl cursor-not-allowed text-center"
          >
            {!isAvailable ? "Not Available" : "Book Now"}
          </button>
        )}
      </div>
    </div>
  );
}
