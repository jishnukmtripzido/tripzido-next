"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import CalendarMonth from "./CalendarMonth";
import { CloseButton } from "@/components/ui/icons";
import {
  addMonths,
  startOfMonth,
  isSameDay,
  formatDisplay,
} from "@/lib/dateUtils";

export interface DateRange {
  start: Date;
  end: Date;
}

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (range: DateRange) => void;
  initialRange: DateRange;
  mode?: "range" | "dropoff";
  pickupDate?: Date;
}

export default function DatePickerModal({
  isOpen,
  onClose,
  onSelect,
  initialRange,
  mode = "range",
  pickupDate,
}: DatePickerModalProps) {
  const isDropoff = mode === "dropoff";

  const [mounted, setMounted] = useState(false);
  const [range, setRange] = useState<DateRange>(initialRange);
  const [selecting, setSelecting] = useState<"start" | "end">(
    isDropoff ? "end" : "start",
  );
  const [pendingStart, setPendingStart] = useState<Date | null>(
    isDropoff ? (pickupDate ?? initialRange.start) : null,
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [hasSelection, setHasSelection] = useState(false);
  const [viewMonth, setViewMonth] = useState<Date>(
    startOfMonth(initialRange.start),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (isDropoff) {
        const anchor = pickupDate ?? initialRange.start;
        setRange({ start: anchor, end: anchor });
        setPendingStart(anchor);
        setSelecting("end");
        setHasSelection(false);
        setViewMonth(startOfMonth(anchor));
      } else {
        setRange(initialRange);
        setPendingStart(null);
        setSelecting("start");
        setHasSelection(false);
        setViewMonth(startOfMonth(initialRange.start));
      }
    }
  }, [isOpen]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  function handleDayClick(date: Date) {
    if (isDropoff) {
      const originalPickup = pickupDate ?? initialRange.start;

      if (
        selecting === "end" &&
        pendingStart !== null &&
        pendingStart < originalPickup
      ) {
        // Second click in pre-pickup two-date flow — apply min/max
        const finalStart = date <= pendingStart ? date : pendingStart;
        const finalEnd = date <= pendingStart ? pendingStart : date;
        const newRange = { start: finalStart, end: finalEnd };
        setRange(newRange);
        setPendingStart(null);
        setSelecting("end");
        setHasSelection(true);
        // ✅ No onClose() — user hits "Select Dates" button
        return;
      }

      if (date >= originalPickup) {
        // On or after original pickup → update dropoff, stay open
        const newRange = { start: originalPickup, end: date };
        setRange(newRange);
        setHasSelection(true);
        // ✅ No onClose() — user hits "Select Dates" button
      } else {
        // Before original pickup → becomes new pending pickup
        setRange({ start: date, end: date });
        setPendingStart(date);
        setSelecting("end");
        setHasSelection(false);
      }
      return;
    }

    // ── range mode (unchanged) ──
    if (selecting === "start") {
      setPendingStart(date);
      setSelecting("end");
      setRange({ start: date, end: date });
      setHasSelection(false);
    } else {
      const start = pendingStart ?? range.start;
      const finalStart = date >= start ? start : date;
      const finalEnd = date >= start ? date : start;
      setRange({ start: finalStart, end: finalEnd });
      setPendingStart(null);
      setSelecting("start");
      setHasSelection(true);
      // ✅ No onClose() — user hits "Select Dates" button
    }
  }

  const month1 = viewMonth;
  const month2 = addMonths(viewMonth, 1);
  const isSingle = isSameDay(range.start, range.end);
  const canConfirm = hasSelection || !isSingle;

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] animate-fade-in hidden sm:block"
        onClick={onClose}
      />
      <div className="relative z-10 w-full h-[100dvh] sm:h-auto bg-white sm:rounded-2xl sm:max-w-3xl sm:mx-6 flex flex-col sm:shadow-2xl sm:max-h-[90vh] animate-slide-up sm:animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <h2 className="font-bold text-gray-900 text-base">
            {isDropoff
              ? "Choose your drop-off date"
              : "Choose your rental dates"}
          </h2>
          <CloseButton onClick={onClose} />
        </div>

        {/* Selection pills */}
        <div className="flex gap-2 px-5 py-4 shrink-0">
          {(["start", "end"] as const).map((type) => {
            if (isDropoff && type === "start") return null;
            return (
              <button
                key={type}
                onClick={() => {
                  if (isDropoff) return;
                  setSelecting(type);
                  if (type === "start") setPendingStart(null);
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  selecting === type
                    ? "border-brand-yellow bg-[#fff8e1] text-[#b8860b]"
                    : "border-gray-200 text-gray-500 bg-gray-50 hover:border-gray-300"
                }`}
              >
                {type === "start" ? "Pick-up date" : "Drop-off date"}
              </button>
            );
          })}
        </div>

        {/* Month navigation */}
        <div className="flex items-center justify-between px-5 pb-2 shrink-0">
          <NavButton
            direction="prev"
            onClick={() => setViewMonth(addMonths(viewMonth, -1))}
          />
          <NavButton
            direction="next"
            onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          />
        </div>

        {/* Calendars */}
        <div className="flex-1 overflow-y-auto px-5 pb-2 overscroll-contain">
          <div className="flex flex-col sm:flex-row gap-6">
            <CalendarMonth
              viewDate={month1}
              hoverDate={hoverDate}
              pendingStart={pendingStart}
              range={range}
              hasSelection={hasSelection}
              selecting={selecting}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
            />
            <div className="hidden sm:block w-px bg-gray-100 shrink-0" />
            <CalendarMonth
              viewDate={month2}
              hoverDate={hoverDate}
              pendingStart={pendingStart}
              range={range}
              hasSelection={hasSelection}
              selecting={selecting}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-medium">
            {!canConfirm ? (
              <span className="text-gray-400">
                {isDropoff ? "Pick a drop-off date" : "Pick a start & end date"}
              </span>
            ) : (
              <>
                <span className="text-gray-800 font-semibold">
                  {formatDisplay(range.start)}
                </span>
                <ArrowRight />
                <span className="text-gray-800 font-semibold">
                  {formatDisplay(range.end)}
                </span>
              </>
            )}
          </div>
          {/* ✅ Only place onSelect + onClose are called together */}
          <button
            onClick={() => {
              onSelect(range);
              onClose();
            }}
            disabled={!canConfirm}
            className="bg-brand-yellow hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold px-6 py-2 rounded-xl text-sm transition-colors shrink-0"
          >
            Select Dates
          </button>
        </div>
      </div>
    </div>,
    document.body,
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
      onClick={onClick}
      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors"
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

function ArrowRight() {
  return (
    <svg
      className="w-4 h-4 text-gray-400 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
