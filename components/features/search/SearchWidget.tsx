"use client";

import { useState } from "react";
import CityPickerModal from "@/components/features/search/CityPickerModal";
import DatePickerModal from "@/components/features/search/DatePickerModal";
import TimePickerModal from "@/components/features/search/TimePickerModal";
import DatePickerDropdown from "@/components/features/search/DatePickerDropdown";
import TimePickerDropdown from "@/components/features/search/TimePickerDropdown";
import TriggerButton from "@/components/ui/TriggerButton";
import { FieldError } from "@/components/ui/FieldError";
import {
  CalendarIcon,
  ClockIcon,
  LocationIcon,
  SpinnerIcon,
} from "@/components/ui/icons";
import { useSearchForm } from "@/hooks/useSearchForm";
import { getDefaultDatetimes, formatDate, formatTime } from "@/lib/dateUtils";
import { LOGIN_MODAL_CITIES, LOGIN_MODAL_STATS } from "@/lib/constants";
import type { City } from "@/types/locations.types";
import type { ModalType } from "@/types/search.types";

interface SearchWidgetProps {
  cities: City[];
  citiesError: string | null;
}

export default function SearchWidget({
  cities,
  citiesError,
}: SearchWidgetProps) {
  const defaults = getDefaultDatetimes();
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const {
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
  } = useSearchForm({
    initialPickupDate: defaults.pickup,
    initialDropoffDate: defaults.dropoff,
    initialPickupHour: defaults.pickup.getHours(),
    initialDropoffHour: defaults.dropoff.getHours(),
  });

  return (
    <>
      <section className="relative z-20 px-4 lg:px-8 -mt-12 mx-auto xl:mx-[121.5px] xl:px-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          noValidate
        >
          <div
            className="bg-white rounded-md p-4 border-3 border-brand-yellow"
            style={{
              boxShadow:
                "rgba(50,50,93,0.25) 0px 13px 27px -5px, rgba(0,0,0,0.3) 0px 8px 16px -8px",
            }}
          >
            <h2 className="text-xl font-semibold mb-4">Grab Your Next Ride!</h2>
            <div className="flex flex-wrap md:flex-nowrap items-end gap-2">
              {/* City */}
              <div className="relative w-full md:flex-1 min-w-0">
                <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                  Select City
                </label>
                <TriggerButton
                  onClick={() => setOpenModal("city")}
                  disabled={!!citiesError}
                  hasError={!!errors.city_id}
                >
                  <LocationIcon />
                  <span className="flex-1 text-sm font-medium text-gray-900 truncate">
                    {citiesError
                      ? "Failed to load"
                      : (selectedCity?.name ?? "Select a city")}
                  </span>
                </TriggerButton>
                <FieldError message={errors.city_id} />
              </div>

              <div className="grid grid-cols-2 gap-2 w-full md:contents">
                {/* Pick-up date */}
                <div className="relative w-full md:w-[130px] md:shrink-0">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                    Pick-up date
                  </label>
                  <div className="md:hidden">
                    <TriggerButton
                      onClick={() => setOpenModal("date")}
                      hasError={!!errors.pickup_datetime}
                    >
                      <CalendarIcon />
                      <span className="text-sm font-medium whitespace-nowrap">
                        {formatDate(dateRange.start)}
                      </span>
                    </TriggerButton>
                  </div>
                  <div className="hidden md:block">
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
                        onSelect={(r) => {
                          handleDateSelect(r);
                          // ✅ Removed redundant toggleDropdown("date") —
                          // DatePickerDropdown already calls onClose() internally
                          // after both dates are selected, which closes the dropdown.
                          // Calling toggleDropdown here was re-opening it.
                        }}
                        onDateChange={handleDateChange}
                        initialRange={dateRange}
                      />
                    )}
                  </div>
                  <FieldError message={errors.pickup_datetime} />
                </div>

                {/* Pick-up time */}
                <div className="relative w-full md:w-[120px] md:shrink-0">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                    Time
                  </label>
                  <div className="md:hidden">
                    <TriggerButton onClick={() => setOpenModal("time")}>
                      <ClockIcon />
                      <span className="text-sm font-medium whitespace-nowrap">
                        {formatTime(pickupTime.hour, pickupTime.minute)}
                      </span>
                    </TriggerButton>
                  </div>
                  <div className="hidden md:block">
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
                        onSelect={(h, m) => {
                          setPickupTime({ hour: h, minute: m });
                          // ✅ Removed redundant toggleDropdown("pickup-time") —
                          // TimePickerDropdown already calls onClose() internally
                          // on selection, which closes the dropdown.
                          // Calling toggleDropdown here was re-opening it.
                        }}
                        selectedHour={pickupTime.hour}
                        selectedMinute={pickupTime.minute}
                        label="Pick-up time"
                      />
                    )}
                  </div>
                </div>

                {/* Drop-off date */}
                <div className="relative w-full md:w-[130px] md:shrink-0">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                    Drop-off date
                  </label>
                  <div className="md:hidden">
                    <TriggerButton
                      onClick={() => setOpenModal("date")}
                      hasError={!!errors.dropoff_datetime}
                    >
                      <CalendarIcon />
                      <span className="text-sm font-medium whitespace-nowrap">
                        {formatDate(dateRange.end)}
                      </span>
                    </TriggerButton>
                  </div>
                  <div className="hidden md:block">
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
                  </div>
                  <FieldError message={errors.dropoff_datetime} />
                </div>

                {/* Drop-off time */}
                <div className="relative w-full md:w-[120px] md:shrink-0">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                    Time
                  </label>
                  <div className="md:hidden">
                    <TriggerButton onClick={() => setOpenModal("time")}>
                      <ClockIcon />
                      <span className="text-sm font-medium whitespace-nowrap">
                        {formatTime(dropoffTime.hour, dropoffTime.minute)}
                      </span>
                    </TriggerButton>
                  </div>
                  <div className="hidden md:block">
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
                        onSelect={(h, m) => {
                          setDropoffTime({ hour: h, minute: m });
                          // ✅ Removed redundant toggleDropdown("dropoff-time") —
                          // TimePickerDropdown already calls onClose() internally
                          // on selection, which closes the dropdown.
                          // Calling toggleDropdown here was re-opening it.
                        }}
                        selectedHour={dropoffTime.hour}
                        selectedMinute={dropoffTime.minute}
                        label="Drop-off time"
                      />
                    )}
                  </div>
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
      </section>

      {/* Mobile modals */}
      <CityPickerModal
        isOpen={openModal === "city"}
        onClose={() => setOpenModal(null)}
        onSelect={(city) => {
          setSelectedCity({ id: city.id, name: city.name });
          clearCityError();
        }}
        selectedCityId={selectedCity?.id ?? null}
        cities={cities}
        loading={false}
        error={citiesError}
      />
      <DatePickerModal
        isOpen={openModal === "date"}
        onClose={() => setOpenModal(null)}
        onSelect={handleDateSelect}
        initialRange={dateRange}
      />
      <TimePickerModal
        isOpen={openModal === "time"}
        onClose={() => setOpenModal(null)}
        onSelectBoth={(pickup, dropoff) => {
          setPickupTime(pickup);
          setDropoffTime(dropoff);
        }}
        initialPickupHour={pickupTime.hour}
        initialPickupMinute={pickupTime.minute}
        initialDropoffHour={dropoffTime.hour}
        initialDropoffMinute={dropoffTime.minute}
        pickupDate={dateRange.start}
        dropoffDate={dateRange.end}
      />
    </>
  );
}
