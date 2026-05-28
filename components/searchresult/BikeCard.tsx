
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { VehicleSearchResult, VehicleLocation } from "@/actions/searchVehicles";

interface BikeCardProps extends VehicleSearchResult {
  onDropdownOpenChange?: (open: boolean) => void;
}

function getLocationPrice(loc: VehicleLocation): number | null {
  // FIX: use "price" field, not "price_per_day"
  if (loc.pricing_packages.length > 0) {
    const prices = loc.pricing_packages
      .map((p) => parseFloat(p.price))
      .filter((n) => !isNaN(n));
    if (prices.length > 0) return Math.min(...prices);
  }
  if (loc.daily_price !== null && loc.daily_price !== undefined) {
    const parsed = parseFloat(loc.daily_price);
    if (!isNaN(parsed)) return parsed;
  }
  return null;
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
}: BikeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<VehicleLocation>(locations[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const imageUrl = primary_image;
  const transmission = transmission_type
  .split('_')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ');
  const seatsLabel = `${seats} Seater`;
  const fuelTypeLabel = fuel_type.charAt(0) + fuel_type.slice(1).toLowerCase();
  const engine = `${cc} cc`;
  const mileage = `${mileage_kmpl} kmpl`;

  const price = getLocationPrice(selectedLocation);
  const kmLimit = selectedLocation.km_limit_per_day;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        onDropdownOpenChange?.(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onDropdownOpenChange]);

  function handleTriggerClick() {
    if (!dropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropUp(window.innerHeight - rect.bottom < 160);
    }
    const next = !dropdownOpen;
    setDropdownOpen(next);
    onDropdownOpenChange?.(next);
  }

  function handleSelectLocation(loc: VehicleLocation) {
    setSelectedLocation(loc);
    setDropdownOpen(false);
    onDropdownOpenChange?.(false);
  }

  return (
    <div className="px-4 sm:px-0 group relative w-full max-w-sm h-[410px] bg-transparent shadow-lg md:shadow-none" >
      <div style={{ perspective: "1000px" }} className="relative w-full h-full">
        <div
          className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* FRONT FACE */}
          <div
            className={`absolute inset-0 w-full h-full bg-white border border-gray-300/80 rounded-md hover:shadow-sm transition-shadow [backface-visibility:hidden] flex flex-col pt-4 ${
              isFlipped ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            <h3 className="font-semibold sm:font-medium text-black text-[17px] leading-none text-center px-4 tracking-tight">
              {name}
            </h3>

            <div className="relative h-36 flex items-center justify-center mt-2 p-3">
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-contain drop-shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
                }}
              />
            </div>

            <div className="relative flex items-center justify-center px-4 mt-1 mb-3 z-10">
              <div className="flex-1 border-t-2 border-gray-200"></div>
              <button
                onClick={() => setIsFlipped(true)}
                className="px-4 py-1 bg-white border border-gray-300 rounded-full text-[11px] sm:text-[11px] font-light text-black mx-3 hover:border-[#ffc107] transition-colors cursor-pointer shadow-sm"
              >
                View Specs
              </button>
              <div className="flex-1 border-t-2 border-gray-200"></div>
            </div>

            <div className="px-4 pb-4 flex flex-col flex-1 justify-between">
              {/* Quick specs */}
              <div className="flex justify-between items-center text-black text-[13px] font-medium px-1">
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
                  {seatsLabel}
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {fuelTypeLabel}
                </div>
              </div>

              {/* Location dropdown */}
              <div
                className="relative mt-3"
                ref={dropdownRef}
                style={{ zIndex: dropdownOpen ? 50 : "auto" }}
              >
                <div
                  ref={triggerRef}
                  onClick={handleTriggerClick}
                  className={`w-full flex items-center gap-2 border px-3 py-2 cursor-pointer bg-white transition-colors ${
                    dropdownOpen
                      ? `border-[#ffc107] rounded-[10px] ${dropUp ? "" : "rounded-b-none"}`
                      : "border-gray-200 rounded-[10px] hover:border-[#ffc107]"
                  }`}
                >
                  <svg
                    className="text-[#ffc107] shrink-0"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="flex flex-col flex-1 min-w-0">
                    <span className="text-[9.5px] tracking-wider font-thin text-gray-500 leading-none">
                      Available at
                    </span>
                    <span className="text-[13px] font-thin text-black leading-snug truncate mt-1">
                      {selectedLocation.location_name}
                    </span>
                  </span>
                  <svg
                    className={`shrink-0 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180 text-[#ffc107]" : "text-gray-300"
                    }`}
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {dropdownOpen && (
                  <div
                    className={`absolute left-0 right-0 bg-white border border-[#ffc107] overflow-hidden shadow-lg ${
                      dropUp
                        ? "bottom-full border-b-0 rounded-t-[10px]"
                        : "top-full border-t-0 rounded-b-[10px]"
                    }`}
                  >
                    {locations.map((loc) => {
                      const locPrice = getLocationPrice(loc);
                      const isSelected = loc.id === selectedLocation.id;
                      return (
                        <div
                          key={loc.id}
                          onClick={() => handleSelectLocation(loc)}
                          className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer text-[12.5px] ${
                            isSelected ? "bg-amber-50 text-black" : "hover:bg-amber-50/50 text-gray-700"
                          }`}
                        >
                          <svg
                            className="text-[#ffc107] shrink-0"
                            width="13"
                            height="13"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span className="flex-1 truncate">{loc.location_name}</span>
                          {locPrice !== null ? (
                            <span className="text-[11px] font-medium text-black shrink-0">
                              ₹{locPrice.toLocaleString("en-IN")}/day
                            </span>
                          ) : (
                            <span className="text-[11px] text-gray-400 shrink-0">No price</span>
                          )}
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffc107] shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Price & Book */}
              <div className="flex justify-between items-end border-t-2 border-gray-200 pt-3 mt-3">
                <div>
                  {price !== null ? (
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-black font-semibold text-[19px] leading-none">
                        ₹{price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[11px] text-black">/day</span>
                    </div>
                  ) : (
                    <span className="text-[13px] text-gray-400">Contact for price</span>
                  )}
                </div>
                <Link href={`/vehicledetails/${id}`}>
                  <button className="bg-[#ffc107] hover:bg-yellow-500 text-black text-[13px] font-semibold px-5 py-2 rounded-xl transition-colors cursor-pointer">
                    Book now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div
            className={`absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-xl shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col overflow-hidden pt-4 ${
              isFlipped ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <h3 className="font-medium text-black text-[16px] leading-none text-center px-4 tracking-tight">
              {name}
            </h3>

            <div className="relative h-36 flex items-center justify-center mt-2 p-3">
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-contain opacity-90 drop-shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
                }}
              />
            </div>

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

            <div className="flex-1 grid grid-cols-2 grid-rows-2">
              <div className="bg-[#ffc107] border-r border-t border-[#e6ad00] flex flex-col items-center justify-center p-3">
                <span className="text-[12px] font-medium text-yellow-900/80 mb-0.5">Engine</span>
                <span className="text-[16px] font-semibold text-black">{engine}</span>
              </div>
              <div className="border-t border-gray-100 flex flex-col items-center justify-center p-3 bg-white">
                <span className="text-[12px] font-thin text-black mb-0.5">Year</span>
                <span className="text-[16px] font-semibold text-black">{make_year}</span>
              </div>
              <div className="border-r border-t border-gray-100 flex flex-col items-center justify-center p-3 bg-white">
                <span className="text-[12px] font-thin text-black mb-0.5">Mileage</span>
                <span className="text-[16px] font-semibold text-black">{mileage}</span>
              </div>
              <div className="border-t border-gray-100 flex flex-col items-center justify-center p-3 bg-white">
                <span className="text-[12px] font-thin text-black mb-0.5">Km/day limit</span>
                <span className="text-[16px] font-semibold text-black">
                  {kmLimit !== null && kmLimit !== undefined ? kmLimit : "Unlimited"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}