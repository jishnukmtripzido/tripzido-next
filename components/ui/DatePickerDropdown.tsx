"use client";

import { useEffect, useRef, useState } from "react";
import CalendarMonth from "./CalendarMonth";
import { addMonths, startOfMonth, MONTHS_FULL } from "@/lib/dateUtils";
import type { DateRange } from "./DatePickerModal";

interface DatePickerDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (range: DateRange) => void;
  initialRange: DateRange;
  onDateChange?: (range: DateRange) => void;
  mode?: "range" | "dropoff";
  pickupDate?: Date;
}

export default function DatePickerDropdown({
  isOpen,
  onClose,
  onSelect,
  initialRange,
  onDateChange,
  mode = "range",
  pickupDate,
}: DatePickerDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDropoff = mode === "dropoff";

  const [range, setRange] = useState<DateRange>(initialRange);
  const [selecting, setSelecting] = useState<"start" | "end">(
    isDropoff ? "end" : "start",
  );
  const [pendingStart, setPendingStart] = useState<Date | null>(
    isDropoff ? (pickupDate ?? initialRange.start) : null,
  );
  const [inTwoDateFlow, setInTwoDateFlow] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState<Date>(
    startOfMonth(initialRange.start),
  );
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    if (isOpen) {
      if (isDropoff) {
        const anchor = pickupDate ?? initialRange.start;
        setRange({ start: anchor, end: anchor });
        setPendingStart(anchor);
        setSelecting("end");
        setInTwoDateFlow(false);
        setViewMonth(startOfMonth(anchor));
      } else {
        setRange(initialRange);
        setPendingStart(null);
        setSelecting("start");
        setInTwoDateFlow(false);
        setViewMonth(startOfMonth(initialRange.start));
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const margin = 0;

      if (rect.left < margin) {
        setOffsetX(margin - rect.left);
      } else if (rect.right > viewportWidth - margin) {
        setOffsetX(viewportWidth - margin - rect.right);
      } else {
        setOffsetX(0);
      }
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
    if (isDropoff) {
      const originalPickup = pickupDate ?? initialRange.start;

      if (inTwoDateFlow && pendingStart !== null) {
        const finalStart = date <= pendingStart ? date : pendingStart;
        const finalEnd = date <= pendingStart ? pendingStart : date;
        const newRange = { start: finalStart, end: finalEnd };
        setRange(newRange);
        setPendingStart(null);
        setInTwoDateFlow(false);
        setSelecting("end");
        onDateChange?.(newRange);
        onSelect(newRange);
        onClose();
        return;
      }

      if (date >= originalPickup) {
        const newRange = { start: originalPickup, end: date };
        setRange(newRange);
        onDateChange?.(newRange);
        onSelect(newRange);
        onClose();
      } else {
        const newRange = { start: date, end: date };
        setRange(newRange);
        setPendingStart(date);
        setSelecting("end");
        setInTwoDateFlow(true);
        onDateChange?.(newRange);
      }
      return;
    }

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
      onClick={(e) => e.stopPropagation()}
      style={{ transform: `translateX(${offsetX}px)` }}
      className="absolute top-full right-[-300px] z-50 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[740px] animate-dropdown-in"
    >
      {/* Tabs — flush full width */}
      <div className="flex border-b border-gray-100">
        {(["start", "end"] as const).map((type) => {
          if (isDropoff && type === "start") return null;
          return (
            <button
              key={type}
              type="button"
              onClick={() => {
                if (isDropoff) return;
                setSelecting(type);
                if (type === "start") setPendingStart(null);
              }}
              className={`flex-1 py-3.5 text-xs font-semibold transition-all border-b-2 -mb-px ${
                selecting === type
                  ? "border-brand-yellow bg-[#fff8e1] text-[#b8860b]"
                  : "border-transparent text-gray-500 bg-white hover:bg-gray-50"
              }`}
            >
              {type === "start" ? "Pick-up date" : "Drop-off date"}
            </button>
          );
        })}
      </div>

      {/* Calendar body */}
      <div className="pt-5 pb-8">
        <div className="flex items-start">
          {/* ── LEFT MONTH ── */}
          <div className="flex-1 px-5">
            {/* Header: [← arrow] [Month Year centered] [invisible spacer] */}
            <div className="flex items-center mb-4">
              <button
                type="button"
                onClick={() => setViewMonth(addMonths(viewMonth, -1))}
                className="w-8 h-8 rounded-md flex items-center justify-center text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-black transition-colors shrink-0"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <p className="flex-1 text-center text-sm font-bold text-gray-900 tracking-wide">
                {MONTHS_FULL[month1.getMonth()]} {month1.getFullYear()}
              </p>
              {/* Balancing spacer so title stays perfectly centred */}
              <div className="w-8 h-8 shrink-0" />
            </div>

            <CalendarMonth
              viewDate={month1}
              hoverDate={hoverDate}
              pendingStart={pendingStart}
              range={range}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              hideHeader={true}
            />
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-100 self-stretch" />

          {/* ── RIGHT MONTH ── */}
          <div className="flex-1 px-5">
            {/* Header: [invisible spacer] [Month Year centered] [→ arrow] */}
            <div className="flex items-center mb-4">
              {/* Balancing spacer */}
              <div className="w-8 h-8 shrink-0" />
              <p className="flex-1 text-center text-sm font-bold text-gray-900 tracking-wide">
                {MONTHS_FULL[month2.getMonth()]} {month2.getFullYear()}
              </p>
              <button
                type="button"
                onClick={() => setViewMonth(addMonths(viewMonth, 1))}
                className="w-8 h-8 rounded-md flex items-center justify-center text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-black transition-colors shrink-0"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>

            <CalendarMonth
              viewDate={month2}
              hoverDate={hoverDate}
              pendingStart={pendingStart}
              range={range}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              hideHeader={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
