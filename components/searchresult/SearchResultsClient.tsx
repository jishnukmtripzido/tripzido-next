


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
import { useVehicleFilters } from "@/hooks/useVehicleFilters";
import OfferBanner from "../ui/OfferBanner";
import VehicleDisclaimer from "./VehicleDisclaimer";

const SORT_OPTIONS = [
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
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
  bikes,
  city,
  cityId,
  pickup,
  dropoff,
  cities,
  citiesError,
}: Props) {
  const [drawerMode, setDrawerMode]       = useState<"filter" | "sort" | null>(null);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [activeCardId, setActiveCardId]   = useState<number | null>(null);
  const [activeTab, setActiveTab]         = useState<"all" | "electric">("all");

  const {
    filters,
    options,
    filteredBikes,
    toggleArrayFilter,
    setPriceMax,
    setSortValue,
    clearAll,
  } = useVehicleFilters(bikes ?? []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Apply tab filter on top of the hook's filter output
  const tabFilteredBikes =
    activeTab === "electric"
      ? filteredBikes.filter((b) => b.fuel_type === "ELECTRIC")
      : filteredBikes;

  const electricCount = (bikes ?? []).filter((b) => b.fuel_type === "ELECTRIC").length;
  const allModelsCount = bikes ? bikes.length : 0;

  const selectedSortLabel = SORT_OPTIONS.find((o) => o.value === filters.sortValue)?.label;

  function parseHour(iso: string)   { return iso ? new Date(iso).getHours()   : 10; }
  function parseMinute(iso: string) { return iso ? new Date(iso).getMinutes() : 0;  }
  function parseDate(iso: string)   { return iso ? new Date(iso) : new Date();       }

  function formatDateTime(iso: string) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-IN", {
      weekday: "short", month: "short", day: "numeric",
    });
  }
  function formatTime(iso: string) {
    if (!iso) return "";
    const h = parseHour(iso), m = parseMinute(iso);
    const period = h >= 12 ? "PM" : "AM";
    return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${period}`;
  }

  const filterSidebarProps = {
    filters,
    options,
    onToggle: toggleArrayFilter,
    onPriceMaxChange: setPriceMax,
    onClearAll: clearAll,
  };


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

      <div className=" md:hidden bg-[#fed250] px-1 py-2.5">
   
  <div className="center">
    <p className="text-[12px] md:text-[12.8px] font-thin text-center text-[#3a2c00]">
      🎉 Limited time offer — Get <strong className="text-black">10% off</strong> on your first booking! 
     </p>
     
  </div>
</div>

      <FilterSortBar
        onFilterClick={() => setDrawerMode("filter")}
        onSortClick={() => setDrawerMode("sort")}
        scrolled={scrolled}
      />
      {/* Offer Banner */}
      <OfferBanner />

      <div className="bg-[#FAFBFD] min-h-screen">
        <div className="mx-auto px-4 pt-5 pb-6 xl:mx-[80.5px] xl:px-0 flex gap-6 items-start">

          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-[130px] self-start">
            <FilterSidebar {...filterSidebarProps} />
          </aside>

          <div className="flex-1 min-w-0">

            {/* ── Desktop: Tabs + Sort row ── */}
            <div className="hidden md:block mb-4">
              <div className="flex items-end justify-between flex-wrap gap-3">

                {/* Tabs */}
                <div className="flex items-center border-b border-gray-200 ">
                  {/* All models tab */}
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`
                      pb-2.5 pr-4 text-sm font-medium border-b-2 -mb-px transition-colors hover:cursor-pointer
                      ${activeTab === "all"
                        ? "border-[#ffc107] text-black"
                        : "border-transparent text-gray-500 hover:text-gray-700"}
                    `}
                  >
                    All models
                    <span
                      className={`
                        ml-2 text-xs rounded-full px-2 py-0.5
                        ${activeTab === "all"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-gray-100 text-gray-500"}
                      `}
                    >
                      {allModelsCount}
                    </span>
                  </button>

                  {/* Electric tab */}
                  <button
                    onClick={() => setActiveTab("electric")}
                    className={`
                      pb-2.5 px-4 text-sm font-medium border-b-2 -mb-px transition-colors hover:cursor-pointer
                      flex items-center gap-1.5
                      ${activeTab === "electric"
                        ? "border-green-600 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"}
                    `}
                  >
                    {/* Lightning bolt icon */}
                    <svg
                      className={`w-3.5 h-3.5 ${activeTab === "electric" ? "text-green-600" : "text-gray-400"}`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M13 2L4.09 13H12L11 22L19.91 11H12L13 2Z" />
                    </svg>
                    Electric
                    <span
                      className={`
                        ml-1 text-xs rounded-full px-2 py-0.5
                        ${activeTab === "electric"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"}
                      `}
                    >
                      {electricCount}
                    </span>
                  </button>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 pb-1">
                  <span className="text-sm text-gray-600 font-medium whitespace-nowrap">Sort by:</span>
                  <div className="relative">
                    <select
                      value={filters.sortValue === "none" ? "" : filters.sortValue}
                      onChange={(e) => setSortValue(e.target.value || "none")}
                      className="appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#ffc107] cursor-pointer"
                    >
                      <option value="" disabled>Select</option>
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Mobile: result count ── */}
            {/* <div className="md:hidden flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-black">
                <span className="font-semibold">{tabFilteredBikes.length}</span> Bikes
                {activeTab === "electric" && (
                  <span className="ml-1 text-green-600 font-medium">· ⚡ Electric</span>
                )}
                {selectedSortLabel ? ` · ${selectedSortLabel}` : ""}
              </p>
            </div> */}
            

            {/* Disclaimer */}
{tabFilteredBikes.length > 0 && (
  <VehicleDisclaimer/>
)}

            {/* ── Results grid or empty state ── */}
            {tabFilteredBikes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-gray-500 text-lg font-medium">
                  {activeTab === "electric" ? "No electric bikes available" : "No bikes available"}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {activeTab === "electric"
                    ? "Try switching to All models or adjusting your filters"
                    : "Try adjusting your filters or dates"}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  {activeTab === "electric" && (
                    <button
                      onClick={() => setActiveTab("all")}
                      className="text-sm text-[#006CE4] hover:underline"
                    >
                      View all models
                    </button>
                  )}
                  <button
                    onClick={clearAll}
                    className="text-sm text-[#006CE4] hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
                {tabFilteredBikes.map((bike) => (
                  <div
                    key={bike.id}
                    style={{ zIndex: activeCardId === bike.id ? 10 : 0, position: "relative" }}
                    className={
                      activeTab === "electric"
                        ? "ring-1 ring-green-200 rounded-xl bg-green-50/30"
                        : ""
                    }
                  >
                    <BikeCard
                      {...bike}
                      onDropdownOpenChange={(open) => setActiveCardId(open ? bike.id : null)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter/sort drawer */}
      <MobileFilterDrawer
        isOpen={drawerMode !== null}
        onClose={() => setDrawerMode(null)}
        mode={drawerMode ?? "filter"}
        sortValue={filters.sortValue}
        onSortChange={(val) => { setSortValue(val); setDrawerMode(null); }}
        {...filterSidebarProps}
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