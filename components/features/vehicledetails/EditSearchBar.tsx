"use client";

import { useState } from "react";
import { CalendarIcon, ClockIcon, LocationIcon } from "@/components/ui/icons";
import TriggerButton from "@/components/ui/TriggerButton";
import { FieldError } from "@/components/ui/FieldError";
import DatePickerDropdown from "@/components/features/search/DatePickerDropdown";
import TimePickerDropdown from "@/components/features/search/TimePickerDropdown";
import { useSearchForm } from "@/hooks/useSearchForm";
import {
  parseDate,
  parseHour,
  parseMinute,
  formatDate,
  formatTime,
} from "@/lib/dateUtils";
import type { PickupLocationOption } from "@/services/vehicleDetails.service";

interface EditSearchBarProps {
  onClose: () => void;
  initialLocationName: string;
  initialPickup: string;
  initialDropoff: string;
  cityLocations: PickupLocationOption[];
  cityLocationsLoading: boolean;
}

export default function EditSearchBar({
  onClose,
  initialLocationName,
  initialPickup,
  initialDropoff,
  cityLocations,
  cityLocationsLoading,
}: EditSearchBarProps) {
  const {
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
  } = useSearchForm({
    initialPickupDate: parseDate(initialPickup),
    initialDropoffDate: parseDate(initialDropoff),
    initialPickupHour: parseHour(initialPickup),
    initialPickupMinute: parseMinute(initialPickup),
    initialDropoffHour: parseHour(initialDropoff),
    initialDropoffMinute: parseMinute(initialDropoff),
  });

  // Pre-select the current location if it exists in the list, else keep name as fallback
  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    String(
      cityLocations.find((l) => l.location_name === initialLocationName)?.id ??
        "",
    ),
  );
  const [locationError, setLocationError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedLocationId) {
      setLocationError("Please select a pick-up location.");
      return;
    }
    setLocationError(null);
    handleSearch();
  }

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="xl:mx-[80.5px] mx-auto px-4 xl:px-0 py-3">
        <form onSubmit={handleSubmit} noValidate>
          <div className="border-2 border-brand-yellow rounded-lg p-3 bg-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-900 tracking-wide">
                Edit search
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close edit search"
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-wrap md:flex-nowrap items-end gap-2">
              {/* Pick-up location — dropdown from city locations */}
              <div className="relative w-full md:flex-1 min-w-0">
                <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                  Pick-up location
                </label>
                <div
                  className={`flex items-center gap-2 border rounded-md px-3 py-2.5 bg-white transition-colors ${
                    locationError
                      ? "border-red-400"
                      : "border-gray-300 focus-within:border-brand-yellow"
                  }`}
                >
                  <LocationIcon />
                  {cityLocationsLoading ? (
                    <span className="flex-1 text-sm text-gray-400">
                      Loading locations...
                    </span>
                  ) : cityLocations.length > 0 ? (
                    <select
                      value={selectedLocationId}
                      onChange={(e) => {
                        setSelectedLocationId(e.target.value);
                        if (e.target.value) setLocationError(null);
                      }}
                      className="flex-1 text-sm font-medium text-gray-900 bg-transparent outline-none"
                    >
                      <option value="" disabled>
                        Select location
                      </option>
                      {cityLocations.map((loc) => (
                        <option key={loc.id} value={String(loc.id)}>
                          {loc.location_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    // Fallback: plain text if locations failed to load
                    <span className="flex-1 text-sm font-medium text-gray-900">
                      {initialLocationName}
                    </span>
                  )}
                </div>
                <FieldError message={locationError ?? undefined} />
              </div>

              <div className="grid grid-cols-2 gap-2 w-full md:contents">
                {/* Pick-up date */}
                <div className="relative w-full md:w-[130px] md:shrink-0">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                    Pick-up date
                  </label>
                  <TriggerButton
                    onClick={() => toggleDropdown("date")}
                    hasError={!!errors.pickup_datetime}
                    active={openDropdown === "date"}
                  >
                    <CalendarIcon />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {formatDate(dateRange.start)}
                    </span>
                  </TriggerButton>
                  {openDropdown === "date" && (
                    <DatePickerDropdown
                      isOpen
                      onClose={() => toggleDropdown("date")}
                      onSelect={(r) => handleDateSelect(r)}
                      onDateChange={handleDateChange}
                      initialRange={dateRange}
                    />
                  )}
                  <FieldError message={errors.pickup_datetime} />
                </div>

                {/* Pick-up time */}
                <div className="relative w-full md:w-[120px] md:shrink-0">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                    Time
                  </label>
                  <TriggerButton
                    onClick={() => toggleDropdown("pickup-time")}
                    active={openDropdown === "pickup-time"}
                  >
                    <ClockIcon />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {formatTime(pickupTime.hour, pickupTime.minute)}
                    </span>
                  </TriggerButton>
                  {openDropdown === "pickup-time" && (
                    <TimePickerDropdown
                      isOpen
                      onClose={() => toggleDropdown("pickup-time")}
                      onSelect={(h, m) => setPickupTime({ hour: h, minute: m })}
                      selectedHour={pickupTime.hour}
                      selectedMinute={pickupTime.minute}
                      label="Pick-up time"
                    />
                  )}
                </div>

                {/* Drop-off date */}
                <div className="relative w-full md:w-[130px] md:shrink-0">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                    Drop-off date
                  </label>
                  <TriggerButton
                    onClick={() => toggleDropdown("date")}
                    hasError={!!errors.dropoff_datetime}
                    active={openDropdown === "date"}
                  >
                    <CalendarIcon />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {formatDate(dateRange.end)}
                    </span>
                  </TriggerButton>
                  <FieldError message={errors.dropoff_datetime} />
                </div>

                {/* Drop-off time */}
                <div className="relative w-full md:w-[120px] md:shrink-0">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                    Time
                  </label>
                  <TriggerButton
                    onClick={() => toggleDropdown("dropoff-time")}
                    active={openDropdown === "dropoff-time"}
                  >
                    <ClockIcon />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {formatTime(dropoffTime.hour, dropoffTime.minute)}
                    </span>
                  </TriggerButton>
                  {openDropdown === "dropoff-time" && (
                    <TimePickerDropdown
                      isOpen
                      onClose={() => toggleDropdown("dropoff-time")}
                      onSelect={(h, m) =>
                        setDropoffTime({ hour: h, minute: m })
                      }
                      selectedHour={dropoffTime.hour}
                      selectedMinute={dropoffTime.minute}
                      label="Drop-off time"
                    />
                  )}
                </div>
              </div>

              {/* Search */}
              <div className="shrink-0 w-full md:w-auto">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-auto bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-3 px-5 rounded-md transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>

            {serverError && (
              <p className="text-xs text-red-500 mt-2 ml-1">{serverError}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
