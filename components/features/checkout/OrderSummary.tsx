export default function OrderSummary() {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 shadow-none">
      {/* Vehicle Info */}
      <div>
        <h1 className="text-lg font-bold text-gray-900 mb-4">Summary</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b border-gray-100">
          <div className="w-full md:w-48 shrink-0 bg-gray-50 rounded-xl p-4 flex items-center justify-center">
            <img
              src="https://gowheelo.com/_next/image?url=https%3A%2F%2Fstatic.gowheelo.com%2Fuploads%2Fold%2Fbike%2FYamaha-Fascino.png&w=640&q=75"
              alt="Yamaha Fascino"
              className="w-full h-auto object-contain mix-blend-multiply"
            />
          </div>
          <div className="flex-grow w-full">
            <h2 className="text-xl font-bold text-gray-900">Yamaha Fascino</h2>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>
                Rent Amount :{" "}
                <span className="font-semibold text-gray-900">₹ 998</span>
              </p>
              <p>
                Refundable Deposit :{" "}
                <span className="font-semibold text-gray-900">₹ 0</span>
              </p>
            </div>

            {/* Quantity Stepper */}
            <div className="mt-4 flex items-center border border-gray-300 rounded-lg w-max overflow-hidden">
              <button className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition">
                -
              </button>
              <div className="px-4 py-1.5 font-medium border-x border-gray-300">
                1
              </div>
              <button className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Date Timeline */}
      <div className="py-6 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-green-600 mb-4">
          Pickup and Drop Date
        </h3>

        <div className="flex items-center justify-between">
          {/* Pickup */}
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-gray-900">8</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">
                June 2026
              </span>
              <span className="text-sm font-bold text-gray-900">01:00 PM</span>
            </div>
          </div>

          {/* Duration Line */}
          <div className="flex-grow mx-8 flex items-center justify-center relative hidden md:flex">
            <div className="w-full border-t border-dashed border-gray-300"></div>
            <span className="absolute bg-white px-2 text-xs font-medium text-gray-500">
              1 Day
            </span>
          </div>

          {/* Drop */}
          <div className="flex items-center gap-3 text-right">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-600">
                June 2026
              </span>
              <span className="text-sm font-bold text-gray-900">01:00 PM</span>
            </div>
            <span className="text-4xl font-bold text-gray-900">9</span>
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
          Calangute Beach
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
              <span className="font-medium text-gray-900">NA</span>
            </div>
            <div className="flex justify-between items-center border-b md:border-none border-gray-200 pb-2 md:pb-0">
              <span className="text-gray-500">Excess Kilometer Charges</span>
              <span className="font-medium text-gray-900">NA</span>
            </div>
            <div className="flex justify-between items-center border-b md:border-none border-gray-200 pb-2 md:pb-0">
              <span className="text-gray-500">Location Timings</span>
              <span className="font-medium text-gray-900">
                9:00 AM to 10:00 PM
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Late Drop Fee</span>
              <span className="font-medium text-gray-900">₹ 100/hr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
