"use client";

interface DesktopSearchBarProps {
  city?: string;
  pickupDate?: string;
  dropoffDate?: string;
  pickupTime?: string;
  dropoffTime?: string;
}

export default function DesktopSearchBar({
  city = "Wayanad",
  pickupDate = "Thu, May 7",
  dropoffDate = "Fri, May 8",
  pickupTime = "10:00 AM",
  dropoffTime = "10:00 AM",
}: DesktopSearchBarProps) {
  return (
    <div className="hidden md:block bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto px-4 xl:mx-[121.5px] xl:px-0 py-3">
        <div className="flex flex-wrap md:flex-nowrap items-end gap-2">
          {/* City */}
          <div className="relative w-full md:flex-1 min-w-0">
            <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Select City</label>
            <div className="flex items-center border border-gray-200 rounded-lg p-2 bg-white hover:border-[#ffc107] transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span className="flex-1 text-sm font-medium text-gray-900 truncate">{city}</span>
              <svg className="w-3 h-3 text-gray-400 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Pickup date */}
          <div className="relative w-full md:w-[130px] md:shrink-0">
            <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Pick-up date</label>
            <div className="flex items-center justify-between border border-gray-200 rounded-lg p-2 bg-white cursor-pointer hover:border-[#ffc107] transition-colors">
              <div className="flex items-center min-w-0">
                <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-medium whitespace-nowrap">{pickupDate}</span>
              </div>
              <svg className="w-3 h-3 text-gray-400 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Pickup time */}
          <div className="relative w-full md:w-[120px] md:shrink-0">
            <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
            <div className="flex items-center justify-between border border-gray-200 rounded-lg p-2 bg-white cursor-pointer hover:border-[#ffc107] transition-colors">
              <div className="flex items-center min-w-0">
                <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-medium whitespace-nowrap">{pickupTime}</span>
              </div>
              <svg className="w-3 h-3 text-gray-400 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Dropoff date */}
          <div className="relative w-full md:w-[130px] md:shrink-0">
            <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Drop-off date</label>
            <div className="flex items-center justify-between border border-gray-200 rounded-lg p-2 bg-white cursor-pointer hover:border-[#ffc107] transition-colors">
              <div className="flex items-center min-w-0">
                <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-medium whitespace-nowrap">{dropoffDate}</span>
              </div>
              <svg className="w-3 h-3 text-gray-400 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Dropoff time */}
          <div className="relative w-full md:w-[120px] md:shrink-0">
            <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
            <div className="flex items-center justify-between border border-gray-200 rounded-lg p-2 bg-white cursor-pointer hover:border-[#ffc107] transition-colors">
              <div className="flex items-center min-w-0">
                <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-medium whitespace-nowrap">{dropoffTime}</span>
              </div>
              <svg className="w-3 h-3 text-gray-400 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Search */}
          <div className="shrink-0 w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
