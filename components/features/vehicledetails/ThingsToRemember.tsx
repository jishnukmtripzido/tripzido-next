import {
  BanknotesIcon,
  ClockIcon,
  MapIcon,
  ExclamationCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import type { VehicleDetailsResponse } from "@/types/vehicleDetails.types";

interface Props {
  policies: VehicleDetailsResponse["policies"];
}

export default function ThingsToRemember({ policies }: Props) {
  const rules = [
    {
      label: "Security Deposit",
      value:
        policies.security_deposit === 0
          ? "₹0"
          : `₹${policies.security_deposit.toLocaleString("en-IN")}`,
      icon: <BanknotesIcon className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      label: "Location timings",
      value: policies.location_timings,
      icon: <ClockIcon className="w-5 h-5" />,
      color: "text-gray-700",
    },
    {
      label: "Distance limit",
      value: policies.distance_limit,
      icon: <MapIcon className="w-5 h-5" />,
      color: "text-gray-700",
    },
    {
      label: "Excess Charge",
      value: policies.excess_charge,
      icon: <ExclamationCircleIcon className="w-5 h-5" />,
      color: "text-gray-700",
    },
    {
      label: "Late Penalty",
      value: `₹${policies.late_penalty_per_hour} / hour`,
      icon: <DocumentTextIcon className="w-5 h-5" />,
      color: "text-gray-700",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-5">
        Things to remember
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white gap-y-4 gap-x-8 border border-gray-200 lg:border-none rounded-md p-6 lg:p-0">
        {rules.map((rule, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`flex-shrink-0 ${rule.color}`}>{rule.icon}</div>
            <div className="text-sm">
              <span className="text-font-main-sub">{rule.label} : </span>
              <span className="font-semibold text-font-main-sub">
                {rule.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
