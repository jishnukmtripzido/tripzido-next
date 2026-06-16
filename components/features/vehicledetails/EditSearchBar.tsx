"use client";

import { useState } from "react";
import { CalendarIcon, ClockIcon, LocationIcon } from "@/components/ui/icons";
import TriggerButton from "@/components/ui/TriggerButton";
import { FieldError } from "@/components/ui/FieldError";
import DatePickerDropdown from "@/components/features/search/DatePickerDropdown";
import DatePickerModal from "@/components/features/search/DatePickerModal";
import TimePickerDropdown from "@/components/features/search/TimePickerDropdown";
import LocationPickerDropdown from "@/components/features/vehicledetails/LocationPickerDropdown";
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

  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    String(
      cityLocations.find((l) => l.location_name === initialLocationName)?.id ??
        "",
    ),
  );
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [dateModalOpen, setDateModalOpen] = useState(false);

  const selectedLocationName =
    cityLocations.find((l) => String(l.id) === selectedLocationId)
      ?.location_name ?? initialLocationName;

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
    <>
      <div className="w-full md:bg-gray-500 border-b border-gray-100">
        <div className="xl:mx-[80.5px] mx-auto px-4 xl:px-0 py-3">
          <form onSubmit={handleSubmit} noValidate>
            <div className="border-2 border-brand-yellow rounded-lg p-3 bg-white">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-font-man-sub tracking-wide">
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
                {/* Pick-up location */}
                <div className="relative w-full md:flex-1 min-w-0">
                  <label className="block text-xs  text-font-main-sub mb-2 ml-1">
                    Pick-up location
                  </label>
                  <TriggerButton
                    onClick={() =>
                      !cityLocationsLoading && setLocationOpen((o) => !o)
                    }
                    hasError={!!locationError}
                    active={locationOpen}
                  >
                    <LocationIcon />
                    {cityLocationsLoading ? (
                      <span className="text-sm text-gray-400">
                        Loading locations...
                      </span>
                    ) : (
                      <span className="text-font-man-sub truncate">
                        {selectedLocationName || "Select location"}
                      </span>
                    )}
                  </TriggerButton>
                  {locationOpen && (
                    <LocationPickerDropdown
                      isOpen
                      onClose={() => setLocationOpen(false)}
                      onSelect={(loc) => {
                        setSelectedLocationId(String(loc.id));
                        setLocationError(null);
                      }}
                      selectedLocationId={selectedLocationId}
                      locations={cityLocations}
                    />
                  )}
                  <FieldError message={locationError ?? undefined} />
                </div>

                <div className="grid grid-cols-2 gap-2 w-full md:contents">
                  {/* Pick-up date */}
                  <div className="relative w-full md:w-[130px] md:shrink-0">
                    <label className="block text-xs   text-font-main-sub mb-2 ml-1">
                      Pick-up date
                    </label>
                    {/* Mobile: opens modal */}
                    <div className="md:hidden">
                      <TriggerButton
                        onClick={() => setDateModalOpen(true)}
                        hasError={!!errors.pickup_datetime}
                      >
                        <CalendarIcon />
                        <span className="text-font-man-sub whitespace-nowrap">
                          {formatDate(dateRange.start)}
                        </span>
                      </TriggerButton>
                    </div>
                    {/* Desktop: opens dropdown */}
                    <div className="hidden md:block">
                      <TriggerButton
                        onClick={() => toggleDropdown("date")}
                        hasError={!!errors.pickup_datetime}
                        active={openDropdown === "date"}
                      >
                        <CalendarIcon />
                        <span className="text-font-man-sub whitespace-nowrap">
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
                    </div>
                    <FieldError message={errors.pickup_datetime} />
                  </div>

                  {/* Pick-up time */}
                  <div className="relative w-full md:w-[120px] md:shrink-0">
                    <label className="block text-xs   text-font-main-sub mb-2 ml-1">
                      Time
                    </label>
                    <TriggerButton
                      onClick={() => toggleDropdown("pickup-time")}
                      active={openDropdown === "pickup-time"}
                    >
                      <ClockIcon />
                      <span className="text-font-man-sub whitespace-nowrap">
                        {formatTime(pickupTime.hour, pickupTime.minute)}
                      </span>
                    </TriggerButton>
                    {openDropdown === "pickup-time" && (
                      <TimePickerDropdown
                        isOpen
                        onClose={() => toggleDropdown("pickup-time")}
                        onSelect={(h, m) =>
                          setPickupTime({ hour: h, minute: m })
                        }
                        selectedHour={pickupTime.hour}
                        selectedMinute={pickupTime.minute}
                        label="Pick-up time"
                      />
                    )}
                  </div>

                  {/* Drop-off date */}
                  <div className="relative w-full md:w-[130px] md:shrink-0">
                    <label className="block text-xs  text-font-main-sub mb-2 ml-1">
                      Drop-off date
                    </label>
                    {/* Mobile: opens modal */}
                    <div className="md:hidden">
                      <TriggerButton
                        onClick={() => setDateModalOpen(true)}
                        hasError={!!errors.dropoff_datetime}
                      >
                        <CalendarIcon />
                        <span className="text-font-man-sub whitespace-nowrap">
                          {formatDate(dateRange.end)}
                        </span>
                      </TriggerButton>
                    </div>
                    {/* Desktop: just trigger (dropdown is shared with pick-up date) */}
                    <div className="hidden md:block">
                      <TriggerButton
                        onClick={() => toggleDropdown("date")}
                        hasError={!!errors.dropoff_datetime}
                        active={openDropdown === "date"}
                      >
                        <CalendarIcon />
                        <span className="text-font-man-sub whitespace-nowrap">
                          {formatDate(dateRange.end)}
                        </span>
                      </TriggerButton>
                    </div>
                    <FieldError message={errors.dropoff_datetime} />
                  </div>

                  {/* Drop-off time */}
                  <div className="relative w-full md:w-[120px] md:shrink-0">
                    <label className="block text-xs   text-font-main-sub mb-2 ml-1">
                      Time
                    </label>
                    <TriggerButton
                      onClick={() => toggleDropdown("dropoff-time")}
                      active={openDropdown === "dropoff-time"}
                    >
                      <ClockIcon />
                      <span className="text-font-man-sub whitespace-nowrap">
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

                {/* Search button */}
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

      {/* Mobile date modal — rendered outside the form/div so it's not clipped */}
      <DatePickerModal
        isOpen={dateModalOpen}
        onClose={() => setDateModalOpen(false)}
        onSelect={(r) => {
          handleDateSelect(r);
          setDateModalOpen(false);
        }}
        initialRange={dateRange}
      />
    </>
  );
}
