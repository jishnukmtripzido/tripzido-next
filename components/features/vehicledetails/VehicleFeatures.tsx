import { CheckIcon } from "@heroicons/react/24/solid";

export default function VehicleFeatures() {
  const features = [
    { label: "Seats", value: "2 Seater" },
    { label: "Top Speed", value: "85 kmph" },
    { label: "Fuel Capacity", value: "5.2 L" },
    { label: "Mileage", value: "50 kmpl" },
    { label: "Displacement", value: "113 cc" },
    { label: "Kerb Weight", value: "103 kg" },
  ];

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
        {features.map((feat, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
            <div className="flex flex-row items-baseline gap-1">
              <span className="text-sm font-semibold text-gray-900">
                {feat.value}
              </span>
              <span className="text-xs text-gray-500 hidden sm:inline-block">
                • {feat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
        <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
        Unlimited distance limit
      </div>
    </div>
  );
}
