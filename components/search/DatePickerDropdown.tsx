

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { DateRange } from "./DatePickerModal";

// /* ── Helpers ── */
// function isSameDay(a: Date, b: Date) {
//   return (
//     a.getFullYear() === b.getFullYear() &&
//     a.getMonth() === b.getMonth() &&
//     a.getDate() === b.getDate()
//   );
// }

// function isInRange(date: Date, start: Date, end: Date) {
//   const d = date.getTime();
//   return d > start.getTime() && d < end.getTime();
// }

// function addMonths(date: Date, n: number) {
//   const d = new Date(date);
//   d.setDate(1);
//   d.setMonth(d.getMonth() + n);
//   return d;
// }

// function startOfMonth(date: Date) {
//   return new Date(date.getFullYear(), date.getMonth(), 1);
// }

// function getDaysInMonth(year: number, month: number) {
//   return new Date(year, month + 1, 0).getDate();
// }

// const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// const MONTHS = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// /* ── Calendar Month ── */
// function CalendarMonth({
//   viewDate,
//   hoverDate,
//   pendingStart,
//   range,
//   onDayClick,
//   onDayHover,
// }: {
//   viewDate: Date;
//   hoverDate: Date | null;
//   pendingStart: Date | null;
//   range: DateRange;
//   onDayClick: (d: Date) => void;
//   onDayHover: (d: Date | null) => void;
// }) {
//   const year = viewDate.getFullYear();
//   const month = viewDate.getMonth();
//   const firstDay = new Date(year, month, 1).getDay();
//   const offset = (firstDay + 6) % 7;
//   const daysInMonth = getDaysInMonth(year, month);
//   const today = new Date();

//   const cells: (Date | null)[] = [];
//   for (let i = 0; i < offset; i++) cells.push(null);
//   for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

//   const effStart = pendingStart ?? range.start;
//   const effEnd =
//     pendingStart && hoverDate
//       ? hoverDate >= pendingStart
//         ? hoverDate
//         : pendingStart
//       : range.end;
//   const effRangeStart =
//     pendingStart && hoverDate && hoverDate < pendingStart
//       ? hoverDate
//       : effStart;

//   return (
//     <div className="flex-1 min-w-0">
//       <p className="text-center font-bold text-gray-900 mb-4 text-sm tracking-wide">
//         {MONTHS[month]} {year}
//       </p>
//       {/* Day headers */}
//       <div className="grid grid-cols-7 mb-1">
//         {DAYS.map((d) => (
//           <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-2">
//             {d}
//           </div>
//         ))}
//       </div>
//       {/* Day cells */}
//       <div className="grid grid-cols-7">
//         {cells.map((date, i) => {
//           if (!date) return <div key={`e-${i}`} className="h-10" />;

//           const isPast =
//             date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
//           const isStart = isSameDay(date, effStart);
//           const isEnd = isSameDay(date, effEnd) && !isSameDay(effStart, effEnd);
//           const inRange = isInRange(date, effRangeStart, effEnd);
//           const isToday = isSameDay(date, today);
//           const isSelected = isStart || isEnd;
//           const isSingleDay = isSameDay(effStart, effEnd);

//           return (
//             <div
//               key={date.getDate()}
//               className={`
//                 relative flex items-center justify-center h-10
//                 ${inRange ? "bg-[#fff3cd]" : ""}
//                 ${isStart && !isSingleDay ? "bg-[#fff3cd] rounded-l-md" : ""}
//                 ${isEnd ? "bg-[#fff3cd] rounded-r-md" : ""}
//               `}
//             >
//               <button
//                 type="button"
//                 onClick={() => !isPast && onDayClick(date)}
//                 onMouseEnter={() => onDayHover(date)}
//                 onMouseLeave={() => onDayHover(null)}
//                 disabled={isPast}
//                 className={`
//                   w-10 h-10 text-sm font-medium flex items-center justify-center
//                   transition-all duration-100 ease-in-out
//                   ${isPast ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
//                   ${isSelected
//                     ? "bg-[#ffc107] text-black font-bold shadow-sm rounded-md z-10 relative"
//                     : isSingleDay && isStart
//                       ? "bg-[#ffc107] text-black font-bold shadow-sm rounded-md"
//                       : isPast
//                         ? ""
//                         : inRange
//                           ? "hover:bg-[#ffc107]/40 hover:text-black rounded-md"
//                           : "hover:bg-[#ffc107]/25 hover:text-black rounded-md"
//                   }
//            ${isToday && !isSelected ? "border-b-2 border-[#ffc107]" : ""}

//                   ${!isPast && !isSelected ? "text-gray-800" : ""}
//                 `}
//               >
//                 {date.getDate()}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* ── Main Dropdown ── */
// interface DatePickerDropdownProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSelect: (range: DateRange) => void;
//   initialRange: DateRange;
//   anchorRef?: React.RefObject<HTMLElement>;
// }

// export default function DatePickerDropdown({
//   isOpen,
//   onClose,
//   onSelect,
//   initialRange,
// }: DatePickerDropdownProps) {
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [range, setRange] = useState<DateRange>(initialRange);
//   const [selecting, setSelecting] = useState<"start" | "end">("start");
//   const [pendingStart, setPendingStart] = useState<Date | null>(null);
//   const [hoverDate, setHoverDate] = useState<Date | null>(null);
//   const [viewMonth, setViewMonth] = useState<Date>(startOfMonth(initialRange.start));

//   useEffect(() => {
//     if (isOpen) {
//       setRange(initialRange);
//       setPendingStart(null);
//       setSelecting("start");
//       setViewMonth(startOfMonth(initialRange.start));
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     if (!isOpen) return;
//     function handleClick(e: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         onClose();
//       }
//     }
//     function handleKey(e: KeyboardEvent) {
//       if (e.key === "Escape") onClose();
//     }
//     document.addEventListener("mousedown", handleClick);
//     document.addEventListener("keydown", handleKey);
//     return () => {
//       document.removeEventListener("mousedown", handleClick);
//       document.removeEventListener("keydown", handleKey);
//     };
//   }, [isOpen, onClose]);

//   function handleDayClick(date: Date) {
//     if (selecting === "start") {
//       setPendingStart(date);
//       setSelecting("end");
//       setRange({ start: date, end: date });
//     } else {
//       const start = pendingStart ?? range.start;
//       const finalStart = date >= start ? start : date;
//       const finalEnd = date >= start ? date : start;
//       const newRange = { start: finalStart, end: finalEnd };
//       setRange(newRange);
//       setPendingStart(null);
//       setSelecting("start");
//     }
//   }

//   function handleConfirm() {
//     onSelect(range);
//     onClose();
//   }

//   if (!isOpen) return null;

//   const month1 = viewMonth;
//   const month2 = addMonths(viewMonth, 1);
//   const isSameRange = isSameDay(range.start, range.end);
//   const nights = Math.round((range.end.getTime() - range.start.getTime()) / 86400000);

//   return (
//     <div
//       ref={dropdownRef}
//       className="absolute top-full left-[-200px] z-50 mt-5 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[740px] p-6 animate-dropdown-in"
//     >
//       {/* Selecting indicator */}
//       <div className="flex gap-2 mb-5">
//         <button
//           type="button"
//           onClick={() => { setSelecting("start"); setPendingStart(null); }}
//           className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
//             selecting === "start"
//               ? "border-[#ffc107] bg-[#fff8e1] text-[#b8860b]"
//               : "border-gray-200 text-gray-500 bg-gray-50 hover:border-gray-300"
//           }`}
//         >
//           Pick-up date
//         </button>
//         <button
//           type="button"
//           onClick={() => setSelecting("end")}
//           className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
//             selecting === "end"
//               ? "border-[#ffc107] bg-[#fff8e1] text-[#b8860b]"
//               : "border-gray-200 text-gray-500 bg-gray-50 hover:border-gray-300"
//           }`}
//         >
//           Drop-off date
//         </button>
//       </div>

//       {/* Month navigation + calendars */}
//       <div className="flex items-start gap-2">
//         <button
//           type="button"
//           onClick={() => setViewMonth(addMonths(viewMonth, -1))}
//           className="w-8 h-8 mt-1 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors shrink-0"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//           </svg>
//         </button>
//         <div className="flex flex-1 gap-6">
//           <CalendarMonth
//             viewDate={month1}
//             hoverDate={hoverDate}
//             pendingStart={pendingStart}
//             range={range}
//             onDayClick={handleDayClick}
//             onDayHover={setHoverDate}
//           />
//           <div className="w-px bg-gray-100 shrink-0" />
//           <CalendarMonth
//             viewDate={month2}
//             hoverDate={hoverDate}
//             pendingStart={pendingStart}
//             range={range}
//             onDayClick={handleDayClick}
//             onDayHover={setHoverDate}
//           />
//         </div>
//         <button
//           type="button"
//           onClick={() => setViewMonth(addMonths(viewMonth, 1))}
//           className="w-8 h-8 mt-1 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors shrink-0"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//           </svg>
//         </button>
//       </div>

//       {/* Footer */}
//       <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
//         <p className="text-sm text-gray-500 font-medium">
//           {isSameRange
//             ? "Pick a start & end date"
//             : `${nights} night${nights !== 1 ? "s" : ""} selected`}
//         </p>
//         <button
//           type="button"
//           onClick={handleConfirm}
//           disabled={isSameRange}
//           className="bg-[#ffc107] hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold px-6 py-2 rounded-xl text-sm transition-colors"
//         >
//           Select Dates
//         </button>
//       </div>
//     </div>
//   );
// }




"use client";

import { useEffect, useRef, useState } from "react";
import { DateRange } from "./DatePickerModal";

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
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ── Calendar Month ── */
function CalendarMonth({
  viewDate,
  hoverDate,
  pendingStart,
  range,
  onDayClick,
  onDayHover,
}: {
  viewDate: Date;
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
      <p className="text-center font-bold text-gray-900 mb-4 text-sm tracking-wide">
        {MONTHS[month]} {year}
      </p>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-2">
            {d}
          </div>
        ))}
      </div>
      {/* Day cells */}
      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          if (!date) return <div key={`e-${i}`} className="h-10" />;

          const isPast =
            date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isStart = isSameDay(date, effStart);
          const isEnd = isSameDay(date, effEnd) && !isSameDay(effStart, effEnd);
          const inRange = isInRange(date, effRangeStart, effEnd);
          const isToday = isSameDay(date, today);
          const isSelected = isStart || isEnd;
          const isSingleDay = isSameDay(effStart, effEnd);

          return (
            <div
              key={date.getDate()}
              className={`
                relative flex items-center justify-center h-10
                ${inRange ? "bg-[#fff3cd]" : ""}
                ${isStart && !isSingleDay ? "bg-[#fff3cd] rounded-l-md" : ""}
                ${isEnd ? "bg-[#fff3cd] rounded-r-md" : ""}
              `}
            >
              <button
                type="button"
                onClick={() => !isPast && onDayClick(date)}
                onMouseEnter={() => onDayHover(date)}
                onMouseLeave={() => onDayHover(null)}
                disabled={isPast}
                className={`
                  w-10 h-10 text-sm font-medium flex items-center justify-center
                  transition-all duration-100 ease-in-out
                  ${isPast ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
                  ${isSelected
                    ? "bg-[#ffc107] text-black font-bold shadow-sm rounded-md z-10 relative"
                    : isSingleDay && isStart
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

/* ── Main Dropdown ── */
interface DatePickerDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (range: DateRange) => void;
  initialRange: DateRange;
  anchorRef?: React.RefObject<HTMLElement>;
  /** Called in real-time as the user picks each date (start or end) */
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
  const [viewMonth, setViewMonth] = useState<Date>(startOfMonth(initialRange.start));

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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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

  function handleDayClick(date: Date) {
    if (selecting === "start") {
      const newRange = { start: date, end: date };
      setPendingStart(date);
      setSelecting("end");
      setRange(newRange);
      // Real-time update: pickup date changed
      onDateChange?.(newRange);
    } else {
      const start = pendingStart ?? range.start;
      const finalStart = date >= start ? start : date;
      const finalEnd = date >= start ? date : start;
      const newRange = { start: finalStart, end: finalEnd };
      setRange(newRange);
      setPendingStart(null);
      setSelecting("start");
      // Real-time update + confirm + close on drop-off selection
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
      className="absolute top-full left-[-200px] z-50 mt-5 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[740px] p-6 animate-dropdown-in"
    >
      {/* Selecting indicator */}
      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => { setSelecting("start"); setPendingStart(null); }}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
            selecting === "start"
              ? "border-[#ffc107] bg-[#fff8e1] text-[#b8860b]"
              : "border-gray-200 text-gray-500 bg-gray-50 hover:border-gray-300"
          }`}
        >
          Pick-up date
        </button>
        <button
          type="button"
          onClick={() => setSelecting("end")}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
            selecting === "end"
              ? "border-[#ffc107] bg-[#fff8e1] text-[#b8860b]"
              : "border-gray-200 text-gray-500 bg-gray-50 hover:border-gray-300"
          }`}
        >
          Drop-off date
        </button>
      </div>

      {/* Month navigation + calendars */}
      <div className="flex items-start gap-2">
        <button
          type="button"
          onClick={() => setViewMonth(addMonths(viewMonth, -1))}
          className="w-8 h-8 mt-1 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
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
        <button
          type="button"
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          className="w-8 h-8 mt-1 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}