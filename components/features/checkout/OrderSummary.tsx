// import { useState } from "react";
// import Image from "next/image";
// import {
//   formatTimeFromISO,
//   formatDayNumber,
//   formatMonthYear,
// } from "@/lib/dateUtils";
// import type { CheckoutSummary } from "@/services/checkout.service";

// interface Props {
//   summary: CheckoutSummary;
//   quantity: number;
//   maxQuantity: number;
//   rentAmount: number;
//   refundableDeposit: number;
//   onIncrement: () => void;
//   onDecrement: () => void;
// }

// export default function OrderSummary({
//   summary,
//   quantity,
//   maxQuantity,
//   rentAmount,
//   refundableDeposit,
//   onIncrement,
//   onDecrement,
// }: Props) {
//   const { things_to_remember: ttr } = summary;
//   const [imgSrc, setImgSrc] = useState<string | null>(
//     summary.primary_image ?? null,
//   );

//   return (
//     <div className="bg-white border border-gray-200 rounded-md p-6 shadow-none">
//       {/* Vehicle Info */}
//       <div>
//         <h1 className="text-lg font-bold text-gray-900 mb-4">Summary</h1>
//         <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b border-gray-100">
//           <div className="relative w-full md:w-48 shrink-0 bg-gray-50 rounded-xl p-4 flex items-center justify-center min-h-[120px]">
//             {imgSrc ? (
//               <Image
//                 src={imgSrc}
//                 alt={summary.vehicle_name}
//                 fill
//                 sizes="(max-width: 768px) 100vw, 192px"
//                 quality={75}
//                 className="object-contain mix-blend-multiply p-4"
//                 onError={() => setImgSrc(null)}
//               />
//             ) : (
//               <div className="w-full h-24 flex items-center justify-center text-gray-400 text-sm">
//                 No image
//               </div>
//             )}
//           </div>

//           <div className="flex-grow w-full">
//             <h2 className="text-xl font-bold text-font-main-sub">
//               {summary.vehicle_name}
//             </h2>
//             <p className="text-sm text-font-main-sub mt-1">
//               {summary.package_name} Package
//             </p>
//             <div className="mt-2 space-y-1 text-sm text-font-main-sub">
//               <p>
//                 Rent Amount :{" "}
//                 <span className="font-semibold text-gray-900">
//                   ₹ {rentAmount.toFixed(2)}
//                 </span>
//               </p>
//               <p>
//                 Refundable Deposit :{" "}
//                 <span className="font-semibold text-gray-900">
//                   ₹ {refundableDeposit.toFixed(2)}
//                 </span>
//               </p>
//             </div>

//             {/* Quantity Stepper */}
//             <div className="mt-4 flex items-center border border-gray-300 rounded-lg w-max overflow-hidden">
//               <button
//                 onClick={onDecrement}
//                 disabled={quantity <= 1}
//                 className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
//               >
//                 -
//               </button>
//               <div className="px-4 py-1.5 font-medium border-x border-gray-300">
//                 {quantity}
//               </div>
//               <button
//                 onClick={onIncrement}
//                 disabled={quantity >= maxQuantity}
//                 className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
//               >
//                 +
//               </button>
//             </div>
//             {maxQuantity > 1 && (
//               <p className="text-xs text-font-dim mt-1.5">
//                 {maxQuantity} available at this location
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Date Timeline */}
//       <div className="py-6 border-b border-gray-100">
//         <h3 className="text-sm font-semibold text-green-600 mb-4">
//           Pickup and Drop Date
//         </h3>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <span className="text-4xl font-bold text-font-main-sub">
//               {formatDayNumber(summary.pickup_datetime)}
//             </span>
//             <div className="flex flex-col">
//               <span className="text-sm font-medium text-font-main-sub">
//                 {formatMonthYear(summary.pickup_datetime)}
//               </span>
//               <span className="text-sm font-bold text-font-main-sub">
//                 {formatTimeFromISO(summary.pickup_datetime)}
//               </span>
//             </div>
//           </div>

//           <div className="flex-grow mx-8 items-center justify-center relative hidden md:flex">
//             <div className="w-full border-t border-dashed border-gray-300"></div>
//             <span className="absolute bg-white px-2 text-xs font-medium text-font-main-sub">
//               {summary.duration_label}
//             </span>
//           </div>

//           <div className="flex items-center gap-3 text-right">
//             <div className="flex flex-col items-end">
//               <span className="text-sm font-medium text-font-main-sub">
//                 {formatMonthYear(summary.dropoff_datetime)}
//               </span>
//               <span className="text-sm font-bold text-font-main-sub">
//                 {formatTimeFromISO(summary.dropoff_datetime)}
//               </span>
//             </div>
//             <span className="text-4xl font-bold text-font-main-sub">
//               {formatDayNumber(summary.dropoff_datetime)}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Location */}
//       <div className="py-6 border-b border-gray-100">
//         <h3 className="text-sm font-semibold text-green-600 mb-3">
//           Pickup and Drop Location
//         </h3>
//         <div className="flex items-center gap-2 text-font-main-sub font-medium">
//           <svg
//             className="w-5 h-5 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//             ></path>
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//             ></path>
//           </svg>
//           {summary.pickup_location_name}
//         </div>
//       </div>

//       {/* Things to Remember */}
//       <div className="pt-6">
//         <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
//           <h3 className="text-sm font-bold text-gray-900 mb-4">
//             Things to remember
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
//             <div className="flex justify-between items-center border-b md:border-none border-gray-200 pb-2 md:pb-0">
//               <span className="text-font-main-sub">Kilometer Limit</span>
//               <span className="font-medium text-font-main-sub">
//                 {ttr.km_limit}
//               </span>
//             </div>
//             <div className="flex justify-between items-center border-b md:border-none border-gray-200 pb-2 md:pb-0">
//               <span className="text-font-main-sub">
//                 Excess Kilometer Charges
//               </span>
//               <span className="font-medium text-font-main-sub">
//                 {ttr.excess_charge}
//               </span>
//             </div>
//             <div className="flex justify-between items-center border-b md:border-none border-gray-200 pb-2 md:pb-0">
//               <span className="text-font-main-sub">Location Timings</span>
//               <span className="font-medium text-font-main-sub">
//                 {ttr.location_timings}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-font-main-sub">Late Drop Fee</span>
//               <span className="font-medium text-font-main-sub">
//                 ₹ {ttr.late_penalty_per_hour}/hr
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import Image from "next/image";
import {
  formatTimeFromISO,
  formatDayNumber,
  formatMonthYear,
} from "@/lib/dateUtils";
import type { CheckoutSummary } from "@/services/checkout.service";

interface Props {
  summary: CheckoutSummary;
  quantity: number;
  maxQuantity: number;
  rentAmount: number;
  refundableDeposit: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function OrderSummary({
  summary,
  quantity,
  maxQuantity,
  rentAmount,
  refundableDeposit,
  onIncrement,
  onDecrement,
}: Props) {
  const { things_to_remember: ttr } = summary;
  const [imgSrc, setImgSrc] = useState<string | null>(
    summary.primary_image ?? null,
  );

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-6">
        Booking Summary
      </h2>

      {/* Vehicle Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-8 border-b border-gray-100">
        <div className="relative w-full md:w-56 shrink-0 bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-center min-h-[140px]">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={summary.vehicle_name}
              fill
              sizes="(max-width: 768px) 100vw, 224px"
              quality={85}
              className="object-contain mix-blend-multiply p-4"
              onError={() => setImgSrc(null)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
              No image available
            </div>
          )}
        </div>

        <div className="flex-grow w-full flex flex-col justify-center">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 leading-none">
                {summary.vehicle_name}
              </h3>
              <span className="inline-block mt-2 px-2.5 py-1 bg-yellow-50 text-yellow-800 text-xs font-semibold rounded-md">
                {summary.package_name} Package
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-0.5">Rent Amount</p>
              <p className="font-semibold text-gray-900">
                ₹ {rentAmount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">Refundable Deposit</p>
              <p className="font-semibold text-gray-900">
                ₹ {refundableDeposit.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden h-10 w-max">
              <button
                onClick={onDecrement}
                disabled={quantity <= 1}
                className="w-10 h-full flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <div className="w-12 h-full flex items-center justify-center font-semibold text-gray-900 border-x border-gray-200 bg-white">
                {quantity}
              </div>
              <button
                onClick={onIncrement}
                disabled={quantity >= maxQuantity}
                className="w-10 h-full flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            {maxQuantity > 1 && (
              <span className="text-xs text-gray-500 font-medium">
                {maxQuantity} available at this location
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modernized Date Timeline */}
      <div className="py-8 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900 mb-5 uppercase tracking-wide">
          Trip Schedule
        </h3>

        <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-0 bg-slate-50 border border-slate-100 rounded-xl p-5 md:p-6">
          {/* Pickup */}
          <div className="flex-1 flex items-center gap-4 w-full">
            <div className="w-14 h-14 bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center shadow-sm shrink-0">
              <span className="text-xs font-semibold text-gray-500">
                {formatMonthYear(summary.pickup_datetime).split(" ")[0]}
              </span>
              <span className="text-xl font-bold text-gray-900 leading-none">
                {formatDayNumber(summary.pickup_datetime)}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                Pickup
              </p>
              <p className="font-bold text-gray-900">
                {formatTimeFromISO(summary.pickup_datetime)}
              </p>
            </div>
          </div>

          {/* Connector */}
          <div className="flex-1 flex flex-col items-center justify-center relative w-full md:w-auto my-2 md:my-0">
            <div className="hidden md:block w-full border-t-2 border-dashed border-gray-300 absolute top-1/2 -translate-y-1/2 z-0"></div>
            <div className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-bold text-gray-700 shadow-sm z-10 whitespace-nowrap">
              {summary.duration_label}
            </div>
          </div>

          {/* Dropoff */}
          <div className="flex-1 flex items-center justify-end gap-4 w-full md:text-right">
            <div className="md:order-2 w-14 h-14 bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center shadow-sm shrink-0">
              <span className="text-xs font-semibold text-gray-500">
                {formatMonthYear(summary.dropoff_datetime).split(" ")[0]}
              </span>
              <span className="text-xl font-bold text-gray-900 leading-none">
                {formatDayNumber(summary.dropoff_datetime)}
              </span>
            </div>
            <div className="md:order-1 flex-1 md:flex-none">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                Dropoff
              </p>
              <p className="font-bold text-gray-900">
                {formatTimeFromISO(summary.dropoff_datetime)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="py-8 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
          Location
        </h3>
        <div className="flex items-start gap-3 bg-white">
          <div className="mt-0.5 w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-base">
              {summary.pickup_location_name}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              Vehicle needs to be picked up and dropped off here.
            </p>
          </div>
        </div>
      </div>

      {/* Things to Remember */}
      <div className="pt-8">
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
          Things to remember
        </h3>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12 text-sm">
            <div className="flex justify-between items-center border-b border-gray-200 md:border-none pb-3 md:pb-0">
              <span className="text-gray-500">Kilometer Limit</span>
              <span className="font-bold text-gray-900">{ttr.km_limit}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 md:border-none pb-3 md:pb-0">
              <span className="text-gray-500">Excess Km Charges</span>
              <span className="font-bold text-gray-900">
                {ttr.excess_charge}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 md:border-none pb-3 md:pb-0">
              <span className="text-gray-500">Location Timings</span>
              <span className="font-bold text-gray-900">
                {ttr.location_timings}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Late Drop Fee</span>
              <span className="font-bold text-red-600">
                ₹ {ttr.late_penalty_per_hour}/hr
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
