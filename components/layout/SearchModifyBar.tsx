import React from "react";

export default function SearchModifyBar() {
  return (
    <div className="w-full bg-white py-4 border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 flex items-center gap-4 justify-center">
        {/* Input & Date Picker Group */}
        <div className="flex flex-1 max-w-4xl border border-gray-300 rounded-md shadow-sm divide-x divide-gray-300">
          {/* Location Field */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white flex-1 rounded-l-md">
            <svg
              className="w-5 h-5 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              defaultValue="Calangute Beach"
              className="w-full outline-none text-gray-700 bg-transparent text-sm font-medium"
            />
          </div>

          {/* Start Date & Time */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white flex-1">
            <svg
              className="w-5 h-5 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="text-sm font-medium text-gray-700 flex whitespace-nowrap">
              Mon, Jun 8{" "}
              <span className="text-gray-400 font-normal ml-1.5">11:00 AM</span>
            </div>
          </div>

          {/* End Date & Time */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white flex-1 rounded-r-md">
            <svg
              className="w-5 h-5 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="text-sm font-medium text-gray-700 flex whitespace-nowrap">
              Tue, Jun 9{" "}
              <span className="text-gray-400 font-normal ml-1.5">11:00 AM</span>
            </div>
          </div>
        </div>

        {/* Search Button (Maintained in exact position) */}
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-2.5 rounded-md transition-colors shrink-0 shadow-sm">
          Search
        </button>
      </div>
    </div>
  );
}
