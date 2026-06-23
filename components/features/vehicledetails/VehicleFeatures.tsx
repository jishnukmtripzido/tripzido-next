"use client";

import {
  UserGroupIcon,
  BoltIcon,
  BeakerIcon,
  ArrowTrendingUpIcon,
  CogIcon,
  ScaleIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import { useSelectedPackage } from "@/contexts/PackageSelectionContext";

interface Props {
  seats: number | string | null;
  topSpeed: number | string | null;
  fuelCapacity: number | string | null;
  mileageKmpl: number | string | null;
  cc: number | string | null;
  kerbWeightKg: number | string | null;
  kmLimitPerDay?: number | null;
}

export default function VehicleFeatures({
  seats,
  topSpeed,
  fuelCapacity,
  mileageKmpl,
  cc,
  kerbWeightKg,
  kmLimitPerDay,
}: Props) {
  const { selectedPackage } = useSelectedPackage();

  const features = [
    { label: "Seats", value: `${seats} Seater`, icon: UserGroupIcon },
    { label: "Top Speed", value: `${topSpeed} kmph`, icon: BoltIcon },
    { label: "Fuel Capacity", value: `${fuelCapacity} L`, icon: BeakerIcon },
    {
      label: "Mileage",
      value: `${mileageKmpl} kmpl`,
      icon: ArrowTrendingUpIcon,
    },
    { label: "Displacement", value: `${cc} cc`, icon: CogIcon },
    {
      label: "Kerb Weight",
      value: `${kerbWeightKg} kg`,
      icon: ScaleIcon,
      hideOnMobile: true,
    },
  ];

  const distanceLimitDisplay = selectedPackage
    ? selectedPackage.total_km_limit
    : kmLimitPerDay
      ? `${kmLimitPerDay} km/day limit`
      : "Unlimited distance limit";

  return (
    <div className="mt-2 md:mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-y-4 gap-x-4 md:gap-x-8">
        {features.map(({ label, value, icon: Icon, hideOnMobile }) => (
          <div
            key={label}
            className={`${hideOnMobile ? "hidden md:flex" : "flex"} items-center gap-3 text-font-main-sub`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <div className="flex flex-row items-baseline gap-1">
              <span className="text-base md:text-sm">{value}</span>
              <span className="text-xs text-font-dim">• {label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4 text-base md:text-sm text-font-main-sub">
        <MapIcon className="w-5 h-5 flex-shrink-0" />
        {distanceLimitDisplay}
      </div>
    </div>
  );
}
