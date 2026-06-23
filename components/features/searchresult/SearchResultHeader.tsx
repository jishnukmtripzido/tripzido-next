"use client";

import { useState } from "react";
import CityPickerModal from "@/components/ui/CityPickerModal";
import DatePickerModal from "@/components/ui/DatePickerModal";
import TimePickerModal from "@/components/ui/TimePickerModal";
import DatePickerDropdown from "@/components/ui/DatePickerDropdown";
import TimePickerDropdown from "@/components/ui/TimePickerDropdown";
import { FieldError } from "@/components/ui/FieldError";
import { useSearchForm } from "@/hooks/useSearchForm";
import { formatDate, formatTime } from "@/lib/dateUtils";
import type { City } from "@/types/locations.types";
import type { ModalType } from "@/types/search.types";
import type { DateRange } from "@/components/ui/DatePickerModal";

interface SearchResultHeaderProps {
  cities: City[];
  citiesError: string | null;
  initialCityId: number | null;
  initialCityName: string;
  initialPickupDate: Date;
  initialDropoffDate: Date;
  initialPickupHour: number;
  initialPickupMinute: number;
  initialDropoffHour: number;
  initialDropoffMinute: number;
}

export default function SearchResultHeader({
  cities,
  citiesError,
  initialCityId,
  initialCityName,
  initialPickupDate,
  initialDropoffDate,
  initialPickupHour,
  initialPickupMinute,
  initialDropoffHour,
  initialDropoffMinute,
}: SearchResultHeaderProps) {
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
    isLoading,
    handleDateSelect,
    handleDateChange,
    handleSearch,
    clearCityError,
  } = useSearchForm({
    initialCityId,
    initialCityName,
    initialPickupDate,
    initialDropoffDate,
    initialPickupHour,
    initialPickupMinute,
    initialDropoffHour,
    initialDropoffMinute,
  });

  function handleDropoffDateSelect(range: DateRange) {
    handleDateSelect(range);
  }

  return (
    <>
      <div className="hidden md:block top-0 z-50 md:bg-gray-500 border-b border-gray-300/80">
        <section className="px-4 xl:px-0 py-3 mx-auto xl:mx-[80.5px]">
          <div className="flex w-full items-center bg-white border-2 border-brand-yellow rounded-md h-[55px]">
            {/* City */}
            <SearchCell
              onClick={() => setOpenModal("city")}
              hasError={!!errors.city_id}
              active={false}
              className="flex-[2] min-w-[200px] border-r border-gray-300"
            >
              <svg
                className="w-6 h-6 text-gray-500 mr-2 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <CellLabel
                top="City"
                bottom={selectedCity?.name ?? "Select a city"}
              />
              {selectedCity && (
                <svg
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCity(null);
                    clearCityError();
                  }}
                  className="w-5 h-5 text-gray-500 hover:text-black shrink-0 ml-2"
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
              )}
              {errors.city_id && <AbsoluteError message={errors.city_id} />}
            </SearchCell>

            {/* Pick-up date */}
            <SearchCell
              onClick={() => toggleDropdown("date")}
              hasError={!!errors.pickup_datetime}
              active={openDropdown === "date"}
              className="relative flex-1 min-w-[110px] border-r border-gray-300"
            >
              <DateIcon />
              <CellLabel
                top="Pick-up date"
                bottom={formatDate(dateRange.start)}
              />
              {openDropdown === "date" && (
                <DatePickerDropdown
                  isOpen
                  onClose={() => toggleDropdown("date")}
                  onSelect={handleDateSelect}
                  onDateChange={handleDateChange}
                  initialRange={dateRange}
                  mode="range"
                />
              )}
              {errors.pickup_datetime && (
                <AbsoluteError message={errors.pickup_datetime} />
              )}
            </SearchCell>

            {/* Pick-up time */}
            <SearchCell
              onClick={() => toggleDropdown("pickup-time")}
              active={openDropdown === "pickup-time"}
              className="relative w-[140px] shrink-0 border-r border-gray-300"
            >
              <TimeIcon />
              <CellLabel
                top="Time"
                bottom={formatTime(pickupTime.hour, pickupTime.minute)}
              />
              {openDropdown === "pickup-time" && (
                <TimePickerDropdown
                  isOpen
                  onClose={() => toggleDropdown("pickup-time")}
                  onSelect={(h, m) => {
                    setPickupTime({ hour: h, minute: m });
                  }}
                  selectedHour={pickupTime.hour}
                  selectedMinute={pickupTime.minute}
                  label="Pick-up time"
                />
              )}
            </SearchCell>

            {/* Drop-off date — own dropdown key + dropoff mode */}
            <SearchCell
              onClick={() => toggleDropdown("date-dropoff")}
              hasError={!!errors.dropoff_datetime}
              active={openDropdown === "date-dropoff"}
              className="relative flex-1 min-w-[110px] border-r border-gray-300"
            >
              <DateIcon />
              <CellLabel
                top="Drop-off date"
                bottom={formatDate(dateRange.end)}
              />
              {openDropdown === "date-dropoff" && (
                <DatePickerDropdown
                  isOpen
                  onClose={() => toggleDropdown("date-dropoff")}
                  onSelect={handleDropoffDateSelect}
                  onDateChange={handleDropoffDateSelect}
                  initialRange={dateRange}
                  mode="dropoff"
                  pickupDate={dateRange.start}
                />
              )}
              {errors.dropoff_datetime && (
                <AbsoluteError message={errors.dropoff_datetime} />
              )}
            </SearchCell>

            {/* Drop-off time */}
            <SearchCell
              onClick={() => toggleDropdown("dropoff-time")}
              active={openDropdown === "dropoff-time"}
              className="relative w-[140px] shrink-0"
            >
              <TimeIcon />
              <CellLabel
                top="Time"
                bottom={formatTime(dropoffTime.hour, dropoffTime.minute)}
              />
              {openDropdown === "dropoff-time" && (
                <TimePickerDropdown
                  isOpen
                  onClose={() => toggleDropdown("dropoff-time")}
                  onSelect={(h, m) => {
                    setDropoffTime({ hour: h, minute: m });
                  }}
                  selectedHour={dropoffTime.hour}
                  selectedMinute={dropoffTime.minute}
                  label="Drop-off time"
                />
              )}
            </SearchCell>

            {/* Search */}
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-brand-yellow hover:bg-yellow-500 text-font-main-sub text-base font-semibold px-8 h-full transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </section>
      </div>

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

      {/* Pick-up date modal — full range mode */}
      <DatePickerModal
        isOpen={openModal === "date"}
        onClose={() => setOpenModal(null)}
        onSelect={handleDateSelect}
        initialRange={dateRange}
        mode="range"
      />

      {/* Drop-off date modal — dropoff mode */}
      <DatePickerModal
        isOpen={openModal === "date-dropoff"}
        onClose={() => setOpenModal(null)}
        onSelect={handleDropoffDateSelect}
        initialRange={dateRange}
        mode="dropoff"
        pickupDate={dateRange.start}
      />

      <TimePickerModal
        isOpen={openModal === "pickup-time" || openModal === "dropoff-time"}
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

// ── Small sub-components ──────────────────────────────────────────────

function SearchCell({
  onClick,
  children,
  hasError = false,
  active = false,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  hasError?: boolean;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-3 h-full cursor-pointer transition-colors
        ${active ? "bg-[#fff8e1]" : "hover:bg-gray-50"}
        ${hasError ? "bg-red-50" : ""}
        ${className}`}
    >
      {children}
    </div>
  );
}

function CellLabel({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="flex flex-col justify-center flex-1 overflow-hidden">
      <span className="text-[11px] text-font-dim leading-none mb-1">{top}</span>
      <span className="text-sm font-normal text-font-main-sub truncate leading-none">
        {bottom}
      </span>
    </div>
  );
}

function AbsoluteError({ message }: { message: string }) {
  return (
    <div className="absolute top-full left-0 mt-1 z-10">
      <FieldError message={message} />
    </div>
  );
}

function DateIcon() {
  return (
    <svg
      className="w-6 h-6 text-gray-500 mr-2 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function TimeIcon() {
  return (
    <svg
      className="w-6 h-6 text-gray-500 mr-2 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
