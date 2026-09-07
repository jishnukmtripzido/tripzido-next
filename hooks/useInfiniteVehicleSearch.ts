// hooks/useInfiniteVehicleSearch.ts
"use client";

import { useState, useCallback, useRef } from "react";
import { searchVehiclesApi } from "@/services/vehicle.service";
import type { VehicleSearchResult } from "@/types/vehicles.types";

type Status = "idle" | "loading" | "error";

interface UseInfiniteVehicleSearchOptions {
  cityId: string;
  pickup: string;
  dropoff: string;
  initialBikes: VehicleSearchResult[];
  initialHasNext: boolean;
}

export function useInfiniteVehicleSearch({
  cityId,
  pickup,
  dropoff,
  initialBikes,
  initialHasNext,
}: UseInfiniteVehicleSearchOptions) {
  const [bikes, setBikes] = useState<VehicleSearchResult[]>(initialBikes);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [status, setStatus] = useState<Status>("idle");
  const nextPage = useRef(2); // page 1 already loaded server-side

  const loadMore = useCallback(async () => {
    // Guard: don't fire if already loading, no more pages, or missing params
    if (status === "loading" || !hasNext || !cityId || !pickup || !dropoff)
      return;

    setStatus("loading");
    try {
      const data = await searchVehiclesApi({
        city_id: cityId,
        pickup_datetime: pickup,
        dropoff_datetime: dropoff,
        page: nextPage.current,
      });

      setBikes((prev) => [...prev, ...data.results]);
      setHasNext(data.pagination.has_next);
      nextPage.current += 1;
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, [cityId, pickup, dropoff, hasNext, status]);

  return { bikes, hasNext, status, loadMore };
}
