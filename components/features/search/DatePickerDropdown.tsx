// "use client";

// import { useEffect, useRef, useState } from "react";
// import CalendarMonth from "./CalendarMonth";
// import { addMonths, startOfMonth } from "@/lib/dateUtils";
// import type { DateRange } from "./DatePickerModal";

// interface DatePickerDropdownProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSelect: (range: DateRange) => void;
//   initialRange: DateRange;
//   onDateChange?: (range: DateRange) => void;
//   mode?: "range" | "dropoff";
//   pickupDate?: Date;
// }

// export default function DatePickerDropdown({
//   isOpen,
//   onClose,
//   onSelect,
//   initialRange,
//   onDateChange,
//   mode = "range",
//   pickupDate,
// }: DatePickerDropdownProps) {
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const isDropoff = mode === "dropoff";

//   const [range, setRange] = useState<DateRange>(initialRange);
//   const [selecting, setSelecting] = useState<"start" | "end">(
//     isDropoff ? "end" : "start",
//   );
//   const [pendingStart, setPendingStart] = useState<Date | null>(
//     isDropoff ? (pickupDate ?? initialRange.start) : null,
//   );
//   const [hoverDate, setHoverDate] = useState<Date | null>(null);
//   const [viewMonth, setViewMonth] = useState<Date>(
//     startOfMonth(initialRange.start),
//   );

//   useEffect(() => {
//     if (isOpen) {
//       if (isDropoff) {
//         const anchor = pickupDate ?? initialRange.start;
//         setRange({ start: anchor, end: anchor });
//         setPendingStart(anchor);
//         setSelecting("end");
//         setViewMonth(startOfMonth(anchor));
//       } else {
//         setRange(initialRange);
//         setPendingStart(null);
//         setSelecting("start");
//         setViewMonth(startOfMonth(initialRange.start));
//       }
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     if (!isOpen) return;
//     function handleClick(e: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       )
//         onClose();
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
//     if (isDropoff) {
//       const originalPickup = pickupDate ?? initialRange.start;

//       if (
//         selecting === "end" &&
//         pendingStart !== null &&
//         pendingStart.getTime() !== originalPickup.getTime()
//       ) {
//         // Second click in pre-pickup two-date flow — apply min/max
//         const finalStart = date <= pendingStart ? date : pendingStart;
//         const finalEnd = date <= pendingStart ? pendingStart : date;
//         const newRange = { start: finalStart, end: finalEnd };
//         setRange(newRange);
//         setPendingStart(null);
//         setSelecting("end");
//         onDateChange?.(newRange);
//         onSelect(newRange);
//         onClose();
//         return;
//       }

//       if (date >= originalPickup) {
//         // On or after original pickup → just update dropoff, close immediately
//         const newRange = { start: originalPickup, end: date };
//         setRange(newRange);
//         onDateChange?.(newRange);
//         onSelect(newRange);
//         onClose();
//       } else {
//         // Before original pickup → becomes new pending pickup,
//         // user must now pick the dropoff
//         const newRange = { start: date, end: date };
//         setRange(newRange);
//         setPendingStart(date);
//         setSelecting("end");
//         onDateChange?.(newRange);
//       }
//       return;
//     }

//     // ── range mode (pickup date picker, unchanged) ──
//     if (selecting === "start") {
//       const newRange = { start: date, end: date };
//       setPendingStart(date);
//       setSelecting("end");
//       setRange(newRange);
//       onDateChange?.(newRange);
//     } else {
//       const start = pendingStart ?? range.start;
//       const finalStart = date >= start ? start : date;
//       const finalEnd = date >= start ? date : start;
//       const newRange = { start: finalStart, end: finalEnd };
//       setRange(newRange);
//       setPendingStart(null);
//       setSelecting("start");
//       onDateChange?.(newRange);
//       onSelect(newRange);
//       onClose();
//     }
//   }

//   if (!isOpen) return null;

//   const month1 = viewMonth;
//   const month2 = addMonths(viewMonth, 1);

//   return (
//     <div
//       ref={dropdownRef}
//       onClick={(e) => e.stopPropagation()}
//       className="absolute top-full left-[-200px] z-50 mt-5 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[740px] p-6 animate-dropdown-in"
//     >
//       {/* Selecting indicator */}
//       <div className="flex gap-2 mb-5">
//         {(["start", "end"] as const).map((type) => {
//           if (isDropoff && type === "start") return null;
//           return (
//             <button
//               key={type}
//               type="button"
//               onClick={() => {
//                 if (isDropoff) return;
//                 setSelecting(type);
//                 if (type === "start") setPendingStart(null);
//               }}
//               className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
//                 selecting === type
//                   ? "border-[#ffc107] bg-[#fff8e1] text-[#b8860b]"
//                   : "border-gray-200 text-gray-500 bg-gray-50 hover:border-gray-300"
//               }`}
//             >
//               {type === "start" ? "Pick-up date" : "Drop-off date"}
//             </button>
//           );
//         })}
//       </div>

//       {/* Month navigation + calendars */}
//       <div className="flex items-start gap-2">
//         <NavButton
//           direction="prev"
//           onClick={() => setViewMonth(addMonths(viewMonth, -1))}
//         />
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
//         <NavButton
//           direction="next"
//           onClick={() => setViewMonth(addMonths(viewMonth, 1))}
//         />
//       </div>
//     </div>
//   );
// }

// function NavButton({
//   direction,
//   onClick,
// }: {
//   direction: "prev" | "next";
//   onClick: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="w-8 h-8 mt-1 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors shrink-0"
//     >
//       <svg
//         className="w-4 h-4"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//         />
//       </svg>
//     </button>
//   );
// }

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
  // Explicit flag: true only when user has clicked a pre-pickup date
  // and is now waiting to pick the dropoff
  const [inTwoDateFlow, setInTwoDateFlow] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState<Date>(
    startOfMonth(initialRange.start),
  );

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
        // ✅ Second click — user already picked a pre-pickup date as new pickup.
        // Apply min/max between pendingStart and this click, just like range mode.
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
        // ✅ On or after original pickup → just set as dropoff, close
        const newRange = { start: originalPickup, end: date };
        setRange(newRange);
        onDateChange?.(newRange);
        onSelect(newRange);
        onClose();
      } else {
        // ✅ Before original pickup → first click of two-date flow.
        // Set as new pending pickup and wait for second click.
        const newRange = { start: date, end: date };
        setRange(newRange);
        setPendingStart(date);
        setSelecting("end");
        setInTwoDateFlow(true); // 👈 flag that we're now waiting for dropoff
        onDateChange?.(newRange);
      }
      return;
    }

    // ── range mode (pickup date picker, unchanged) ──
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
      className="absolute top-full left-[-200px] z-50 mt-5 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[740px] p-6 animate-dropdown-in"
    >
      {/* Selecting indicator */}
      <div className="flex gap-2 mb-5">
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
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                selecting === type
                  ? "border-[#ffc107] bg-[#fff8e1] text-[#b8860b]"
                  : "border-gray-200 text-gray-500 bg-gray-50 hover:border-gray-300"
              }`}
            >
              {type === "start" ? "Pick-up date" : "Drop-off date"}
            </button>
          );
        })}
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
