// "use client";

// import { useState } from "react";
// import Link from "next/link";

// interface BikeCardProps {
//   id: number;
//   name: string;
//   specs: string;
//   rating: number;
//   reviewCount: number;
//   price: number;
//   imageUrl: string;
//   badge?: { text: string; color: "yellow" | "green" | "blue" };
//   extras: string[];
// }

// function StarRating({ rating }: { rating: number }) {
//   const starPath =
//     "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

//   return (
//     <div className="flex">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <svg
//           key={star}
//           className={`w-3 h-3 ${star <= Math.round(rating) ? "text-[#ffc107]" : "text-gray-300"}`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d={starPath} />
//         </svg>
//       ))}
//     </div>
//   );
// }

// export default function BikeCard({
//   id,
//   name,
//   specs,
//   rating,
//   reviewCount,
//   price,
//   imageUrl,
//   badge,
//   extras,
// }: BikeCardProps) {
//   const [wishlisted, setWishlisted] = useState(false);

//   const badgeClasses = {
//     yellow: "bg-[#ffc107] text-gray-800",
//     green: "bg-green-500 text-white",
//     blue: "bg-blue-500 text-white",
//   };

//   return (
//     <div className="bg-white  border border-gray-300 rounded-xl overflow-hidden flex flex-col ">
//       {/* Image */}
//       <div className="relative h-44 sm:h-40 flex items-center justify-center ">
//         <img
//           src={imageUrl}
//           alt={name}
//           className="h-full w-full object-contain p-6"
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
//           }}
//         />
//         {badge && (
//           <span
//             className={`absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeClasses[badge.color]}`}
//           >
//             {badge.text}
//           </span>
//         )}
//         <button
//           onClick={() => setWishlisted((w) => !w)}
//           className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-colors hover:cursor-pointer"
//           aria-label="Add to wishlist"
//         >
//           <svg
//             className={`w-4 h-4 transition-colors ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
//             fill={wishlisted ? "currentColor" : "none"}
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Details */}
//       <div className="p-3 flex flex-col flex-1">
//         <h3 className="font-medium text-black text-[15px] leading-snug">{name}</h3>
//         <p className="text-[11px] text-gray-500 mt-0.5 mb-2">{specs}</p>

//         {/* Rating */}
//         <div className="flex items-center gap-1 mb-2">
//           <StarRating rating={rating} />
//           <span className="text-[11px] font-semibold text-gray-700">{rating.toFixed(1)}</span>
//           <span className="text-[11px] text-gray-400">({reviewCount})</span>
//         </div>

//         {/* Extras */}
//         <div className="flex flex-wrap gap-1 mb-3">
//           {extras.map((extra) => (
//             <span
//               key={extra}
//               className="text-[10px] bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 font-medium"
//             >
//               {extra}
//             </span>
//           ))}
//         </div>

//         {/* Price + CTA */}
//         <div className="mt-auto pt-3 border-t border-gray-100 flex items-end justify-between">
//           <div>
//             <div className="text-[10px] text-gray-500">Starting from</div>
//             <div className="flex items-baseline gap-0.5">
//               <span className="text-lg font-medium text-black">₹{price.toLocaleString("en-IN")}</span>
//               <span className="text-[10px] text-gray-500">/day</span>
//             </div>
//           </div>
//           <Link href="/vehicledetails">
//             <button className="bg-[#ffc107] hover:bg-yellow-500 text-black text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
//               Book now
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";

// interface BikeCardProps {
//   id?: number;
//   name?: string;
//   price?: number;
//   imageUrl: string;
//   location?: string;
//   transmission?: string;
//   seats?: string;
//   fuelType?: string;
//   engine?: string;
//   power?: string;
//   mileage?: string;
//   topSpeed?: string;
// }

// const LOCATIONS = ["Satellite", "Airport Terminal", "City Center", "Railway Station"];

// export default function BikeCard({
//   name = "Suzuki Access",
//   price = 599,
//   imageUrl,
//   location = "Satellite",
//   transmission = "Automatic",
//   seats = "2 Seater",
//   fuelType = "Petrol",
//   engine = "124 cc",
//   power = "8.7 bhp",
//   mileage = "45 kmpl",
//   topSpeed = "90 kmph",
// }: BikeCardProps) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(location);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="group relative w-full max-w-sm h-[400px] bg-transparent [perspective:1000px]">
//       <div
//         className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
//           isFlipped ? "[transform:rotateY(180deg)]" : ""
//         }`}
//       >
//         {/* ======================= */}
//         {/* FRONT FACE              */}
//         {/* ======================= */}
//         <div
//           className={`absolute inset-0 w-full h-full bg-white border border-gray-300 rounded-xl  hover:shadow-sm transition-shadow [backface-visibility:hidden] flex flex-col pt-4 ${
//             isFlipped ? "pointer-events-none" : "pointer-events-auto"
//           }`}
//         >
//           <h3 className="font-medium text-black text-[16px] leading-none text-center px-4 tracking-tight">
//             {name}
//           </h3>

//           {/* Image */}
//           <div className="relative h-36 flex items-center justify-center mt-2 px-8">
//             <img
//               src={imageUrl}
//               alt={name}
//               className="h-full w-full object-contain drop-shadow-sm"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name ?? "")}`;
//               }}
//             />
//           </div>

//           {/* Divider + View Specs button */}
//           <div className="relative flex items-center justify-center px-4 mt-1 mb-3 z-10">
//             <div className="flex-1 border-t-2 border-gray-200"></div>
//             <button
//               onClick={() => setIsFlipped(true)}
//               className="px-4 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-thin text-black mx-3 hover:border-[#ffc107] hover:text-black transition-colors cursor-pointer shadow-sm"
//             >
//               View Specs
//             </button>
//             <div className="flex-1 border-t-2 border-gray-200"></div>
//           </div>

//           {/* Card Body */}
//           <div className="px-4 pb-4 flex flex-col flex-1 justify-between">

//             {/* 3 Quick Specs Row */}
//             <div className="flex justify-between items-center text-black text-[12px] font-normal px-1">
//               <div className="flex items-center gap-1.5">
//                 <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 {transmission}
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 {seats}
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//                 {fuelType}
//               </div>
//             </div>

//             {/* Custom Location Dropdown */}
//             <div className="relative mt-3" ref={dropdownRef}>
//               <div
//                 onClick={() => setDropdownOpen((o) => !o)}
//                 className={`w-full flex items-center gap-2 border rounded-[10px] px-3 py-2 cursor-pointer bg-white transition-colors ${
//                   dropdownOpen
//                     ? "border-[#ffc107] rounded-b-none"
//                     : "border-gray-200 hover:border-[#ffc107]"
//                 }`}
//               >
//                 <svg
//                   className="text-[#ffc107] shrink-0"
//                   width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
//                 >
//                   <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
//                   <circle cx="12" cy="10" r="3" />
//                 </svg>
//                 <span className="flex flex-col flex-1 min-w-0">
//                   <span className="text-[9.5px]  tracking-wider font-thin text-gray-500 leading-none">
//                     Available at
//                   </span>
//                   <span className="text-[13px] font-thin text-black leading-snug truncate">
//                     {selectedLocation}
//                   </span>
//                 </span>
//                 <svg
//                   className={`shrink-0 transition-transform duration-200 ${
//                     dropdownOpen ? "rotate-180 text-[#ffc107]" : "text-gray-300"
//                   }`}
//                   width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
//                 >
//                   <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </div>

//               {dropdownOpen && (
//                 <div className="absolute left-0 right-0 top-full bg-white border border-[#ffc107] border-t-0 rounded-b-[10px] overflow-hidden z-50 shadow-lg">
//                   {LOCATIONS.map((loc) => (
//                     <div
//                       key={loc}
//                       onClick={() => { setSelectedLocation(loc); setDropdownOpen(false); }}
//                       className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer text-[12.5px] border-t border-gray-100 first:border-t-0 transition-colors ${
//                         selectedLocation === loc
//                           ? "bg-amber-50 font-thin text-black"
//                           : "text-gray-600 hover:bg-amber-50 hover:text-gray-900"
//                       }`}
//                     >
//                       <svg
//                         className={selectedLocation === loc ? "text-[#ffc107]" : "text-gray-300"}
//                         width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
//                       >
//                         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
//                         <circle cx="12" cy="10" r="3" />
//                       </svg>
//                       {loc}
//                       <span className={`ml-auto w-1.5 h-1.5 rounded-full ${selectedLocation === loc ? "bg-[#ffc107]" : "bg-gray-200"}`} />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Price & Book */}
//             <div className="flex justify-between items-end border-t-2 border-gray-200 pt-3 mt-3">
//               <div>
//                 {/* <div className="text-[11px] text-gray-400 mb-0.5">Starting from</div> */}
//                 <div className="flex items-baseline gap-0.5">
//                   <span className="text-black font-medium text-[19px] leading-none">
//                     ₹{price.toLocaleString("en-IN")}
//                   </span>
//                   <span className="text-[11px] text-black">/day</span>
//                 </div>
//               </div>
//               <Link href="/vehicledetails">
//                 <button className="bg-[#ffc107] hover:bg-yellow-500 text-black text-[13px] font-semibold px-5 py-2 rounded-xl transition-colors cursor-pointer">
//                   Book now
//                 </button>
//               </Link>
//             </div>

//           </div>
//         </div>

//         {/* ======================= */}
//         {/* BACK FACE               */}
//         {/* ======================= */}
//         <div
//           className={`absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-xl shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col overflow-hidden pt-4 ${
//             isFlipped ? "pointer-events-auto" : "pointer-events-none"
//           }`}
//         >
//           {/* Vehicle Name */}
//           <h3 className="font-semibold text-black text-[16px] leading-none text-center px-4 tracking-tight">
//             {name}
//           </h3>

//           {/* Image */}
//           <div className="relative h-36 flex items-center justify-center mt-2 px-4 bg-gray-50">
//             <img
//               src={imageUrl}
//               alt={name}
//               className="h-full w-full object-contain opacity-90 drop-shadow-sm"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name ?? "")}`;
//               }}
//             />
//           </div>

//           {/* Divider + Back button */}
//           <div className="relative flex items-center justify-center px-4 mt-1 mb-3 z-10">
//             <div className="flex-1 border-t border-gray-200"></div>
//             <button
//               onClick={() => setIsFlipped(false)}
//               className="px-4 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-semibold text-gray-600 mx-3 hover:border-[#ffc107] hover:text-black transition-colors cursor-pointer shadow-sm"
//             >
//               ← Back
//             </button>
//             <div className="flex-1 border-t border-gray-200"></div>
//           </div>

//           {/* Specs Grid */}
//           <div className="flex-1 grid grid-cols-2 grid-rows-2">

//             <div className="bg-[#ffc107] border-r border-t border-[#e6ad00] flex flex-col items-center justify-center p-3">
//               <span className="text-[12px] font-semibold text-yellow-900/80 mb-0.5">Engine</span>
//               <span className="text-[16px] font-bold text-gray-900">{engine}</span>
//             </div>

//             <div className="border-t border-gray-100 flex flex-col items-center justify-center p-3 bg-white">
//               <span className="text-[12px] font-semibold text-gray-400 mb-0.5">Max Power</span>
//               <span className="text-[16px] font-bold text-gray-700">{power}</span>
//             </div>

//             <div className="border-r border-t border-gray-100 flex flex-col items-center justify-center p-3 bg-white">
//               <span className="text-[12px] font-semibold text-gray-400 mb-0.5">Mileage</span>
//               <span className="text-[16px] font-bold text-gray-700">{mileage}</span>
//             </div>

//             <div className="border-t border-gray-100 flex flex-col items-center justify-center p-3 bg-white">
//               <span className="text-[12px] font-semibold text-gray-400 mb-0.5">Top Speed</span>
//               <span className="text-[16px] font-bold text-gray-700">{topSpeed}</span>
//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface BikeCardProps {
  id?: number;
  name?: string;
  price?: number;
  imageUrl: string;
  location?: string;
  transmission?: string;
  seats?: string;
  fuelType?: string;
  engine?: string;
  power?: string;
  mileage?: string;
  topSpeed?: string;
}

const LOCATIONS = ["Satellite", "Airport Terminal", "City Center", "Railway Station"];

export default function BikeCard({
  name = "Suzuki Access",
  price = 599,
  imageUrl,
  location = "Satellite",
  transmission = "Automatic",
  seats = "2 Seater",
  fuelType = "Petrol",
  engine = "124 cc",
  power = "8.7 bhp",
  mileage = "45 kmpl",
  topSpeed = "90 kmph",
}: BikeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleTriggerClick() {
    if (!dropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < 160);
    }
    setDropdownOpen((o) => !o);
  }

  return (
    <div className="group relative w-full max-w-sm h-[400px] bg-transparent">
      <div style={{ perspective: "1000px" }} className="relative w-full h-full">
        <div
          className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* ======================= */}
          {/* FRONT FACE              */}
          {/* ======================= */}
          <div
            className={`absolute inset-0 w-full h-full bg-white border border-gray-300 rounded-xl hover:shadow-sm transition-shadow [backface-visibility:hidden] flex flex-col pt-4 ${
              isFlipped ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            <h3 className="font-medium text-black text-[16px] leading-none text-center px-4 tracking-tight">
              {name}
            </h3>

            {/* Image */}
            <div className="relative h-36 flex items-center justify-center mt-2 px-8">
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-contain drop-shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name ?? "")}`;
                }}
              />
            </div>

            {/* Divider + View Specs button */}
            <div className="relative flex items-center justify-center px-4 mt-1 mb-3 z-10">
              <div className="flex-1 border-t-2 border-gray-200"></div>
              <button
                onClick={() => setIsFlipped(true)}
                className="px-4 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-thin text-black mx-3 hover:border-[#ffc107] hover:text-black transition-colors cursor-pointer shadow-sm"
              >
                View Specs
              </button>
              <div className="flex-1 border-t-2 border-gray-200"></div>
            </div>

            {/* Card Body */}
            <div className="px-4 pb-4 flex flex-col flex-1 justify-between">

              {/* 3 Quick Specs Row */}
              <div className="flex justify-between items-center text-black text-[12px] font-normal px-1">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {transmission}
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {seats}
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {fuelType}
                </div>
              </div>

              {/* Custom Location Dropdown */}
              {/* Uses relative positioning only — menu is absolute inside a relative container
                  that has overflow:visible so it paints on top of sibling cards via z-index */}
              <div
                className="relative mt-3"
                ref={dropdownRef}
                // Elevate this element above sibling cards when open
                style={{ zIndex: dropdownOpen ? 50 : "auto" }}
              >
                {/* Trigger */}
                <div
                  ref={triggerRef}
                  onClick={handleTriggerClick}
                  className={`w-full flex items-center gap-2 border px-3 py-2 cursor-pointer bg-white transition-colors ${
                    dropdownOpen
                      ? dropUp
                        ? "border-[#ffc107] rounded-[10px] rounded-b-[10px]"
                        : "border-[#ffc107] rounded-[10px] rounded-b-none"
                      : "border-gray-200 rounded-[10px] hover:border-[#ffc107]"
                  }`}
                >
                  <svg
                    className="text-[#ffc107] shrink-0"
                    width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="flex flex-col flex-1 min-w-0">
                    <span className="text-[9.5px] tracking-wider font-thin text-gray-500 leading-none">
                      Available at
                    </span>
                    <span className="text-[13px] font-thin text-black leading-snug truncate">
                      {selectedLocation}
                    </span>
                  </span>
                  <svg
                    className={`shrink-0 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180 text-[#ffc107]" : "text-gray-300"
                    }`}
                    width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Menu — absolute, opens up or down based on dropUp */}
                {dropdownOpen && (
                  <div
                    className={`absolute left-0 right-0 bg-white border border-[#ffc107] overflow-hidden shadow-lg ${
                      dropUp
                        ? "bottom-full border-b-0 rounded-t-[10px] rounded-b-none"
                        : "top-full border-t-0 rounded-b-[10px] rounded-t-none"
                    }`}
                  >
                    {LOCATIONS.map((loc) => (
                      <div
                        key={loc}
                        onClick={() => { setSelectedLocation(loc); setDropdownOpen(false); }}
                        className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer text-[12.5px] border-t border-gray-100 first:border-t-0 transition-colors ${
                          selectedLocation === loc
                            ? "bg-amber-50 font-thin text-black"
                            : "text-black hover:bg-amber-50"
                        }`}
                      >
                        <svg
                          className={selectedLocation === loc ? "text-[#ffc107] font-thin" : "text-gray-500 font-thin"}
                          width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {loc}
                        <span className={`ml-auto w-1.5 h-1.5 rounded-full ${selectedLocation === loc ? "bg-[#ffc107]" : "bg-gray-200"}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price & Book */}
              <div className="flex justify-between items-end border-t-2 border-gray-200 pt-3 mt-3">
                <div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-black font-medium text-[19px] leading-none">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-black">/day</span>
                  </div>
                </div>
                <Link href="/vehicledetails">
                  <button className="bg-[#ffc107] hover:bg-yellow-500 text-black text-[13px] font-semibold px-5 py-2 rounded-xl transition-colors cursor-pointer">
                    Book now
                  </button>
                </Link>
              </div>

            </div>
          </div>

          {/* ======================= */}
          {/* BACK FACE               */}
          {/* ======================= */}
          <div
            className={`absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-xl shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col overflow-hidden pt-4 ${
              isFlipped ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {/* Vehicle Name */}
            <h3 className="font-medium text-black text-[16px] leading-none text-center px-4 tracking-tight">
              {name}
            </h3>

            {/* Image */}
            <div className="relative h-36 flex items-center justify-center mt-2 px-8 ">
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-contain opacity-90 drop-shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name ?? "")}`;
                }}
              />
            </div>

            {/* Divider + Back button */}
            <div className="relative flex items-center justify-center px-4 mt-1 mb-3 z-10">
              <div className="flex-1 border-t border-gray-200"></div>
              <button
                onClick={() => setIsFlipped(false)}
                className="px-4 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-semibold text-gray-600 mx-3 hover:border-[#ffc107] hover:text-black transition-colors cursor-pointer shadow-sm"
              >
                ← Back
              </button>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Specs Grid */}
            <div className="flex-1 grid grid-cols-2 grid-rows-2">

              <div className="bg-[#ffc107] border-r border-t border-[#e6ad00] flex flex-col items-center justify-center p-3">
                <span className="text-[12px] font-medium text-yellow-900/80 mb-0.5">Engine</span>
                <span className="text-[16px] font-semibold text-black">{engine}</span>
              </div>

              <div className="border-t border-gray-100 flex flex-col items-center justify-center p-3 bg-white">
                <span className="text-[12px] font-thin text-black mb-0.5">Max Power</span>
                <span className="text-[16px] font-semibold text-black">{power}</span>
              </div>

              <div className="border-r border-t border-gray-100 flex flex-col items-center justify-center p-3 bg-white">
                <span className="text-[12px] font-thin text-black mb-0.5">Mileage</span>
                <span className="text-[16px] font-semibold text-black">{mileage}</span>
              </div>

              <div className="border-t border-gray-100 flex flex-col items-center justify-center p-3 bg-white">
                <span className="text-[12px] font-thin text-black mb-0.5">Top Speed</span>
                <span className="text-[16px] font-semibold text-black">{topSpeed}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}