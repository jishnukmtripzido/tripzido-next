import { CheckIcon } from "@heroicons/react/24/solid";

export default function VehicleFeatures() {
  const features = [
    { label: "Displacement", value: "113 cc" },
    { label: "Top Speed", value: "85 kmph" },
    { label: "Fuel Capacity", value: "5.2 L" },
    { label: "Seats", value: "2 Seater" },
    { label: "Kerb Weight", value: "103 kg" },
    { label: "Mileage", value: "50 kmpl" },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold text-gray-900 mb-5">Vehicle features</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6">
        {features.map((feat, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {feat.value}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{feat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
