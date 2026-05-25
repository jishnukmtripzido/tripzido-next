
"use client";

import { useState, useEffect } from "react";
import BikeCard from "./BikeCard";
import FilterSidebar from "./FilterSidebar";
import FilterSortBar from "./FilterSortBar";
import MobileFilterDrawer from "./MobileFilterDrawer";
import MobileSearchBar from "./MobileSearchBar";
import MobileSearchDrawer from "./MobileSearchDrawer";
import SearchResultHeader from "./SearchResultHeader";
import SearchResultHeaderSmallScreen from "./SearchResultHeaderSmallScreen";
import { VehicleSearchResult } from "@/actions/searchVehicles";
import { City } from "@/types/city";

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "top_rated", label: "Top rated" },
  { value: "most_popular", label: "Most popular" },
];

interface Props {
  bikes: VehicleSearchResult[];
  city: string;
  cityId: number | null;
  pickup: string;
  dropoff: string;
  cities: City[];
  citiesError: string | null;
}

export default function SearchResultsClient({
  bikes, city, cityId, pickup, dropoff, cities, citiesError,
}: Props) {
  const [drawerMode, setDrawerMode] = useState<"filter" | "sort" | null>(null);
  const [sortValue, setSortValue] = useState("recommended");
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  useEffect(() => {
    const THRESHOLD = 10;
    const onScroll = () => setScrolled(window.scrollY > THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sortedBikes = [...bikes]
  // .sort((a, b) => {
  //   if (sortValue === "price_asc") return (a.price ?? 0) - (b.price ?? 0);
  //   if (sortValue === "price_desc") return (b.price ?? 0) - (a.price ?? 0);
  //   if (sortValue === "top_rated") return (b.rating ?? 0) - (a.rating ?? 0);
  //   return 0;
  // });

  
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sortValue)?.label ?? "Recommended";

  function parseHour(iso: string) {
    if (!iso) return 10;
    return new Date(iso).getHours();
  }
  function parseMinute(iso: string) {
    if (!iso) return 0;
    return new Date(iso).getMinutes();
  }
  function parseDate(iso: string) {
    if (!iso) return new Date();
    return new Date(iso);
  }
  function formatDateTime(iso: string) {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" });
  }
  function formatTime(iso: string) {
    if (!iso) return "";
    const h = parseHour(iso);
    const m = parseMinute(iso);
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, "0")} ${period}`;
  }

  return (
    <>
      <SearchResultHeaderSmallScreen />

      <SearchResultHeader
        cities={cities}
        citiesError={citiesError}
        initialCityId={cityId}
        initialCityName={city}
        initialPickupDate={parseDate(pickup)}
        initialDropoffDate={parseDate(dropoff)}
        initialPickupHour={parseHour(pickup)}
        initialPickupMinute={parseMinute(pickup)}
        initialDropoffHour={parseHour(dropoff)}
        initialDropoffMinute={parseMinute(dropoff)}
      />

      <MobileSearchBar
        city={city}
        pickupDate={formatDateTime(pickup)}
        dropoffDate={formatDateTime(dropoff)}
        pickupTime={formatTime(pickup)}
        dropoffTime={formatTime(dropoff)}
        onModify={() => setSearchDrawerOpen(true)}
        visible={!scrolled}
      />

      <FilterSortBar
        onFilterClick={() => setDrawerMode("filter")}
        onSortClick={() => setDrawerMode("sort")}
        scrolled={scrolled}
      />

      <div className="bg-[#FAFBFD] min-h-screen">
        <div className="mx-auto px-4 pt-5 pb-6 xl:mx-[121.5px] xl:px-0 flex gap-6 items-start">
          <aside className="hidden lg:block w-64 shrink-0 top-[130px] self-start">
            <FilterSidebar />
          </aside>

          <div className="flex-1 min-w-0">
            <div className="hidden md:flex items-center justify-between mb-4 flex-wrap gap-3">
              <h1 className="font-medium text-black text-xl">
                <span className="text-xl">{bikes.length}</span> vehicles available
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium whitespace-nowrap">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortValue}
                    onChange={(e) => setSortValue(e.target.value)}
                    className="appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm font-normal bg-white focus:outline-none focus:ring-1 focus:ring-[#ffc107] cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:hidden flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-black">
                <span className="font-semibold">{bikes.length}</span> Bikes · {sortLabel}
              </p>
            </div>

            {bikes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-gray-500 text-lg font-medium">No bikes available</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your dates or location</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
                {sortedBikes.map((bike) => (
                  <div
                    key={bike.id}
                    style={{ zIndex: activeCardId === bike.id ? 10 : 0, position: "relative" }}
                  >
                    <BikeCard
                      {...bike}
                      onDropdownOpenChange={(open) =>
                        setActiveCardId(open ? bike.id : null)
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            {/*  */}
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        isOpen={drawerMode !== null}
        onClose={() => setDrawerMode(null)}
        mode={drawerMode ?? "filter"}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />

      <MobileSearchDrawer
        isOpen={searchDrawerOpen}
        onClose={() => setSearchDrawerOpen(false)}
        cities={cities}
        citiesError={citiesError}
        initialCityId={cityId}
        initialCityName={city}
        initialPickupDate={parseDate(pickup)}
        initialDropoffDate={parseDate(dropoff)}
        initialPickupHour={parseHour(pickup)}
        initialPickupMinute={parseMinute(pickup)}
        initialDropoffHour={parseHour(dropoff)}
        initialDropoffMinute={parseMinute(dropoff)}
      />
    </>
  );
}