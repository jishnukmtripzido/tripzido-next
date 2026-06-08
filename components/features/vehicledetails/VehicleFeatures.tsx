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
      <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100"
          >
            <p className="text-xs text-gray-500 mb-1">{feat.label}</p>
            <p className="font-semibold text-gray-900 text-sm">{feat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
