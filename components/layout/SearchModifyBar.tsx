import React from "react";

export default function SearchModifyBar() {
  return (
    <div className="w-full bg-white py-4 border-b border-gray-100">
      <div className="xl:mx-[80.5px] mx-auto px-0 ">
        {/* Main Container - Mimicking the yellow border from the reference */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-2 border-brand-yellow rounded-lg p-3 md:px-4 md:py-3 bg-white gap-4 md:gap-0">
          {/* Left Side: Location and Dates */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-6">
            {/* Pickup Details */}
            <div className="flex flex-col">
              <span className="text-black font-semibold text-base md:text-base">
                Calangute Beach
              </span>
              <span className="text-gray-600 text-sm mt-0.5">
                Mon, Jun 8, 2026, 11:00 AM
              </span>
            </div>

            {/* Separator Arrow */}
            <svg
              className="w-5 h-5 text-gray-400 shrink-0 hidden md:block"
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

            {/* Drop-off Details */}
            <div className="flex flex-col">
              <span className="text-black font-semibold text-base md:text-base">
                Calangute Beach
              </span>
              <span className="text-gray-600 text-sm mt-0.5">
                Tue, Jun 9, 2026, 11:00 AM
              </span>
            </div>
          </div>

          {/* Right Side: Info Text and Edit Button */}
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 pt-3 md:pt-0">
            {/* Info Message */}
            <div className="flex items-center gap-1.5 text-blue-500 text-sm">
              <svg
                className="w-4 h-4 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>You'll need to pick up your bike at 11:00</span>
            </div>

            {/* Edit Button - Maintained on the far right */}
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded-md transition-colors shadow-sm shrink-0">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
