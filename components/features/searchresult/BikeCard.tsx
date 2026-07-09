// "use client";

// import { useState, useEffect } from "react";
// import { createPortal } from "react-dom";
// import Image from "next/image";
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
//   // FIX: Store only the ID in state to allow `selectedLocation` to derive from the freshest `locations` prop.
//   const [selectedLocId, setSelectedLocId] = useState<number>(locations[0]?.id);
//   const selectedLocation =
//     locations.find((loc) => loc.id === selectedLocId) || locations[0];

//   const transmission = transmission_type
//     .split("_")
//     .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
//     .join(" ");
//   const seatsLabel = `${seats} Seater`;
//   const fuelTypeLabel = fuel_type.charAt(0) + fuel_type.slice(1).toLowerCase();
//   const engine = `${cc} cc`;
//   const mileage = `${mileage_kmpl} kmpl`;
//   const price = getLocationPrice(selectedLocation);
//   const kmLimit = selectedLocation?.pricing_packages?.[0]?.total_km_limit;
//   const totalPrice = price;
//   const mapLat = (selectedLocation as any).latitude ?? 11.6;
//   const mapLng = (selectedLocation as any).longitude ?? 76.2;
//   const isSoldOut = selectedLocation.available_count <= 0;

//   function tagClass(variant: string) {
//     if (variant === "highlight") return "bg-brand-yellow text-[#6b3d00]";
//     if (variant === "info") return "bg-blue-600 text-white";
//     return "bg-gray-100 text-gray-600 border border-gray-200";
//   }

//   function buildDetailsUrl() {
//     const params = new URLSearchParams();
//     params.set("location_id", String(selectedLocation.location_id));
//     params.set("location_name", selectedLocation.location_name);
//     params.set("city_id", String(selectedLocation.city_id));
//     if (selectedLocation.pricing_packages?.[0]?.id) {
//       params.set("package_id", String(selectedLocation.pricing_packages[0].id));
//     }
//     if (pickup) params.set("pickup", pickup);
//     if (dropoff) params.set("dropoff", dropoff);
//     return `/vehicledetails/${selectedLocation.id}?${params.toString()}`;
//   }

//   const PriceDisplay = () => (
//     <div>
//       {rentalDays && totalPrice !== null ? (
//         <>
//           <div className="flex flex-col items-start gap-0.5">
//             <span className="text-xs  font-thin text-font-dim">
//               Price for {rentalDays} day{rentalDays > 1 ? "s" : ""} :
//             </span>
//             <span className="text-xl mt-1.5 md:mt-1 md:text-lg font-bold text-black leading-none">
//               ₹{totalPrice!.toLocaleString()}
//             </span>
//           </div>
//         </>
//       ) : totalPrice !== null ? (
//         <div className="flex flex-col items-start gap-0.5">
//           <span className="text-xl md:text-lg font-bold text-black leading-none">
//             ₹{totalPrice.toLocaleString()}
//           </span>
//           <span className="text-[14px] text-font-main-sub">({kmLimit})</span>
//         </div>
//       ) : (
//         <span className="text-[13px] text-gray-400">Contact for price</span>
//       )}
//     </div>
//   );

//   const BookButton = ({ size = "sm" }: { size?: "sm" | "md" }) => {
//     if (isSoldOut) {
//       return (
//         <button
//           disabled
//           className={`bg-gray-200 text-gray-400 font-semibold rounded-lg cursor-not-allowed ${
//             size === "md"
//               ? "text-[13px] px-5 py-2 rounded-md"
//               : "text-[14px] px-6 py-2.5"
//           }`}
//         >
//           Sold Out
//         </button>
//       );
//     }
//     return (
//       <Link href={buildDetailsUrl()}>
//         <button
//           className={`bg-brand-yellow hover:bg-yellow-500 text-font-main-sub font-semibold rounded-lg transition-colors cursor-pointer ${
//             size === "md"
//               ? "text-[13px] px-5 py-2 rounded-md"
//               : "text-[14px] px-6 py-2.5"
//           }`}
//         >
//           Book now
//         </button>
//       </Link>
//     );
//   };

//   const SpecsList = () => (
//     <ul className="space-y-1.5 text-font-main-sub">
//       {[
//         { icon: "user", label: seatsLabel },
//         { icon: "gear", label: transmission },
//         { icon: "map", label: kmLimit ? `${kmLimit}` : "Unlimited Km" },
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
//     <div className="group relative w-full max-w-sm sm:max-w-none bg-transparent">
//       {/* ── MOBILE ── */}
//       <div className="sm:hidden">
//         <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-visible pb-2">
//           <div className="p-4 pb-0">
//             <Badges />
//             <h3 className="text-[20px] font-bold text-black leading-snug mb-3">
//               {name}
//             </h3>
//             <div className="grid grid-cols-[1fr_160px] gap-2.5 items-start mb-5">
//               <div className="min-w-0">
//                 <SpecsList />
//               </div>
//               {/* Mobile bike image */}
//               <div className="flex justify-end">
//                 <BikeImage
//                   src={primary_image}
//                   alt={name}
//                   width={160}
//                   height={130}
//                   sizes="160px"
//                   className="w-[160px] h-[130px] object-contain mt-[-50px]"
//                 />
//               </div>
//             </div>
//             <LocationDropdown
//               locations={locations}
//               selectedLocation={selectedLocation}
//               mapLat={mapLat}
//               mapLng={mapLng}
//               onSelect={(loc) => setSelectedLocId(loc.id)}
//               onOpenChange={onDropdownOpenChange}
//             />
//           </div>
//           <div className="flex items-center justify-between px-4 pt-3 pb-2 mt-3 border-t border-gray-100">
//             <PriceDisplay />
//             <BookButton />
//           </div>
//         </div>
//       </div>

//       {/* ── DESKTOP ── */}
//       <div className="hidden sm:block min-w-0">
//         <div className="relative w-full min-w-0 bg-white border border-gray-200/80 rounded-xl shadow-sm transition-shadow duration-200 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
//           {/* Desktop bike image */}
//           <div className="relative h-[150px] flex items-center justify-center bg-gray-50 m-3 mb-0 rounded-lg shrink-0 overflow-hidden">
//             <BikeImage
//               src={primary_image}
//               alt={name}
//               fill
//               sizes="(max-width: 1024px) 33vw, 25vw"
//               className="object-contain p-3"
//             />
//             {isSoldOut && (
//               <div className="absolute inset-0 rounded-lg bg-white/55 flex items-center justify-center z-10">
//                 <span className="text-[11px] font-semibold tracking-wide text-gray-500 bg-white px-2.5 py-1 rounded-full border border-gray-200">
//                   Sold out
//                 </span>
//               </div>
//             )}
//           </div>

//           <div className="p-4 pt-3 flex flex-col flex-1 min-w-0">
//             {(tags.length > 0 ||
//               selectedLocation.pay_at_pickup_enabled ||
//               fuel_type === "ELECTRIC") && (
//               <div className="flex flex-wrap gap-1.5 mb-2">
//                 {tags.map((t, i) => (
//                   <span
//                     key={i}
//                     className={`text-[10.5px] font-medium px-2 py-0.5 rounded-full ${tagClass(t.variant)}`}
//                   >
//                     {t.label}
//                   </span>
//                 ))}
//                 {selectedLocation.pay_at_pickup_enabled && (
//                   <span className="inline-flex items-center bg-green-50 text-green-700 text-[10.5px] font-medium px-2 py-0.5 rounded-full">
//                     Pay at pickup
//                   </span>
//                 )}
//                 {fuel_type === "ELECTRIC" && (
//                   <span className="inline-flex items-center bg-amber-50 text-amber-800 text-[10.5px] font-medium px-2 py-0.5 rounded-full">
//                     Electric
//                   </span>
//                 )}
//               </div>
//             )}

//             <h3 className="text-base font-semibold text-font-main-sub leading-tight tracking-tight truncate">
//               {name}
//             </h3>

//             <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3">
//               {[
//                 { icon: "map", label: kmLimit ? kmLimit : "Unlimited Km" },
//                 { icon: "transmission", label: `${mileage}` },
//               ].map(({ icon, label }) => (
//                 <div
//                   key={label}
//                   className="flex items-center gap-1.5 text-sm text-font-main-sub min-w-0"
//                 >
//                   <SpecIcon type={icon} />
//                   <span className="truncate">{label}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-4 min-w-0">
//               <LocationDropdown
//                 locations={locations}
//                 selectedLocation={selectedLocation}
//                 mapLat={mapLat}
//                 mapLng={mapLng}
//                 onSelect={(loc) => setSelectedLocId(loc.id)}
//                 onOpenChange={onDropdownOpenChange}
//                 compact
//               />
//             </div>

//             <div className="flex items-end justify-between gap-2 mt-4 pt-3 border-t border-gray-100 min-w-0">
//               <div className="min-w-0">
//                 <PriceDisplay />
//               </div>
//               <div className="shrink-0">
//                 <BookButton size="md" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── BikeImage helper ──────────────────────────────────────────────────
// // Shared between mobile and desktop. Handles fallback
// // gracefully without needing placehold.co as an external domain.

// type BikeImageProps =
//   | {
//       src: string;
//       alt: string;
//       fill: true;
//       sizes: string;
//       className?: string;
//       width?: never;
//       height?: never;
//     }
//   | {
//       src: string;
//       alt: string;
//       fill?: never;
//       sizes: string;
//       width: number;
//       height: number;
//       className?: string;
//     };

// function BikeImage({
//   src,
//   alt,
//   fill,
//   sizes,
//   width,
//   height,
//   className,
// }: BikeImageProps) {
//   const [imgSrc, setImgSrc] = useState<string | null>(src);

//   if (!imgSrc) {
//     return (
//       <div
//         className={`flex items-center justify-center bg-gray-50 ${className ?? ""}`}
//         style={!fill ? { width, height } : undefined}
//       >
//         <span className="text-gray-400 text-xs font-medium text-center px-2">
//           {alt}
//         </span>
//       </div>
//     );
//   }

//   if (fill) {
//     return (
//       <Image
//         src={imgSrc}
//         alt={alt}
//         fill
//         sizes={sizes}
//         quality={75}
//         className={className}
//         onError={() => setImgSrc(null)}
//       />
//     );
//   }

//   return (
//     <Image
//       src={imgSrc}
//       alt={alt}
//       width={width!}
//       height={height!}
//       sizes={sizes}
//       quality={75}
//       className={className}
//       onError={() => setImgSrc(null)}
//     />
//   );
// }

// // ── Sub-components ────────────────────────────────────────────────────

// function LocationDropdown({
//   locations,
//   selectedLocation,
//   mapLat,
//   mapLng,
//   onSelect,
//   onOpenChange,
//   compact = false,
// }: {
//   locations: VehicleLocation[];
//   selectedLocation: VehicleLocation;
//   mapLat: number;
//   mapLng: number;
//   onSelect: (loc: VehicleLocation) => void;
//   onOpenChange?: (open: boolean) => void;
//   compact?: boolean;
// }) {
//   if (compact) {
//     return (
//       <InlineLocationPicker
//         locations={locations}
//         selectedLocation={selectedLocation}
//         onSelect={onSelect}
//         onOpenChange={onOpenChange}
//       />
//     );
//   }

//   const [open, setOpen] = useState(false);

//   function handleOpen() {
//     setOpen(true);
//     onOpenChange?.(true);
//   }

//   function handleClose() {
//     setOpen(false);
//     onOpenChange?.(false);
//   }

//   function handleSelect(loc: VehicleLocation) {
//     onSelect(loc);
//     handleClose();
//   }

//   return (
//     <>
//       <div
//         onClick={handleOpen}
//         role="button"
//         tabIndex={0}
//         className={`w-full mt-3 flex items-center gap-2 border cursor-pointer bg-white transition-colors overflow-hidden pl-3 pr-2.5 py-2.5 rounded-lg ${
//           open ? "border-gray-400" : "border-gray-200 hover:border-gray-300"
//         }`}
//       >
//         <PinIcon />
//         <span className="flex flex-col flex-1 min-w-0 py-0.5">
//           <span className="text-[10px] font-medium tracking-wide text-gray-400 leading-none">
//             Available at
//           </span>
//           <span className="text-[13.5px] font-semibold text-gray-900 leading-snug truncate mt-0.5">
//             {selectedLocation.location_name}
//           </span>
//         </span>
//         <MapThumbnail lat={mapLat} lng={mapLng} />
//         <ChevronIcon open={open} />
//       </div>

//       <LocationSheet
//         open={open}
//         onClose={handleClose}
//         locations={locations}
//         selectedLocation={selectedLocation}
//         onSelect={handleSelect}
//       />
//     </>
//   );
// }

// // Mobile location picker, rendered as a native-feeling bottom sheet via
// // portal so it always docks to the viewport instead of being positioned
// // (and potentially clipped) relative to a card sitting inside a scrolling
// // list. No viewport math needed since it never has to decide whether to
// // flip up or down.
// function LocationSheet({
//   open,
//   onClose,
//   locations,
//   selectedLocation,
//   onSelect,
// }: {
//   open: boolean;
//   onClose: () => void;
//   locations: VehicleLocation[];
//   selectedLocation: VehicleLocation;
//   onSelect: (loc: VehicleLocation) => void;
// }) {
//   const [mounted, setMounted] = useState(false);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     if (open) {
//       setMounted(true);
//       const raf = requestAnimationFrame(() => setVisible(true));
//       document.body.style.overflow = "hidden";
//       return () => cancelAnimationFrame(raf);
//     }
//     setVisible(false);
//     document.body.style.overflow = "";
//     const timeout = setTimeout(() => setMounted(false), 300);
//     return () => clearTimeout(timeout);
//   }, [open]);

//   // Safety net: always release the scroll lock if the card unmounts mid-open.
//   useEffect(() => {
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, []);

//   useEffect(() => {
//     if (!open) return;
//     function handleKey(e: KeyboardEvent) {
//       if (e.key === "Escape") onClose();
//     }
//     document.addEventListener("keydown", handleKey);
//     return () => document.removeEventListener("keydown", handleKey);
//   }, [open, onClose]);

//   if (!mounted || typeof document === "undefined") return null;

//   return createPortal(
//     <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
//       <div
//         onClick={onClose}
//         className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${
//           visible ? "opacity-100" : "opacity-0"
//         }`}
//       />
//       <div
//         className={`absolute inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out ${
//           visible ? "translate-y-0" : "translate-y-full"
//         } animate-slide-up sm:animate-scale-in`}
//         style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
//       >
//         <div className="flex justify-center pt-2.5 pb-1">
//           <div className="w-9 h-1 rounded-full bg-gray-300" />
//         </div>
//         <div className="flex items-center justify-between px-4 pt-1 pb-3 border-b border-gray-100">
//           <h4 className="text-[15px] font-semibold text-gray-900">
//             Select pickup location
//           </h4>
//           <button
//             onClick={onClose}
//             aria-label="Close"
//             className="p-1 -mr-1 text-gray-400 hover:text-gray-600"
//           >
//             <CloseIcon />
//           </button>
//         </div>
//         <div className="max-h-[55vh] overflow-y-auto">
//           {locations.map((loc) => {
//             const locPrice = getLocationPrice(loc);
//             const isSelected = loc.id === selectedLocation.id;
//             const locSoldOut = loc.available_count <= 0;
//             return (
//               <button
//                 key={loc.id}
//                 type="button"
//                 onClick={() => onSelect(loc)}
//                 className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left border-b border-gray-50 last:border-b-0 transition-colors ${
//                   isSelected ? "bg-amber-50/70" : "active:bg-gray-50"
//                 }`}
//               >
//                 <span className="flex items-center gap-3 min-w-0">
//                   <span
//                     className={`w-2 h-2 rounded-full shrink-0 ${
//                       locSoldOut ? "bg-gray-300" : "bg-green-500"
//                     }`}
//                   />
//                   <span className="flex flex-col items-start min-w-0">
//                     <span
//                       className={`text-[14px] truncate ${
//                         isSelected
//                           ? "font-semibold text-gray-900"
//                           : "font-medium text-gray-800"
//                       }`}
//                     >
//                       {loc.location_name}
//                     </span>
//                     {locSoldOut && (
//                       <span className="text-[11px] text-red-500 font-medium mt-0.5">
//                         Sold out
//                       </span>
//                     )}
//                   </span>
//                 </span>
//                 <span className="flex items-center gap-2 shrink-0">
//                   {!locSoldOut && locPrice !== null && (
//                     <span
//                       className={`text-[13.5px] ${
//                         isSelected
//                           ? "font-bold text-gray-900"
//                           : "font-semibold text-gray-500"
//                       }`}
//                     >
//                       {formatINR(locPrice)}
//                     </span>
//                   )}
//                   {isSelected && (
//                     <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-yellow shrink-0">
//                       <CheckIcon />
//                     </span>
//                   )}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>,
//     document.body,
//   );
// }

// function InlineLocationPicker({
//   locations,
//   selectedLocation,
//   onSelect,
//   onOpenChange,
// }: {
//   locations: VehicleLocation[];
//   selectedLocation: VehicleLocation;
//   onSelect: (loc: VehicleLocation) => void;
//   onOpenChange?: (open: boolean) => void;
// }) {
//   const [open, setOpen] = useState(false);

//   if (locations.length <= 1) {
//     return (
//       <div className="flex items-center gap-1.5 text-[12.5px] text-gray-500 py-1">
//         <PinIcon />
//         <span className="truncate text-font-main-sub">
//           {selectedLocation.location_name}
//         </span>
//       </div>
//     );
//   }

//   function toggle() {
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
//     <div className="border border-gray-200 rounded-lg overflow-hidden">
//       <button
//         type="button"
//         onClick={toggle}
//         aria-expanded={open}
//         className="w-full hover:cursor-pointer flex items-center gap-2 px-2.5 py-1.5 bg-white hover:bg-gray-50 transition-colors text-left"
//       >
//         <PinIcon />
//         <span className="flex-1 min-w-0 text-[12.5px] text-font-main-sub truncate">
//           {selectedLocation.location_name}
//         </span>
//         {locations.length > 1 && (
//           <span className="text-[10.5px] text-font-main-sub shrink-0">
//             +{locations.length - 1} more
//           </span>
//         )}
//         <ChevronIcon open={open} />
//       </button>

//       {open && (
//         <div className="border-t border-gray-100 divide-y divide-gray-100 max-h-44 overflow-y-auto">
//           {locations.map((loc) => {
//             const locPrice = getLocationPrice(loc);
//             const isSelected = loc.id === selectedLocation.id;
//             const locSoldOut = loc.available_count <= 0;
//             return (
//               <button
//                 key={loc.id}
//                 type="button"
//                 onClick={() => handleSelect(loc)}
//                 className={`w-full flex hover:cursor-pointer items-center justify-between gap-2 px-2.5 py-2 text-left transition-colors ${
//                   isSelected ? "bg-gray-50" : "hover:bg-gray-50/70"
//                 }`}
//               >
//                 <span className="flex items-center gap-2 min-w-0">
//                   <span
//                     className={`w-1.5 h-1.5 rounded-full shrink-0 ${
//                       locSoldOut ? "bg-gray-300" : "bg-green-500"
//                     }`}
//                   />
//                   <span
//                     className={`text-[12.5px] truncate ${
//                       isSelected ? "font-medium text-black" : "text-gray-700"
//                     }`}
//                   >
//                     {loc.location_name}
//                   </span>
//                 </span>
//                 <span
//                   className={`text-[11.5px] shrink-0 ${
//                     locSoldOut
//                       ? "text-red-500"
//                       : isSelected
//                         ? "font-medium text-black"
//                         : "text-gray-500"
//                   }`}
//                 >
//                   {locSoldOut
//                     ? "Sold out"
//                     : locPrice !== null
//                       ? `₹${locPrice.toLocaleString()}`
//                       : "—"}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// // Shared price formatter used by the new location sheet: some price fields
// // come through as decimal strings (e.g. "1699.00"), and calling
// // .toLocaleString() directly on a string just returns it unchanged instead
// // of grouping/rounding it.
// function formatINR(value: number | string) {
//   return `₹${Number(value).toLocaleString("en-IN", {
//     maximumFractionDigits: 0,
//   })}`;
// }

// function CheckIcon() {
//   return (
//     <svg
//       width="12"
//       height="12"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="#6b3d00"
//       strokeWidth="3"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M20 6L9 17l-5-5" />
//     </svg>
//   );
// }

// function CloseIcon() {
//   return (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6L6 18M6 6l12 12" />
//     </svg>
//   );
// }

// function ChevronIcon({ open }: { open: boolean }) {
//   return (
//     <svg
//       className={`text-gray-400 shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
//       width="14"
//       height="14"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       viewBox="0 0 24 24"
//     >
//       <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );
// }

// function MapThumbnail({ lat, lng }: { lat: number; lng: number }) {
//   const [imgSrc, setImgSrc] = useState<string | null>(
//     getMapThumbnailUrl(lat, lng),
//   );

//   return (
//     <div className="relative w-8 h-8 mr-1 rounded-md self-stretch shrink-0 overflow-hidden">
//       {imgSrc ? (
//         <Image
//           src={imgSrc}
//           alt=""
//           fill
//           sizes="32px"
//           quality={60}
//           className="object-cover"
//           onError={() => setImgSrc(null)}
//         />
//       ) : (
//         <div className="w-full h-full bg-gray-100" />
//       )}
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

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { getLocationPrice } from "@/lib/vehicleUtils";
import type {
  VehicleSearchResult,
  VehicleLocation,
} from "@/types/vehicles.types";

interface BikeCardProps extends VehicleSearchResult {
  onDropdownOpenChange?: (open: boolean) => void;
  tags?: { label: string; variant: "default" | "highlight" | "info" }[];
  rentalDays?: number;
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
  // FIX: Store only the ID in state to allow `selectedLocation` to derive from the freshest `locations` prop.
  const [selectedLocId, setSelectedLocId] = useState<number>(locations[0]?.id);
  const selectedLocation =
    locations.find((loc) => loc.id === selectedLocId) || locations[0];

  const transmission = transmission_type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  const seatsLabel = `${seats} Seater`;
  const fuelTypeLabel = fuel_type.charAt(0) + fuel_type.slice(1).toLowerCase();
  const engine = `${cc} cc`;
  const mileage = `${mileage_kmpl} kmpl`;
  const price = getLocationPrice(selectedLocation);
  const kmLimit = selectedLocation?.pricing_packages?.[0]?.total_km_limit;
  const totalPrice = price;
  const isSoldOut = selectedLocation.available_count <= 0;

  function tagClass(variant: string) {
    if (variant === "highlight") return "bg-brand-yellow text-[#6b3d00]";
    if (variant === "info") return "bg-blue-600 text-white";
    return "bg-gray-100 text-gray-600 border border-gray-200";
  }

  function buildDetailsUrl() {
    const params = new URLSearchParams();
    params.set("location_id", String(selectedLocation.location_id));
    params.set("location_name", selectedLocation.location_name);
    params.set("city_id", String(selectedLocation.city_id));
    if (selectedLocation.pricing_packages?.[0]?.id) {
      params.set("package_id", String(selectedLocation.pricing_packages[0].id));
    }
    if (pickup) params.set("pickup", pickup);
    if (dropoff) params.set("dropoff", dropoff);
    return `/vehicledetails/${selectedLocation.id}?${params.toString()}`;
  }

  const PriceDisplay = () => (
    <div>
      {rentalDays && totalPrice !== null ? (
        <>
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-xs  font-thin text-font-dim">
              Price for {rentalDays} day{rentalDays > 1 ? "s" : ""} :
            </span>
            <span className="text-xl mt-1.5 md:mt-1 md:text-lg font-bold text-black leading-none">
              ₹{totalPrice!.toLocaleString()}
            </span>
          </div>
        </>
      ) : totalPrice !== null ? (
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-xl md:text-lg font-bold text-black leading-none">
            ₹{totalPrice.toLocaleString()}
          </span>
          <span className="text-[14px] text-font-main-sub">({kmLimit})</span>
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
          className={`bg-brand-yellow hover:bg-yellow-500 text-font-main-sub font-semibold rounded-lg transition-colors cursor-pointer ${
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
    <ul className="space-y-2 text-font-main-sub">
      {[
        { icon: "user", label: seatsLabel },
        { icon: "gear", label: transmission },
        { icon: "map", label: kmLimit ? `${kmLimit}` : "Unlimited Km" },
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
    <div className="group relative w-full max-w-sm sm:max-w-none bg-transparent">
      {/* ── MOBILE ── */}
      <div className="sm:hidden">
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-visible pb-2">
          <div className="p-4 pb-0">
            <Badges />
            <h3 className="text-[20px] font-bold text-black leading-snug mb-3">
              {name}
            </h3>
            <div className="grid grid-cols-[1fr_160px] gap-2.5 items-start mb-5">
              <div className="min-w-0">
                <SpecsList />
              </div>
              {/* Mobile bike image */}
              <div className="flex justify-end">
                <BikeImage
                  src={primary_image}
                  alt={name}
                  width={160}
                  height={130}
                  sizes="160px"
                  className="w-[160px] h-[130px] object-contain mt-[-50px]"
                />
              </div>
            </div>
            <LocationDropdown
              locations={locations}
              selectedLocation={selectedLocation}
              onSelect={(loc) => setSelectedLocId(loc.id)}
              onOpenChange={onDropdownOpenChange}
            />
          </div>
          <div className="flex items-center justify-between px-4 pt-3 pb-2 mt-3 border-t border-gray-100">
            <PriceDisplay />
            <BookButton />
          </div>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden sm:block min-w-0">
        <div className="relative w-full min-w-0 bg-white border border-gray-200/80 rounded-xl shadow-sm transition-shadow duration-200 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
          {/* Desktop bike image */}
          <div className="relative h-[150px] flex items-center justify-center bg-gray-50 m-3 mb-0 rounded-lg shrink-0 overflow-hidden">
            <BikeImage
              src={primary_image}
              alt={name}
              fill
              sizes="(max-width: 1024px) 33vw, 25vw"
              className="object-contain p-3"
            />
            {isSoldOut && (
              <div className="absolute inset-0 rounded-lg bg-white/55 flex items-center justify-center z-10">
                <span className="text-[11px] font-semibold tracking-wide text-gray-500 bg-white px-2.5 py-1 rounded-full border border-gray-200">
                  Sold out
                </span>
              </div>
            )}
          </div>

          <div className="p-4 pt-3 flex flex-col flex-1 min-w-0">
            {(tags.length > 0 ||
              selectedLocation.pay_at_pickup_enabled ||
              fuel_type === "ELECTRIC") && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((t, i) => (
                  <span
                    key={i}
                    className={`text-[10.5px] font-medium px-2 py-0.5 rounded-full ${tagClass(t.variant)}`}
                  >
                    {t.label}
                  </span>
                ))}
                {selectedLocation.pay_at_pickup_enabled && (
                  <span className="inline-flex items-center bg-green-50 text-green-700 text-[10.5px] font-medium px-2 py-0.5 rounded-full">
                    Pay at pickup
                  </span>
                )}
                {fuel_type === "ELECTRIC" && (
                  <span className="inline-flex items-center bg-amber-50 text-amber-800 text-[10.5px] font-medium px-2 py-0.5 rounded-full">
                    Electric
                  </span>
                )}
              </div>
            )}

            <h3 className="text-base font-semibold text-font-main-sub leading-tight tracking-tight truncate">
              {name}
            </h3>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3">
              {[
                { icon: "map", label: kmLimit ? kmLimit : "Unlimited Km" },
                { icon: "transmission", label: `${mileage}` },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-sm text-font-main-sub min-w-0"
                >
                  <SpecIcon type={icon} />
                  <span className="truncate">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 min-w-0">
              <LocationDropdown
                locations={locations}
                selectedLocation={selectedLocation}
                onSelect={(loc) => setSelectedLocId(loc.id)}
                onOpenChange={onDropdownOpenChange}
                compact
              />
            </div>

            <div className="flex items-end justify-between gap-2 mt-4 pt-3 border-t border-gray-100 min-w-0">
              <div className="min-w-0">
                <PriceDisplay />
              </div>
              <div className="shrink-0">
                <BookButton size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── BikeImage helper ──────────────────────────────────────────────────
// Shared between mobile and desktop. Handles fallback
// gracefully without needing placehold.co as an external domain.

type BikeImageProps =
  | {
      src: string;
      alt: string;
      fill: true;
      sizes: string;
      className?: string;
      width?: never;
      height?: never;
    }
  | {
      src: string;
      alt: string;
      fill?: never;
      sizes: string;
      width: number;
      height: number;
      className?: string;
    };

function BikeImage({
  src,
  alt,
  fill,
  sizes,
  width,
  height,
  className,
}: BikeImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(src);

  if (!imgSrc) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 ${className ?? ""}`}
        style={!fill ? { width, height } : undefined}
      >
        <span className="text-gray-400 text-xs font-medium text-center px-2">
          {alt}
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={sizes}
        quality={75}
        className={className}
        onError={() => setImgSrc(null)}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width!}
      height={height!}
      sizes={sizes}
      quality={75}
      className={className}
      onError={() => setImgSrc(null)}
    />
  );
}

// ── Sub-components ────────────────────────────────────────────────────

function LocationDropdown({
  locations,
  selectedLocation,
  onSelect,
  onOpenChange,
  compact = false,
}: {
  locations: VehicleLocation[];
  selectedLocation: VehicleLocation;
  onSelect: (loc: VehicleLocation) => void;
  onOpenChange?: (open: boolean) => void;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <InlineLocationPicker
        locations={locations}
        selectedLocation={selectedLocation}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
      />
    );
  }

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
    onOpenChange?.(true);
  }

  function handleClose() {
    setOpen(false);
    onOpenChange?.(false);
  }

  function handleSelect(loc: VehicleLocation) {
    onSelect(loc);
    handleClose();
  }

  return (
    <>
      <div
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        className={`w-full mt-3 flex items-center gap-2.5 cursor-pointer transition-colors overflow-hidden pl-3.5 pr-3 py-2.5 rounded-lg ${
          open ? "bg-gray-100" : "bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <PinIcon />
        <span className="flex flex-col flex-1 min-w-0 py-0.5">
          <span className="text-[10px] font-medium tracking-wide text-gray-400 leading-none">
            Available at
          </span>
          <span className="text-[13.5px] font-semibold text-gray-900 leading-snug truncate mt-0.5">
            {selectedLocation.location_name}
          </span>
        </span>
        <ChevronIcon open={open} />
      </div>

      <LocationSheet
        open={open}
        onClose={handleClose}
        locations={locations}
        selectedLocation={selectedLocation}
        onSelect={handleSelect}
      />
    </>
  );
}

// Mobile location picker, rendered as a native-feeling bottom sheet via
// portal so it always docks to the viewport instead of being positioned
// (and potentially clipped) relative to a card sitting inside a scrolling
// list. No viewport math needed since it never has to decide whether to
// flip up or down.
function LocationSheet({
  open,
  onClose,
  locations,
  selectedLocation,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  locations: VehicleLocation[];
  selectedLocation: VehicleLocation;
  onSelect: (loc: VehicleLocation) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    document.body.style.overflow = "";
    const timeout = setTimeout(() => setMounted(false), 300);
    return () => clearTimeout(timeout);
  }, [open]);

  // Safety net: always release the scroll lock if the card unmounts mid-open.
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out ${
          visible ? "translate-y-0" : "translate-y-full"
        } animate-slide-up sm:animate-scale-in`}
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="w-9 h-1 rounded-full bg-gray-300" />
        </div>
        <div className="flex items-center justify-between px-4 pt-1 pb-3 border-b border-gray-100">
          <h4 className="text-[15px] font-semibold text-gray-900">
            Select pickup location
          </h4>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 -mr-1 text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto">
          {locations.map((loc) => {
            const locPrice = getLocationPrice(loc);
            const isSelected = loc.id === selectedLocation.id;
            const locSoldOut = loc.available_count <= 0;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => onSelect(loc)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left border-b border-gray-50 last:border-b-0 transition-colors ${
                  isSelected ? "bg-amber-50/70" : "active:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      locSoldOut ? "bg-gray-300" : "bg-green-500"
                    }`}
                  />
                  <span className="flex flex-col items-start min-w-0">
                    <span
                      className={`text-[14px] truncate ${
                        isSelected
                          ? "font-semibold text-gray-900"
                          : "font-medium text-gray-800"
                      }`}
                    >
                      {loc.location_name}
                    </span>
                    {locSoldOut && (
                      <span className="text-[11px] text-red-500 font-medium mt-0.5">
                        Sold out
                      </span>
                    )}
                  </span>
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  {!locSoldOut && locPrice !== null && (
                    <span
                      className={`text-[13.5px] ${
                        isSelected
                          ? "font-bold text-gray-900"
                          : "font-semibold text-gray-500"
                      }`}
                    >
                      {formatINR(locPrice)}
                    </span>
                  )}
                  {isSelected && (
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-yellow shrink-0">
                      <CheckIcon />
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function InlineLocationPicker({
  locations,
  selectedLocation,
  onSelect,
  onOpenChange,
}: {
  locations: VehicleLocation[];
  selectedLocation: VehicleLocation;
  onSelect: (loc: VehicleLocation) => void;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);

  if (locations.length <= 1) {
    return (
      <div className="flex items-center gap-1.5 text-[12.5px] text-gray-500 py-1">
        <PinIcon />
        <span className="truncate text-font-main-sub">
          {selectedLocation.location_name}
        </span>
      </div>
    );
  }

  function toggle() {
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
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="w-full hover:cursor-pointer flex items-center gap-2 px-2.5 py-1.5 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <PinIcon />
        <span className="flex-1 min-w-0 text-[12.5px] text-font-main-sub truncate">
          {selectedLocation.location_name}
        </span>
        {locations.length > 1 && (
          <span className="text-[10.5px] text-font-main-sub shrink-0">
            +{locations.length - 1} more
          </span>
        )}
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="border-t border-gray-100 divide-y divide-gray-100 max-h-44 overflow-y-auto">
          {locations.map((loc) => {
            const locPrice = getLocationPrice(loc);
            const isSelected = loc.id === selectedLocation.id;
            const locSoldOut = loc.available_count <= 0;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => handleSelect(loc)}
                className={`w-full flex hover:cursor-pointer items-center justify-between gap-2 px-2.5 py-2 text-left transition-colors ${
                  isSelected ? "bg-gray-50" : "hover:bg-gray-50/70"
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      locSoldOut ? "bg-gray-300" : "bg-green-500"
                    }`}
                  />
                  <span
                    className={`text-[12.5px] truncate ${
                      isSelected ? "font-medium text-black" : "text-gray-700"
                    }`}
                  >
                    {loc.location_name}
                  </span>
                </span>
                <span
                  className={`text-[11.5px] shrink-0 ${
                    locSoldOut
                      ? "text-red-500"
                      : isSelected
                        ? "font-medium text-black"
                        : "text-gray-500"
                  }`}
                >
                  {locSoldOut
                    ? "Sold out"
                    : locPrice !== null
                      ? `₹${locPrice.toLocaleString()}`
                      : "—"}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Shared price formatter used by the location sheet: some price fields
// come through as decimal strings (e.g. "1699.00"), and calling
// .toLocaleString() directly on a string just returns it unchanged instead
// of grouping/rounding it.
function formatINR(value: number | string) {
  return `₹${Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b3d00"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`text-gray-400 shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
