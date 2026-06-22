"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useModalTransition } from "@/hooks/useModelTransition";

interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBoth: (
    pickup: { hour: number; minute: number },
    dropoff: { hour: number; minute: number },
  ) => void;
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
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}`;
}

const sliderThumbClasses = `
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:w-5
  [&::-webkit-slider-thumb]:h-5
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-[#ffc107]
  [&::-webkit-slider-thumb]:shadow-md
  [&::-webkit-slider-thumb]:cursor-pointer
  [&::-webkit-slider-thumb]:border-2
  [&::-webkit-slider-thumb]:border-white
  [&::-webkit-slider-thumb]:-mt-[7px]
  [&::-moz-range-thumb]:w-5
  [&::-moz-range-thumb]:h-5
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:bg-[#ffc107]
  [&::-moz-range-thumb]:border-2
  [&::-moz-range-thumb]:border-white
  [&::-moz-range-thumb]:cursor-pointer
`;

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
  const [pickupIdx, setPickupIdx] = useState(
    toIndex(initialPickupHour, initialPickupMinute),
  );
  const [dropoffIdx, setDropoffIdx] = useState(
    toIndex(initialDropoffHour, initialDropoffMinute),
  );
  const { visible, entered } = useModalTransition(isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setPickupIdx(toIndex(initialPickupHour, initialPickupMinute));
      setDropoffIdx(toIndex(initialDropoffHour, initialDropoffMinute));
    }
  }, [
    isOpen,
    initialPickupHour,
    initialPickupMinute,
    initialDropoffHour,
    initialDropoffMinute,
  ]);

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

  function handleConfirm() {
    onSelectBoth(fromIndex(pickupIdx), fromIndex(dropoffIdx));
    onClose();
  }

  if (!mounted || !visible) return null;

  const backdropClass = entered
    ? "modal-backdrop-entered"
    : "modal-backdrop-enter";
  const panelClass = entered ? "modal-panel-entered" : "modal-panel-enter";

  const pickupTime = fromIndex(pickupIdx);
  const dropoffTime = fromIndex(dropoffIdx);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className={`animate-fade-in absolute inset-0 bg-black/50 backdrop-blur-[2px] modal-backdrop ${backdropClass}`}
        onClick={onClose}
      />

      <div
        className={`animate-slide-up sm:animate-scale-in relative z-10 w-full bg-white rounded-t-2xl sm:rounded-2xl sm:max-w-sm sm:mx-6 shadow-2xl flex flex-col modal-panel ${panelClass}`}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-font-main-sub text-base">
              Select times
            </h2>
            <p className="text-xs text-font-dim mt-0.5">
              Choose your pick-up and drop-off times
            </p>
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

        {/* Sliders */}
        <div className="px-5 py-6 space-y-8">
          {/* Pick-up slider */}
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm font-semibold text-font-main-sub">
                Pick-up:{" "}
                <span className="font-thin font-sm text-font-main-sub">
                  {formatDate(pickupDate)}
                </span>
              </p>
              <p className="text-sm font-thin text-font-main-sub">
                {formatTime(pickupTime.hour, pickupTime.minute)}
              </p>
            </div>
            <div className="py-2">
              <input
                type="range"
                min={0}
                max={47}
                step={1}
                value={pickupIdx}
                onChange={(e) => setPickupIdx(Number(e.target.value))}
                className={`w-full h-1.5 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-runnable-track]:rounded-full
                  [&::-webkit-slider-runnable-track]:h-1.5
                  ${sliderThumbClasses}`}
                style={{
                  background: `linear-gradient(to right, #ffc107 ${(pickupIdx / 47) * 100}%, #e5e7eb ${(pickupIdx / 47) * 100}%)`,
                }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-font-dim">12:00 AM</span>
              <span className="text-[10px] text-font-dim">12:00 PM</span>
              <span className="text-[10px] text-font-dim">11:30 PM</span>
            </div>
          </div>

          {/* Drop-off slider */}
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-sm font-semibold text-font-main-sub">
                Drop-off:{" "}
                <span className="font-sm font-thin text-font-main-sub">
                  {formatDate(dropoffDate)}
                </span>
              </p>
              <p className="text-sm font-thin text-font-main-sub">
                {formatTime(dropoffTime.hour, dropoffTime.minute)}
              </p>
            </div>
            <div className="py-2">
              <input
                type="range"
                min={0}
                max={47}
                step={1}
                value={dropoffIdx}
                onChange={(e) => setDropoffIdx(Number(e.target.value))}
                className={`w-full h-1.5 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-runnable-track]:rounded-full
                  [&::-webkit-slider-runnable-track]:h-1.5
                  ${sliderThumbClasses}`}
                style={{
                  background: `linear-gradient(to right, #ffc107 ${(dropoffIdx / 47) * 100}%, #e5e7eb ${(dropoffIdx / 47) * 100}%)`,
                }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-font-dim">12:00 AM</span>
              <span className="text-[10px] text-font-dim">12:00 PM</span>
              <span className="text-[10px] text-font-dim">11:30 PM</span>
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
    document.body,
  );
}
