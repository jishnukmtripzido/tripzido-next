// interface LoginBannerProps {
//   onLoginClick?: () => void;
// }

// export default function LoginBanner({ onLoginClick }: LoginBannerProps) {
//   return (
//     <div className="flex items-center justify-between gap-4 rounded-xl px-5 py-4 bg-brand-secondary">
//       <div className="flex items-center gap-4">
//         <div className="w-11 h-11 min-w-[44px] rounded-full bg-white/10 flex items-center justify-center text-xl">
//           🎁
//         </div>
//         <div>
//           <p className="m-0 text-[15px] font-bold text-white">
//             Log-in and get exclusive discounts!
//           </p>
//           <p className="m-0 text-[13px] text-white/70">
//             Log in and unlock all the exclusive offers and use wallet etc
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={onLoginClick}
//         className="shrink-0 bg-brand-yellow text-[#1a1a2e] font-bold text-[13px] tracking-wide px-5 py-2 rounded-full border-2 border-brand-yellow hover:bg-brand-yellow-lg hover:border-brand-yellow-lg transition-colors duration-200 cursor-pointer"
//       >
//         LOGIN NOW
//       </button>
//     </div>
//   );
// }

// interface LoginBannerProps {
//   onLoginClick?: () => void;
// }

// export default function LoginBanner({ onLoginClick }: LoginBannerProps) {
//   return (
//     <div className="flex items-center justify-between gap-4 rounded-xl px-5 py-4 bg-brand-yellow shadow-sm">
//       <div className="flex items-center gap-4">
//         <div className="w-11 h-11 min-w-[44px] rounded-full bg-white/40 flex items-center justify-center text-xl">
//           🎁
//         </div>
//         <div>
//           <p className="m-0 text-[15px] font-bold text-[#1a1a2e]">
//             Log-in and get exclusive discounts!
//           </p>
//           <p className="m-0 text-[13px] text-[#1a1a2e]/80 font-medium">
//             Log in and unlock all the exclusive offers and use wallet etc
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={onLoginClick}
//         className="shrink-0 bg-[#1a1a2e] text-white font-bold text-[13px] tracking-wide px-5 py-2 rounded-full border-2 border-[#1a1a2e] hover:bg-gray-800 hover:border-gray-800 transition-colors duration-200 cursor-pointer"
//       >
//         LOGIN NOW
//       </button>
//     </div>
//   );
// }

// interface LoginBannerProps {
//   onLoginClick?: () => void;
// }

// export default function LoginBanner({ onLoginClick }: LoginBannerProps) {
//   return (
//     <div className="flex items-center justify-between gap-4 rounded-xl px-5 py-4 bg-brand-yellow shadow-sm">
//       <div className="flex items-center gap-4">
//         {/* Replaced the emoji container with an Image */}
//         <div className="w-14 h-14 shrink-0 overflow-hidden">
//           <img
//             src="/bike.jpg" // Replace with your actual travel/bike asset
//             alt="Unlock Offers"
//             className="w-full h-full object-contain rounded-md"
//           />
//         </div>
//         <div>
//           <p className="m-0 text-[15px] font-bold text-[#1a1a2e]">
//             Log-in and get exclusive discounts!
//           </p>
//           <p className="m-0 text-[13px] text-[#1a1a2e]/80 font-medium">
//             Log in and unlock all the exclusive offers and use wallet etc
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={onLoginClick}
//         className="shrink-0 bg-[#1a1a2e] text-white font-bold text-[13px] tracking-wide px-5 py-2 rounded-full border-2 border-[#1a1a2e] hover:bg-gray-800 hover:border-gray-800 transition-colors duration-200 cursor-pointer"
//       >
//         LOGIN NOW
//       </button>
//     </div>
//   );
// }

interface LoginBannerProps {
  onLoginClick?: () => void;
}

export default function LoginBanner({ onLoginClick }: LoginBannerProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl px-5 py-4 bg-brand-secondary border border-teal-600/40 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 shrink-0 overflow-hidden flex items-center justify-center">
          <img
            src="/bike.jpg"
            alt="Unlock Offers"
            className="w-10 h-10 object-contain"
          />
        </div>
        <div>
          <p className="m-0 text-[15px] font-bold text-white">
            Log-in and get exclusive discounts!
          </p>
          <p className="m-0 text-[13px] text-white/70 font-medium">
            Log in and unlock all the exclusive offers and use wallet etc
          </p>
        </div>
      </div>

      <button
        onClick={onLoginClick}
        className="shrink-0 bg-brand-yellow text-[#133e45] font-bold text-[13px] tracking-wide px-5 py-2 rounded-full hover:brightness-105 transition-all duration-200 cursor-pointer"
      >
        LOGIN NOW
      </button>
    </div>
  );
}
