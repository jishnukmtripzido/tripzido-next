

// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { createPortal } from "react-dom";
// import { useModalTransition } from "@/hooks/useModelTransition";

// interface TimePickerModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSelect: (hour: number, minute: number) => void;
//   initialHour?: number;
//   initialMinute?: number;
//   label?: string;
// }

// const SLOTS = Array.from({ length: 48 }, (_, i) => {
//   const h = Math.floor(i / 2);
//   const m = i % 2 === 0 ? 0 : 30;
//   const period = h >= 12 ? "PM" : "AM";
//   const h12 = h % 12 === 0 ? 12 : h % 12;
//   return { h, m, label: `${h12}:${String(m).padStart(2, "0")} ${period}`, period };
// });

// export default function TimePickerModal({
//   isOpen, onClose, onSelect,
//   initialHour = 0, initialMinute = 0, label = "Select time",
// }: TimePickerModalProps) {
//   const [mounted, setMounted] = useState(false);
//   const [selected, setSelected] = useState<number | null>(null);
//   const { visible, entered } = useModalTransition(isOpen);

//   useEffect(() => { setMounted(true); }, []);

//   useEffect(() => {
//     if (isOpen) {
//       const idx = SLOTS.findIndex(s => s.h === initialHour && s.m === initialMinute);
//       setSelected(idx >= 0 ? idx : null);
//     }
//   }, [isOpen, initialHour, initialMinute]);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);

//   const handleKey = useCallback((e: KeyboardEvent) => {
//     if (e.key === "Escape") onClose();
//   }, [onClose]);

//   useEffect(() => {
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [handleKey]);

//   function handleSelect(i: number) {
//     setSelected(i);
//     const slot = SLOTS[i];
//     onSelect(slot.h, slot.m);
//     onClose();
//   }

//   // Use visible (not isOpen) so the modal stays mounted during exit animation
//   if (!mounted || !visible) return null;

//   const backdropClass = entered ? "modal-backdrop-entered" : "modal-backdrop-enter";
//   const panelClass    = entered ? "modal-panel-entered"    : "modal-panel-enter";

//   return createPortal(
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
//       <div
//         className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] modal-backdrop ${backdropClass}`}
//         onClick={onClose}
//       />

//       <div className={`relative z-10 w-full bg-white rounded-t-2xl sm:rounded-2xl sm:max-w-xs sm:mx-6 shadow-2xl flex flex-col modal-panel ${panelClass}`}>

//         {/* Header */}
//         <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
//           <div>
//             <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
//             <p className="text-2xl font-bold text-[#ffc107] mt-0.5">
//               {selected !== null ? SLOTS[selected].label : "—"}
//             </p>
//           </div>
//           <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//             </svg>
//           </button>
//         </div>

//         {/* Scrollable list */}
//         <div className="overflow-y-auto h-96 py-1 [scrollbar-width:thin]">
//           {SLOTS.map((slot, i) => (
//             <button
//               key={i}
//               onClick={() => handleSelect(i)}
//               className={`w-full flex items-center justify-between px-5 py-2.5 text-sm transition-colors
//                 ${i === selected
//                   ? "bg-[#fff8e1] text-black font-semibold"
//                   : "text-gray-600 hover:bg-gray-50"
//                 }`}
//             >
//               <span>{slot.label}</span>
//               <span className={`text-xs px-2 py-0.5 rounded-full font-medium
//                 ${i === selected ? "bg-[#ffc107] text-black" : "bg-gray-100 text-gray-500"}`}>
//                 {slot.period}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }


"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useModalTransition } from "@/hooks/useModelTransition";

interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBoth: (pickup: { hour: number; minute: number }, dropoff: { hour: number; minute: number }) => void;
  initialPickupHour?: number;
  initialPickupMinute?: number;
  initialDropoffHour?: number;
  initialDropoffMinute?: number;
  pickupDate: Date;
  dropoffDate: Date;
}

function toIndex(hour: number, minute: number) {
  return hour * 2 + (minute >= 30 ? 1 : 0);
}

function fromIndex(index: number) {
  return { hour: Math.floor(index / 2), minute: index % 2 === 0 ? 0 : 30 };
}

function formatTime(hour: number, minute: number) {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${String(minute).padStart(2, "0")} ${period}`;
}

function formatDate(d: Date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}`;
}

export default function TimePickerModal({
  isOpen,
  onClose,
  onSelectBoth,
  initialPickupHour = 10,
  initialPickupMinute = 0,
  initialDropoffHour = 10,
  initialDropoffMinute = 0,
  pickupDate,
  dropoffDate,
}: TimePickerModalProps) {
  const [mounted, setMounted] = useState(false);
  const [pickupIdx, setPickupIdx] = useState(toIndex(initialPickupHour, initialPickupMinute));
  const [dropoffIdx, setDropoffIdx] = useState(toIndex(initialDropoffHour, initialDropoffMinute));
  const { visible, entered } = useModalTransition(isOpen);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      setPickupIdx(toIndex(initialPickupHour, initialPickupMinute));
      setDropoffIdx(toIndex(initialDropoffHour, initialDropoffMinute));
    }
  }, [isOpen, initialPickupHour, initialPickupMinute, initialDropoffHour, initialDropoffMinute]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  function handleConfirm() {
    onSelectBoth(fromIndex(pickupIdx), fromIndex(dropoffIdx));
    onClose();
  }

  if (!mounted || !visible) return null;

  const backdropClass = entered ? "modal-backdrop-entered" : "modal-backdrop-enter";
  const panelClass    = entered ? "modal-panel-entered"    : "modal-panel-enter";

  const pickupTime = fromIndex(pickupIdx);
  const dropoffTime = fromIndex(dropoffIdx);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] modal-backdrop ${backdropClass}`}
        onClick={onClose}
      />

      <div className={`relative z-10 w-full bg-white rounded-t-2xl sm:rounded-2xl sm:max-w-sm sm:mx-6 shadow-2xl flex flex-col modal-panel ${panelClass}`}>

        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900 text-base">Select times</h2>
            <p className="text-xs text-gray-400 mt-0.5">Choose your pick-up and drop-off times</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Sliders */}
        <div className="px-5 py-6 space-y-8">

          {/* Pick-up slider */}
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm font-semibold text-gray-900">
                Pick-up: <span className="font-normal text-gray-500">{formatDate(pickupDate)}</span>
              </p>
              <p className="text-xl font-bold text-gray-900">
                {formatTime(pickupTime.hour, pickupTime.minute)}
              </p>
            </div>
            <input
              type="range"
              min={0}
              max={47}
              step={1}
              value={pickupIdx}
              onChange={(e) => setPickupIdx(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-runnable-track]:rounded-full
                [&::-webkit-slider-runnable-track]:h-1.5
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[#ffc107]
                [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-white
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[#ffc107]
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-white
                [&::-moz-range-thumb]:cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ffc107 ${(pickupIdx / 47) * 100}%, #e5e7eb ${(pickupIdx / 47) * 100}%)`
              }}
            />
            {/* Time markers */}
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-gray-400">12:00 AM</span>
              <span className="text-[10px] text-gray-400">12:00 PM</span>
              <span className="text-[10px] text-gray-400">11:30 PM</span>
            </div>
          </div>

          {/* Drop-off slider */}
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm font-semibold text-gray-900">
                Drop-off: <span className="font-normal text-gray-500">{formatDate(dropoffDate)}</span>
              </p>
              <p className="text-xl font-bold text-gray-900">
                {formatTime(dropoffTime.hour, dropoffTime.minute)}
              </p>
            </div>
            <input
              type="range"
              min={0}
              max={47}
              step={1}
              value={dropoffIdx}
              onChange={(e) => setDropoffIdx(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-runnable-track]:rounded-full
                [&::-webkit-slider-runnable-track]:h-1.5
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[#ffc107]
                [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-white
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[#ffc107]
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-white
                [&::-moz-range-thumb]:cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ffc107 ${(dropoffIdx / 47) * 100}%, #e5e7eb ${(dropoffIdx / 47) * 100}%)`
              }}
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-gray-400">12:00 AM</span>
              <span className="text-[10px] text-gray-400">12:00 PM</span>
              <span className="text-[10px] text-gray-400">11:30 PM</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-2">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            Select times
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}