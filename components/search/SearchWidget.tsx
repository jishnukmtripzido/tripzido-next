"use client";

import { useState } from "react";
import Link from "next/link";
import CityPickerModal from "@/components/search/CityPickerModal";
import DatePickerModal, { DateRange } from "@/components/search/DatePickerModal";
import TimePickerModal from "@/components/search/TimePickerModal";

/* ── Default dates: today + 2hrs, tomorrow + 2hrs ── */
function getDefaults() {
  const now = new Date();
  const pickup = new Date(now);
  pickup.setHours(now.getHours() + 2, 0, 0, 0); // round to top of hour + 2hrs

  const dropoff = new Date(pickup);
  dropoff.setDate(dropoff.getDate() + 1);

  return { pickup, dropoff };
}

/* ── Format helpers ── */
function formatDate(d: Date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
}

function formatTime(h: number, m: number) {
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

/* ── Modal types ── */
type ModalType = "city" | "date" | "pickup-time" | "dropoff-time" | null;

export default function SearchWidget() {
  const defaults = getDefaults();

  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [selectedCity, setSelectedCity] = useState("Wayanad");
  const [dateRange, setDateRange] = useState<DateRange>({
    start: defaults.pickup,
    end: defaults.dropoff,
  });
  const [pickupTime, setPickupTime] = useState({
    hour: defaults.pickup.getHours(),
    minute: 0,
  });
  const [dropoffTime, setDropoffTime] = useState({
    hour: defaults.dropoff.getHours(),
    minute: 0,
  });

  function handleDateSelect(range: DateRange) {
    setDateRange(range);
    // If end < start after picking, auto-fix
    if (range.end < range.start) {
      setDateRange({ start: range.start, end: range.start });
    }
  }

  return (
    <>
      <section className="relative z-20 px-4 lg:px-8 -mt-12 mx-auto xl:mx-[121.5px] xl:px-0">
        <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-400">
          <div className="flex flex-wrap md:flex-nowrap items-end gap-2">
            {/* ── City ── */}
            <div className="relative w-full md:flex-1 min-w-0 ">
              <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                Select City
              </label>
              <TriggerButton onClick={() => setOpenModal("city")}>
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
                <span className="flex-1 text-sm font-medium text-gray-900 truncate">
                  {selectedCity}
                </span>
              </TriggerButton>
            </div>

            {/* ── Dates + Times ── */}
            <div className="grid grid-cols-2 gap-2 w-full md:contents">
              {/* Pick-up date */}
              <div className="relative w-full md:w-[130px] md:shrink-0">
                <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                  Pick-up date
                </label>
                <TriggerButton onClick={() => setOpenModal("date")}>
                  <svg
                    className="w-4 h-4 text-gray-400 mr-1 shrink-0"
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
                  <span className="text-sm font-medium whitespace-nowrap">
                    {formatDate(dateRange.start)}
                  </span>
                </TriggerButton>
              </div>

              {/* Pick-up time */}
              <div className="relative w-full md:w-[120px] md:shrink-0">
                <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                  Time
                </label>
                <TriggerButton onClick={() => setOpenModal("pickup-time")}>
                  <svg
                    className="w-4 h-4 text-gray-400 mr-1 shrink-0"
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
                  <span className="text-sm font-medium whitespace-nowrap">
                    {formatTime(pickupTime.hour, pickupTime.minute)}
                  </span>
                </TriggerButton>
              </div>

              {/* Drop-off date */}
              <div className="relative w-full md:w-[130px] md:shrink-0">
                <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                  Drop-off date
                </label>
                <TriggerButton onClick={() => setOpenModal("date")}>
                  <svg
                    className="w-4 h-4 text-gray-400 mr-1 shrink-0"
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
                  <span className="text-sm font-medium whitespace-nowrap">
                    {formatDate(dateRange.end)}
                  </span>
                </TriggerButton>
              </div>

              {/* Drop-off time */}
              <div className="relative w-full md:w-[120px] md:shrink-0">
                <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                  Time
                </label>
                <TriggerButton onClick={() => setOpenModal("dropoff-time")}>
                  <svg
                    className="w-4 h-4 text-gray-400 mr-1 shrink-0"
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
                  <span className="text-sm font-medium whitespace-nowrap">
                    {formatTime(dropoffTime.hour, dropoffTime.minute)}
                  </span>
                </TriggerButton>
              </div>
            </div>

            {/* Search */}
            <div className="shrink-0 w-full md:w-auto">
              <Link href="/searchresult">
                <button className="w-full md:w-auto bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-2 px-5 rounded-lg transition-colors whitespace-nowrap hover:cursor-pointer">
                  Search
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modals (portaled to body) ── */}
      <CityPickerModal
        isOpen={openModal === "city"}
        onClose={() => setOpenModal(null)}
        onSelect={(city) => setSelectedCity(city)}
        selectedCity={selectedCity}
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

/* ── Shared trigger button ── */
function TriggerButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between border border-gray-300 rounded-lg p-2 bg-white hover:border-[#ffc107] hover:cursor-pointer transition-colors text-left"
    >
      <div className="flex items-center min-w-0 flex-1">{children}</div>
      <svg
        className="w-3 h-3 text-gray-400 shrink-0 ml-1"
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
    </button>
  );
}
