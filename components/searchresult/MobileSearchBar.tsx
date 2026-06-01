"use client";

interface MobileSearchBarProps {
  city: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime: string;
  dropoffTime: string;
  onModify: () => void;
  /** When false the bar slides up out of view so only Filter/Sort remains sticky */
  visible: boolean;
}

export default function MobileSearchBar({
  city,
  pickupDate,
  dropoffDate,
  pickupTime,
  dropoffTime,
  onModify,
  visible,
}: MobileSearchBarProps) {
  return (
    <div
      className={`md:hidden sticky bg-[#fed250] top-0 z-30  border border-[#fed250]  px-4 py-4 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } `} 
    >
      <button
        onClick={onModify}
        className="w-full bg-white flex items-center gap-3 border-1 border-[#6b3d00] rounded-xl px-3 py-2.5 bg-white hover:border-[#ffc107] transition-colors text-left cursor-pointer"
      >
        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 truncate">{city}</div>
          <div className="text-sm text-gray-500 truncate">
            {pickupDate} {pickupTime} &nbsp;–&nbsp; {dropoffDate} {dropoffTime}
          </div>
        </div>
        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}