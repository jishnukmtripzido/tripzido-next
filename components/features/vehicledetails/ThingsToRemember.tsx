import {
  BanknotesIcon,
  ClockIcon,
  MapIcon,
  ExclamationCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"; // Assuming Heroicons, adjust to Lucide if using Shadcn

export default function ThingsToRemember() {
  const rules = [
    {
      label: "Security Deposit",
      value: "₹0",
      icon: "₹",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Location timings",
      value: "9:00 AM - 10:00 PM",
      icon: <ClockIcon className="w-5 h-5" />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Distance limit",
      value: "No Limit",
      icon: <MapIcon className="w-5 h-5" />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Excess Charge",
      value: "N/A",
      icon: <ExclamationCircleIcon className="w-5 h-5" />,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Late Penalty",
      value: "₹100 / hour",
      icon: <DocumentTextIcon className="w-5 h-5" />,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className=" mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Things To Remember
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition bg-white"
          >
            <div
              className={`w-10 h-10 ${rule.bg} ${rule.color} rounded-full flex items-center justify-center mx-auto mb-3`}
            >
              {rule.icon}
            </div>
            <p className="text-xs text-gray-500 mb-1">{rule.label}</p>
            <p className="font-bold text-sm text-gray-900">{rule.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
