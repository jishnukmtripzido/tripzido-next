"use client";

import { Suspense, useState } from "react";
import FilterSortBar from "./FilterSortBar";
import MobileSearchBar from "./MobileSearchBar";
import MobileSearchDrawer from "./MobileSearchDrawer";
import SearchResultHeader from "./SearchResultHeader";
import SearchResultsLoading from "./SearchResultsLoading";
import OfferBanner from "../../ui/OfferBanner";
import { DrawerModeProvider, type DrawerMode } from "./DrawerModeContext";
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
  /** The async, data-dependent subtree (sidebar + tabs/sort + grid) */
  children: React.ReactNode;
}

/**
 * Static shell: everything rendered directly here is fast (cities are
 * cached, no vehicle fetch) and appears immediately, independent of
 * the slow vehicle search. Owns scroll-tracking state so
 * MobileSearchBar/FilterSortBar can respond to scroll right away,
 * before vehicle data has arrived.
 *
 * `children` is the Suspense boundary's content — a Server Component
 * (SearchResultsData) that awaits searchVehiclesApi and renders the
 * trimmed SearchResultsClient. Passing it as `children` from page.tsx
 * keeps the slow await on the server while this shell stays a client
 * component for scroll/drawer interactivity.
 *
 * drawerMode is shared with SearchResultsClient (which renders the
 * actual MobileFilterDrawer, since that needs filters/options derived
 * from resolved bikes) via DrawerModeProvider — see DrawerModeContext.
 */
export default function SearchResultsShell({
  city,
  cityId,
  pickup,
  dropoff,
  cities,
  citiesError,
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

      <OfferBanner />

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
