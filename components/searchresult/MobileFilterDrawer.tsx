

// "use client";

// import { useEffect } from "react";
// import { createPortal } from "react-dom";
// import FilterSidebar from "./FilterSidebar";
// import { FilterState, FilterOptions } from "@/hooks/useVehicleFilters";

// interface MobileFilterDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   mode: "filter" | "sort";
//   // sort
//   sortValue: string;
//   onSortChange: (value: string) => void;
//   // filter — forwarded straight to FilterSidebar
//   filters: FilterState;
//   options: FilterOptions;
//   onToggle: (key: keyof FilterState, value: string) => void;
//   onPriceMaxChange: (max: number) => void;
//   onClearAll: () => void;
// }

// export default function MobileFilterDrawer({
//   isOpen,
//   onClose,
//   mode,
//   sortValue,
//   onSortChange,
//   filters,
//   options,
//   onToggle,
//   onPriceMaxChange,
//   onClearAll,
// }: MobileFilterDrawerProps) {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const sortOptions = [
//     { value: "price_asc",  label: "Price: Low to High" },
//     { value: "price_desc", label: "Price: High to Low" },
//   ];

//   return createPortal(
//     <div className="fixed inset-0 z-50 flex items-end justify-center">
//       <div
//         className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
//         onClick={onClose}
//       />
//       <div className="relative z-10 w-full bg-white rounded-t-2xl max-h-[85dvh] flex flex-col shadow-2xl">
//         {/* Handle */}
//         <div className="flex justify-center pt-3 pb-1 shrink-0">
//           <div className="w-10 h-1 rounded-full bg-gray-300" />
//         </div>

//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
//           <h2 className="font-bold text-gray-900 text-base">
//             {mode === "filter" ? "Filter" : "Sort by"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 d="M6 18L18 6M6 6l12 12"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto overscroll-contain">
//           {mode === "filter" ? (
//             // Pass all filter state/handlers into the shared FilterSidebar
//             <FilterSidebar
//               filters={filters}
//               options={options}
//               onToggle={onToggle}
//               onPriceMaxChange={onPriceMaxChange}
//               onClearAll={onClearAll}
//             />
//           ) : (
//             <div className="py-2">
//               {sortOptions.map((opt) => (
//                 <button
//                   key={opt.value}
//                   onClick={() => {
//                     onSortChange(opt.value);
//                     onClose();
//                   }}
//                   className={`w-full flex items-center justify-between px-5 py-4 text-sm transition-colors cursor-pointer ${
//                     sortValue === opt.value
//                       ? "text-gray-900 font-semibold bg-[#fff8e1]"
//                       : "text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   <span>{opt.label}</span>
//                   {sortValue === opt.value && (
//                     <svg
//                       className="w-4 h-4 text-[#ffc107]"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         d="M5 13l4 4L19 7"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2.5"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer – filter mode only */}
//         {mode === "filter" && (
//           <div className="shrink-0 px-5 py-4 border-t border-gray-100">
//             <button
//               onClick={onClose}
//               className="w-full bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl text-sm transition-colors cursor-pointer"
//             >
//               Show Results
//             </button>
//           </div>
//         )}
//       </div>
//     </div>,
//     document.body
//   );
// }

"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import FilterSidebar from "./FilterSidebar";
import { FilterState, FilterOptions } from "@/hooks/useVehicleFilters";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "filter" | "sort";
  sortValue: string;
  onSortChange: (value: string) => void;
  filters: FilterState;
  options: FilterOptions;
  onToggle: (key: keyof FilterState, value: string) => void;
  onPriceMaxChange: (max: number) => void;
  onClearAll: () => void;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  mode,
  sortValue,
  onSortChange,
  filters,
  options,
  onToggle,
  onPriceMaxChange,
  onClearAll,
}: MobileFilterDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sortOptions = [
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 w-full bg-white h-dvh sm:h-auto sm:max-h-[85dvh] sm:rounded-t-2xl flex flex-col shadow-2xl">
        {/* Handle — hidden on mobile since it's full screen */}
        <div className="hidden sm:flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
          <h2 className="font-bold text-gray-900 text-base">
            {mode === "filter" ? "Filter" : "Sort by"}
          </h2>

          <div className="flex items-center gap-2">
          <button
          onClick={onClearAll}
          className="text-[#006CE4] text-xs hover:underline cursor-pointer"
        >
          Clear all filters
        </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {mode === "filter" ? (
            <FilterSidebar
              filters={filters}
              options={options}
              onToggle={onToggle}
              onPriceMaxChange={onPriceMaxChange}
              onClearAll={onClearAll}
            />
          ) : (
            <div className="py-2">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onSortChange(opt.value);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-5 py-4 text-sm transition-colors cursor-pointer ${
                    sortValue === opt.value
                      ? "text-gray-900 font-semibold bg-[#fff8e1]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortValue === opt.value && (
                    <svg
                      className="w-4 h-4 text-[#ffc107]"
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
              ))}
            </div>
          )}
        </div>

        {/* Footer – filter mode only */}
        {mode === "filter" && (
          <div className="shrink-0 px-5 py-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="w-full bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl text-sm transition-colors cursor-pointer"
            >
              Show Results
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}