"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { searchSchema } from "@/validations/searchSchema.validations";
import { searchVehiclesAction } from "@/actions/vehicles.actions";
import { buildDatetime, toISO } from "@/lib/dateUtils";
import type { DateRange } from "@/components/ui/DatePickerModal";
import type {
  DropdownType,
  SelectedCity,
  TimeState,
} from "@/types/search.types";

interface UseSearchFormOptions {
  initialCityId?: number | null;
  initialCityName?: string;
  initialPickupDate?: Date;
  initialDropoffDate?: Date;
  initialPickupHour?: number;
  initialPickupMinute?: number;
  initialDropoffHour?: number;
  initialDropoffMinute?: number;
  onSuccess?: () => void;
}

export function useSearchForm(opts: UseSearchFormOptions = {}) {
  const router = useRouter();

  const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(
    opts.initialCityId
      ? { id: opts.initialCityId, name: opts.initialCityName ?? "" }
      : null,
  );
  const [dateRange, setDateRange] = useState<DateRange>({
    start: opts.initialPickupDate ?? new Date(),
    end: opts.initialDropoffDate ?? new Date(),
  });
  const [pickupTime, setPickupTime] = useState<TimeState>({
    hour: opts.initialPickupHour ?? 10,
    minute: opts.initialPickupMinute ?? 0,
  });
  const [dropoffTime, setDropoffTime] = useState<TimeState>({
    hour: opts.initialDropoffHour ?? 10,
    minute: opts.initialDropoffMinute ?? 0,
  });
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function handleDateSelect(range: DateRange) {
    setDateRange(
      range.end < range.start
        ? { start: range.start, end: range.start }
        : range,
    );
    setErrors((e) => ({ ...e, pickup_datetime: "", dropoff_datetime: "" }));
  }

  function handleDateChange(range: DateRange) {
    setDateRange(
      range.end < range.start
        ? { start: range.start, end: range.start }
        : range,
    );
    setErrors((e) => ({ ...e, pickup_datetime: "", dropoff_datetime: "" }));
  }

  function toggleDropdown(type: DropdownType) {
    setOpenDropdown((prev) => (prev === type ? null : type));
  }

  function clearCityError() {
    setErrors((e) => ({ ...e, city_id: "" }));
  }

  // async function handleSearch() {
  //   setServerError(null);
  //   setOpenDropdown(null);

  //   const pickup_datetime = buildDatetime(
  //     dateRange.start,
  //     pickupTime.hour,
  //     pickupTime.minute,
  //   );
  //   const dropoff_datetime = buildDatetime(
  //     dateRange.end,
  //     dropoffTime.hour,
  //     dropoffTime.minute,
  //   );

  //   const result = searchSchema.safeParse({
  //     city_id: selectedCity?.id,
  //     city_name: selectedCity?.name,
  //     pickup_datetime,
  //     dropoff_datetime,
  //   });

  //   if (!result.success) {
  //     const fieldErrors: Record<string, string> = {};
  //     for (const issue of result.error.issues) {
  //       fieldErrors[issue.path[0] as string] = issue.message;
  //     }
  //     setErrors(fieldErrors);
  //     return;
  //   }

  //   setErrors({});
  //   setIsLoading(true);

  //   try {
  //     const response = await searchVehiclesAction({
  //       city_id: selectedCity!.id,
  //       city_name: selectedCity!.name,
  //       pickup_datetime,
  //       dropoff_datetime,
  //     });

  //     if (!response.success) {
  //       if (response.errors) setErrors(response.errors);
  //       if (response.message) setServerError(response.message);
  //       return;
  //     }

  //     opts.onSuccess?.();
  //     router.push(
  //       `/searchresult?city_id=${selectedCity!.id}&city_name=${encodeURIComponent(selectedCity!.name)}&pickup=${toISO(pickup_datetime)}&dropoff=${toISO(dropoff_datetime)}`,
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function handleSearch() {
    setServerError(null);
    setOpenDropdown(null);

    const pickup_datetime = buildDatetime(
      dateRange.start,
      pickupTime.hour,
      pickupTime.minute,
    );
    const dropoff_datetime = buildDatetime(
      dateRange.end,
      dropoffTime.hour,
      dropoffTime.minute,
    );

    // Client-side validation only — no action call
    const result = searchSchema.safeParse({
      city_id: selectedCity?.id,
      city_name: selectedCity?.name,
      pickup_datetime,
      dropoff_datetime,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      opts.onSuccess?.();
      const params = new URLSearchParams({
        city_id: String(selectedCity!.id),
        city_name: selectedCity!.name,
        pickup: toISO(pickup_datetime),
        dropoff: toISO(dropoff_datetime),
      });
      router.push(`/searchresult?${params.toString()}`);
      router.refresh(); // bust the router cache
    } finally {
      setIsLoading(false);
    }
  }

  return {
    selectedCity,
    setSelectedCity,
    dateRange,
    pickupTime,
    setPickupTime,
    dropoffTime,
    setDropoffTime,
    openDropdown,
    toggleDropdown,
    errors,
    serverError,
    isLoading,
    handleDateSelect,
    handleDateChange,
    handleSearch,
    clearCityError,
  };
}
