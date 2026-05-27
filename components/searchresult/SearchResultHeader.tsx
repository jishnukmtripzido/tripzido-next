

"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CityPickerModal from "@/components/search/CityPickerModal";
import DatePickerModal, { DateRange } from "@/components/search/DatePickerModal";
import TimePickerModal from "@/components/search/TimePickerModal";
import DatePickerDropdown from "@/components/search/DatePickerDropdown";
import TimePickerDropdown from "@/components/search/TimePickerDropdown";
import { FieldError } from "@/components/ui/FieldError";
import { City } from "@/types/city";
import { searchSchema } from "@/lib/validations/searchSchema";
import { searchVehiclesAction } from "@/actions/searchVehicles";
import Header from "../layout/Header";

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

function formatDate(d: Date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
}

function formatTime(h: number, m: number) {
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

function buildDatetime(date: Date, hour: number, minute: number): Date {
  const d = new Date(date);
  d.setHours(hour, minute, 0, 0);
  return d;
}

type ModalType = "city" | "date" | "pickup-time" | "dropoff-time" | null;
type DropdownType = "date" | "pickup-time" | "dropoff-time" | null;

export default function SearchResultHeader({
  cities, citiesError,
  initialCityId, initialCityName,
  initialPickupDate, initialDropoffDate,
  initialPickupHour, initialPickupMinute,
  initialDropoffHour, initialDropoffMinute,
}: SearchResultHeaderProps) {
  const router = useRouter();

  // Mobile modals
  const [openModal, setOpenModal] = useState<ModalType>(null);
  // Desktop inline dropdowns
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

  const [selectedCity, setSelectedCity] = useState<{ id: number; name: string } | null>(
    initialCityId ? { id: initialCityId, name: initialCityName } : null
  );
  const [dateRange, setDateRange] = useState<DateRange>({
    start: initialPickupDate,
    end: initialDropoffDate,
  });
  const [pickupTime, setPickupTime] = useState({ hour: initialPickupHour, minute: initialPickupMinute });
  const [dropoffTime, setDropoffTime] = useState({ hour: initialDropoffHour, minute: initialDropoffMinute });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  function toggleDropdown(type: DropdownType) {
    setOpenDropdown(prev => prev === type ? null : type);
  }

  function handleDateSelect(range: DateRange) {
    setDateRange(range.end < range.start ? { start: range.start, end: range.start } : range);
    setErrors(e => ({ ...e, pickup_datetime: "", dropoff_datetime: "" }));
  }

  async function handleSearch() {
    setOpenDropdown(null);
    const pickup_datetime = buildDatetime(dateRange.start, pickupTime.hour, pickupTime.minute);
    const dropoff_datetime = buildDatetime(dateRange.end, dropoffTime.hour, dropoffTime.minute);

    const result = searchSchema.safeParse({
      city_id: selectedCity?.id,
      city_name: selectedCity?.name,
      pickup_datetime,
      dropoff_datetime,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await searchVehiclesAction({
        city_id: selectedCity!.id,
        city_name: selectedCity!.name,
        pickup_datetime,
        dropoff_datetime,
      });

      if (!response.success) {
        if (response.errors) setErrors(response.errors);
        return;
      }

      router.push(
        `/searchresult?city_id=${selectedCity!.id}&city_name=${encodeURIComponent(selectedCity!.name)}&pickup=${pickup_datetime.toISOString()}&dropoff=${dropoff_datetime.toISOString()}`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="hidden md:block top-0 z-50 bg-white border-b border-gray-300/80">

        {/* Nav header */}
        <Header logoWidth={4} logoHeight={4} logoTextSize="xl" linkIconsSize={4} userNameFirstLetterSize={8} userNameFirstLetter="J" headerLgScreenMx="xl:mx-[80.5px] xl:px-0" headerValues="w-full bg-white py-2 border-b border-gray-100 text-gray-900" />
        

        {/* Search widget */}
        <section className="px-4 xl:px-0 py-3 mx-auto xl:mx-[80.5px]">
          <div className="flex w-full items-center bg-white border-2 border-[#cccce6] rounded-md h-[52px] shadow-md">

            {/* City — always modal */}
            <div
              onClick={() => setOpenModal("city")}
              className={`flex-[2] min-w-[200px] flex items-center px-3 h-full border-r hover:bg-gray-50 cursor-pointer transition-colors
                ${errors.city_id ? "border-red-400 bg-red-50" : "border-gray-300"}`}
            >
              <svg className="w-6 h-6 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div className="flex flex-col justify-center flex-1 overflow-hidden">
                <span className="text-[11px] font-thin text-gray-500 leading-none mb-1">City</span>
                <span className="text-sm font-thin text-gray-900 truncate leading-none">
                  {selectedCity?.name ?? "Select a city"}
                </span>
              </div>
              {selectedCity && (
                <svg
                  onClick={(e) => { e.stopPropagation(); setSelectedCity(null); setErrors(e2 => ({ ...e2, city_id: "" })); }}
                  className="w-5 h-5 text-gray-500 hover:text-black shrink-0 ml-2"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>

            {/* Pick-up date — inline dropdown on desktop */}
            <div className="relative flex-1 min-w-[110px] h-full">
              <div
                onClick={() => toggleDropdown("date")}
                className={`flex items-center px-3 h-full border-r cursor-pointer transition-colors
                  ${openDropdown === "date" ? "bg-[#fff8e1]" : "hover:bg-gray-50"}
                  ${errors.pickup_datetime ? "border-red-400 bg-red-50" : "border-gray-300"}`}
              >
                <svg className="w-6 h-6 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] font-thin text-gray-500 leading-none mb-1">Pick-up date</span>
                  <span className="text-sm font-thin text-gray-900 whitespace-nowrap leading-none">
                    {formatDate(dateRange.start)}
                  </span>
                </div>
              </div>
              {openDropdown === "date" && (
                <DatePickerDropdown
                  isOpen
                  onClose={() => setOpenDropdown(null)}
                  onSelect={(range) => { handleDateSelect(range); setOpenDropdown(null); }}
                  initialRange={dateRange}
                />
              )}
            </div>

            {/* Pick-up time — inline dropdown on desktop */}
            <div className="relative w-[140px] shrink-0 h-full">
              <div
                onClick={() => toggleDropdown("pickup-time")}
                className={`flex items-center px-3 h-full border-r cursor-pointer transition-colors
                  ${openDropdown === "pickup-time" ? "bg-[#fff8e1]" : "hover:bg-gray-50"}
                  border-gray-300`}
              >
                <svg className="w-6 h-6 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] font-thin text-gray-500 leading-none mb-1">Time</span>
                  <span className="text-sm font-thin text-gray-900 whitespace-nowrap leading-none">
                    {formatTime(pickupTime.hour, pickupTime.minute)}
                  </span>
                </div>
              </div>
              {openDropdown === "pickup-time" && (
                <TimePickerDropdown
                  isOpen
                  onClose={() => setOpenDropdown(null)}
                  onSelect={(h, m) => { setPickupTime({ hour: h, minute: m }); setOpenDropdown(null); }}
                  selectedHour={pickupTime.hour}
                  selectedMinute={pickupTime.minute}
                  label="Pick-up time"
                />
              )}
            </div>

            {/* Drop-off date — inline dropdown on desktop */}
            <div className="relative flex-1 min-w-[110px] h-full">
              <div
                onClick={() => toggleDropdown("date")}
                className={`flex items-center px-3 h-full border-r cursor-pointer transition-colors
                  ${openDropdown === "date" ? "bg-[#fff8e1]" : "hover:bg-gray-50"}
                  ${errors.dropoff_datetime ? "border-red-400 bg-red-50" : "border-gray-300"}`}
              >
                <svg className="w-6 h-6 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] font-thin text-gray-500 leading-none mb-1">Drop-off date</span>
                  <span className="text-sm font-thin text-gray-700 whitespace-nowrap leading-none">
                    {formatDate(dateRange.end)}
                  </span>
                </div>
              </div>
              {/* Dropdown anchors on pickup date cell; this is just the visual trigger */}
            </div>

            {/* Drop-off time — inline dropdown on desktop */}
            <div className="relative w-[140px] shrink-0 h-full">
              <div
                onClick={() => toggleDropdown("dropoff-time")}
                className={`flex items-center px-3 h-full cursor-pointer transition-colors
                  ${openDropdown === "dropoff-time" ? "bg-[#fff8e1]" : "hover:bg-gray-50"}`}
              >
                <svg className="w-6 h-6 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] font-thin text-gray-500 leading-none mb-1">Time</span>
                  <span className="text-sm font-thin text-gray-900 whitespace-nowrap leading-none">
                    {formatTime(dropoffTime.hour, dropoffTime.minute)}
                  </span>
                </div>
              </div>
              {openDropdown === "dropoff-time" && (
                <TimePickerDropdown
                  isOpen
                  onClose={() => setOpenDropdown(null)}
                  onSelect={(h, m) => { setDropoffTime({ hour: h, minute: m }); setOpenDropdown(null); }}
                  selectedHour={dropoffTime.hour}
                  selectedMinute={dropoffTime.minute}
                  label="Drop-off time"
                />
              )}
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-[#ffc107] hover:bg-yellow-500 text-black text-base font-semibold px-8 h-full transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </section>

      </div>

      {/* Mobile-only modals */}
      <CityPickerModal
        isOpen={openModal === "city"}
        onClose={() => setOpenModal(null)}
        onSelect={(city) => {
          setSelectedCity({ id: city.id, name: city.name });
          setErrors(e => ({ ...e, city_id: "" }));
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
        isOpen={openModal === "pickup-time"}
        onClose={() => setOpenModal(null)}
        onSelect={(h, m) => setPickupTime({ hour: h, minute: m })}
        initialHour={pickupTime.hour}
        initialMinute={pickupTime.minute}
        label="Pick-up time"
      />
      <TimePickerModal
        isOpen={openModal === "dropoff-time"}
        onClose={() => setOpenModal(null)}
        onSelect={(h, m) => setDropoffTime({ hour: h, minute: m })}
        initialHour={dropoffTime.hour}
        initialMinute={dropoffTime.minute}
        label="Drop-off time"
      />
    </>
  );
}