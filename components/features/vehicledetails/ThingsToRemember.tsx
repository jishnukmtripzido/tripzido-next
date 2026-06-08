import {
  BanknotesIcon,
  ClockIcon,
  MapIcon,
  ExclamationCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function ThingsToRemember() {
  const rules = [
    {
      label: "Security Deposit",
      value: "₹0",
      icon: <BanknotesIcon className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      label: "Location timings",
      value: "9:00 AM - 10:00 PM",
      icon: <ClockIcon className="w-5 h-5" />,
      color: "text-gray-700",
    },
    {
      label: "Distance limit",
      value: "No Limit",
      icon: <MapIcon className="w-5 h-5" />,
      color: "text-gray-700",
    },
    {
      label: "Excess Charge",
      value: "N/A",
      icon: <ExclamationCircleIcon className="w-5 h-5" />,
      color: "text-gray-700",
    },
    {
      label: "Late Penalty",
      value: "₹100 / hour",
      icon: <DocumentTextIcon className="w-5 h-5" />,
      color: "text-gray-700",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-5">
        Things to remember
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 border border-gray-200 lg:border-none rounded-md p-6 lg:p-0">
        {rules.map((rule, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`flex-shrink-0 ${rule.color}`}>{rule.icon}</div>
            <div className="text-sm">
              <span className="text-gray-600">{rule.label}: </span>
              <span className="font-semibold text-gray-900">{rule.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
