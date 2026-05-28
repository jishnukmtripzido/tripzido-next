"use client";

import Link from "next/link";


type HeaderProps = {
  logoWidth?: number;
  logoHeight?: number;
  logoTextSize?: string;
  linkIconsSize?: number;
  userNameFirstLetterSize?: number;
  userNameFirstLetter?: string;
  headerLgScreenMx?: string;
  headerValues? : string;
}

export default function Header({ logoWidth, logoHeight, logoTextSize, linkIconsSize, userNameFirstLetterSize, userNameFirstLetter, headerLgScreenMx,headerValues }: HeaderProps) {
  return (
    <header className={headerValues || 'w-full px-0 py-2 border-b border-gray-100 shadow-sm'}>
      <div className={`mx-auto px-4 lg:px-8 py-2 flex items-center justify-between ${headerLgScreenMx || 'xl:mx-[121.5px] xl:px-0'}`}>
        {/* Left: Logo + Nav */}
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <Link href="/">
          <div className="flex items-center space-x-2">
            <div className="bg-[#ffc107] p-1.5 rounded-lg">
              <svg className={`w-${logoWidth || 6} h-${logoHeight || 6} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <span className={`text-${logoTextSize || '2xl'} font-extrabold tracking-tight`}>tripzido</span>
          </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
            <Link href="#" className="flex items-center space-x-2 hover:text-black">
              <svg className={`w-${linkIconsSize || 5} h-${linkIconsSize || 5}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>Bikes</span>
            </Link>
            <Link href="#" className="flex items-center space-x-2 hover:text-black">
              <svg className={`w-${linkIconsSize || 5} h-${linkIconsSize || 5}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>Destinations</span>
            </Link>
            <Link href="#" className="flex items-center space-x-2 hover:text-black">
              <svg className={`w-${linkIconsSize || 5} h-${linkIconsSize || 5}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>How it works</span>
            </Link>
            <Link href="#" className="flex items-center space-x-2 hover:text-black">
              <svg className={`w-${linkIconsSize || 5} h-${linkIconsSize || 5}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>Offers</span>
            </Link>
          </nav>
        </div>

        {/* Right: Flag, Help, Account */}
        <div className="flex items-center space-x-6 text-sm font-medium">
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
            <div className={`w-${userNameFirstLetterSize || 8} h-${userNameFirstLetterSize || 8} rounded-full bg-[#ffc107] flex items-center justify-center text-white font-bold`}>
              {userNameFirstLetter || "J"}
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold">Your account</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
