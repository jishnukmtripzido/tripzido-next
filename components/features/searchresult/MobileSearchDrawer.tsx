"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CityPickerModal from "@/components/ui/CityPickerModal";
import DatePickerModal from "@/components/ui/DatePickerModal";
import TimePickerModal from "@/components/ui/TimePickerModal";
import { FieldError } from "@/components/ui/FieldError";
import { CloseButton } from "@/components/ui/icons";
import { useSearchForm } from "@/hooks/useSearchForm";
import { formatDate, formatTime } from "@/lib/dateUtils";
import type { City } from "@/types/locations.types";
import type { ModalType } from "@/types/search.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
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

export default function MobileSearchDrawer({
  isOpen,
  onClose,
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
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const {
    selectedCity,
    setSelectedCity,
    dateRange,
    pickupTime,
    setPickupTime,
    dropoffTime,
    setDropoffTime,
    errors,
    handleDateSelect,
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
    onSuccess: onClose,
  });

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div
          className="animate-fade-in absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={onClose}
        />
        <div className="animate-slide-up relative z-10 w-full bg-white rounded-t-2xl shadow-2xl">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-gray-300" />
          </div>
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-base">Modify Search</h2>
            <CloseButton onClick={onClose} />
          </div>

          <div className="px-5 py-4 flex flex-col gap-3">
            {/* City */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                Select City
              </label>
              <button
                type="button"
                onClick={() => setOpenModal("city")}
                disabled={!!citiesError}
                className={`w-full flex items-center border rounded-md p-4 bg-white transition-colors cursor-pointer disabled:opacity-60
                  ${errors.city_id ? "border-red-500" : "border-gray-300 hover:border-brand-yellow"}`}
              >
                <LocationSvg />
                <span className="flex-1 text-sm font-medium text-gray-900 text-left">
                  {citiesError
                    ? "Failed to load"
                    : (selectedCity?.name ?? "Select a city")}
                </span>
                <ChevronSvg />
              </button>
              <FieldError message={errors.city_id} />
            </div>

            {/* Date + time grid */}
            <div className="grid grid-cols-2 gap-2">
              <DateTimeField
                label="Pick-up date"
                onClick={() => setOpenModal("date")}
                hasError={!!errors.pickup_datetime}
                icon="date"
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  {formatDate(dateRange.start)}
                </span>
              </DateTimeField>
              <FieldError message={errors.pickup_datetime} />

              <DateTimeField
                label="Time"
                onClick={() => setOpenModal("time")}
                icon="time"
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  {formatTime(pickupTime.hour, pickupTime.minute)}
                </span>
              </DateTimeField>

              <DateTimeField
                label="Drop-off date"
                onClick={() => setOpenModal("date")}
                hasError={!!errors.dropoff_datetime}
                icon="date"
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  {formatDate(dateRange.end)}
                </span>
              </DateTimeField>
              <FieldError message={errors.dropoff_datetime} />

              <DateTimeField
                label="Time"
                onClick={() => setOpenModal("time")}
                icon="time"
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  {formatTime(dropoffTime.hour, dropoffTime.minute)}
                </span>
              </DateTimeField>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-brand-yellow hover:bg-yellow-500 text-black font-semibold py-4 rounded-xl text-base transition-colors cursor-pointer mt-1"
            >
              Search
            </button>
          </div>
        </div>
      </div>

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
        isOpen={
          openModal === "time" ||
          openModal === "pickup-time" ||
          openModal === "dropoff-time"
        }
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
    </>,
    document.body,
  );
}

function DateTimeField({
  label,
  onClick,
  hasError = false,
  icon,
  children,
}: {
  label: string;
  onClick: () => void;
  hasError?: boolean;
  icon: "date" | "time";
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
        {label}
      </label>
      <button
        type="button"
        onClick={onClick}
        className={`w-full flex items-center border rounded-md p-4 bg-white transition-colors cursor-pointer
          ${hasError ? "border-red-500" : "border-gray-300 hover:border-brand-yellow"}`}
      >
        {icon === "date" ? <DateSvg /> : <TimeSvg />}
        {children}
      </button>
    </div>
  );
}

function LocationSvg() {
  return (
    <svg
      className="w-5 h-5 text-gray-400 mr-2 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
function ChevronSvg() {
  return (
    <svg
      className="w-3 h-3 text-gray-400 shrink-0"
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
  );
}
function DateSvg() {
  return (
    <svg
      className="w-4 h-4 text-gray-400 mr-1.5 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
function TimeSvg() {
  return (
    <svg
      className="w-4 h-4 text-gray-400 mr-1.5 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
