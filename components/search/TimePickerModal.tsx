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

//   if (!mounted || !isOpen) return null;

//   return createPortal(
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />

//       <div className="relative z-10 w-full bg-white rounded-t-2xl sm:rounded-2xl sm:max-w-xs sm:mx-6 shadow-2xl flex flex-col">

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
  onSelect: (hour: number, minute: number) => void;
  initialHour?: number;
  initialMinute?: number;
  label?: string;
}

const SLOTS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? 0 : 30;
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return { h, m, label: `${h12}:${String(m).padStart(2, "0")} ${period}`, period };
});

export default function TimePickerModal({
  isOpen, onClose, onSelect,
  initialHour = 0, initialMinute = 0, label = "Select time",
}: TimePickerModalProps) {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const { visible, entered } = useModalTransition(isOpen);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      const idx = SLOTS.findIndex(s => s.h === initialHour && s.m === initialMinute);
      setSelected(idx >= 0 ? idx : null);
    }
  }, [isOpen, initialHour, initialMinute]);

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

  function handleSelect(i: number) {
    setSelected(i);
    const slot = SLOTS[i];
    onSelect(slot.h, slot.m);
    onClose();
  }

  // Use visible (not isOpen) so the modal stays mounted during exit animation
  if (!mounted || !visible) return null;

  const backdropClass = entered ? "modal-backdrop-entered" : "modal-backdrop-enter";
  const panelClass    = entered ? "modal-panel-entered"    : "modal-panel-enter";

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] modal-backdrop ${backdropClass}`}
        onClick={onClose}
      />

      <div className={`relative z-10 w-full bg-white rounded-t-2xl sm:rounded-2xl sm:max-w-xs sm:mx-6 shadow-2xl flex flex-col modal-panel ${panelClass}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-[#ffc107] mt-0.5">
              {selected !== null ? SLOTS[selected].label : "—"}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto h-96 py-1 [scrollbar-width:thin]">
          {SLOTS.map((slot, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full flex items-center justify-between px-5 py-2.5 text-sm transition-colors
                ${i === selected
                  ? "bg-[#fff8e1] text-black font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <span>{slot.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                ${i === selected ? "bg-[#ffc107] text-black" : "bg-gray-100 text-gray-500"}`}>
                {slot.period}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}