// // hooks/useVehicleFilters.ts
// "use client";

// import { useState, useMemo } from "react";
// import { VehicleSearchResult } from "@/actions/searchVehicles";

// export type FilterState = {
//   priceMax: number;
//   priceRanges: string[];
//   transmissions: string[];
//   fuelTypes: string[];
//   ccRanges: string[];
//   brands: string[];
//   vehicleTypes: string[];
//   locationIds: string[];   // location_id as string keys
//   sortValue: string;       // "none" | "price_asc" | "price_desc"
// };

// export type FilterOptions = {
//   priceAbsoluteMax: number;
//   transmissionCounts: Record<string, number>;
//   fuelTypeCounts: Record<string, number>;
//   vehicleTypeCounts: Record<string, number>;
//   ccRangeCounts: Record<string, number>;
//   priceRangeCounts: Record<string, number>;
//   brandCounts: Record<string, number>;
//   // location_id (string) -> { name, count }
//   locationOptions: Record<string, { name: string; count: number }>;
// };

// const PRICE_RANGES = [
//   { key: "0-500",     label: "₹0 – ₹500",        min: 0,    max: 500       },
//   { key: "500-1000",  label: "₹500 – ₹1,000",    min: 500,  max: 1000      },
//   { key: "1000-1500", label: "₹1,000 – ₹1,500",  min: 1000, max: 1500      },
//   { key: "1500+",     label: "₹1,500+",            min: 1500, max: Infinity  },
// ];

// const CC_RANGES = [
//   { key: "0-110",   label: "Up to 110cc",   min: 0,   max: 110       },
//   { key: "111-200", label: "111cc – 200cc", min: 111, max: 200       },
//   { key: "201-350", label: "201cc – 350cc", min: 201, max: 350       },
//   { key: "350+",    label: "350cc+",         min: 351, max: Infinity  },
// ];

// export const PRICE_RANGE_META = PRICE_RANGES;
// export const CC_RANGE_META = CC_RANGES;

// export const TRANSMISSION_LABELS: Record<string, string> = {
//   AUTOMATIC:  "Automatic",
//   MANUAL:     "Manual",
//   SEMI_AUTO:  "Semi-Automatic",
// };

// export const FUEL_LABELS: Record<string, string> = {
//   PETROL:   "Petrol",
//   ELECTRIC: "Electric",
//   CNG:      "CNG",
//   HYBRID:   "Hybrid",
//   DIESEL:   "Diesel",
// };

// export const VEHICLE_TYPE_LABELS: Record<string, string> = {
//   BIKE: "Bike",
//   SCOOTER: "Scooter",
//   CAR: "Car",
//   VAN: "Van",
//   AUTO_RICKSHAW: "Auto Rickshaw",
//   BUS: "Bus",
// };

// /** Minimum daily price across all locations */
// function getMinDailyPrice(bike: VehicleSearchResult): number | null {
//   let min: number | null = null;
//   for (const loc of bike.locations) {
//     if (loc.daily_price != null) {
//       const p = parseFloat(loc.daily_price);
//       if (min === null || p < min) min = p;
//     }
//   }
//   return min;
// }

// /** Derive filter options + counts from raw API data */
// export function deriveFilterOptions(bikes: VehicleSearchResult[]): FilterOptions {
//   const transmissionCounts: Record<string, number> = {};
//   const fuelTypeCounts: Record<string, number> = {};
//   const vehicleTypeCounts: Record<string, number> = {};
//   const ccRangeCounts: Record<string, number> = {};
//   const priceRangeCounts: Record<string, number> = {};
//   const brandCounts: Record<string, number> = {};
//   const locationOptions: Record<string, { name: string; count: number }> = {};
//   let priceAbsoluteMax = 2000;

//   for (const bike of bikes) {
//     // Transmission
//     const t = bike.transmission_type;
//     transmissionCounts[t] = (transmissionCounts[t] ?? 0) + 1;

//     // Fuel
//     const f = bike.fuel_type;
//     fuelTypeCounts[f] = (fuelTypeCounts[f] ?? 0) + 1;

//     // Vehicle type
//     const vt = bike.vehicle_type;
//     vehicleTypeCounts[vt] = (vehicleTypeCounts[vt] ?? 0) + 1;

//     // CC range
//     for (const r of CC_RANGES) {
//       if (bike.cc >= r.min && bike.cc <= r.max) {
//         ccRangeCounts[r.key] = (ccRangeCounts[r.key] ?? 0) + 1;
//         break;
//       }
//     }

//     // Brand
//     const b = bike.brand;
//     brandCounts[b] = (brandCounts[b] ?? 0) + 1;

//     // Locations — one entry per unique location_id across all listings
//     for (const loc of bike.locations) {
//       const key = String(loc.location_id);
//       if (!locationOptions[key]) {
//         locationOptions[key] = { name: loc.location_name, count: 0 };
//       }
//       locationOptions[key].count += 1;
//     }

//     // Price range
//     const price = getMinDailyPrice(bike);
//     if (price !== null) {
//       if (price > priceAbsoluteMax) priceAbsoluteMax = Math.ceil(price / 100) * 100;
//       for (const r of PRICE_RANGES) {
//         if (price >= r.min && price <= r.max) {
//           priceRangeCounts[r.key] = (priceRangeCounts[r.key] ?? 0) + 1;
//           break;
//         }
//       }
//     }
//   }

//   return {
//     priceAbsoluteMax,
//     transmissionCounts,
//     fuelTypeCounts,
//     ccRangeCounts,
//     priceRangeCounts,
//     brandCounts,
//     locationOptions,
//     vehicleTypeCounts,
//   };
// }

// /** All options selected, no sort applied */
// function buildInitialFilters(options: FilterOptions): FilterState {
//   return {
//     priceMax: options.priceAbsoluteMax,
//     priceRanges: Object.keys(options.priceRangeCounts),
//     transmissions: Object.keys(options.transmissionCounts),
//     fuelTypes: Object.keys(options.fuelTypeCounts),
//     ccRanges: Object.keys(options.ccRangeCounts),
//     brands: Object.keys(options.brandCounts),
//     locationIds: Object.keys(options.locationOptions),
//     vehicleTypes: Object.keys(options.vehicleTypeCounts),
//     sortValue: "none",   // no sorting until user explicitly picks one
//   };
// }

// /** Filter + conditionally sort */
// function applyFilters(
//   bikes: VehicleSearchResult[],
//   filters: FilterState,
// ): VehicleSearchResult[] {
//   let result = bikes.filter((bike) => {
//     // Transmission
//     if (filters.transmissions.length > 0 && !filters.transmissions.includes(bike.transmission_type))
//       return false;

//     // Fuel
//     if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(bike.fuel_type))
//       return false;

//     // Vehicle type
//     if (filters.vehicleTypes.length > 0 && !filters.vehicleTypes.includes(bike.vehicle_type))
//       return false;

//     // CC range
//     if (filters.ccRanges.length > 0) {
//       const ok = CC_RANGES.some(
//         (r) => filters.ccRanges.includes(r.key) && bike.cc >= r.min && bike.cc <= r.max
//       );
//       if (!ok) return false;
//     }

//     // Brand
//     if (filters.brands.length > 0 && !filters.brands.includes(bike.brand))
//       return false;

//     // Location — bike passes if at least one of its locations is selected
//     if (filters.locationIds.length > 0) {
//       const ok = bike.locations.some((loc) =>
//         filters.locationIds.includes(String(loc.location_id))
//       );
//       if (!ok) return false;
//     }

//     // Price slider
//     const price = getMinDailyPrice(bike);
//     if (price !== null) {
//       if (price > filters.priceMax) return false;
//       if (filters.priceRanges.length > 0) {
//         const ok = PRICE_RANGES.some(
//           (r) => filters.priceRanges.includes(r.key) && price >= r.min && price <= r.max
//         );
//         if (!ok) return false;
//       }
//     }

//     return true;
//   });

//   // Sort — only when user has explicitly chosen a sort option
//   if (filters.sortValue === "price_asc") {
//     result = [...result].sort((a, b) => (getMinDailyPrice(a) ?? 0) - (getMinDailyPrice(b) ?? 0));
//   } else if (filters.sortValue === "price_desc") {
//     result = [...result].sort((a, b) => (getMinDailyPrice(b) ?? 0) - (getMinDailyPrice(a) ?? 0));
//   }
//   // "none" → preserve original API order

//   return result;
// }

// export function useVehicleFilters(bikes: VehicleSearchResult[]) {
//   const options = useMemo(() => deriveFilterOptions(bikes), [bikes]);
//   const [filters, setFilters] = useState<FilterState>(() => buildInitialFilters(options));

//   const filteredBikes = useMemo(() => applyFilters(bikes, filters), [bikes, filters]);

//   function toggleArrayFilter<K extends keyof FilterState>(key: K, value: string) {
//     setFilters((prev) => {
//       const arr = prev[key] as string[];
//       const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
//       return { ...prev, [key]: next };
//     });
//   }

//   function setPriceMax(max: number) {
//     setFilters((prev) => ({ ...prev, priceMax: max }));
//   }

//   function setSortValue(sortValue: string) {
//     setFilters((prev) => ({ ...prev, sortValue }));
//   }

//   function clearAll() {
//     setFilters(buildInitialFilters(options));
//   }

//   return { filters, options, filteredBikes, toggleArrayFilter, setPriceMax, setSortValue, clearAll };
// }

// hooks/useVehicleFilters.ts
"use client";

import { useState, useMemo } from "react";
import { VehicleSearchResult } from "@/actions/searchVehicles";

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

export type FilterOptions = {
  priceAbsoluteMax: number;
  transmissionCounts: Record<string, number>;
  fuelTypeCounts: Record<string, number>;
  vehicleTypeCounts: Record<string, number>;
  ccRangeCounts: Record<string, number>;
  priceRangeCounts: Record<string, number>;
  brandCounts: Record<string, number>;
  locationOptions: Record<string, { name: string; count: number }>;
};

const PRICE_RANGES = [
  { key: "0-500",     label: "₹0 – ₹500",        min: 0,    max: 500       },
  { key: "500-1000",  label: "₹500 – ₹1,000",    min: 500,  max: 1000      },
  { key: "1000-1500", label: "₹1,000 – ₹1,500",  min: 1000, max: 1500      },
  { key: "1500+",     label: "₹1,500+",            min: 1500, max: Infinity  },
];

const CC_RANGES = [
  { key: "0-110",   label: "Up to 110cc",   min: 0,   max: 110       },
  { key: "111-200", label: "111cc – 200cc", min: 111, max: 200       },
  { key: "201-350", label: "201cc – 350cc", min: 201, max: 350       },
  { key: "350+",    label: "350cc+",         min: 351, max: Infinity  },
];

export const PRICE_RANGE_META = PRICE_RANGES;
export const CC_RANGE_META = CC_RANGES;

export const TRANSMISSION_LABELS: Record<string, string> = {
  AUTOMATIC:  "Automatic",
  MANUAL:     "Manual",
  SEMI_AUTO:  "Semi-Automatic",
};

export const FUEL_LABELS: Record<string, string> = {
  PETROL:   "Petrol",
  ELECTRIC: "Electric",
  CNG:      "CNG",
  HYBRID:   "Hybrid",
  DIESEL:   "Diesel",
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
    if (loc.daily_price != null) {
      const p = parseFloat(loc.daily_price);
      if (min === null || p < min) min = p;
    }
  }
  return min;
}

export function deriveFilterOptions(bikes: VehicleSearchResult[]): FilterOptions {
  const transmissionCounts: Record<string, number> = {};
  const fuelTypeCounts: Record<string, number> = {};
  const vehicleTypeCounts: Record<string, number> = {};
  const ccRangeCounts: Record<string, number> = {};
  const priceRangeCounts: Record<string, number> = {};
  const brandCounts: Record<string, number> = {};
  const locationOptions: Record<string, { name: string; count: number }> = {};
  let priceAbsoluteMax = 2000;

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
      if (price > priceAbsoluteMax) priceAbsoluteMax = Math.ceil(price / 100) * 100;
      for (const r of PRICE_RANGES) {
        if (price >= r.min && price <= r.max) {
          priceRangeCounts[r.key] = (priceRangeCounts[r.key] ?? 0) + 1;
          break;
        }
      }
    }
  }

  return {
    priceAbsoluteMax,
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
): VehicleSearchResult[] {
  let result = bikes.filter((bike) => {
    if (filters.transmissions.length > 0 && !filters.transmissions.includes(bike.transmission_type))
      return false;

    if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(bike.fuel_type))
      return false;

    if (filters.vehicleTypes.length > 0 && !filters.vehicleTypes.includes(bike.vehicle_type))
      return false;

    if (filters.ccRanges.length > 0) {
      const ok = CC_RANGES.some(
        (r) => filters.ccRanges.includes(r.key) && bike.cc >= r.min && bike.cc <= r.max
      );
      if (!ok) return false;
    }

    if (filters.brands.length > 0 && !filters.brands.includes(bike.brand))
      return false;

    if (filters.locationIds.length > 0) {
      const ok = bike.locations.some((loc) =>
        filters.locationIds.includes(String(loc.location_id))
      );
      if (!ok) return false;
    }

    // Price slider always applies (max cap), but price range checkboxes
    // only filter when at least one is checked
    const price = getMinDailyPrice(bike);
    if (price !== null) {
      if (price > filters.priceMax) return false;
      if (filters.priceRanges.length > 0) {
        const ok = PRICE_RANGES.some(
          (r) => filters.priceRanges.includes(r.key) && price >= r.min && price <= r.max
        );
        if (!ok) return false;
      }
    }

    return true;
  });

  if (filters.sortValue === "price_asc") {
    result = [...result].sort((a, b) => (getMinDailyPrice(a) ?? 0) - (getMinDailyPrice(b) ?? 0));
  } else if (filters.sortValue === "price_desc") {
    result = [...result].sort((a, b) => (getMinDailyPrice(b) ?? 0) - (getMinDailyPrice(a) ?? 0));
  }

  return result;
}

export function useVehicleFilters(bikes: VehicleSearchResult[]) {
  const options = useMemo(() => deriveFilterOptions(bikes), [bikes]);
  const [filters, setFilters] = useState<FilterState>(() => buildInitialFilters(options));

  const filteredBikes = useMemo(() => applyFilters(bikes, filters), [bikes, filters]);

  function toggleArrayFilter<K extends keyof FilterState>(key: K, value: string) {
    setFilters((prev) => {
      const arr = prev[key] as string[];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
  }

  function setPriceMax(max: number) {
    setFilters((prev) => ({ ...prev, priceMax: max }));
  }

  function setSortValue(sortValue: string) {
    setFilters((prev) => ({ ...prev, sortValue }));
  }

  /** Reset to blank — all results shown, no checkboxes ticked */
  function clearAll() {
    setFilters(buildInitialFilters(options));
  }

  return { filters, options, filteredBikes, toggleArrayFilter, setPriceMax, setSortValue, clearAll };
}