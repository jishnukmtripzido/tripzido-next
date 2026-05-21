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

"use client";

import { useState } from "react";
import Link from "next/link";

interface BikeCardProps {
  id?: number;
  name?: string;
  price?: number;
  imageUrl: string;
  location?: string;
  // Basic specs for the front
  transmission?: string;
  seats?: string;
  fuelType?: string;
  // Detailed specs for the back of the card
  engine?: string;
  power?: string;
  mileage?: string;
  topSpeed?: string;
}

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

  return (
    // Outer wrapper establishes the 3D perspective.
    <div className="group relative w-full max-w-sm h-[400px] bg-transparent [perspective:1000px] max-sm:mx-2 ">
      
      {/* Inner container that actually rotates */}
      <div
        className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* ======================= */}
        {/* FRONT FACE              */}
        {/* ======================= */}
        <div className="absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow [backface-visibility:hidden] flex flex-col pt-4">
          
          {/* Vehicle Name (Black, font-medium, at the top) */}
          <h3 className="font-medium text-black text-[17px] leading-none text-center px-4">
            {name}
          </h3>

          {/* Top Image Area */}
          <div className="relative h-36 flex items-center justify-center mt-2 px-4">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-contain drop-shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
              }}
            />
          </div>

          {/* Divider Line with View Specs Button */}
          <div className="relative flex items-center justify-center px-4 mt-1 mb-3 z-10">
            <div className="flex-1 border-t border-gray-200"></div>
            <button
              onClick={() => setIsFlipped(true)}
              className="px-4 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-semibold text-gray-600 mx-3 hover:border-[#ffc107] hover:text-black transition-colors cursor-pointer shadow-sm"
            >
              View Specs
            </button>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Card Body */}
          <div className="px-4 pb-4 flex flex-col flex-1 justify-between">
            
            {/* 3 Quick Specs Row */}
            <div className="flex justify-between items-center text-gray-500 text-[11px] font-medium px-1">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {transmission}
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                {seats}
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                {fuelType}
              </div>
            </div>

            {/* Location Dropdown */}
            <div className="relative mt-3">
              <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] font-medium text-gray-400 z-10">
                Available at
              </label>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-md py-1.5 pl-3 pr-8 text-sm font-semibold text-gray-800 bg-white hover:border-gray-300 focus:outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] appearance-none cursor-pointer transition-colors">
                  <option value={location}>{location}</option>
                  <option value="Airport Terminal">Airport Terminal</option>
                  <option value="City Center">City Center</option>
                  <option value="Railway Station">Railway Station</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Price & Rent Button */}
            <div className="flex justify-between items-end border-t border-gray-100 pt-3 mt-3">
              <div>
                <div className="text-[10px] text-gray-500 mb-0.5">Starting from</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-black font-medium text-[19px] leading-none">₹{price}</span>
                  <span className="text-[10px] text-gray-500">/day</span>
                </div>
              </div>
              <Link href="/vehicledetails">
                <button className="bg-[#ffc107] hover:bg-yellow-500 text-black text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer">
                  Book now
                </button>
              </Link>
            </div>
            
          </div>
        </div>

        {/* ======================= */}
        {/* BACK FACE               */}
        {/* ======================= */}
        <div className="absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-xl shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col overflow-hidden">
          
          {/* Mini Image Area - Expanded slightly since name was removed */}
          <div className="relative h-36 flex items-center justify-center bg-gray-50 border-b border-gray-100">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-contain p-2 opacity-90 drop-shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
              }}
            />
          </div>

          {/* Divider Line with Back Button */}
          <div className="relative flex items-center justify-center px-4 -mt-3.5 z-10">
            <div className="flex-1 border-t border-gray-200"></div>
            <button
              onClick={() => setIsFlipped(false)}
              className="px-6 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-semibold text-gray-600 mx-3 hover:border-[#ffc107] hover:text-black transition-colors cursor-pointer shadow-sm"
            >
              Back
            </button>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Specs Grid */}
          <div className="flex-1 grid grid-cols-2 grid-rows-2 mt-3">
            
            {/* Highlighted Brand Yellow Box */}
            <div className="bg-[#ffc107] border-r border-t border-[#e6ad00] flex flex-col items-center justify-center p-3">
              <span className="text-[11px] font-semibold text-yellow-900/80 mb-0.5">Engine</span>
              <span className="text-[15px] font-bold text-gray-900">{engine}</span>
            </div>
            
            <div className="border-t border-gray-100 flex flex-col items-center justify-center p-3 bg-white">
              <span className="text-[11px] font-semibold text-gray-400 mb-0.5">Max Power</span>
              <span className="text-[15px] font-bold text-gray-700">{power}</span>
            </div>
            
            <div className="border-r border-t border-gray-100 flex flex-col items-center justify-center p-3 bg-white">
              <span className="text-[11px] font-semibold text-gray-400 mb-0.5">Mileage</span>
              <span className="text-[15px] font-bold text-gray-700">{mileage}</span>
            </div>
            
            <div className="border-t border-gray-100 flex flex-col items-center justify-center p-3 bg-white">
              <span className="text-[11px] font-semibold text-gray-400 mb-0.5">Top Speed</span>
              <span className="text-[15px] font-bold text-gray-700">{topSpeed}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}