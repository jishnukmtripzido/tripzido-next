"use client";

import { useEffect, useRef, useState } from "react";
import CalendarMonth from "./CalendarMonth";
import { addMonths, startOfMonth } from "@/lib/dateUtils";
import type { DateRange } from "./DatePickerModal";

interface DatePickerDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (range: DateRange) => void;
  initialRange: DateRange;
  onDateChange?: (range: DateRange) => void;
}

export default function DatePickerDropdown({
  isOpen,
  onClose,
  onSelect,
  initialRange,
  onDateChange,
}: DatePickerDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<DateRange>(initialRange);
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [pendingStart, setPendingStart] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState<Date>(
    startOfMonth(initialRange.start),
  );

  useEffect(() => {
    if (isOpen) {
      setRange(initialRange);
      setPendingStart(null);
      setSelecting("start");
      setViewMonth(startOfMonth(initialRange.start));
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        onClose();
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

  function handleDayClick(date: Date) {
    if (selecting === "start") {
      const newRange = { start: date, end: date };
      setPendingStart(date);
      setSelecting("end");
      setRange(newRange);
      onDateChange?.(newRange);
    } else {
      const start = pendingStart ?? range.start;
      const finalStart = date >= start ? start : date;
      const finalEnd = date >= start ? date : start;
      const newRange = { start: finalStart, end: finalEnd };
      setRange(newRange);
      setPendingStart(null);
      setSelecting("start");
      onDateChange?.(newRange);
      onSelect(newRange);
      onClose();
    }
  }

  if (!isOpen) return null;

  const month1 = viewMonth;
  const month2 = addMonths(viewMonth, 1);

  return (
    <div
      ref={dropdownRef}
      // ✅ stopPropagation prevents clicks inside the dropdown from bubbling
      // up to the parent SearchCell's onClick, which would call toggleDropdown
      // and close the dropdown prematurely on the first date click.
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full left-[-200px] z-50 mt-5 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[740px] p-6 animate-dropdown-in"
    >
      {/* Selecting indicator */}
      <div className="flex gap-2 mb-5">
        {(["start", "end"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              setSelecting(type);
              if (type === "start") setPendingStart(null);
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
              selecting === type
                ? "border-[#ffc107] bg-[#fff8e1] text-[#b8860b]"
                : "border-gray-200 text-gray-500 bg-gray-50 hover:border-gray-300"
            }`}
          >
            {type === "start" ? "Pick-up date" : "Drop-off date"}
          </button>
        ))}
      </div>

      {/* Month navigation + calendars */}
      <div className="flex items-start gap-2">
        <NavButton
          direction="prev"
          onClick={() => setViewMonth(addMonths(viewMonth, -1))}
        />
        <div className="flex flex-1 gap-6">
          <CalendarMonth
            viewDate={month1}
            hoverDate={hoverDate}
            pendingStart={pendingStart}
            range={range}
            onDayClick={handleDayClick}
            onDayHover={setHoverDate}
          />
          <div className="w-px bg-gray-100 shrink-0" />
          <CalendarMonth
            viewDate={month2}
            hoverDate={hoverDate}
            pendingStart={pendingStart}
            range={range}
            onDayClick={handleDayClick}
            onDayHover={setHoverDate}
          />
        </div>
        <NavButton
          direction="next"
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
        />
      </div>
    </div>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-8 h-8 mt-1 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors shrink-0"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
