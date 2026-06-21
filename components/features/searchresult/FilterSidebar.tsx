"use client";

import { useState } from "react";
import {
  FilterState,
  FilterOptions,
  CC_RANGE_META,
  TRANSMISSION_LABELS,
  FUEL_LABELS,
  VEHICLE_TYPE_LABELS,
} from "@/hooks/useVehicleFilters";
// ── Collapsible section ──────────────────────────────────────────────

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
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-5 lg:px-6  py-4 text-left"
      >
        <span className="font-medium text-base text-black">{title}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>
      {open && (
        <div className="px-5 lg:px-6  pb-5 border-t border-gray-100 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Controlled checkbox item ─────────────────────────────────────────

function CheckItem({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-black cursor-pointer py-0.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className="w-4 h-4 rounded border border-gray-400 flex-shrink-0
          peer-checked:bg-[#ffc107] peer-checked:border-[#ffc107]
          peer-focus-visible:ring-2 peer-focus-visible:ring-[#ffc107] peer-focus-visible:ring-offset-1
          flex items-center justify-center transition-colors"
      >
        {checked && (
          <svg
            className="w-2.5 h-2.5 text-white"
            viewBox="0 0 10 8"
            fill="none"
          >
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-sm text-black">{label}</span>
      <span className="ml-auto text-sm text-black">{count}</span>
    </label>
  );
}

// ── Main component ────────────────────────────────────────────────────

interface FilterSidebarProps {
  filters: FilterState;
  options: FilterOptions;
  onToggle: (key: keyof FilterState, value: string) => void;
  onPriceMaxChange: (max: number) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({
  filters,
  options,
  onToggle,
  onPriceMaxChange,
  onClearAll,
}: FilterSidebarProps) {
  const {
    priceAbsoluteMax,
    transmissionCounts,
    fuelTypeCounts,
    priceRangeDefs,
    vehicleTypeCounts,
    ccRangeCounts,
    priceRangeCounts,
    brandCounts,
    locationOptions,
  } = options;

  const visiblePriceRanges = priceRangeDefs.filter(
    (r) => priceRangeCounts[r.key] != null,
  );
  const visibleCcRanges = CC_RANGE_META.filter(
    (r) => ccRangeCounts[r.key] != null,
  );
  const locationEntries = Object.entries(locationOptions).sort((a, b) =>
    a[1].name.localeCompare(b[1].name),
  );
  const brandEntries = Object.entries(brandCounts).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );

  return (
    // <div className="bg-white rounded-md border border-gray-300/80 overflow-hidden md:shadow-md">
    <div className="bg-white rounded-md ">
      {/* Header */}
      <div className="hidden lg:block">
        <div className=" flex items-center justify-between px-5 py-4 lg:px-6 lg:pt-6 border-b border-gray-100">
          <span className="font-semibold text-[20px] text-black">Filter</span>
          <button
            onClick={onClearAll}
            className="text-[#006CE4] text-sm font-semibold hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      </div>

      {/* Price per day */}
      <FilterSection title="Price per day">
        <div className="flex justify-between text-sm text-black mb-3">
          <span>₹0</span>
          <span>₹{filters.priceMax.toLocaleString("en-IN")}</span>
        </div>
        <input
          type="range"
          min={0}
          max={priceAbsoluteMax}
          step={50}
          value={filters.priceMax}
          onChange={(e) => onPriceMaxChange(Number(e.target.value))}
          className="w-full accent-[#ffc107]"
        />
        {visiblePriceRanges.length > 0 && (
          <div className="flex flex-col gap-1.5 mt-4">
            {visiblePriceRanges.map((r) => (
              <CheckItem
                key={r.key}
                label={r.label}
                count={priceRangeCounts[r.key] ?? 0}
                checked={filters.priceRanges.includes(r.key)}
                onChange={() => onToggle("priceRanges", r.key)}
              />
            ))}
          </div>
        )}
      </FilterSection>

      {/* Pickup location */}
      {locationEntries.length > 0 && (
        <FilterSection title="Pickup location">
          <div className="flex flex-col gap-1.5">
            {locationEntries.map(([key, { name, count }]) => (
              <CheckItem
                key={key}
                label={name}
                count={count}
                checked={filters.locationIds.includes(key)}
                onChange={() => onToggle("locationIds", key)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {/* Brand */}
      {brandEntries.length > 0 && (
        <FilterSection title="Brand">
          <div className="flex flex-col gap-1.5">
            {brandEntries.map(([brand, count]) => (
              <CheckItem
                key={brand}
                label={brand}
                count={count}
                checked={filters.brands.includes(brand)}
                onChange={() => onToggle("brands", brand)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {/* Transmission */}
      {Object.keys(transmissionCounts).length > 0 && (
        <FilterSection title="Transmission">
          <div className="flex flex-col gap-1.5">
            {Object.entries(transmissionCounts).map(([key, count]) => (
              <CheckItem
                key={key}
                label={TRANSMISSION_LABELS[key] ?? key}
                count={count}
                checked={filters.transmissions.includes(key)}
                onChange={() => onToggle("transmissions", key)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {/* Fuel type */}
      {Object.keys(fuelTypeCounts).length > 0 && (
        <FilterSection title="Fuel type">
          <div className="flex flex-col gap-1.5">
            {Object.entries(fuelTypeCounts).map(([key, count]) => (
              <CheckItem
                key={key}
                label={FUEL_LABELS[key] ?? key}
                count={count}
                checked={filters.fuelTypes.includes(key)}
                onChange={() => onToggle("fuelTypes", key)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {/* Vehicle type */}
      {Object.keys(vehicleTypeCounts).length > 0 && (
        <FilterSection title="Vehicle type">
          <div className="flex flex-col gap-1.5">
            {Object.entries(vehicleTypeCounts).map(([key, count]) => (
              <CheckItem
                key={key}
                label={VEHICLE_TYPE_LABELS[key] ?? key}
                count={count}
                checked={filters.vehicleTypes.includes(key)}
                onChange={() => onToggle("vehicleTypes", key)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {/* Engine capacity */}
      {visibleCcRanges.length > 0 && (
        <FilterSection title="Engine capacity">
          <div className="flex flex-col gap-1.5">
            {visibleCcRanges.map((r) => (
              <CheckItem
                key={r.key}
                label={r.label}
                count={ccRangeCounts[r.key] ?? 0}
                checked={filters.ccRanges.includes(r.key)}
                onChange={() => onToggle("ccRanges", r.key)}
              />
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  );
}
