"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MobileSearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ── Format helpers ── */
function formatDate(d: Date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
}

function formatTime(h: number, m: number) {
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

function getDefaults() {
  const now = new Date();
  const pickup = new Date(now);
  pickup.setHours(now.getHours() + 2, 0, 0, 0);
  const dropoff = new Date(pickup);
  dropoff.setDate(dropoff.getDate() + 1);
  return { pickup, dropoff };
}

export default function MobileSearchDrawer({ isOpen, onClose }: MobileSearchDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const defaults = getDefaults();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative z-10 w-full bg-white rounded-t-2xl shadow-2xl">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-base">Modify Search</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Form fields */}
        <div className="px-5 py-4 flex flex-col gap-3">
          {/* City */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Select City</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2.5 bg-white hover:border-[#ffc107] transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span className="flex-1 text-sm font-medium text-gray-900">Wayanad</span>
              <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Dates + Times grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Pickup date */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Pick-up date</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2.5 bg-white hover:border-[#ffc107] transition-colors cursor-pointer">
                <svg className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-medium whitespace-nowrap">{formatDate(defaults.pickup)}</span>
              </div>
            </div>

            {/* Pickup time */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2.5 bg-white hover:border-[#ffc107] transition-colors cursor-pointer">
                <svg className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-medium whitespace-nowrap">{formatTime(defaults.pickup.getHours(), 0)}</span>
              </div>
            </div>

            {/* Dropoff date */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Drop-off date</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2.5 bg-white hover:border-[#ffc107] transition-colors cursor-pointer">
                <svg className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-medium whitespace-nowrap">{formatDate(defaults.dropoff)}</span>
              </div>
            </div>

            {/* Dropoff time */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2.5 bg-white hover:border-[#ffc107] transition-colors cursor-pointer">
                <svg className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-medium whitespace-nowrap">{formatTime(defaults.dropoff.getHours(), 0)}</span>
              </div>
            </div>
          </div>

          {/* Search button */}
          <button
            onClick={onClose}
            className="w-full bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl text-sm transition-colors cursor-pointer mt-1"
          >
            Search
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
