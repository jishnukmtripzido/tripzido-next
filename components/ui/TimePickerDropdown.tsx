"use client";

import { useEffect, useRef } from "react";

interface TimePickerDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (hour: number, minute: number) => void;
  selectedHour: number;
  selectedMinute: number;
  label?: string;
}

const SLOTS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? 0 : 30;
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return {
    h,
    m,
    label: `${h12}:${String(m).padStart(2, "0")} ${period}`,
    period,
  };
});

export default function TimePickerDropdown({
  isOpen,
  onClose,
  onSelect,
  selectedHour,
  selectedMinute,
}: TimePickerDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  // Close on outside click / Escape
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

  // Scroll selected item into view when opened
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
      // ✅ stopPropagation prevents clicks inside the dropdown from bubbling
      // up to the parent SearchCell's onClick, which would call toggleDropdown
      // and immediately re-close the dropdown after onClose() fires here.
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full left-0 z-50 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 w-40 overflow-hidden animate-dropdown-in"
    >
      <div className="overflow-y-auto max-h-64 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        {SLOTS.map((slot, i) => {
          const isSelected =
            slot.h === selectedHour && slot.m === selectedMinute;
          return (
            <button
              key={i}
              ref={isSelected ? selectedRef : undefined}
              type="button"
              onClick={() => {
                onSelect(slot.h, slot.m);
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors hover:cursor-pointer
                ${
                  isSelected
                    ? "bg-brand-yellow text-black font-normal"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              <span>{slot.label}</span>
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
