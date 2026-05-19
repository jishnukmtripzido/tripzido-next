"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

/* ── Types ── */
export interface DateRange {
  start: Date;
  end: Date;
}

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (range: DateRange) => void;
  initialRange: DateRange;
}

/* ── Helpers ── */
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(date: Date, start: Date, end: Date) {
  const d = date.getTime();
  return d > start.getTime() && d < end.getTime();
}

function addMonths(date: Date, n: number) {
  const d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  return d;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDisplay(date: Date) {
  return `${DAYS[(date.getDay() + 6) % 7].slice(0, 3)}, ${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}`;
}

/* ── Calendar Month ── */
function CalendarMonth({
  viewDate,
  selecting,
  hoverDate,
  pendingStart,
  range,
  onDayClick,
  onDayHover,
}: {
  viewDate: Date;
  selecting: "start" | "end";
  hoverDate: Date | null;
  pendingStart: Date | null;
  range: DateRange;
  onDayClick: (d: Date) => void;
  onDayHover: (d: Date | null) => void;
}) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 6) % 7;
  const daysInMonth = getDaysInMonth(year, month);
  const today = new Date();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const effStart = pendingStart ?? range.start;
  const effEnd =
    pendingStart && hoverDate
      ? hoverDate >= pendingStart
        ? hoverDate
        : pendingStart
      : range.end;
  const effRangeStart =
    pendingStart && hoverDate && hoverDate < pendingStart
      ? hoverDate
      : effStart;

  return (
    <div className="flex-1 min-w-0">
      <p className="text-center font-bold text-gray-900 mb-3 text-sm">
        {MONTHS[month]} {year}
      </p>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-semibold text-gray-400 py-1"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          if (!date) return <div key={`e-${i}`} />;

          const isPast =
            date <
            new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isStart = isSameDay(date, effStart);
          const isEnd = isSameDay(date, effEnd) && !isSameDay(effStart, effEnd);
          const inRange = isInRange(date, effRangeStart, effEnd);
          const isToday = isSameDay(date, today);
          const isSelected = isStart || isEnd;

          return (
            <div
              key={date.getDate()}
              className={`relative flex items-center justify-center
                ${inRange ? "bg-[#fff8e1]" : ""}
                ${isStart && !isSameDay(effStart, effEnd) ? "rounded-l-full" : ""}
                ${isEnd ? "rounded-r-full" : ""}
                ${isStart && isSameDay(effStart, effEnd) ? "rounded-full" : ""}
              `}
            >
              <button
                onClick={() => !isPast && onDayClick(date)}
                onMouseEnter={() => onDayHover(date)}
                onMouseLeave={() => onDayHover(null)}
                disabled={isPast}
                className={`
                  w-8 h-8 text-xs font-medium rounded-full flex items-center justify-center transition-all
                  ${isPast ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
                  ${
                    isSelected
                      ? "bg-[#ffc107] text-black font-bold shadow-md scale-105"
                      : isPast
                        ? ""
                        : "hover:bg-[#ffc107]/20 hover:text-black"
                  }
                  ${isToday && !isSelected ? "ring-2 ring-[#ffc107] text-[#b8860b] font-bold" : ""}
                  ${!isPast && !isSelected ? "text-gray-800" : ""}
                `}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main Modal ── */
export default function DatePickerModal({
  isOpen,
  onClose,
  onSelect,
  initialRange,
}: DatePickerModalProps) {
  const [mounted, setMounted] = useState(false);
  const [range, setRange] = useState<DateRange>(initialRange);
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [pendingStart, setPendingStart] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState<Date>(
    startOfMonth(initialRange.start),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setRange(initialRange);
      setPendingStart(null);
      setSelecting("start");
      setViewMonth(startOfMonth(initialRange.start));
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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
    if (selecting === "start") {
      setPendingStart(date);
      setSelecting("end");
      setRange({ start: date, end: date });
    } else {
      const start = pendingStart ?? range.start;
      const finalStart = date >= start ? start : date;
      const finalEnd = date >= start ? date : start;
      const newRange = { start: finalStart, end: finalEnd };
      setRange(newRange);
      setPendingStart(null);
      setSelecting("start");
    }
  }

  function handleConfirm() {
    onSelect(range);
    onClose();
  }

  const month1 = viewMonth;
  const month2 = addMonths(viewMonth, 1);

  const isSameRange = isSameDay(range.start, range.end);
  const nights = Math.round(
    (range.end.getTime() - range.start.getTime()) / 86400000,
  );

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop — hidden on mobile since modal is full screen */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] hidden sm:block"
        onClick={onClose}
      />

      {/* Panel — full screen on mobile, centered sheet on sm+ */}
      <div className="relative z-10 w-full h-[100dvh] sm:h-auto bg-white sm:rounded-2xl sm:max-w-3xl sm:mx-6 flex flex-col sm:shadow-2xl sm:max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="font-bold text-gray-900 text-base">
              Choose your rental dates
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        {/* Selection pills */}
        <div className="flex gap-3 px-5 py-3 shrink-0">
          <button
            onClick={() => {
              setSelecting("start");
              setPendingStart(null);
            }}
            className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border-1 transition-all text-left ${
              selecting === "start"
                ? "border-[#ffc107] bg-[#fff8e1]"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <div className="min-w-0">
              <p className="text-[10px] text-gray-400 font-medium tracking-wide">
                Pick-up
              </p>
              <p className="text-sm font-bold text-gray-900 truncate">
                {formatDisplay(range.start)}
              </p>
            </div>
          </button>
          <div className="flex items-center text-gray-300">
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
          </div>
          <button
            onClick={() => setSelecting("end")}
            className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border-1 transition-all text-left ${
              selecting === "end"
                ? "border-[#ffc107] bg-[#fff8e1]"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <div className="min-w-0">
              <p className="text-[10px] text-gray-400 font-medium tracking-wide">
                Drop-off
              </p>
              <p className="text-sm font-bold text-gray-900 truncate">
                {formatDisplay(range.end)}
              </p>
            </div>
          </button>
        </div>

        {/* Month navigation */}
        <div className="flex items-center justify-between px-5 py-2 shrink-0">
          <button
            onClick={() => setViewMonth(addMonths(viewMonth, -1))}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors"
          >
            <svg
              className="w-5 h-5"
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
          <button
            onClick={() => setViewMonth(addMonths(viewMonth, 1))}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors"
          >
            <svg
              className="w-5 h-5"
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

        {/* Calendar(s) */}
        <div className="flex-1 overflow-y-auto px-5 pb-2 overscroll-contain">
          <div className="flex flex-col sm:flex-row gap-6">
            <CalendarMonth
              viewDate={month1}
              selecting={selecting}
              hoverDate={hoverDate}
              pendingStart={pendingStart}
              range={range}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
            />
            <div className="hidden sm:block w-px bg-gray-100 shrink-0" />
            <CalendarMonth
              viewDate={month2}
              selecting={selecting}
              hoverDate={hoverDate}
              pendingStart={pendingStart}
              range={range}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <p className="text-sm text-gray-500 font-medium">
            {isSameRange
              ? "Pick a start & end date"
              : `${nights} night${nights !== 1 ? "s" : ""} · ${formatDisplay(range.start)} → ${formatDisplay(range.end)}`}
          </p>
          <button
            onClick={handleConfirm}
            disabled={isSameRange}
            className="bg-[#ffc107] hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            Select Dates
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}