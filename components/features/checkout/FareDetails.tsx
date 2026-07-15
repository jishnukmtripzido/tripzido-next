// // "use client";
// // import { useState } from "react";

// // interface Props {
// //   rentAmount: number;
// //   remainingRent: number;
// //   advancePayment: number;
// //   refundableDeposit: number;
// //   onPayNow: () => void;
// //   isPaying: boolean;
// //   payError: string | null;
// // }

// // type PaymentIcon = {
// //   name: string;
// //   src: string;
// // };

// // const UPI_APPS: PaymentIcon[] = [
// //   { name: "UPI", src: "/payment-icons/upi.svg" },
// //   { name: "Google Pay", src: "/payment-icons/gpay.svg" },
// //   { name: "PhonePe", src: "/payment-icons/phonepe.svg" },
// //   { name: "Paytm", src: "/payment-icons/paytm.svg" },
// // ];

// // const CARD_NETWORKS: PaymentIcon[] = [
// //   { name: "PayPal", src: "/payment-icons/paypal.svg" },
// //   { name: "Visa", src: "/payment-icons/visa.svg" },
// //   { name: "Mastercard", src: "/payment-icons/mastercard.svg" },
// //   { name: "RuPay", src: "/payment-icons/rupay.svg" },
// // ];

// // function PaymentChip({ name, src }: PaymentIcon) {
// //   return (
// //     <div
// //       title={name}
// //       className="h-8 min-w-[44px] px-2.5 flex items-center justify-center rounded-md border border-gray-200 bg-white"
// //     >
// //       {/* eslint-disable-next-line @next/next/no-img-element */}
// //       <img
// //         src={src}
// //         alt={name}
// //         className="h-4 w-auto object-contain"
// //         loading="lazy"
// //       />
// //     </div>
// //   );
// // }

// // export default function FareDetails({
// //   rentAmount,
// //   remainingRent,
// //   advancePayment,
// //   refundableDeposit,
// //   onPayNow,
// //   isPaying,
// //   payError,
// // }: Props) {
// //   const [acceptedTerms, setAcceptedTerms] = useState(false);

// //   return (
// //     <div className="bg-gray-50 md:bg-white border md:border-gray-200 rounded-md p-6 shadow-none">
// //       <h3 className="text-lg font-bold text-gray-900 mb-4">Fare Details</h3>

// //       <div className="space-y-4 text-sm mb-6">
// //         <div className="flex justify-between items-center text-font-main-sub">
// //           <div className="flex items-center gap-2">
// //             <span className="w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center text-gray-500">
// //               <span className="text-[10px]">+</span>
// //             </span>
// //             <span>Rent Amount</span>
// //           </div>
// //           <span>₹ {rentAmount.toFixed(2)}</span>
// //         </div>

// //         <div className="border-t border-gray-200 pt-4">
// //           <div className="flex justify-between items-center font-medium text-font-main-sub mb-3">
// //             <span>Total</span>
// //             <span>₹ {rentAmount.toFixed(2)}</span>
// //           </div>

// //           <div className="flex justify-between items-center text-font-main-sub pl-6 mb-2">
// //             <span>
// //               Rent Remaining{" "}
// //               <span className="text-xs ml-1">
// //                 (To be paid at the time of Pickup)
// //               </span>
// //             </span>
// //             <span>₹ {remainingRent.toFixed(2)}</span>
// //           </div>

// //           <div className="flex justify-between items-center text-font-main-sub pl-6">
// //             <span>Advance Payment</span>
// //             <span>₹ {advancePayment.toFixed(2)}</span>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="border-t border-gray-200 pt-4 mb-6">
// //         <div className="flex justify-between items-center text-base font-bold text-font-main-sub mb-2">
// //           <span>Total Payable Amount</span>
// //           <span>₹ {advancePayment.toFixed(2)}</span>
// //         </div>

// //         <div className="flex justify-between items-start text-sm text-font-main-sub mt-4">
// //           <div className="flex flex-col">
// //             <span>Refundable Deposit</span>
// //             <span className="text-xs">(To be paid at the time of pickup)</span>
// //           </div>
// //           <span>₹ {refundableDeposit.toFixed(2)}</span>
// //         </div>
// //       </div>

// //       <label className="flex items-start gap-3 mb-6 cursor-pointer group">
// //         <div className="mt-0.5">
// //           <input
// //             type="checkbox"
// //             className="w-5 h-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400 cursor-pointer"
// //             checked={acceptedTerms}
// //             onChange={(e) => setAcceptedTerms(e.target.checked)}
// //           />
// //         </div>
// //         <span className="text-sm text-gray-600 group-hover:text-font-main-sub transition">
// //           I have read the terms and conditions
// //         </span>
// //       </label>

// //       {payError && <p className="text-sm text-red-500 mb-4">{payError}</p>}

// //       <button
// //         onClick={onPayNow}
// //         disabled={!acceptedTerms || isPaying}
// //         className={`w-full py-3.5 px-4 rounded-xl font-bold text-center transition duration-200 ${
// //           acceptedTerms && !isPaying
// //             ? "bg-yellow-400 hover:bg-yellow-500 text-black shadow-md"
// //             : "bg-gray-200 text-gray-400 cursor-not-allowed"
// //         }`}
// //       >
// //         {isPaying ? "Redirecting to payment..." : "Pay Now"}
// //       </button>

// //       {/* Trust bar — accepted payment methods */}
// //       <div className="mt-6 pt-5 border-t border-gray-100">
// //         <p className="text-[11px] font-medium text-gray-400 text-center mb-3">
// //           100% secure payments
// //         </p>
// //         <div className="flex flex-wrap items-center justify-center gap-2">
// //           {UPI_APPS.map((m) => (
// //             <PaymentChip key={m.name} {...m} />
// //           ))}
// //           <div className="w-px h-6 bg-gray-200 mx-1" />
// //           {CARD_NETWORKS.map((m) => (
// //             <PaymentChip key={m.name} {...m} />
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// interface Props {
//   rentAmount: number;
//   remainingRent: number;
//   advancePayment: number;
//   refundableDeposit: number;
//   onProceedToPay: () => void;
//   isPaying: boolean;
//   payError: string | null;
// }

// type PaymentIcon = {
//   name: string;
//   src: string;
// };

// const UPI_APPS: PaymentIcon[] = [
//   { name: "UPI", src: "/payment-icons/upi.svg" },
//   { name: "Google Pay", src: "/payment-icons/gpay.svg" },
//   { name: "PhonePe", src: "/payment-icons/phonepe.svg" },
//   { name: "Paytm", src: "/payment-icons/paytm.svg" },
// ];

// const CARD_NETWORKS: PaymentIcon[] = [
//   { name: "PayPal", src: "/payment-icons/paypal.svg" },
//   { name: "Visa", src: "/payment-icons/visa.svg" },
//   { name: "Mastercard", src: "/payment-icons/mastercard.svg" },
//   { name: "RuPay", src: "/payment-icons/rupay.svg" },
// ];

// function PaymentChip({ name, src }: PaymentIcon) {
//   return (
//     <div
//       title={name}
//       className="h-8 min-w-[44px] px-2.5 flex items-center justify-center rounded-md border border-gray-200 bg-white"
//     >
//       {/* eslint-disable-next-line @next/next/no-img-element */}
//       <img
//         src={src}
//         alt={name}
//         className="h-4 w-auto object-contain"
//         loading="lazy"
//       />
//     </div>
//   );
// }

// export default function FareDetails({
//   rentAmount,
//   remainingRent,
//   advancePayment,
//   refundableDeposit,
//   onProceedToPay,
//   isPaying,
//   payError,
// }: Props) {
//   return (
//     <div className="bg-gray-50 md:bg-white border md:border-gray-200 rounded-md p-6 shadow-none">
//       <h3 className="text-lg font-bold text-gray-900 mb-4">Fare Details</h3>

//       <div className="space-y-4 text-sm mb-6">
//         <div className="flex justify-between items-center text-font-main-sub">
//           <div className="flex items-center gap-2">
//             <span className="w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center text-gray-500">
//               <span className="text-[10px]">+</span>
//             </span>
//             <span>Rent Amount</span>
//           </div>
//           <span>₹ {rentAmount.toFixed(2)}</span>
//         </div>

//         <div className="border-t border-gray-200 pt-4">
//           <div className="flex justify-between items-center font-medium text-font-main-sub mb-3">
//             <span>Total</span>
//             <span>₹ {rentAmount.toFixed(2)}</span>
//           </div>

//           <div className="flex justify-between items-center text-font-main-sub pl-6 mb-2">
//             <span>
//               Rent Remaining{" "}
//               <span className="text-xs ml-1">
//                 (To be paid at the time of Pickup)
//               </span>
//             </span>
//             <span>₹ {remainingRent.toFixed(2)}</span>
//           </div>

//           <div className="flex justify-between items-center text-font-main-sub pl-6">
//             <span>Advance Payment</span>
//             <span>₹ {advancePayment.toFixed(2)}</span>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-200 pt-4 mb-6">
//         <div className="flex justify-between items-center text-base font-bold text-font-main-sub mb-2">
//           <span>Total Payable Amount</span>
//           <span>₹ {advancePayment.toFixed(2)}</span>
//         </div>

//         <div className="flex justify-between items-start text-sm text-font-main-sub mt-4">
//           <div className="flex flex-col">
//             <span>Refundable Deposit</span>
//             <span className="text-xs">(To be paid at the time of pickup)</span>
//           </div>
//           <span>₹ {refundableDeposit.toFixed(2)}</span>
//         </div>
//       </div>

//       {payError && <p className="text-sm text-red-500 mb-4">{payError}</p>}

//       <button
//         onClick={onProceedToPay}
//         disabled={isPaying}
//         className={`w-full py-3.5 px-4 hover:cursor-pointer rounded-xl font-bold text-center transition duration-200 ${
//           !isPaying
//             ? "bg-yellow-400 hover:bg-yellow-500 text-black shadow-md"
//             : "bg-gray-200 text-gray-400 cursor-not-allowed"
//         }`}
//       >
//         {isPaying ? "Redirecting to payment..." : "Pay Now"}
//       </button>

//       {/* Trust bar — accepted payment methods */}
//       <div className="mt-6 pt-5 border-t border-gray-100">
//         <p className="text-[11px] font-medium text-gray-400 text-center mb-3">
//           100% secure payments
//         </p>
//         <div className="flex flex-wrap items-center justify-center gap-2">
//           {UPI_APPS.map((m) => (
//             <PaymentChip key={m.name} {...m} />
//           ))}
//           <div className="w-px h-6 bg-gray-200 mx-1" />
//           {CARD_NETWORKS.map((m) => (
//             <PaymentChip key={m.name} {...m} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

interface Props {
  rentAmount: number;
  remainingRent: number;
  advancePayment: number;
  refundableDeposit: number;
  onProceedToPay: () => void;
  isPaying: boolean;
  payError: string | null;
}

type PaymentIcon = {
  name: string;
  src: string;
};

const UPI_APPS: PaymentIcon[] = [
  { name: "UPI", src: "/payment-icons/upi.svg" },
  { name: "Google Pay", src: "/payment-icons/gpay.svg" },
  { name: "PhonePe", src: "/payment-icons/phonepe.svg" },
  { name: "Paytm", src: "/payment-icons/paytm.svg" },
];

const CARD_NETWORKS: PaymentIcon[] = [
  { name: "PayPal", src: "/payment-icons/paypal.svg" },
  { name: "Visa", src: "/payment-icons/visa.svg" },
  { name: "Mastercard", src: "/payment-icons/mastercard.svg" },
  { name: "RuPay", src: "/payment-icons/rupay.svg" },
];

function PaymentChip({ name, src }: PaymentIcon) {
  return (
    <div
      title={name}
      className="h-7 min-w-[38px] px-2 flex items-center justify-center rounded bg-white border border-gray-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="h-3.5 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
        loading="lazy"
      />
    </div>
  );
}

export default function FareDetails({
  rentAmount,
  remainingRent,
  advancePayment,
  refundableDeposit,
  onProceedToPay,
  isPaying,
  payError,
}: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-6">
        Fare Details
      </h3>

      <div className="space-y-4 text-sm mb-6">
        {/* Base Rent */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Rent Amount</span>
          <span className="font-semibold text-gray-900">
            ₹ {rentAmount.toFixed(2)}
          </span>
        </div>

        {/* Breakdowns */}
        <div className="pt-4 border-t border-dashed border-gray-200 space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-gray-600 font-medium">Rent Remaining</span>
              <span className="text-[11px] text-gray-400 mt-0.5">
                Pay at time of pickup
              </span>
            </div>
            <span className="font-semibold text-gray-900">
              ₹ {remainingRent.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-600 font-medium">Advance Payment</span>
            <span className="font-semibold text-gray-900">
              ₹ {advancePayment.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-start pt-2">
            <div className="flex flex-col">
              <span className="text-gray-600 font-medium">
                Refundable Deposit
              </span>
              <span className="text-[11px] text-gray-400 mt-0.5">
                Pay at time of pickup
              </span>
            </div>
            <span className="font-semibold text-gray-900">
              ₹ {refundableDeposit.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Highlighted Total Block */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-base font-bold text-gray-900">
            Total Payable
          </span>
          <span className="text-xl font-extrabold text-gray-900">
            ₹ {advancePayment.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Only the advance payment is due right now.
        </p>
      </div>

      {payError && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
          {payError}
        </div>
      )}

      <button
        onClick={onProceedToPay}
        disabled={isPaying}
        className={`relative w-full py-4 px-4 rounded-xl font-bold text-[15px] text-center transition-all duration-200 overflow-hidden ${
          !isPaying
            ? "bg-yellow-400 hover:bg-yellow-500 text-black shadow-sm hover:shadow active:scale-[0.98]"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isPaying ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Redirecting...
          </span>
        ) : (
          "Proceed to Pay"
        )}
      </button>

      {/* Refined Trust Bar */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg
            className="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            100% Secure Checkout
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {UPI_APPS.map((m) => (
            <PaymentChip key={m.name} {...m} />
          ))}
          <div className="w-px h-5 bg-gray-200 mx-1" />
          {CARD_NETWORKS.map((m) => (
            <PaymentChip key={m.name} {...m} />
          ))}
        </div>
      </div>
    </div>
  );
}
