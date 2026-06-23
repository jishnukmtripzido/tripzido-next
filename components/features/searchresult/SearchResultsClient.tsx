"use client";

import { useState } from "react";
import BikeCard from "./BikeCard";
import FilterSidebar from "./FilterSidebar";
import MobileFilterDrawer from "./MobileFilterDrawer";
import VehicleDisclaimer from "./VehicleDisclaimer";
import { useDrawerMode } from "./DrawerModeContext";
import { useVehicleFilters } from "@/hooks/useVehicleFilters";
import { SORT_OPTIONS } from "@/lib/constants";
import type { VehicleSearchResult } from "@/types/vehicles.types";

interface Props {
  bikes: VehicleSearchResult[];
  pickup: string;
  dropoff: string;
}

/**
 * Data-dependent half of the search results page: tabs, sort, filter
 * sidebar, and the bike grid. Rendered by SearchResultsData (a Server
 * Component) only after searchVehiclesApi resolves, inside the
 * Suspense boundary owned by SearchResultsShell.
 *
 * Header, search bar, and offer banner have moved to
 * SearchResultsShell since they don't depend on `bikes` and should
 * render immediately. drawerMode (filter/sort drawer open state) is
 * read from context — see DrawerModeContext — because the trigger
 * buttons (FilterSortBar) live in the static shell, outside this
 * component's Suspense boundary.
 */
export default function SearchResultsClient({ bikes, pickup, dropoff }: Props) {
  const { drawerMode, setDrawerMode } = useDrawerMode();
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "electric">("all");

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
    <div className="min-h-screen md:bg-gray-50">
      <div className="mx-auto flex gap-6 items-start">
        {/* Desktop filter sidebar */}
        <aside className="hidden lg:block xl:w-75 shrink-0 sticky top-[130px] self-start md:border-r border-gray-100 md:shadow-sm">
          <FilterSidebar {...filterSidebarProps} />
        </aside>

        <div className="flex-1 min-w-0">
          {/* Desktop: Tabs + Sort */}
          <div className="hidden md:flex pt-5 pr-5 items-end justify-between flex-wrap gap-3 mb-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start px-5 py-5 md:px-0 md:py-0 md:pt-1 md:pr-5">
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
    </div>
  );
}

// ── Sub-components (unchanged from original) ──────────────────────────

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
        activeColor="border-brand-yellow text-black"
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
      className={`pb-1.5 pr-4   text-[14.5px] font-medium border-b-2 -mb-px transition-colors cursor-pointer flex items-center gap-1.5
        ${active ? activeColor : "border-transparent font-extralight text-gray-500 hover:text-gray-700"}`}
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
          className="appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-yellow cursor-pointer"
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
