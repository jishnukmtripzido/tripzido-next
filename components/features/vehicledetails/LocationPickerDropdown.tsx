"use client";

import { useRef, useEffect } from "react";
import type { PickupLocationOption } from "@/services/vehicleDetails.service";

interface LocationPickerDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: PickupLocationOption) => void;
  selectedLocationId: string;
  locations: PickupLocationOption[];
}

export default function LocationPickerDropdown({
  isOpen,
  onClose,
  onSelect,
  selectedLocationId,
  locations,
}: LocationPickerDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && selectedRef.current) {
      const list = selectedRef.current.closest(".overflow-y-auto");
      if (list) {
        const itemTop = selectedRef.current.offsetTop;
        list.scrollTop = itemTop - list.clientHeight / 2;
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full left-0 z-50 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 w-full overflow-hidden animate-dropdown-in"
    >
      <div className="overflow-y-auto max-h-64 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        {locations.map((loc) => {
          const isSelected = String(loc.id) === selectedLocationId;
          return (
            <button
              key={loc.id}
              ref={isSelected ? selectedRef : undefined}
              type="button"
              onClick={() => {
                onSelect(loc);
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors hover:cursor-pointer
                ${
                  isSelected
                    ? "bg-[#ffc107] text-black font-normal"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              <span>{loc.location_name}</span>
              {isSelected && (
                <svg
                  className="w-3.5 h-3.5 shrink-0"
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
          );
        })}
      </div>
    </div>
  );
}
