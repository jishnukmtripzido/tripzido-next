"use client";

import Link from "next/link";

interface SearchResultHeaderProps {
  city?: string;
  pickupDate?: string;
  dropoffDate?: string;
  pickupTime?: string;
  dropoffTime?: string;
}

export default function SearchResultHeader({
  city = "Wayanad",
  pickupDate = "Thu, May 7",
  dropoffDate = "Fri, May 8",
  pickupTime = "10:00 AM",
  dropoffTime = "10:00 AM",
}: SearchResultHeaderProps) {
  return (
    <div className="hidden md:block top-0 z-50 bg-[#FAFBFD]">

      <header className="w-full bg-white pb-[52px] border-b border-gray-300 shadow-sm">
        <div className="mx-auto px-4 xl:mx-[121.5px] xl:px-0 flex items-center justify-between h-14">

          <div className="flex items-center space-x-12">
            <div className="flex items-center space-x-2">
              <div className="bg-[#ffc107] p-1.5 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight">tripzido</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
              <Link href="#" className="flex items-center space-x-2 hover:text-black">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>Bikes</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 hover:text-black">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>Destinations</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 hover:text-black">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>How it works</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 hover:text-black">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>Offers</span>
              </Link>
            </nav>
          </div>

          {/* Right: flag + help + account */}
          <div className="flex items-center space-x-5">
            <div className="w-6 h-4 overflow-hidden rounded-sm cursor-pointer border border-black/20 shrink-0">
              <div className="h-1/3 bg-[#FF9933]" />
              <div className="h-1/3 bg-white flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-800" />
              </div>
              <div className="h-1/3 bg-[#138808]" />
            </div>
            <div className="text-black/60 hover:text-black cursor-pointer transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-[#ffc107] flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="text-black/80 group-hover:text-black font-medium transition-colors text-sm">
                Your account
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Search widget — straddles header bottom border */}
      <section className="relative z-20 px-4 lg:px-8 -mt-[45px] mx-auto xl:mx-[121.5px] xl:px-0">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex flex-nowrap items-end gap-2">

            {/* City */}
            <div className="relative flex-1 min-w-0">
              <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Select City</label>
              <button type="button" className="w-full flex items-center border border-gray-300 rounded-lg p-2 bg-white hover:border-[#ffc107] transition-colors text-left cursor-pointer">
                <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="flex-1 text-sm font-thin text-gray-900 truncate">{city}</span>
              </button>
            </div>

            {/* Pick-up date */}
            <div className="relative w-[130px] shrink-0">
              <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Pick-up date</label>
              <button type="button" className="w-full flex items-center border border-gray-300 rounded-lg p-2 bg-white hover:border-[#ffc107] transition-colors text-left cursor-pointer">
                <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-thin whitespace-nowrap">{pickupDate}</span>
              </button>
            </div>

            {/* Pick-up time */}
            <div className="relative w-[120px] shrink-0">
              <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
              <button type="button" className="w-full flex items-center border border-gray-300 rounded-lg p-2 bg-white hover:border-[#ffc107] transition-colors text-left cursor-pointer">
                <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-thin whitespace-nowrap">{pickupTime}</span>
              </button>
            </div>

            {/* Drop-off date */}
            <div className="relative w-[130px] shrink-0">
              <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Drop-off date</label>
              <button type="button" className="w-full flex items-center border border-gray-300 rounded-lg p-2 bg-white hover:border-[#ffc107] transition-colors text-left cursor-pointer">
                <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-thin whitespace-nowrap">{dropoffDate}</span>
              </button>
            </div>

            {/* Drop-off time */}
            <div className="relative w-[120px] shrink-0">
              <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
              <button type="button" className="w-full flex items-center border border-gray-300 rounded-lg p-2 bg-white hover:border-[#ffc107] transition-colors text-left cursor-pointer">
                <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="text-sm font-thin whitespace-nowrap">{dropoffTime}</span>
              </button>
            </div>

            {/* Search */}
            <div className="shrink-0">
              <button className="bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-2 px-5 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                Search
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}


