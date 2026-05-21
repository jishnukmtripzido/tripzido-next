"use client";

import { useState } from "react";

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-0 shadow">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-5 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-medium text-sm text-gray-900">{title}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 border-t border-gray-100 pt-3">{children}</div>}
    </div>
  );
}

function CheckItem({
  label,
  count,
  defaultChecked = false,
}: {
  label: string;
  count: number;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    // <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
    //   <input
    //     type="checkbox"
    //     checked={checked}
    //     onChange={() => setChecked((c) => !c)}
    //     className="rounded border-gray-400 text-[#ffc107] focus:ring-[#ffc107] accent-[#ffc107]"

    //   />
     
    //   <span>{label}</span>
    //   <span className="ml-auto text-xs text-gray-400">{count}</span>
    // </label>
    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
  <input
    type="checkbox"
    checked={checked}
    onChange={() => setChecked((c) => !c)}
    className="sr-only peer"
  />
  <div className="w-4 h-4 rounded border border-gray-400 flex-shrink-0
    peer-checked:bg-brand-yellow peer-checked:border-brand-yellow
    peer-focus-visible:ring-2 peer-focus-visible:ring-brand-yellow peer-focus-visible:ring-offset-1
    flex items-center justify-center">
    {checked && (
      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
        <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  </div>
  <span>{label}</span>
  <span className="ml-auto text-xs text-gray-400">{count}</span>
</label>
  );
}

interface FilterSidebarProps {
  onClearAll?: () => void;
}

export default function FilterSidebar({ onClearAll }: FilterSidebarProps) {
  const [priceMax, setPriceMax] = useState(2000);

  function handleClearAll() {
    setPriceMax(2000);
    onClearAll?.();
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <span className="font-semibold text-base text-gray-700">Filter</span>
        <button
          onClick={handleClearAll}
          className="text-[#006CE4] text-sm font-normal hover:underline cursor-pointer"
        >
          Clear all filters
        </button>
      </div>

      {/* Price */}
      <FilterSection title="Price per day">
        <div className="flex justify-between text-xs text-gray-700 mb-3">
          <span>₹0</span>
          <span>₹{priceMax.toLocaleString("en-IN")}</span>
        </div>
        <input
          type="range"
          min={0}
          max={2000}
          step={50}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-[#ffc107]"
        />
        <div className="flex flex-col gap-1.5 mt-4">
          <CheckItem label="₹0 – ₹500" count={8} defaultChecked />
          <CheckItem label="₹500 – ₹1,000" count={14} defaultChecked />
          <CheckItem label="₹1,000 – ₹1,500" count={9} defaultChecked />
          <CheckItem label="₹1,500+" count={4} />
        </div>
      </FilterSection>

      {/* Bike Type */}
      <FilterSection title="Bike type">
        <div className="flex flex-col gap-1.5">
          <CheckItem label="Scooter / Automatic" count={11} defaultChecked />
          <CheckItem label="Adventure / Tourer" count={7} defaultChecked />
          <CheckItem label="Cruiser" count={6} defaultChecked />
          <CheckItem label="Naked / Street" count={9} defaultChecked />
          <CheckItem label="Sports" count={2} />
        </div>
      </FilterSection>

      {/* Engine */}
      <FilterSection title="Engine capacity">
        <div className="flex flex-col gap-1.5">
          <CheckItem label="Up to 110cc" count={8} defaultChecked />
          <CheckItem label="111cc – 200cc" count={13} defaultChecked />
          <CheckItem label="201cc – 350cc" count={10} defaultChecked />
          <CheckItem label="350cc+" count={4} />
        </div>
      </FilterSection>

      {/* Transmission */}
      <FilterSection title="Transmission">
        <div className="flex flex-col gap-1.5">
          <CheckItem label="Manual (Gear)" count={22} defaultChecked />
          <CheckItem label="Automatic (Scooter)" count={13} defaultChecked />
        </div>
      </FilterSection>

      {/* Extras */}
      <FilterSection title="Included extras">
        <div className="flex flex-col gap-1.5">
          <CheckItem label="Free helmet" count={30} defaultChecked />
          <CheckItem label="Fuel included" count={6} />
          <CheckItem label="Free cancellation" count={18} />
          <CheckItem label="Roadside assistance" count={12} />
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Vendor rating">
        <div className="flex flex-col gap-1.5">
          <CheckItem label="4.5+ Excellent" count={11} defaultChecked />
          <CheckItem label="4.0+ Very good" count={19} defaultChecked />
          <CheckItem label="3.5+ Good" count={5} />
        </div>
      </FilterSection>
    </div>
  );
}
