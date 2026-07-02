"use client";

import { Suspense, useState } from "react";
import FilterSortBar from "./FilterSortBar";
import MobileSearchBar from "./MobileSearchBar";
import MobileSearchDrawer from "./MobileSearchDrawer";
import SearchResultHeader from "./SearchResultHeader";
import SearchResultsLoading from "./SearchResultsLoading";
import AnnouncementBannerSkeleton from "@/components/ui/AnnouncementBannerSkeleton";
import {
  DrawerModeProvider,
  type DrawerMode,
} from "../../../contexts/DrawerModeContext";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import {
  parseHour,
  parseMinute,
  parseDate,
  formatDateFromISO,
  formatTimeFromISO,
} from "@/lib/dateUtils";
import type { City } from "@/types/locations.types";

interface Props {
  city: string;
  cityId: number | null;
  pickup: string;
  dropoff: string;
  cities: City[];
  citiesError: string | null;
  banner?: React.ReactNode; // ← server-rendered banner passed from page.tsx
  children: React.ReactNode;
}

export default function SearchResultsShell({
  city,
  cityId,
  pickup,
  dropoff,
  cities,
  citiesError,
  banner,
  children,
}: Props) {
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);
  const scrolled = useScrollTracking(10);

  return (
    <DrawerModeProvider value={{ drawerMode, setDrawerMode }}>
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

      {/* Dynamic banner — streamed in from server, falls back to skeleton */}
      <Suspense fallback={<AnnouncementBannerSkeleton />}>{banner}</Suspense>

      <Suspense fallback={<SearchResultsLoading />}>{children}</Suspense>

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
    </DrawerModeProvider>
  );
}
