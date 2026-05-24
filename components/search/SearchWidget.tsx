"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CityPickerModal from "@/components/search/CityPickerModal";
import DatePickerModal, { DateRange } from "@/components/search/DatePickerModal";
import TimePickerModal from "@/components/search/TimePickerModal";
import { City } from "@/types/city";
import { searchSchema } from "@/lib/validations/searchSchema";
import { searchVehiclesAction } from "@/actions/searchVehicles";
import { FieldError } from "../ui/FieldError";

function getDefaults() {
  const now = new Date();
  const pickup = new Date(now);
  pickup.setHours(now.getHours() + 2, 0, 0, 0);
  const dropoff = new Date(pickup);
  dropoff.setDate(dropoff.getDate() + 1);
  return { pickup, dropoff };
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

export interface SelectedCity { id: number; name: string; }
interface SearchWidgetProps { cities: City[]; citiesError: string | null; }

export default function SearchWidget({ cities, citiesError }: SearchWidgetProps) {
  const defaults = getDefaults();
  const router = useRouter();

  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({ start: defaults.pickup, end: defaults.dropoff });
  const [pickupTime, setPickupTime] = useState({ hour: defaults.pickup.getHours(), minute: 0 });
  const [dropoffTime, setDropoffTime] = useState({ hour: defaults.dropoff.getHours(), minute: 0 });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function handleDateSelect(range: DateRange) {
    setDateRange(range.end < range.start ? { start: range.start, end: range.start } : range);
    setErrors(e => ({ ...e, dropoff_datetime: "", pickup_datetime: "" }));
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

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
        if (response.message) setServerError(response.message);
        return;
      }

      router.push(`/searchresult?city=${selectedCity!.id}&pickup=${pickup_datetime.toISOString()}&dropoff=${dropoff_datetime.toISOString()}`);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="relative z-20 px-4 lg:px-8 -mt-12 mx-auto xl:mx-[121.5px] xl:px-0">
        <form onSubmit={handleSearch} noValidate>
          <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-400">
            <div className="flex flex-wrap md:flex-nowrap items-end gap-2">

              {/* City */}
              <div className="relative w-full md:flex-1 min-w-0">
                <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Select City</label>
                <TriggerButton
                  onClick={() => setOpenModal("city")}
                  disabled={!!citiesError}
                  hasError={!!errors.city_id}
                >
                  <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span className="flex-1 text-sm font-medium text-gray-900 truncate">
                    {citiesError ? "Failed to load" : selectedCity?.name ?? "Select a city"}
                  </span>
                </TriggerButton>
                <FieldError message={errors.city_id} />
              </div>

              <div className="grid grid-cols-2 gap-2 w-full md:contents">

                {/* Pick-up date */}
                <div className="relative w-full md:w-[130px] md:shrink-0">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Pick-up date</label>
                  <TriggerButton
                    onClick={() => setOpenModal("date")}
                    hasError={!!errors.pickup_datetime}
                  >
                    <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.start)}</span>
                  </TriggerButton>
                  <FieldError message={errors.pickup_datetime} />
                </div>

                {/* Pick-up time */}
                <div className="relative w-full md:w-[120px] md:shrink-0">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
                  <TriggerButton onClick={() => setOpenModal("pickup-time")}>
                    <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span className="text-sm font-medium whitespace-nowrap">{formatTime(pickupTime.hour, pickupTime.minute)}</span>
                  </TriggerButton>
                </div>

                {/* Drop-off date */}
                <div className="relative w-full md:w-[130px] md:shrink-0">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Drop-off date</label>
                  <TriggerButton
                    onClick={() => setOpenModal("date")}
                    hasError={!!errors.dropoff_datetime}
                  >
                    <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.end)}</span>
                  </TriggerButton>
                  <FieldError message={errors.dropoff_datetime} />
                </div>

                {/* Drop-off time */}
                <div className="relative w-full md:w-[120px] md:shrink-0">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
                  <TriggerButton onClick={() => setOpenModal("dropoff-time")}>
                    <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span className="text-sm font-medium whitespace-nowrap">{formatTime(dropoffTime.hour, dropoffTime.minute)}</span>
                  </TriggerButton>
                </div>
              </div>

              {/* Search button */}
              <div className="shrink-0 w-full md:w-auto">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-auto bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-2 px-5 rounded-lg transition-colors whitespace-nowrap hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>

            {/* Server error */}
            {serverError && (
              <p className="text-xs text-red-500 mt-2 ml-1">{serverError}</p>
            )}
          </div>
        </form>
      </section>

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

function TriggerButton({
  onClick,
  children,
  disabled = false,
  hasError = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  hasError?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-between border rounded-lg p-2 bg-white transition-colors text-left hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed
        ${hasError
          ? "border-red-300 hover:border-red-400"
          : "border-gray-300 hover:border-[#ffc107]"
        }`}
    >
      <div className="flex items-center min-w-0 flex-1">{children}</div>
    </button>
  );
}