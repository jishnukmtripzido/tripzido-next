import {
  formatTimeFromISO,
  formatDayNumber,
  formatMonthYear,
} from "@/lib/dateUtils";
import type { CheckoutSummary } from "@/services/checkout.service";

interface Props {
  summary: CheckoutSummary;
  quantity: number;
  maxQuantity: number;
  rentAmount: number;
  refundableDeposit: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function OrderSummary({
  summary,
  quantity,
  maxQuantity,
  rentAmount,
  refundableDeposit,
  onIncrement,
  onDecrement,
}: Props) {
  const { things_to_remember: ttr } = summary;

  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 shadow-none">
      {/* Vehicle Info */}
      <div>
        <h1 className="text-lg font-bold text-gray-900 mb-4">Summary</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b border-gray-100">
          <div className="w-full md:w-48 shrink-0 bg-gray-50 rounded-xl p-4 flex items-center justify-center">
            {summary.primary_image ? (
              <img
                src={summary.primary_image}
                alt={summary.vehicle_name}
                className="w-full h-auto object-contain mix-blend-multiply"
              />
            ) : (
              <div className="w-full h-24 flex items-center justify-center text-gray-400 text-sm">
                No image
              </div>
            )}
          </div>
          <div className="flex-grow w-full">
            <h2 className="text-xl font-bold text-gray-900">
              {summary.vehicle_name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {summary.package_name} Package
            </p>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>
                Rent Amount :{" "}
                <span className="font-semibold text-gray-900">
                  ₹ {rentAmount.toFixed(2)}
                </span>
              </p>
              <p>
                Refundable Deposit :{" "}
                <span className="font-semibold text-gray-900">
                  ₹ {refundableDeposit.toFixed(2)}
                </span>
              </p>
            </div>

            {/* Quantity Stepper */}
            <div className="mt-4 flex items-center border border-gray-300 rounded-lg w-max overflow-hidden">
              <button
                onClick={onDecrement}
                disabled={quantity <= 1}
                className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                -
              </button>
              <div className="px-4 py-1.5 font-medium border-x border-gray-300">
                {quantity}
              </div>
              <button
                onClick={onIncrement}
                disabled={quantity >= maxQuantity}
                className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                +
              </button>
            </div>
            {maxQuantity > 1 && (
              <p className="text-xs text-gray-400 mt-1.5">
                {maxQuantity} available at this location
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Date Timeline */}
      <div className="py-6 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-green-600 mb-4">
          Pickup and Drop Date
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-gray-900">
              {formatDayNumber(summary.pickup_datetime)}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">
                {formatMonthYear(summary.pickup_datetime)}
              </span>
              <span className="text-sm font-bold text-gray-900">
                {formatTimeFromISO(summary.pickup_datetime)}
              </span>
            </div>
          </div>

          <div className="flex-grow mx-8 flex items-center justify-center relative hidden md:flex">
            <div className="w-full border-t border-dashed border-gray-300"></div>
            <span className="absolute bg-white px-2 text-xs font-medium text-gray-500">
              {summary.duration_label}
            </span>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-600">
                {formatMonthYear(summary.dropoff_datetime)}
              </span>
              <span className="text-sm font-bold text-gray-900">
                {formatTimeFromISO(summary.dropoff_datetime)}
              </span>
            </div>
            <span className="text-4xl font-bold text-gray-900">
              {formatDayNumber(summary.dropoff_datetime)}
            </span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="py-6 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-green-600 mb-3">
          Pickup and Drop Location
        </h3>
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          {summary.pickup_location_name}
        </div>
      </div>

      {/* Things to Remember */}
      <div className="pt-6">
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            Things to remember
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div className="flex justify-between items-center border-b md:border-none border-gray-200 pb-2 md:pb-0">
              <span className="text-gray-500">Kilometer Limit</span>
              <span className="font-medium text-gray-900">{ttr.km_limit}</span>
            </div>
            <div className="flex justify-between items-center border-b md:border-none border-gray-200 pb-2 md:pb-0">
              <span className="text-gray-500">Excess Kilometer Charges</span>
              <span className="font-medium text-gray-900">
                {ttr.excess_charge}
              </span>
            </div>
            <div className="flex justify-between items-center border-b md:border-none border-gray-200 pb-2 md:pb-0">
              <span className="text-gray-500">Location Timings</span>
              <span className="font-medium text-gray-900">
                {ttr.location_timings}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Late Drop Fee</span>
              <span className="font-medium text-gray-900">
                ₹ {ttr.late_penalty_per_hour}/hr
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
