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
      className="h-6 min-w-[36px] px-1 flex items-center justify-center bg-transparent"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="h-4 w-auto object-contain"
        loading="lazy"
      />
    </div>
  );
}

export default function FareDetails({
  rentAmount,
  remainingRent,
  advancePayment,
  onProceedToPay,
  isPaying,
  payError,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Dark Theme Card Section */}
      <div className="bg-black rounded-2xl p-6 shadow-lg text-white">
        <h3 className="text-lg font-bold mb-6">Fare Details</h3>

        <div className="space-y-4 text-sm mb-6">
          <div className="flex justify-between items-center text-gray-300">
            <span>Rent Amount:</span>
            <span className="text-white">₹ {rentAmount.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <div className="flex justify-between items-center font-bold text-base mb-4 text-white">
              <span>Total:</span>
              <span>₹ {rentAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-start text-gray-400 mb-3">
              <div className="flex flex-col gap-1">
                <span>Rent Remaining</span>
                <span className="text-[11px] text-gray-400">
                  (To be paid at the time of Pickup)
                </span>
              </div>
              <span className="text-white mt-0.5">
                ₹ {remainingRent.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center text-gray-400">
              <span>Advance Payment:</span>
              <span className="text-white">₹ {advancePayment.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-5 mb-6">
          <div className="flex flex-col gap-1 mb-6">
            <span className="text-[15px] text-gray-300">
              Total Payable Amount:
            </span>
            <span className="text-3xl font-bold text-white">
              ₹ {advancePayment.toFixed(2)}
            </span>
          </div>

          {payError && <p className="text-sm text-red-500 mb-4">{payError}</p>}

          <button
            onClick={onProceedToPay}
            disabled={isPaying}
            className={`w-full py-3.5 px-4 hover:cursor-pointer rounded-xl font-bold text-lg text-center transition duration-200 ${
              !isPaying
                ? "bg-[#FFC700] hover:bg-yellow-500 text-black"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isPaying ? "Processing..." : "Secure Checkout"}
          </button>
        </div>
      </div>

      {/* Trust bar — accepted payment methods (outside the black card) */}
      <div className="pt-2 text-center">
        <p className="text-sm font-medium text-gray-800 mb-3">
          100% secure payments
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {UPI_APPS.map((m) => (
            <PaymentChip key={m.name} {...m} />
          ))}
          {CARD_NETWORKS.map((m) => (
            <PaymentChip key={m.name} {...m} />
          ))}
        </div>
      </div>
    </div>
  );
}
