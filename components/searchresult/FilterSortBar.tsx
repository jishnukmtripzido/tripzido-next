"use client";

interface FilterSortBarProps {
  onFilterClick: () => void;
  onSortClick: () => void;
  /** When true (user has scrolled past threshold), search bar is hidden so this snaps to top-0 */
  scrolled: boolean;
}

export default function FilterSortBar({ onFilterClick, onSortClick, scrolled }: FilterSortBarProps) {
  return (
    <div
      className={`lg:hidden sticky z-20 bg-white border-b border-gray-200 shadow-sm transition-[top] duration-300 ${
        scrolled ? "top-0" : "top-[57px]"
      }`}
    >
      <div className="flex">
        <button
          onClick={onFilterClick}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-700 border-r border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M3 4h18M7 8h10M11 12h4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          FILTER
        </button>
        <button
          onClick={onSortClick}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M3 7h18M7 12h10M11 17h4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          SORT
        </button>
      </div>
    </div>
  );
}