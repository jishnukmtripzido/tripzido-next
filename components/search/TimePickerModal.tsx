"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (hour: number, minute: number) => void;
  initialHour: number;
  initialMinute: number;
  label: string;
}

const MINUTES = [0, 15, 30, 45];

export default function TimePickerModal({
  isOpen,
  onClose,
  onSelect,
  initialHour,
  initialMinute,
  label,
}: TimePickerModalProps) {
  const [mounted, setMounted] = useState(false);
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const hourRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      setHour(initialHour);
      setMinute(initialMinute);
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

  function formatTime(h: number, m: number) {
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
  }

  function handleConfirm() {
    onSelect(hour, minute);
    onClose();
  }

  const hours = Array.from({ length: 24 }, (_, i) => i);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative z-10 w-full bg-white rounded-t-2xl sm:rounded-2xl sm:max-w-sm sm:mx-6 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900 text-base">{label}</h2>
            <p className="text-2xl font-extrabold text-[#ffc107] mt-0.5 tracking-tight">
              {formatTime(hour, minute)}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Time selector */}
        <div className="px-5 py-5 flex gap-4">

          {/* Hour scroll column */}
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 text-center">Hour</p>
            <div
              ref={hourRef}
              className="h-48 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-xl border border-gray-100 bg-gray-50"
            >
              {hours.map((h) => {
                const period = h >= 12 ? "PM" : "AM";
                const h12 = h % 12 === 0 ? 12 : h % 12;
                const isSelected = h === hour;
                return (
                  <button
                    key={h}
                    onClick={() => setHour(h)}
                    className={`w-full py-2.5 text-sm font-medium transition-all flex items-center justify-center gap-1.5
                      ${isSelected
                        ? "bg-[#ffc107] text-black font-bold"
                        : "text-gray-600 hover:bg-[#ffc107]/10 hover:text-black"
                      }`}
                  >
                    <span className="w-6 text-right">{h12}</span>
                    <span className="text-xs opacity-70">{period}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minute column */}
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 text-center">Minute</p>
            <div className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
              {MINUTES.map((m) => {
                const isSelected = m === minute;
                return (
                  <button
                    key={m}
                    onClick={() => setMinute(m)}
                    className={`w-full py-2.5 text-sm font-medium transition-all flex items-center justify-center
                      ${isSelected
                        ? "bg-[#ffc107] text-black font-bold"
                        : "text-gray-600 hover:bg-[#ffc107]/10 hover:text-black"
                      }`}
                  >
                    :{m.toString().padStart(2, "0")}
                  </button>
                );
              })}
            </div>
          </div>

          {/* AM / PM quick toggle */}
          <div className="flex flex-col gap-3 justify-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Period</p>
            <button
              onClick={() => { if (hour >= 12) setHour(hour - 12); }}
              className={`px-3 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${
                hour < 12 ? "bg-[#ffc107] border-[#ffc107] text-black" : "border-gray-200 text-gray-500 hover:border-[#ffc107]"
              }`}
            >
              AM
            </button>
            <button
              onClick={() => { if (hour < 12) setHour(hour + 12); }}
              className={`px-3 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${
                hour >= 12 ? "bg-[#ffc107] border-[#ffc107] text-black" : "border-gray-200 text-gray-500 hover:border-[#ffc107]"
              }`}
            >
              PM
            </button>
          </div>
        </div>

        {/* Quick presets */}
        <div className="px-5 pb-4">
          <p className="text-xs text-gray-400 font-medium mb-2">Quick select</p>
          <div className="flex flex-wrap gap-2">
            {[{h:6,m:0},{h:8,m:0},{h:9,m:0},{h:10,m:0},{h:12,m:0},{h:14,m:0},{h:16,m:0},{h:18,m:0}].map(({h, m}) => (
              <button
                key={`${h}-${m}`}
                onClick={() => { setHour(h); setMinute(m); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                  h === hour && m === minute
                    ? "bg-[#ffc107] border-[#ffc107] text-black"
                    : "border-gray-200 text-gray-600 hover:border-[#ffc107] hover:bg-[#fff8e1]"
                }`}
              >
                {formatTime(h, m)}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            Confirm — {formatTime(hour, minute)}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
