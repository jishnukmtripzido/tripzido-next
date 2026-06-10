// "use client";

// import { useState } from "react";
// import BikeCard from "./BikeCard";
// import FilterSidebar from "./FilterSidebar";
// import FilterSortBar from "./FilterSortBar";
// import MobileFilterDrawer from "./MobileFilterDrawer";
// import MobileSearchBar from "./MobileSearchBar";
// import MobileSearchDrawer from "./MobileSearchDrawer";
// import SearchResultHeader from "./SearchResultHeader";
// import OfferBanner from "../../ui/OfferBanner";
// import VehicleDisclaimer from "./VehicleDisclaimer";
// import { useVehicleFilters } from "@/hooks/useVehicleFilters";
// import { useScrollTracking } from "@/hooks/useScrollTracking";
// import {
//   parseHour,
//   parseMinute,
//   parseDate,
//   formatDateFromISO,
//   formatTimeFromISO,
// } from "@/lib/dateUtils";
// import { SORT_OPTIONS } from "@/lib/constants";
// import type { VehicleSearchResult } from "@/types/vehicles.types";
// import type { City } from "@/types/locations.types";

// interface Props {
//   bikes: VehicleSearchResult[];
//   city: string;
//   cityId: number | null;
//   pickup: string;
//   dropoff: string;
//   cities: City[];
//   citiesError: string | null;
// }

// export default function SearchResultsClient({
//   bikes,
//   city,
//   cityId,
//   pickup,
//   dropoff,
//   cities,
//   citiesError,
// }: Props) {
//   const [drawerMode, setDrawerMode] = useState<"filter" | "sort" | null>(null);
//   const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
//   const [activeCardId, setActiveCardId] = useState<number | null>(null);
//   const [activeTab, setActiveTab] = useState<"all" | "electric">("all");

//   const scrolled = useScrollTracking(10);

//   const {
//     filters,
//     options,
//     filteredBikes,
//     toggleArrayFilter,
//     setPriceMax,
//     setSortValue,
//     clearAll,
//   } = useVehicleFilters(bikes ?? []);

//   const tabFilteredBikes =
//     activeTab === "electric"
//       ? filteredBikes.filter((b) => b.fuel_type === "ELECTRIC")
//       : filteredBikes;

//   const electricCount = (bikes ?? []).filter(
//     (b) => b.fuel_type === "ELECTRIC",
//   ).length;
//   const allModelsCount = bikes?.length ?? 0;

//   const filterSidebarProps = {
//     filters,
//     options,
//     onToggle: toggleArrayFilter,
//     onPriceMaxChange: setPriceMax,
//     onClearAll: clearAll,
//   };

//   return (
//     <>
//       <SearchResultHeader
//         cities={cities}
//         citiesError={citiesError}
//         initialCityId={cityId}
//         initialCityName={city}
//         initialPickupDate={parseDate(pickup)}
//         initialDropoffDate={parseDate(dropoff)}
//         initialPickupHour={parseHour(pickup)}
//         initialPickupMinute={parseMinute(pickup)}
//         initialDropoffHour={parseHour(dropoff)}
//         initialDropoffMinute={parseMinute(dropoff)}
//       />

//       <MobileSearchBar
//         city={city}
//         pickupDate={formatDateFromISO(pickup)}
//         dropoffDate={formatDateFromISO(dropoff)}
//         pickupTime={formatTimeFromISO(pickup)}
//         dropoffTime={formatTimeFromISO(dropoff)}
//         onModify={() => setSearchDrawerOpen(true)}
//         visible={!scrolled}
//       />

//       <FilterSortBar
//         onFilterClick={() => setDrawerMode("filter")}
//         onSortClick={() => setDrawerMode("sort")}
//         scrolled={scrolled}
//       />

//       <OfferBanner />

//       <div className="min-h-screen">
//         <div className="mx-auto px-4 pt-5 pb-6 xl:mx-[80.5px] xl:px-0 flex gap-6 items-start">
//           {/* Desktop filter sidebar */}
//           <aside className="hidden lg:block w-64 shrink-0 sticky top-[130px] self-start">
//             <FilterSidebar {...filterSidebarProps} />
//           </aside>

//           <div className="flex-1 min-w-0">
//             {/* Desktop: Tabs + Sort */}
//             <div className="hidden md:flex items-end justify-between flex-wrap gap-3 mb-4">
//               <TabBar
//                 activeTab={activeTab}
//                 onTabChange={setActiveTab}
//                 allCount={allModelsCount}
//                 electricCount={electricCount}
//               />
//               <SortDropdown
//                 sortValue={filters.sortValue}
//                 onChange={setSortValue}
//               />
//             </div>

//             {tabFilteredBikes.length > 0 && (
//               <div className="hidden md:block">
//                 <VehicleDisclaimer />
//               </div>
//             )}

//             {/* Results */}
//             {tabFilteredBikes.length === 0 ? (
//               <EmptyState
//                 activeTab={activeTab}
//                 onViewAll={() => setActiveTab("all")}
//                 onClearFilters={clearAll}
//               />
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
//                 {tabFilteredBikes.map((bike) => (
//                   <div
//                     key={bike.id}
//                     style={{
//                       zIndex: activeCardId === bike.id ? 10 : 0,
//                       position: "relative",
//                     }}
//                     className={
//                       activeTab === "electric"
//                         ? "ring-1 ring-green-200 rounded-xl bg-green-50/30"
//                         : ""
//                     }
//                   >
//                     <BikeCard
//                       {...bike}
//                       onDropdownOpenChange={(open) =>
//                         setActiveCardId(open ? bike.id : null)
//                       }
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <MobileFilterDrawer
//         isOpen={drawerMode !== null}
//         onClose={() => setDrawerMode(null)}
//         mode={drawerMode ?? "filter"}
//         sortValue={filters.sortValue}
//         onSortChange={(val) => {
//           setSortValue(val);
//           setDrawerMode(null);
//         }}
//         {...filterSidebarProps}
//       />

//       <MobileSearchDrawer
//         isOpen={searchDrawerOpen}
//         onClose={() => setSearchDrawerOpen(false)}
//         cities={cities}
//         citiesError={citiesError}
//         initialCityId={cityId}
//         initialCityName={city}
//         initialPickupDate={parseDate(pickup)}
//         initialDropoffDate={parseDate(dropoff)}
//         initialPickupHour={parseHour(pickup)}
//         initialPickupMinute={parseMinute(pickup)}
//         initialDropoffHour={parseHour(dropoff)}
//         initialDropoffMinute={parseMinute(dropoff)}
//       />
//     </>
//   );
// }

// // ── Sub-components ────────────────────────────────────────────────────

// function TabBar({
//   activeTab,
//   onTabChange,
//   allCount,
//   electricCount,
// }: {
//   activeTab: "all" | "electric";
//   onTabChange: (tab: "all" | "electric") => void;
//   allCount: number;
//   electricCount: number;
// }) {
//   return (
//     <div className="flex items-center border-b border-gray-200">
//       <TabButton
//         active={activeTab === "all"}
//         onClick={() => onTabChange("all")}
//         activeColor="border-[#ffc107] text-black"
//         badgeActive="bg-blue-50 text-blue-600"
//         label="All models"
//         count={allCount}
//       />
//       <TabButton
//         active={activeTab === "electric"}
//         onClick={() => onTabChange("electric")}
//         activeColor="border-green-600 text-green-600"
//         badgeActive="bg-green-50 text-green-700"
//         label="Electric"
//         count={electricCount}
//         icon={
//           <svg
//             className={`w-3.5 h-3.5 ${activeTab === "electric" ? "text-green-600" : "text-gray-400"}`}
//             viewBox="0 0 24 24"
//             fill="currentColor"
//           >
//             <path d="M13 2L4.09 13H12L11 22L19.91 11H12L13 2Z" />
//           </svg>
//         }
//       />
//     </div>
//   );
// }

// function TabButton({
//   active,
//   onClick,
//   activeColor,
//   badgeActive,
//   label,
//   count,
//   icon,
// }: {
//   active: boolean;
//   onClick: () => void;
//   activeColor: string;
//   badgeActive: string;
//   label: string;
//   count: number;
//   icon?: React.ReactNode;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`pb-2.5 px-4 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer flex items-center gap-1.5
//         ${active ? activeColor : "border-transparent text-gray-500 hover:text-gray-700"}`}
//     >
//       {icon}
//       {label}
//       <span
//         className={`ml-1 text-xs rounded-full px-2 py-0.5 ${active ? badgeActive : "bg-gray-100 text-gray-500"}`}
//       >
//         {count}
//       </span>
//     </button>
//   );
// }

// function SortDropdown({
//   sortValue,
//   onChange,
// }: {
//   sortValue: string;
//   onChange: (v: string) => void;
// }) {
//   return (
//     <div className="flex items-center gap-2 pb-1">
//       <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
//         Sort by:
//       </span>
//       <div className="relative">
//         <select
//           value={sortValue === "none" ? "" : sortValue}
//           onChange={(e) => onChange(e.target.value || "none")}
//           className="appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#ffc107] cursor-pointer"
//         >
//           <option value="" disabled>
//             Select
//           </option>
//           {SORT_OPTIONS.map((opt) => (
//             <option key={opt.value} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//         </select>
//         <svg
//           className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             d="M19 9l-7 7-7-7"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// }

// function EmptyState({
//   activeTab,
//   onViewAll,
//   onClearFilters,
// }: {
//   activeTab: string;
//   onViewAll: () => void;
//   onClearFilters: () => void;
// }) {
//   return (
//     <div className="flex flex-col items-center justify-center py-20 text-center">
//       <p className="text-gray-500 text-lg font-medium">
//         {activeTab === "electric"
//           ? "No electric bikes available"
//           : "No bikes available"}
//       </p>
//       <p className="text-gray-400 text-sm mt-1">
//         {activeTab === "electric"
//           ? "Try switching to All models or adjusting your filters"
//           : "Try adjusting your filters or dates"}
//       </p>
//       <div className="flex items-center gap-3 mt-4">
//         {activeTab === "electric" && (
//           <button
//             onClick={onViewAll}
//             className="text-sm text-[#006CE4] hover:underline"
//           >
//             View all models
//           </button>
//         )}
//         <button
//           onClick={onClearFilters}
//           className="text-sm text-[#006CE4] hover:underline"
//         >
//           Clear all filters
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import BikeCard from "./BikeCard";
import FilterSidebar from "./FilterSidebar";
import FilterSortBar from "./FilterSortBar";
import MobileFilterDrawer from "./MobileFilterDrawer";
import MobileSearchBar from "./MobileSearchBar";
import MobileSearchDrawer from "./MobileSearchDrawer";
import SearchResultHeader from "./SearchResultHeader";
import OfferBanner from "../../ui/OfferBanner";
import VehicleDisclaimer from "./VehicleDisclaimer";
import { useVehicleFilters } from "@/hooks/useVehicleFilters";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import {
  parseHour,
  parseMinute,
  parseDate,
  formatDateFromISO,
  formatTimeFromISO,
} from "@/lib/dateUtils";
import { SORT_OPTIONS } from "@/lib/constants";
import type { VehicleSearchResult } from "@/types/vehicles.types";
import type { City } from "@/types/locations.types";

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
  const [drawerMode, setDrawerMode] = useState<"filter" | "sort" | null>(null);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "electric">("all");

  const scrolled = useScrollTracking(10);

  const {
    filters,
    options,
    filteredBikes,
    toggleArrayFilter,
    setPriceMax,
    setSortValue,
    clearAll,
  } = useVehicleFilters(bikes ?? []);

  const tabFilteredBikes =
    activeTab === "electric"
      ? filteredBikes.filter((b) => b.fuel_type === "ELECTRIC")
      : filteredBikes;

  const electricCount = (bikes ?? []).filter(
    (b) => b.fuel_type === "ELECTRIC",
  ).length;
  const allModelsCount = bikes?.length ?? 0;

  const filterSidebarProps = {
    filters,
    options,
    onToggle: toggleArrayFilter,
    onPriceMaxChange: setPriceMax,
    onClearAll: clearAll,
  };

  return (
    <>
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
        pickupDate={formatDateFromISO(pickup)}
        dropoffDate={formatDateFromISO(dropoff)}
        pickupTime={formatTimeFromISO(pickup)}
        dropoffTime={formatTimeFromISO(dropoff)}
        onModify={() => setSearchDrawerOpen(true)}
        visible={!scrolled}
      />

      <FilterSortBar
        onFilterClick={() => setDrawerMode("filter")}
        onSortClick={() => setDrawerMode("sort")}
        scrolled={scrolled}
      />

      <OfferBanner />

      <div className="min-h-screen bg-[#e9ecef] md:bg-white">
        {/* xl:mx-[80.5px]  */}
        <div className="mx-auto px-4 pt-5 pb-6   xl:px-6  flex gap-6 items-start">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block xl:w-80 shrink-0 sticky top-[130px] self-start">
            <FilterSidebar {...filterSidebarProps} />
          </aside>

          <div className="flex-1 min-w-0">
            {/* Desktop: Tabs + Sort */}
            <div className="hidden md:flex items-end justify-between flex-wrap gap-3 mb-4">
              <TabBar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                allCount={allModelsCount}
                electricCount={electricCount}
              />
              <SortDropdown
                sortValue={filters.sortValue}
                onChange={setSortValue}
              />
            </div>

            {tabFilteredBikes.length > 0 && (
              <div className="hidden md:block">
                <VehicleDisclaimer />
              </div>
            )}

            {/* Results */}
            {tabFilteredBikes.length === 0 ? (
              <EmptyState
                activeTab={activeTab}
                onViewAll={() => setActiveTab("all")}
                onClearFilters={clearAll}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
                {tabFilteredBikes.map((bike) => (
                  <div
                    key={bike.id}
                    style={{
                      zIndex: activeCardId === bike.id ? 10 : 0,
                      position: "relative",
                    }}
                    className={
                      activeTab === "electric"
                        ? "ring-1 ring-green-200 rounded-xl bg-green-50/30"
                        : ""
                    }
                  >
                    <BikeCard
                      {...bike}
                      pickup={pickup}
                      dropoff={dropoff}
                      onDropdownOpenChange={(open) =>
                        setActiveCardId(open ? bike.id : null)
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        isOpen={drawerMode !== null}
        onClose={() => setDrawerMode(null)}
        mode={drawerMode ?? "filter"}
        sortValue={filters.sortValue}
        onSortChange={(val) => {
          setSortValue(val);
          setDrawerMode(null);
        }}
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

// ── Sub-components ────────────────────────────────────────────────────

function TabBar({
  activeTab,
  onTabChange,
  allCount,
  electricCount,
}: {
  activeTab: "all" | "electric";
  onTabChange: (tab: "all" | "electric") => void;
  allCount: number;
  electricCount: number;
}) {
  return (
    <div className="flex items-center border-b border-gray-200">
      <TabButton
        active={activeTab === "all"}
        onClick={() => onTabChange("all")}
        activeColor="border-[#ffc107] text-black"
        badgeActive="bg-blue-50 text-blue-600"
        label="All models"
        count={allCount}
      />
      <TabButton
        active={activeTab === "electric"}
        onClick={() => onTabChange("electric")}
        activeColor="border-green-600 text-green-600"
        badgeActive="bg-green-50 text-green-700"
        label="Electric"
        count={electricCount}
        icon={
          <svg
            className={`w-3.5 h-3.5 ${activeTab === "electric" ? "text-green-600" : "text-gray-400"}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13 2L4.09 13H12L11 22L19.91 11H12L13 2Z" />
          </svg>
        }
      />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  activeColor,
  badgeActive,
  label,
  count,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  activeColor: string;
  badgeActive: string;
  label: string;
  count: number;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`pb-2.5 px-4 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer flex items-center gap-1.5
        ${active ? activeColor : "border-transparent text-gray-500 hover:text-gray-700"}`}
    >
      {icon}
      {label}
      <span
        className={`ml-1 text-xs rounded-full px-2 py-0.5 ${active ? badgeActive : "bg-gray-100 text-gray-500"}`}
      >
        {count}
      </span>
    </button>
  );
}

function SortDropdown({
  sortValue,
  onChange,
}: {
  sortValue: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 pb-1">
      <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
        Sort by:
      </span>
      <div className="relative">
        <select
          value={sortValue === "none" ? "" : sortValue}
          onChange={(e) => onChange(e.target.value || "none")}
          className="appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#ffc107] cursor-pointer"
        >
          <option value="" disabled>
            Select
          </option>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none"
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
      </div>
    </div>
  );
}

function EmptyState({
  activeTab,
  onViewAll,
  onClearFilters,
}: {
  activeTab: string;
  onViewAll: () => void;
  onClearFilters: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-gray-500 text-lg font-medium">
        {activeTab === "electric"
          ? "No electric bikes available"
          : "No bikes available"}
      </p>
      <p className="text-gray-400 text-sm mt-1">
        {activeTab === "electric"
          ? "Try switching to All models or adjusting your filters"
          : "Try adjusting your filters or dates"}
      </p>
      <div className="flex items-center gap-3 mt-4">
        {activeTab === "electric" && (
          <button
            onClick={onViewAll}
            className="text-sm text-[#006CE4] hover:underline"
          >
            View all models
          </button>
        )}
        <button
          onClick={onClearFilters}
          className="text-sm text-[#006CE4] hover:underline"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}
