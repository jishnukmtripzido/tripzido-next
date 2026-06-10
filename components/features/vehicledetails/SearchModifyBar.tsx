"use client";

import { useState } from "react";
import EditSearchBar from "./EditSearchBar";
import { formatDateFromISO, formatTimeFromISO } from "@/lib/dateUtils";
import type { PickupLocationOption } from "@/services/vehicleDetails.service";

const MOCK_LOCATIONS: PickupLocationOption[] = [
  { id: 1, location_name: "Mananthavadi", city_id: 5 },
  { id: 2, location_name: "Sulthan Batheri", city_id: 5 },
  { id: 3, location_name: "Kalpetta", city_id: 5 },
];

interface Props {
  locationName: string;
  pickup: string;
  dropoff: string;
  cityId: number;
}

export default function SearchModifyBar({
  locationName,
  pickup,
  dropoff,
  cityId,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [locations, setLocations] = useState<PickupLocationOption[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(false);

  const pickupDate = formatDateFromISO(pickup);
  const pickupTime = formatTimeFromISO(pickup);
  const dropoffDate = formatDateFromISO(dropoff);
  const dropoffTime = formatTimeFromISO(dropoff);
  const mobileRange = `${pickupDate} – ${dropoffDate}`;

  async function handleEditClick() {
    if (locations.length === 0) {
      setLocationsLoading(true);
      try {
        const res = await fetch(`/api/locations/?city_id=${cityId}`);
        const json = await res.json();
        setLocations(json.data ?? MOCK_LOCATIONS);
      } catch {
        setLocations(MOCK_LOCATIONS);
      } finally {
        setLocationsLoading(false);
      }
    }
    setIsEditing(true);
  }

  if (isEditing) {
    return (
      <EditSearchBar
        onClose={() => setIsEditing(false)}
        initialLocationName={locationName}
        initialPickup={pickup}
        initialDropoff={dropoff}
        cityLocations={locations}
        cityLocationsLoading={locationsLoading}
      />
    );
  }

  return (
    <div className="w-full bg-white pt-4 border-none border-gray-100">
      <div className="xl:mx-[80.5px] mx-auto px-4 xl:px-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-2 border-brand-yellow rounded-lg p-3 md:px-4 md:py-3 bg-white gap-0 md:gap-0">
          {/* ── MOBILE ── */}
          <div className="flex flex-col w-full md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-black font-semibold text-base">
                  {locationName}
                </span>
                <span className="text-gray-600 text-sm mt-0.5">
                  {mobileRange}
                </span>
              </div>
              <button
                onClick={handleEditClick}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-md transition-colors shadow-sm shrink-0 ml-4"
              >
                Edit
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-blue-500 text-sm mt-2">
              <InfoIcon />
              <span>You'll need to pick up your bike at {pickupTime}</span>
            </div>
          </div>

          {/* ── DESKTOP ── */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-black font-semibold text-base">
                {locationName}
              </span>
              <span className="text-gray-600 text-sm mt-0.5">
                {pickupDate}, {pickupTime}
              </span>
            </div>
            <ChevronRight />
            <div className="flex flex-col">
              <span className="text-black font-semibold text-base">
                {locationName}
              </span>
              <span className="text-gray-600 text-sm mt-0.5">
                {dropoffDate}, {dropoffTime}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-blue-500 text-sm">
              <InfoIcon />
              <span>You'll need to pick up your bike at {pickupTime}</span>
            </div>
            <button
              onClick={handleEditClick}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded-md transition-colors shadow-sm shrink-0"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      className="w-5 h-5 text-gray-400 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
