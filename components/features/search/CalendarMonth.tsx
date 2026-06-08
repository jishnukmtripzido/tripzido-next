"use client";

import {
  MONTHS_FULL,
  isSameDay,
  isInRange,
  getDaysInMonth,
} from "@/lib/dateUtils";
import type { DateRange } from "./DatePickerModal";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface CalendarMonthProps {
  viewDate: Date;
  hoverDate: Date | null;
  pendingStart: Date | null;
  range: DateRange;
  hasSelection?: boolean;
  selecting?: "start" | "end";
  onDayClick: (d: Date) => void;
  onDayHover: (d: Date | null) => void;
}

export default function CalendarMonth({
  viewDate,
  hoverDate,
  pendingStart,
  range,
  hasSelection = false,
  onDayClick,
  onDayHover,
}: CalendarMonthProps) {
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
  const isSingleDay = isSameDay(effStart, effEnd);

  return (
    <div className="flex-1 min-w-0">
      <p className="text-center font-bold text-gray-900 mb-4 text-sm tracking-wide">
        {MONTHS_FULL[month]} {year}
      </p>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[11px] font-semibold text-gray-400 py-2"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          if (!date) return <div key={`e-${i}`} className="h-10" />;

          const isPast =
            date <
            new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isStart = isSameDay(date, effStart);
          const isEnd = isSameDay(date, effEnd) && !isSingleDay;
          const inRange =
            !isSingleDay && isInRange(date, effRangeStart, effEnd);
          const isToday = isSameDay(date, today);
          const isSelected = isStart || isEnd;

          return (
            <div
              key={date.getDate()}
              className={`relative flex items-center justify-center h-10
                ${inRange ? "bg-[#fff3cd]" : ""}
                ${isStart && !isSingleDay && hasSelection ? "bg-[#fff3cd] rounded-l-md" : ""}
                ${isEnd ? "bg-[#fff3cd] rounded-r-md" : ""}
              `}
            >
              {inRange && (
                <div className="absolute inset-y-0 left-0 right-0 bg-[#fff3cd]" />
              )}
              {isStart && !isSingleDay && hasSelection && (
                <div className="absolute inset-y-0 left-1/2 right-0 bg-[#fff3cd]" />
              )}
              {isEnd && (
                <div className="absolute inset-y-0 left-0 right-1/2 bg-[#fff3cd]" />
              )}
              <button
                type="button"
                onClick={() => !isPast && onDayClick(date)}
                onMouseEnter={() => onDayHover(date)}
                onMouseLeave={() => onDayHover(null)}
                disabled={isPast}
                className={`relative z-10 w-10 h-10 text-sm font-medium flex items-center justify-center
                  transition-all duration-100 ease-in-out
                  ${isPast ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
                  ${
                    isSelected
                      ? "bg-[#ffc107] text-black font-bold shadow-sm rounded-md"
                      : isPast
                        ? ""
                        : inRange
                          ? "hover:bg-[#ffc107]/40 hover:text-black rounded-md"
                          : "hover:bg-[#ffc107]/25 hover:text-black rounded-md"
                  }
                  ${isToday && !isSelected ? "border-b-2 border-[#ffc107]" : ""}
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
