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
  city = "Milan Malpensa Airport",
  pickupDate = "Fri, May 22",
  dropoffDate = "Mon, May 25",
  pickupTime = "10:00",
  dropoffTime = "10:00",
}: SearchResultHeaderProps) {
  return (
    <div className="hidden md:block top-0 z-50 bg-[#FAFBFD]">
      {/* Changed: Removed 'text-white' from the header so text is visible on the white background */}
      <header className="w-full bg-white pb-[40px] border-b border-gray-300 shadow-sm text-gray-900">
        <div className="mx-auto px-4 xl:mx-[121.5px] xl:px-0 flex items-center justify-between h-16">
          <div className="flex items-center space-x-12">
            
             <div className="flex items-center space-x-2">
              <div className="bg-[#ffc107] p-1.5 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-black">tripzido</span>
            </div>

            {/* Changed: Added text-gray-700 to the nav container and hover:text-black to the Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
              <Link href="#" className="flex items-center space-x-2 hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>Bikes</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 hover:text-black transition-colors">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>Destinations</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>How it works</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>Offers</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-5">
            {/* <button className="bg-white text-gray-900 px-4 py-1.5 font-semibold text-sm border border-gray-300 rounded hover:bg-gray-100 hover:cursor-pointer transition-colors">Register</button> */}
            {/* <button className="bg-white text-gray-900 px-4 py-1.5 font-semibold text-sm border border-gray-300 rounded hover:bg-gray-100 hover:cursor-pointer transition-colors">Sign in</button> */}
         {/* Indian Flag */}
          <div className="w-6 h-4 bg-gray-200 overflow-hidden rounded-sm cursor-pointer border border-gray-300">
            <div className="h-1/3 bg-[#FF9933]" />
            <div className="h-1/3 bg-white flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-800" />
            </div>
            <div className="h-1/3 bg-[#138808]" />
          </div>

          {/* Help */}
          <div className="text-gray-500 cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>

          {/* User */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-8 h-8 text-sm rounded-full bg-[#ffc107] flex items-center justify-center text-white font-bold">
              R
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold">Your account</div>
            </div>
          </div>
          </div>
        </div>
      </header>

      {/* SEARCH WIDGET */}
      <section className="relative z-20 px-4 lg:px-8 -mt-[28px] mx-auto xl:mx-[121.5px] xl:px-0">
        <div>
          <div className="flex w-full items-center bg-white border-2 border-gray-300 rounded-md h-[52px] shadow-md">
            
            {/* Pick-up location */}
            <div className="flex-[2] min-w-[200px] flex items-center px-3 h-full border-r border-gray-300 hover:bg-gray-50 cursor-pointer">
              <svg className="w-6 h-6 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div className="flex flex-col justify-center flex-1 overflow-hidden">
                <span className="text-[11px] font-thin text-gray-500 leading-none mb-1">City</span>
                <span className="text-sm font-thin text-gray-900 truncate leading-none">{city}</span>
              </div>
              <svg className="w-5 h-5 text-gray-500 hover:text-black shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            {/* Pick-up date */}
            <div className="flex-1 min-w-[110px] flex items-center px-3 h-full border-r border-gray-300 hover:bg-gray-50 cursor-pointer">
              <svg className="w-6 h-6 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-thin text-gray-500 leading-none mb-1">Pick-up date</span>
                <span className="text-sm font-thin text-gray-900 whitespace-nowrap leading-none">{pickupDate}</span>
              </div>
            </div>

            {/* Pick-up Time */}
            <div className="w-[140px] shrink-0 flex items-center px-3 h-full border-r border-gray-300 hover:bg-gray-50 cursor-pointer">
              <svg className="w-6 h-6 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-thin text-gray-500 leading-none mb-1">Time</span>
                <span className="text-sm font-thin text-gray-900 whitespace-nowrap leading-none">{pickupTime}</span>
              </div>
            </div>

            {/* Drop-off date */}
            <div className="flex-1 min-w-[110px] flex items-center px-3 h-full border-r border-gray-300 hover:bg-gray-50 cursor-pointer">
              <svg className="w-6 h-6 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-thin text-gray-500 leading-none mb-1">Drop-off date</span>
                <span className="text-sm font-thin text-gray-700 whitespace-nowrap leading-none">{dropoffDate}</span>
              </div>
            </div>

            {/* Drop-off Time */}
            <div className="w-[140px] shrink-0 flex items-center px-3 h-full hover:bg-gray-50 cursor-pointer">
              <svg className="w-6 h-6 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-thin text-gray-500 leading-none mb-1">Time</span>
                <span className="text-sm font-thin text-gray-900 whitespace-nowrap leading-none">{dropoffTime}</span>
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-[#ffc107] hover:bg-yellow-500 text-black text-base font-semibold px-8 h-full transition-colors whitespace-nowrap cursor-pointer">
              Search
            </button>
          </div>
          
        </div>
      </section>
    </div>
  );
}