// "use client";

// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { getLocationPrice } from "@/lib/vehicleUtils";
// import getMapThumbnailUrl from "../../ui/mapThumbnail";
// import type {
//   VehicleSearchResult,
//   VehicleLocation,
// } from "@/types/vehicles.types";

// interface BikeCardProps extends VehicleSearchResult {
//   onDropdownOpenChange?: (open: boolean) => void;
//   tags?: { label: string; variant: "default" | "highlight" | "info" }[];
//   rentalDays?: number;
//   /** ISO datetime strings forwarded from the search result URL */
//   pickup?: string;
//   dropoff?: string;
// }

// export default function BikeCard({
//   id,
//   name,
//   make_year,
//   transmission_type,
//   fuel_type,
//   seats,
//   cc,
//   mileage_kmpl,
//   primary_image,
//   locations,
//   onDropdownOpenChange,
//   tags = [],
//   rentalDays,
//   pickup,
//   dropoff,
// }: BikeCardProps) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState<VehicleLocation>(
//     locations[0],
//   );

//   // Derived values
//   const transmission = transmission_type
//     .split("_")
//     .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
//     .join(" ");
//   const seatsLabel = `${seats} Seater`;
//   const fuelTypeLabel = fuel_type.charAt(0) + fuel_type.slice(1).toLowerCase();
//   const engine = `${cc} cc`;
//   const mileage = `${mileage_kmpl} kmpl`;
//   const price = getLocationPrice(selectedLocation);
//   const kmLimit = selectedLocation.pricing_packages[0].total_km_limit;
//   const totalPrice = price;
//   const mapLat = (selectedLocation as any).latitude ?? 11.6;
//   const mapLng = (selectedLocation as any).longitude ?? 76.2;

//   function tagClass(variant: string) {
//     if (variant === "highlight") return "bg-[#ffc107] text-[#6b3d00]";
//     if (variant === "info") return "bg-blue-600 text-white";
//     return "bg-gray-100 text-gray-600 border border-gray-200";
//   }

//   /** Build the vehicle details URL with all booking context */
//   function buildDetailsUrl() {
//     const params = new URLSearchParams();
//     params.set("location_id", String(selectedLocation.location_id));
//     params.set("location_name", selectedLocation.location_name);
//     params.set("city_id", selectedLocation.city_id);
//     params.set("package_id", String(selectedLocation.pricing_packages[0].id));
//     if (pickup) params.set("pickup", pickup);
//     if (dropoff) params.set("dropoff", dropoff);
//     return `/vehicledetails/${selectedLocation.id}?${params.toString()}`;
//   }

//   const PriceDisplay = () => (
//     <div>
//       {rentalDays && totalPrice !== null ? (
//         <>
//           <p className="text-[10.5px] text-gray-400 leading-none mb-1">
//             Price for {rentalDays} day{rentalDays > 1 ? "s" : ""}:
//           </p>
//           <div className="flex items-baseline gap-0.5">
//             <span className="text-[20px] font-bold text-black leading-none">
//               ₹{totalPrice!.toLocaleString()}
//             </span>
//           </div>
//         </>
//       ) : price !== null ? (
//         <div className="flex flex-col items-start gap-0.5">
//           <span className="text-[20px] font-bold text-black leading-none">
//             ₹{price.toLocaleString()}
//           </span>
//           <span className="text-[14px] text-font-main-sub">({kmLimit})</span>
//           {/* <span className="text-[12px] text-black">/day</span> */}
//         </div>
//       ) : (
//         <span className="text-[13px] text-gray-400">Contact for price</span>
//       )}
//     </div>
//   );

//   const BookButton = ({ size = "sm" }: { size?: "sm" | "md" }) => (
//     <Link href={buildDetailsUrl()}>
//       <button
//         className={`bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors cursor-pointer ${
//           size === "md"
//             ? "text-[13px] px-5 py-2 rounded-md"
//             : "text-[14px] px-6 py-2.5"
//         }`}
//       >
//         Book now
//       </button>
//     </Link>
//   );

//   const SpecsList = () => (
//     <ul className="space-y-2">
//       {[
//         { icon: "user", label: seatsLabel },
//         { icon: "gear", label: transmission },
//         {
//           icon: "map",
//           label: kmLimit ? `${kmLimit}` : "Unlimited Km",
//         },
//         { icon: "fuel", label: `${fuelTypeLabel} · ${engine}` },
//       ].map(({ icon, label }) => (
//         <li
//           key={label}
//           className="flex items-center gap-2 text-[14px] text-black"
//         >
//           <SpecIcon type={icon} />
//           {label}
//         </li>
//       ))}
//     </ul>
//   );

//   const Badges = () => (
//     <>
//       {tags.length > 0 && (
//         <div className="flex flex-wrap gap-1.5 mb-3">
//           {tags.map((t, i) => (
//             <span
//               key={i}
//               className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${tagClass(t.variant)}`}
//             >
//               {t.label}
//             </span>
//           ))}
//         </div>
//       )}
//       {selectedLocation.pay_at_pickup_enabled && (
//         <span className="inline-flex mr-2 mb-4 items-center bg-green-700 text-white text-[11px] font-medium px-1 py-[2px] rounded">
//           Pay at pickup
//         </span>
//       )}
//       {fuel_type === "ELECTRIC" && (
//         <span className="inline-flex items-center bg-brand-yellow text-[#6b3d00] text-[11px] font-medium px-1 py-[2px] rounded mb-2">
//           Electric
//         </span>
//       )}
//     </>
//   );

//   return (
//     <div className="group relative w-full max-w-sm bg-transparent ">
//       {/* ── MOBILE ── */}
//       <div className="sm:hidden">
//         {!isFlipped ? (
//           <div className="bg-white  rounded-md shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]  overflow-visible">
//             <div className="p-4 pb-0">
//               <Badges />
//               <h3 className="text-[20px] font-bold text-black leading-snug mb-5">
//                 {name}
//                 {/* <span className="text-sm text-gray-700 ps-1">or similar</span> */}
//               </h3>
//               <div className="grid grid-cols-[1fr_160px] gap-2.5 items-start mb-6">
//                 <div className="min-w-0">
//                   <SpecsList />
//                 </div>
//                 <div className="flex justify-end">
//                   <img
//                     src={primary_image}
//                     alt={name}
//                     className="w-[160px] h-[130px] object-contain mt-[-50px]"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src =
//                         `https://placehold.co/160x130/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
//                     }}
//                   />
//                 </div>
//               </div>
//               <LocationDropdown
//                 locations={locations}
//                 selectedLocation={selectedLocation}
//                 mapLat={mapLat}
//                 mapLng={mapLng}
//                 onSelect={setSelectedLocation}
//                 onOpenChange={onDropdownOpenChange}
//               />
//             </div>
//             <div className="flex items-center justify-between px-4 py-3 mt-3 border-t border-gray-100">
//               <PriceDisplay />
//               <BookButton />
//             </div>
//           </div>
//         ) : (
//           <SpecsBack
//             name={name}
//             imageUrl={primary_image}
//             engine={engine}
//             makeYear={make_year}
//             mileage={mileage}
//             kmLimit={kmLimit}
//             onBack={() => setIsFlipped(false)}
//           />
//         )}
//       </div>

//       {/* ── DESKTOP ── */}
//       <div className="hidden sm:block h-[390px]">
//         <div
//           style={{ perspective: "1000px" }}
//           className="relative w-full h-full"
//         >
//           <div
//             className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
//           >
//             {/* Front */}
//             <div
//               className={`absolute inset-0 w-full h-full bg-white shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]  rounded-md [backface-visibility:hidden] flex flex-col pt-4 ${isFlipped ? "pointer-events-none" : "pointer-events-auto"}`}
//             >
//               <h3 className="font-medium text-black text-[20px] leading-none text-center px-4 tracking-tight">
//                 {name}
//               </h3>
//               <div className="relative h-36 flex items-center justify-center mt-2 p-3">
//                 <img
//                   src={primary_image}
//                   alt={name}
//                   className="h-full w-full object-contain drop-shadow-sm"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src =
//                       `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
//                   }}
//                 />
//               </div>
//               <div className="relative flex items-center justify-center px-4 mt-1 mb-3 z-10">
//                 <div className="flex-1 border-t-2 border-gray-200" />
//                 <button
//                   onClick={() => setIsFlipped(true)}
//                   className="px-4 py-1 bg-white border border-gray-300 rounded-full text-[11px] font-normal text-black mx-3 hover:border-[#ffc107] transition-colors cursor-pointer"
//                 >
//                   View Specs
//                 </button>
//                 <div className="flex-1 border-t-2 border-gray-200" />
//               </div>
//               <div className="px-4 pb-4 flex flex-col flex-1 justify-between">
//                 {/* Desktop spec row — each item gets its own icon */}
//                 <div className="flex justify-between items-center text-black text-sm font-normal px-1">
//                   {[
//                     { label: transmission, icon: "transmission" },
//                     { label: seatsLabel, icon: "seat" },
//                     { label: fuelTypeLabel, icon: "fuel" },
//                   ].map(({ label, icon }) => (
//                     <div key={label} className="flex items-center gap-1.5">
//                       <SpecIcon type={icon} />
//                       {label}
//                     </div>
//                   ))}
//                 </div>
//                 <LocationDropdown
//                   locations={locations}
//                   selectedLocation={selectedLocation}
//                   mapLat={mapLat}
//                   mapLng={mapLng}
//                   onSelect={setSelectedLocation}
//                   onOpenChange={onDropdownOpenChange}
//                 />
//                 <div className="flex justify-between items-end border-t-2 border-gray-200 pt-3 mt-3">
//                   {price !== null ? (
//                     <div className="flex flex-col items-start gap-0.5">
//                       <span className="text-[20px] font-bold text-black leading-none">
//                         ₹{price.toLocaleString()}
//                       </span>
//                       <span className="text-[12px]  text-font-main-sub">
//                         ({kmLimit})
//                       </span>
//                       {/* <span className="text-[12px] text-black">/day</span> */}
//                     </div>
//                   ) : (
//                     <span className="text-[13px] text-gray-400">
//                       Contact for price
//                     </span>
//                   )}
//                   <BookButton size="md" />
//                 </div>
//               </div>
//             </div>

//             {/* Back */}
//             <div
//               className={`absolute inset-0 w-full h-full bg-white shadow-[0_6px_12px_-2px_rgba(50,50,93,0.25),0_3px_7px_-3px_rgba(0,0,0,0.3)] border border-gray-300/80 rounded-md [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col overflow-hidden pt-4 ${isFlipped ? "pointer-events-auto" : "pointer-events-none"}`}
//             >
//               <SpecsBack
//                 name={name}
//                 imageUrl={primary_image}
//                 engine={engine}
//                 makeYear={make_year}
//                 mileage={mileage}
//                 kmLimit={kmLimit}
//                 onBack={() => setIsFlipped(false)}
//                 desktop
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Sub-components ────────────────────────────────────────────────────

// /**
//  * Standalone location dropdown. Each instance owns its own open/dropUp
//  * state and its own refs. This is mounted twice per card (once in the
//  * mobile layout, once in the desktop layout) and only one of those is
//  * ever visible at a given viewport width — but both stay in the DOM at
//  * the same time because the mobile/desktop split is done with CSS
//  * (`sm:hidden` / `hidden sm:block`), not by unmounting. Previously this
//  * was a closure defined inside BikeCard that referenced a single shared
//  * dropdownRef/triggerRef, so whichever instance rendered last (desktop)
//  * "won" the ref, and the mobile instance's outside-click handler closed
//  * the dropdown before the select click could register — selecting a
//  * location on mobile never worked. Giving each instance its own
//  * useRef/useState fixes that.
//  */
// function LocationDropdown({
//   locations,
//   selectedLocation,
//   mapLat,
//   mapLng,
//   onSelect,
//   onOpenChange,
// }: {
//   locations: VehicleLocation[];
//   selectedLocation: VehicleLocation;
//   mapLat: number;
//   mapLng: number;
//   onSelect: (loc: VehicleLocation) => void;
//   onOpenChange?: (open: boolean) => void;
// }) {
//   const [open, setOpen] = useState(false);
//   const [dropUp, setDropUp] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const triggerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setOpen(false);
//         onOpenChange?.(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [onOpenChange]);

//   function handleTriggerClick() {
//     if (!open && triggerRef.current) {
//       const rect = triggerRef.current.getBoundingClientRect();
//       setDropUp(window.innerHeight - rect.bottom < 160);
//     }
//     const next = !open;
//     setOpen(next);
//     onOpenChange?.(next);
//   }

//   function handleSelect(loc: VehicleLocation) {
//     onSelect(loc);
//     setOpen(false);
//     onOpenChange?.(false);
//   }

//   return (
//     <div className="relative mt-3" ref={dropdownRef} style={{ zIndex: 50 }}>
//       <div
//         ref={triggerRef}
//         onClick={handleTriggerClick}
//         className={`w-full flex items-center gap-2 border pl-3 py-2 cursor-pointer bg-white transition-all overflow-hidden ${
//           open
//             ? `border-gray-400 rounded-md ${dropUp ? "" : "rounded-b-none"}`
//             : "border-gray-200 rounded-md hover:border-gray-300"
//         }`}
//       >
//         <PinIcon />
//         <span className="flex flex-col flex-1 min-w-0 py-0.5">
//           <span className="text-[9.5px] tracking-wider text-font-dim leading-none">
//             Available at
//           </span>
//           <span className="text-[13px] text-black leading-snug truncate mt-0.5">
//             {selectedLocation.location_name}
//           </span>
//         </span>
//         <MapThumbnail lat={mapLat} lng={mapLng} />
//       </div>
//       <div
//         className={`absolute left-0 right-0 bg-white border border-gray-200 shadow-xl overflow-hidden transition-all duration-200 ease-in-out z-50 ${
//           open
//             ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
//             : "opacity-0 -translate-y-2 pointer-events-none scale-[0.98]"
//         } ${dropUp ? "bottom-full border-b-0 rounded-t-lg origin-bottom" : "top-full border-t-0 rounded-b-lg origin-top"}`}
//       >
//         <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
//           {locations.map((loc) => {
//             const locPrice = getLocationPrice(loc);
//             const isSelected = loc.id === selectedLocation.id;
//             return (
//               <div
//                 key={loc.id}
//                 onClick={() => handleSelect(loc)}
//                 className={`flex items-center justify-between px-4 py-3 cursor-pointer text-[13px] transition-colors ${isSelected ? "bg-gray-50 font-medium" : "hover:bg-gray-50/60"}`}
//               >
//                 <div className="flex items-center gap-3 min-w-0">
//                   <span className="w-3 h-3 rounded-[3px] bg-green-500 shrink-0" />
//                   <div className="flex flex-col min-w-0">
//                     <span
//                       className={`truncate text-black ${isSelected ? "font-semibold" : ""}`}
//                     >
//                       {loc.location_name}
//                     </span>
//                     <span
//                       className={`text-[11px] text-f mt-0.5 truncate text-black ${isSelected ? "font-semibold" : ""}`}
//                     >
//                       {locPrice !== null
//                         ? `₹${locPrice.toLocaleString()}`
//                         : "No price"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="shrink-0 ml-2">
//                   {isSelected ? (
//                     <div className="w-4 h-4 rounded-full border-[1.5px] border-gray-900 flex items-center justify-center">
//                       <div className="w-2 h-2 rounded-full bg-gray-900" />
//                     </div>
//                   ) : (
//                     <div className="w-4 h-4 rounded-full border-[1.5px] border-gray-300" />
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MapThumbnail({ lat, lng }: { lat: number; lng: number }) {
//   return (
//     <div className="relative w-8 h-8 mr-1 rounded-md self-stretch shrink-0 overflow-hidden">
//       <img
//         src={getMapThumbnailUrl(lat, lng)}
//         alt=""
//         className="w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black/10" />
//       <div className="absolute inset-0 flex items-center justify-center">
//         <svg
//           width="15"
//           height="15"
//           viewBox="0 0 24 24"
//           fill="#1e3a5f"
//           stroke="white"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
//           <circle cx="12" cy="10" r="3" fill="white" stroke="none" />
//         </svg>
//       </div>
//     </div>
//   );
// }

// function SpecsBack({
//   name,
//   imageUrl,
//   engine,
//   makeYear,
//   mileage,
//   kmLimit,
//   onBack,
//   desktop = false,
// }: {
//   name: string;
//   imageUrl: string;
//   engine: string;
//   makeYear: number;
//   mileage: string;
//   kmLimit: string;
//   onBack: () => void;
//   desktop?: boolean;
// }) {
//   return (
//     <>
//       {!desktop && (
//         <div className="p-4 pb-0">
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="text-[20px] font-semibold text-black">{name}</h3>
//             <button
//               onClick={onBack}
//               className="text-[11px] text-gray-500 border border-gray-200 rounded-full px-3 py-0.5 hover:border-[#ffc107] hover:text-black transition-colors"
//             >
//               &larr; Back
//             </button>
//           </div>
//           <img
//             src={imageUrl}
//             alt={name}
//             className="w-full h-28 object-contain"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src =
//                 `https://placehold.co/300x112/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
//             }}
//           />
//         </div>
//       )}
//       {desktop && (
//         <>
//           <h3 className="font-medium text-black text-[16px] leading-none text-center px-4 tracking-tight">
//             {name}
//           </h3>
//           <div className="relative h-36 flex items-center justify-center mt-2 p-3">
//             <img
//               src={imageUrl}
//               alt={name}
//               className="h-full w-full object-contain opacity-90 drop-shadow-sm"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src =
//                   `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
//               }}
//             />
//           </div>
//           <div className="relative flex items-center justify-center px-4 mt-1 mb-3 z-10">
//             <div className="flex-1 border-t border-gray-200" />
//             <button
//               onClick={onBack}
//               className="px-4 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-semibold text-gray-600 mx-3 hover:border-[#ffc107] hover:text-black transition-colors cursor-pointer shadow-sm"
//             >
//               &larr; Back
//             </button>
//             <div className="flex-1 border-t border-gray-200" />
//           </div>
//         </>
//       )}
//       <div
//         className={`grid grid-cols-2 ${desktop ? "flex-1" : "mt-3"} border-t border-gray-100`}
//       >
//         {[
//           { label: "Engine", value: engine, highlight: true },
//           { label: "Year", value: String(makeYear) },
//           { label: "Mileage", value: mileage },
//           {
//             label: "Km limit",
//             value:
//               kmLimit !== null && kmLimit !== undefined
//                 ? String(kmLimit)
//                 : "Unlimited",
//           },
//         ].map(({ label, value, highlight }) => (
//           <div
//             key={label}
//             className={`flex flex-col items-center justify-center py-4 border-t border-gray-100 ${highlight ? "bg-[#ffc107] border-r border-[#e6ad00]" : ""}`}
//           >
//             <span
//               className={`text-[11px] mb-0.5 ${highlight ? "font-medium text-yellow-900/70" : "text-gray-500"}`}
//             >
//               {label}
//             </span>
//             <span className="text-[16px] font-semibold text-black">
//               {value}
//             </span>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// function PinIcon() {
//   return (
//     <svg
//       className="text-gray-500 shrink-0"
//       width="15"
//       height="15"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       viewBox="0 0 24 24"
//     >
//       <path
//         d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <circle cx="12" cy="10" r="3" />
//     </svg>
//   );
// }

// function SpecIcon({ type }: { type: string }) {
//   // ── Seat (desktop row) ──────────────────────────────────────────────
//   if (type === "seat") {
//     return (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         fill="currentColor"
//         className="w-3.5 h-3.5 text-gray-600 shrink-0"
//       >
//         <path d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0M18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0M3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0" />
//       </svg>
//     );
//   }

//   // ── Transmission (desktop row) ──────────────────────────────────────
//   if (type === "transmission") {
//     return (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         fill="currentColor"
//         className="w-3.5 h-3.5 text-gray-600 shrink-0"
//       >
//         <path d="M19.25 14.25v-4.5l-1.374.416 3 4.5c.412.617 1.374.326 1.374-.416v-4.5a.75.75 0 0 0-1.5 0v4.5l1.374-.416-3-4.5c-.412-.617-1.374-.326-1.374.416v4.5a.75.75 0 0 0 1.5 0m3 6a3.75 3.75 0 0 0-3.75-3.75.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75a3.75 3.75 0 0 0 3.75-3.75m-1.5 0a2.25 2.25 0 0 1-2.25 2.25l.75.75v-6l-.75.75a2.25 2.25 0 0 1 2.25 2.25M18.5 4.5H20A2.25 2.25 0 0 0 20 0h-1.5a.75.75 0 0 0-.75.75v6a.75.75 0 0 0 1.5 0v-6l-.75.75H20A.75.75 0 0 1 20 3h-1.5a.75.75 0 0 0 0 1.5M4.25 6.75v4.5A2.25 2.25 0 0 0 6.5 13.5H8a.75.75 0 0 1 .75.75v4.5A2.25 2.25 0 0 0 11 21h3a.75.75 0 0 0 0-1.5h-3a.75.75 0 0 1-.75-.75v-4.5A2.25 2.25 0 0 0 8 12H6.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-1.5 0m3-3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0m1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0" />
//       </svg>
//     );
//   }

//   // ── Fuel (desktop row + mobile SpecsList fallback) ──────────────────
//   if (type === "fuel") {
//     return (
//       <svg
//         className="w-3.5 h-3.5 text-gray-600 shrink-0"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M13 10V3L4 14h7v7l9-11h-7z"
//         />
//       </svg>
//     );
//   }

//   // ── Legacy keys used by mobile SpecsList ────────────────────────────
//   const paths: Record<string, string> = {
//     user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
//     gear: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
//     map: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
//   };

//   return (
//     <svg
//       className="w-3.5 h-3.5 text-gray-500 shrink-0"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d={paths[type]}
//       />
//     </svg>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getLocationPrice } from "@/lib/vehicleUtils";
import getMapThumbnailUrl from "../../ui/mapThumbnail";
import type {
  VehicleSearchResult,
  VehicleLocation,
} from "@/types/vehicles.types";

interface BikeCardProps extends VehicleSearchResult {
  onDropdownOpenChange?: (open: boolean) => void;
  tags?: { label: string; variant: "default" | "highlight" | "info" }[];
  rentalDays?: number;
  /** ISO datetime strings forwarded from the search result URL */
  pickup?: string;
  dropoff?: string;
}

export default function BikeCard({
  id,
  name,
  make_year,
  transmission_type,
  fuel_type,
  seats,
  cc,
  mileage_kmpl,
  primary_image,
  locations,
  onDropdownOpenChange,
  tags = [],
  rentalDays,
  pickup,
  dropoff,
}: BikeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<VehicleLocation>(
    locations[0],
  );

  // Derived values
  const transmission = transmission_type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  const seatsLabel = `${seats} Seater`;
  const fuelTypeLabel = fuel_type.charAt(0) + fuel_type.slice(1).toLowerCase();
  const engine = `${cc} cc`;
  const mileage = `${mileage_kmpl} kmpl`;
  const price = getLocationPrice(selectedLocation);
  const kmLimit = selectedLocation.pricing_packages[0].total_km_limit;
  const totalPrice = price;
  const mapLat = (selectedLocation as any).latitude ?? 11.6;
  const mapLng = (selectedLocation as any).longitude ?? 76.2;
  // Sold out is per-location, so it follows whichever location is
  // currently selected — switching locations in the dropdown can flip
  // this back and forth.
  const isSoldOut = selectedLocation.available_count <= 0;

  function tagClass(variant: string) {
    if (variant === "highlight") return "bg-[#ffc107] text-[#6b3d00]";
    if (variant === "info") return "bg-blue-600 text-white";
    return "bg-gray-100 text-gray-600 border border-gray-200";
  }

  /** Build the vehicle details URL with all booking context */
  function buildDetailsUrl() {
    const params = new URLSearchParams();
    params.set("location_id", String(selectedLocation.location_id));
    params.set("location_name", selectedLocation.location_name);
    params.set("city_id", selectedLocation.city_id);
    params.set("package_id", String(selectedLocation.pricing_packages[0].id));
    if (pickup) params.set("pickup", pickup);
    if (dropoff) params.set("dropoff", dropoff);
    return `/vehicledetails/${selectedLocation.id}?${params.toString()}`;
  }

  const PriceDisplay = () => (
    <div>
      {rentalDays && totalPrice !== null ? (
        <>
          <p className="text-[10.5px] text-gray-400 leading-none mb-1">
            Price for {rentalDays} day{rentalDays > 1 ? "s" : ""}:
          </p>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[20px] font-bold text-black leading-none">
              ₹{totalPrice!.toLocaleString()}
            </span>
          </div>
        </>
      ) : price !== null ? (
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-[20px] font-bold text-black leading-none">
            ₹{price.toLocaleString()}
          </span>
          <span className="text-[14px] text-font-main-sub">({kmLimit})</span>
          {/* <span className="text-[12px] text-black">/day</span> */}
        </div>
      ) : (
        <span className="text-[13px] text-gray-400">Contact for price</span>
      )}
    </div>
  );

  const BookButton = ({ size = "sm" }: { size?: "sm" | "md" }) => {
    if (isSoldOut) {
      return (
        <button
          disabled
          className={`bg-gray-200 text-gray-400 font-semibold rounded-lg cursor-not-allowed ${
            size === "md"
              ? "text-[13px] px-5 py-2 rounded-md"
              : "text-[14px] px-6 py-2.5"
          }`}
        >
          Sold Out
        </button>
      );
    }
    return (
      <Link href={buildDetailsUrl()}>
        <button
          className={`bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors cursor-pointer ${
            size === "md"
              ? "text-[13px] px-5 py-2 rounded-md"
              : "text-[14px] px-6 py-2.5"
          }`}
        >
          Book now
        </button>
      </Link>
    );
  };

  const SpecsList = () => (
    <ul className="space-y-2">
      {[
        { icon: "user", label: seatsLabel },
        { icon: "gear", label: transmission },
        {
          icon: "map",
          label: kmLimit ? `${kmLimit}` : "Unlimited Km",
        },
        { icon: "fuel", label: `${fuelTypeLabel} · ${engine}` },
      ].map(({ icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-2 text-[14px] text-black"
        >
          <SpecIcon type={icon} />
          {label}
        </li>
      ))}
    </ul>
  );

  const Badges = () => (
    <>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((t, i) => (
            <span
              key={i}
              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${tagClass(t.variant)}`}
            >
              {t.label}
            </span>
          ))}
        </div>
      )}
      {selectedLocation.pay_at_pickup_enabled && (
        <span className="inline-flex mr-2 mb-4 items-center bg-green-700 text-white text-[11px] font-medium px-1 py-[2px] rounded">
          Pay at pickup
        </span>
      )}
      {fuel_type === "ELECTRIC" && (
        <span className="inline-flex items-center bg-brand-yellow text-[#6b3d00] text-[11px] font-medium px-1 py-[2px] rounded mb-2">
          Electric
        </span>
      )}
    </>
  );

  return (
    <div className="group relative w-full max-w-sm bg-transparent ">
      {/* ── MOBILE ── */}
      <div className="sm:hidden">
        {!isFlipped ? (
          <div className="bg-white  rounded-md shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]  overflow-visible">
            <div className="p-4 pb-0">
              <Badges />
              <h3 className="text-[20px] font-bold text-black leading-snug mb-5">
                {name}
                {/* <span className="text-sm text-gray-700 ps-1">or similar</span> */}
              </h3>
              <div className="grid grid-cols-[1fr_160px] gap-2.5 items-start mb-6">
                <div className="min-w-0">
                  <SpecsList />
                </div>
                <div className="flex justify-end">
                  <img
                    src={primary_image}
                    alt={name}
                    className="w-[160px] h-[130px] object-contain mt-[-50px]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://placehold.co/160x130/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
                    }}
                  />
                </div>
              </div>
              <LocationDropdown
                locations={locations}
                selectedLocation={selectedLocation}
                mapLat={mapLat}
                mapLng={mapLng}
                onSelect={setSelectedLocation}
                onOpenChange={onDropdownOpenChange}
              />
            </div>
            <div className="flex items-center justify-between px-4 py-3 mt-3 border-t border-gray-100">
              <PriceDisplay />
              <BookButton />
            </div>
          </div>
        ) : (
          <SpecsBack
            name={name}
            imageUrl={primary_image}
            engine={engine}
            makeYear={make_year}
            mileage={mileage}
            kmLimit={kmLimit}
            onBack={() => setIsFlipped(false)}
          />
        )}
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden sm:block h-[390px]">
        <div
          style={{ perspective: "1000px" }}
          className="relative w-full h-full"
        >
          <div
            className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 w-full h-full bg-white shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]  rounded-md [backface-visibility:hidden] flex flex-col pt-4 ${isFlipped ? "pointer-events-none" : "pointer-events-auto"}`}
            >
              <h3 className="font-medium text-black text-[20px] leading-none text-center px-4 tracking-tight">
                {name}
              </h3>
              <div className="relative h-36 flex items-center justify-center mt-2 p-3">
                <img
                  src={primary_image}
                  alt={name}
                  className="h-full w-full object-contain drop-shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
                  }}
                />
              </div>
              <div className="relative flex items-center justify-center px-4 mt-1 mb-3 z-10">
                <div className="flex-1 border-t-2 border-gray-200" />
                <button
                  onClick={() => setIsFlipped(true)}
                  className="px-4 py-1 bg-white border border-gray-300 rounded-full text-[11px] font-normal text-black mx-3 hover:border-[#ffc107] transition-colors cursor-pointer"
                >
                  View Specs
                </button>
                <div className="flex-1 border-t-2 border-gray-200" />
              </div>
              <div className="px-4 pb-4 flex flex-col flex-1 justify-between">
                {/* Desktop spec row — each item gets its own icon */}
                <div className="flex justify-between items-center text-black text-sm font-normal px-1">
                  {[
                    { label: transmission, icon: "transmission" },
                    { label: seatsLabel, icon: "seat" },
                    { label: fuelTypeLabel, icon: "fuel" },
                  ].map(({ label, icon }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <SpecIcon type={icon} />
                      {label}
                    </div>
                  ))}
                </div>
                <LocationDropdown
                  locations={locations}
                  selectedLocation={selectedLocation}
                  mapLat={mapLat}
                  mapLng={mapLng}
                  onSelect={setSelectedLocation}
                  onOpenChange={onDropdownOpenChange}
                />
                <div className="flex justify-between items-end border-t-2 border-gray-200 pt-3 mt-3">
                  {price !== null ? (
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="text-[20px] font-bold text-black leading-none">
                        ₹{price.toLocaleString()}
                      </span>
                      <span className="text-[12px]  text-font-main-sub">
                        ({kmLimit})
                      </span>
                      {/* <span className="text-[12px] text-black">/day</span> */}
                    </div>
                  ) : (
                    <span className="text-[13px] text-gray-400">
                      Contact for price
                    </span>
                  )}
                  <BookButton size="md" />
                </div>
              </div>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 w-full h-full bg-white shadow-[0_6px_12px_-2px_rgba(50,50,93,0.25),0_3px_7px_-3px_rgba(0,0,0,0.3)] border border-gray-300/80 rounded-md [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col overflow-hidden pt-4 ${isFlipped ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <SpecsBack
                name={name}
                imageUrl={primary_image}
                engine={engine}
                makeYear={make_year}
                mileage={mileage}
                kmLimit={kmLimit}
                onBack={() => setIsFlipped(false)}
                desktop
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────

/**
 * Standalone location dropdown. Each instance owns its own open/dropUp
 * state and its own refs. This is mounted twice per card (once in the
 * mobile layout, once in the desktop layout) and only one of those is
 * ever visible at a given viewport width — but both stay in the DOM at
 * the same time because the mobile/desktop split is done with CSS
 * (`sm:hidden` / `hidden sm:block`), not by unmounting. Previously this
 * was a closure defined inside BikeCard that referenced a single shared
 * dropdownRef/triggerRef, so whichever instance rendered last (desktop)
 * "won" the ref, and the mobile instance's outside-click handler closed
 * the dropdown before the select click could register — selecting a
 * location on mobile never worked. Giving each instance its own
 * useRef/useState fixes that.
 */
function LocationDropdown({
  locations,
  selectedLocation,
  mapLat,
  mapLng,
  onSelect,
  onOpenChange,
}: {
  locations: VehicleLocation[];
  selectedLocation: VehicleLocation;
  mapLat: number;
  mapLng: number;
  onSelect: (loc: VehicleLocation) => void;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        onOpenChange?.(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOpenChange]);

  function handleTriggerClick() {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropUp(window.innerHeight - rect.bottom < 160);
    }
    const next = !open;
    setOpen(next);
    onOpenChange?.(next);
  }

  function handleSelect(loc: VehicleLocation) {
    onSelect(loc);
    setOpen(false);
    onOpenChange?.(false);
  }

  return (
    <div className="relative mt-3" ref={dropdownRef} style={{ zIndex: 50 }}>
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        className={`w-full flex items-center gap-2 border pl-3 py-2 cursor-pointer bg-white transition-all overflow-hidden ${
          open
            ? `border-gray-400 rounded-md ${dropUp ? "" : "rounded-b-none"}`
            : "border-gray-200 rounded-md hover:border-gray-300"
        }`}
      >
        <PinIcon />
        <span className="flex flex-col flex-1 min-w-0 py-0.5">
          <span className="text-[9.5px] tracking-wider text-font-dim leading-none">
            Available at
          </span>
          <span className="text-[13px] text-black leading-snug truncate mt-0.5">
            {selectedLocation.location_name}
          </span>
        </span>
        <MapThumbnail lat={mapLat} lng={mapLng} />
      </div>
      <div
        className={`absolute left-0 right-0 bg-white border border-gray-200 shadow-xl overflow-hidden transition-all duration-200 ease-in-out z-50 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 -translate-y-2 pointer-events-none scale-[0.98]"
        } ${dropUp ? "bottom-full border-b-0 rounded-t-lg origin-bottom" : "top-full border-t-0 rounded-b-lg origin-top"}`}
      >
        <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
          {locations.map((loc) => {
            const locPrice = getLocationPrice(loc);
            const isSelected = loc.id === selectedLocation.id;
            const locSoldOut = loc.available_count <= 0;
            return (
              <div
                key={loc.id}
                onClick={() => handleSelect(loc)}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer text-[13px] transition-colors ${isSelected ? "bg-gray-50 font-medium" : "hover:bg-gray-50/60"}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-3 h-3 rounded-[3px] shrink-0 ${
                      locSoldOut ? "bg-gray-300" : "bg-green-500"
                    }`}
                  />
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`truncate text-black ${isSelected ? "font-semibold" : ""}`}
                    >
                      {loc.location_name}
                    </span>
                    <span
                      className={`text-[11px] mt-0.5 truncate ${
                        locSoldOut ? "text-red-500" : "text-black"
                      } ${isSelected ? "font-semibold" : ""}`}
                    >
                      {locSoldOut
                        ? "Sold out"
                        : locPrice !== null
                          ? `₹${locPrice.toLocaleString()}`
                          : "No price"}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 ml-2">
                  {isSelected ? (
                    <div className="w-4 h-4 rounded-full border-[1.5px] border-gray-900 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gray-900" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border-[1.5px] border-gray-300" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MapThumbnail({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div className="relative w-8 h-8 mr-1 rounded-md self-stretch shrink-0 overflow-hidden">
      <img
        src={getMapThumbnailUrl(lat, lng)}
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="#1e3a5f"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" fill="white" stroke="none" />
        </svg>
      </div>
    </div>
  );
}

function SpecsBack({
  name,
  imageUrl,
  engine,
  makeYear,
  mileage,
  kmLimit,
  onBack,
  desktop = false,
}: {
  name: string;
  imageUrl: string;
  engine: string;
  makeYear: number;
  mileage: string;
  kmLimit: string;
  onBack: () => void;
  desktop?: boolean;
}) {
  return (
    <>
      {!desktop && (
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[20px] font-semibold text-black">{name}</h3>
            <button
              onClick={onBack}
              className="text-[11px] text-gray-500 border border-gray-200 rounded-full px-3 py-0.5 hover:border-[#ffc107] hover:text-black transition-colors"
            >
              &larr; Back
            </button>
          </div>
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-28 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://placehold.co/300x112/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
            }}
          />
        </div>
      )}
      {desktop && (
        <>
          <h3 className="font-medium text-black text-[16px] leading-none text-center px-4 tracking-tight">
            {name}
          </h3>
          <div className="relative h-36 flex items-center justify-center mt-2 p-3">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-contain opacity-90 drop-shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
              }}
            />
          </div>
          <div className="relative flex items-center justify-center px-4 mt-1 mb-3 z-10">
            <div className="flex-1 border-t border-gray-200" />
            <button
              onClick={onBack}
              className="px-4 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-semibold text-gray-600 mx-3 hover:border-[#ffc107] hover:text-black transition-colors cursor-pointer shadow-sm"
            >
              &larr; Back
            </button>
            <div className="flex-1 border-t border-gray-200" />
          </div>
        </>
      )}
      <div
        className={`grid grid-cols-2 ${desktop ? "flex-1" : "mt-3"} border-t border-gray-100`}
      >
        {[
          { label: "Engine", value: engine, highlight: true },
          { label: "Year", value: String(makeYear) },
          { label: "Mileage", value: mileage },
          {
            label: "Km limit",
            value:
              kmLimit !== null && kmLimit !== undefined
                ? String(kmLimit)
                : "Unlimited",
          },
        ].map(({ label, value, highlight }) => (
          <div
            key={label}
            className={`flex flex-col items-center justify-center py-4 border-t border-gray-100 ${highlight ? "bg-[#ffc107] border-r border-[#e6ad00]" : ""}`}
          >
            <span
              className={`text-[11px] mb-0.5 ${highlight ? "font-medium text-yellow-900/70" : "text-gray-500"}`}
            >
              {label}
            </span>
            <span className="text-[16px] font-semibold text-black">
              {value}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function PinIcon() {
  return (
    <svg
      className="text-gray-500 shrink-0"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SpecIcon({ type }: { type: string }) {
  // ── Seat (desktop row) ──────────────────────────────────────────────
  if (type === "seat") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3.5 h-3.5 text-gray-600 shrink-0"
      >
        <path d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0M18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0M3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0" />
      </svg>
    );
  }

  // ── Transmission (desktop row) ──────────────────────────────────────
  if (type === "transmission") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3.5 h-3.5 text-gray-600 shrink-0"
      >
        <path d="M19.25 14.25v-4.5l-1.374.416 3 4.5c.412.617 1.374.326 1.374-.416v-4.5a.75.75 0 0 0-1.5 0v4.5l1.374-.416-3-4.5c-.412-.617-1.374-.326-1.374.416v4.5a.75.75 0 0 0 1.5 0m3 6a3.75 3.75 0 0 0-3.75-3.75.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75a3.75 3.75 0 0 0 3.75-3.75m-1.5 0a2.25 2.25 0 0 1-2.25 2.25l.75.75v-6l-.75.75a2.25 2.25 0 0 1 2.25 2.25M18.5 4.5H20A2.25 2.25 0 0 0 20 0h-1.5a.75.75 0 0 0-.75.75v6a.75.75 0 0 0 1.5 0v-6l-.75.75H20A.75.75 0 0 1 20 3h-1.5a.75.75 0 0 0 0 1.5M4.25 6.75v4.5A2.25 2.25 0 0 0 6.5 13.5H8a.75.75 0 0 1 .75.75v4.5A2.25 2.25 0 0 0 11 21h3a.75.75 0 0 0 0-1.5h-3a.75.75 0 0 1-.75-.75v-4.5A2.25 2.25 0 0 0 8 12H6.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-1.5 0m3-3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0m1.5 0a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0" />
      </svg>
    );
  }

  // ── Fuel (desktop row + mobile SpecsList fallback) ──────────────────
  if (type === "fuel") {
    return (
      <svg
        className="w-3.5 h-3.5 text-gray-600 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    );
  }

  // ── Legacy keys used by mobile SpecsList ────────────────────────────
  const paths: Record<string, string> = {
    user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    gear: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    map: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  };

  return (
    <svg
      className="w-3.5 h-3.5 text-gray-500 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={paths[type]}
      />
    </svg>
  );
}
