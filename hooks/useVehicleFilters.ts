"use client";

import { useState, useMemo } from "react";
import type { VehicleSearchResult } from "@/types/vehicles.types";

export type FilterState = {
  priceMax: number;
  priceRanges: string[];
  transmissions: string[];
  fuelTypes: string[];
  ccRanges: string[];
  brands: string[];
  vehicleTypes: string[];
  locationIds: string[];
  sortValue: string;
};

export type PriceRangeDef = {
  key: string;
  label: string;
  min: number;
  max: number;
};

export type FilterOptions = {
  priceAbsoluteMax: number;
  priceRangeDefs: PriceRangeDef[];
  transmissionCounts: Record<string, number>;
  fuelTypeCounts: Record<string, number>;
  vehicleTypeCounts: Record<string, number>;
  ccRangeCounts: Record<string, number>;
  priceRangeCounts: Record<string, number>;
  brandCounts: Record<string, number>;
  locationOptions: Record<string, { name: string; count: number }>;
};

const CC_RANGES = [
  { key: "0-110", label: "Up to 110cc", min: 0, max: 110 },
  { key: "111-200", label: "111cc – 200cc", min: 111, max: 200 },
  { key: "201-350", label: "201cc – 350cc", min: 201, max: 350 },
  { key: "350+", label: "350cc+", min: 351, max: Infinity },
];

export const CC_RANGE_META = CC_RANGES;

export const TRANSMISSION_LABELS: Record<string, string> = {
  AUTOMATIC: "Automatic",
  MANUAL: "Manual",
  SEMI_AUTO: "Semi-Automatic",
};

export const FUEL_LABELS: Record<string, string> = {
  PETROL: "Petrol",
  ELECTRIC: "Electric",
  CNG: "CNG",
  HYBRID: "Hybrid",
  DIESEL: "Diesel",
};

export const VEHICLE_TYPE_LABELS: Record<string, string> = {
  BIKE: "Bike",
  SCOOTER: "Scooter",
  CAR: "Car",
  VAN: "Van",
  AUTO_RICKSHAW: "Auto Rickshaw",
  BUS: "Bus",
};

function getMinDailyPrice(bike: VehicleSearchResult): number | null {
  let min: number | null = null;
  for (const loc of bike.locations) {
    const pkg = loc.pricing_packages?.[0];
    if (pkg?.total_price != null) {
      const p = parseFloat(pkg.total_price);
      if (!isNaN(p) && (min === null || p < min)) min = p;
    }
  }
  return min;
}

/**
 * Picks a "nice" bucket width (500, 1000, 2000, 5000, 10000…) so the
 * full price range divides into roughly `targetBuckets` chunks, instead
 * of a fixed step that breaks down once prices exceed it.
 */
function getNiceStep(max: number, targetBuckets = 4): number {
  if (max <= 0) return 500;
  const rawStep = max / targetBuckets;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalized = rawStep / magnitude;
  let niceMultiplier: number;
  if (normalized <= 1) niceMultiplier = 1;
  else if (normalized <= 2) niceMultiplier = 2;
  else if (normalized <= 5) niceMultiplier = 5;
  else niceMultiplier = 10;
  return niceMultiplier * magnitude;
}

/** Builds price buckets dynamically from the actual max price in the result set. */
function buildPriceRanges(maxPrice: number): PriceRangeDef[] {
  const step = getNiceStep(maxPrice);
  const ranges: PriceRangeDef[] = [];
  let current = 0;
  while (current < maxPrice) {
    const next = current + step;
    ranges.push({
      key: `${current}-${next}`,
      label: `₹${current.toLocaleString("en-IN")} – ₹${next.toLocaleString("en-IN")}`,
      min: current,
      max: next,
    });
    current = next;
  }
  if (ranges.length > 0) {
    const last = ranges[ranges.length - 1];
    last.max = Infinity;
    last.key = `${last.min}+`;
    last.label = `₹${last.min.toLocaleString("en-IN")}+`;
  }
  return ranges;
}

export function deriveFilterOptions(
  bikes: VehicleSearchResult[],
): FilterOptions {
  const transmissionCounts: Record<string, number> = {};
  const fuelTypeCounts: Record<string, number> = {};
  const vehicleTypeCounts: Record<string, number> = {};
  const ccRangeCounts: Record<string, number> = {};
  const priceRangeCounts: Record<string, number> = {};
  const brandCounts: Record<string, number> = {};
  const locationOptions: Record<string, { name: string; count: number }> = {};

  // First pass: find the real max so we can build sensible buckets
  let priceAbsoluteMax = 0;
  for (const bike of bikes) {
    const price = getMinDailyPrice(bike);
    if (price !== null && price > priceAbsoluteMax) priceAbsoluteMax = price;
  }
  priceAbsoluteMax =
    priceAbsoluteMax > 0 ? Math.ceil(priceAbsoluteMax / 100) * 100 : 2000;
  const priceRangeDefs = buildPriceRanges(priceAbsoluteMax);

  // Second pass: bucket everything
  for (const bike of bikes) {
    const t = bike.transmission_type;
    transmissionCounts[t] = (transmissionCounts[t] ?? 0) + 1;

    const f = bike.fuel_type;
    fuelTypeCounts[f] = (fuelTypeCounts[f] ?? 0) + 1;

    const vt = bike.vehicle_type;
    vehicleTypeCounts[vt] = (vehicleTypeCounts[vt] ?? 0) + 1;

    for (const r of CC_RANGES) {
      if (bike.cc >= r.min && bike.cc <= r.max) {
        ccRangeCounts[r.key] = (ccRangeCounts[r.key] ?? 0) + 1;
        break;
      }
    }

    const b = bike.brand;
    brandCounts[b] = (brandCounts[b] ?? 0) + 1;

    for (const loc of bike.locations) {
      const key = String(loc.location_id);
      if (!locationOptions[key]) {
        locationOptions[key] = { name: loc.location_name, count: 0 };
      }
      locationOptions[key].count += 1;
    }

    const price = getMinDailyPrice(bike);
    if (price !== null) {
      for (const r of priceRangeDefs) {
        if (price >= r.min && price <= r.max) {
          priceRangeCounts[r.key] = (priceRangeCounts[r.key] ?? 0) + 1;
          break;
        }
      }
    }
  }

  return {
    priceAbsoluteMax,
    priceRangeDefs,
    transmissionCounts,
    fuelTypeCounts,
    ccRangeCounts,
    priceRangeCounts,
    brandCounts,
    locationOptions,
    vehicleTypeCounts,
  };
}

/** All arrays empty = no filters active = show all results */
function buildInitialFilters(options: FilterOptions): FilterState {
  return {
    priceMax: options.priceAbsoluteMax,
    priceRanges: [],
    transmissions: [],
    fuelTypes: [],
    ccRanges: [],
    brands: [],
    locationIds: [],
    vehicleTypes: [],
    sortValue: "none",
  };
}

function applyFilters(
  bikes: VehicleSearchResult[],
  filters: FilterState,
  priceRangeDefs: PriceRangeDef[],
): VehicleSearchResult[] {
  let result = bikes.filter((bike) => {
    if (
      filters.transmissions.length > 0 &&
      !filters.transmissions.includes(bike.transmission_type)
    )
      return false;

    if (
      filters.fuelTypes.length > 0 &&
      !filters.fuelTypes.includes(bike.fuel_type)
    )
      return false;

    if (
      filters.vehicleTypes.length > 0 &&
      !filters.vehicleTypes.includes(bike.vehicle_type)
    )
      return false;

    if (filters.ccRanges.length > 0) {
      const ok = CC_RANGES.some(
        (r) =>
          filters.ccRanges.includes(r.key) &&
          bike.cc >= r.min &&
          bike.cc <= r.max,
      );
      if (!ok) return false;
    }

    if (filters.brands.length > 0 && !filters.brands.includes(bike.brand))
      return false;

    if (filters.locationIds.length > 0) {
      const ok = bike.locations.some((loc) =>
        filters.locationIds.includes(String(loc.location_id)),
      );
      if (!ok) return false;
    }

    const price = getMinDailyPrice(bike);
    if (price !== null) {
      if (price > filters.priceMax) return false;
      if (filters.priceRanges.length > 0) {
        const ok = priceRangeDefs.some(
          (r) =>
            filters.priceRanges.includes(r.key) &&
            price >= r.min &&
            price <= r.max,
        );
        if (!ok) return false;
      }
    }

    return true;
  });

  if (filters.sortValue === "price_asc") {
    result = [...result].sort(
      (a, b) => (getMinDailyPrice(a) ?? 0) - (getMinDailyPrice(b) ?? 0),
    );
  } else if (filters.sortValue === "price_desc") {
    result = [...result].sort(
      (a, b) => (getMinDailyPrice(b) ?? 0) - (getMinDailyPrice(a) ?? 0),
    );
  }

  return result;
}

export function useVehicleFilters(bikes: VehicleSearchResult[]) {
  const options = useMemo(() => deriveFilterOptions(bikes), [bikes]);
  const [filters, setFilters] = useState<FilterState>(() =>
    buildInitialFilters(options),
  );

  const filteredBikes = useMemo(
    () => applyFilters(bikes, filters, options.priceRangeDefs),
    [bikes, filters, options.priceRangeDefs],
  );

  function toggleArrayFilter<K extends keyof FilterState>(
    key: K,
    value: string,
  ) {
    setFilters((prev) => {
      const arr = prev[key] as string[];
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...prev, [key]: next };
    });
  }

  function setPriceMax(max: number) {
    setFilters((prev) => ({ ...prev, priceMax: max }));
  }

  function setSortValue(sortValue: string) {
    setFilters((prev) => ({ ...prev, sortValue }));
  }

  function clearAll() {
    setFilters(buildInitialFilters(options));
  }

  return {
    filters,
    options,
    filteredBikes,
    toggleArrayFilter,
    setPriceMax,
    setSortValue,
    clearAll,
  };
}
