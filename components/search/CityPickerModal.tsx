"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { City } from "@/types/city";

/* ── Props ── */
interface CityPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Returns the full City object (id + name) so the parent can store id for the form */
  onSelect: (city: City) => void;
  selectedCityId: number | null;
  cities: City[];
  loading?: boolean;
  error?: string | null;
}

export default function CityPickerModal({
  isOpen,
  onClose,
  onSelect,
  selectedCityId,
  cities,
  loading = false,
  error = null,
}: CityPickerModalProps) {
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = cities.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  /* Reset state on open — no auto-focus */
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setHighlighted(null);
    }
  }, [isOpen]);

  /* Lock body scroll on mobile when open */
  // useEffect(() => {
  //   document.body.style.overflow = isOpen ? "hidden" : "";
  //   return () => { document.body.style.overflow = ""; };
  // }, [isOpen]);

  /* Keyboard: Escape to close */
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  function handleSelect(city: City) {
    onSelect(city);
    onClose();
  }

  const selectedCity = cities.find((c) => c.id === selectedCityId) ?? null;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Select city"
    >
      {/* Dim overlay — hidden on mobile since modal is full screen */}
      <div
        className="animate-fade-in absolute inset-0 bg-black/50 backdrop-blur-[2px] hidden sm:block"
        onClick={onClose}
      />

      {/* Modal panel — full screen on mobile, centered sheet on sm+ */}
      <div className="animate-slide-up sm:animate-scale-in relative z-10 w-full h-[100dvh] sm:h-[85vh] bg-white sm:rounded-2xl sm:max-w-4xl sm:mx-6 sm:max-h-[85vh] flex flex-col overflow-hidden sm:shadow-2xl">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#ffc107] p-1.5 rounded-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <span className="font-extrabold text-base tracking-tight text-gray-900">
              Bike Rentals
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* ── Search bar ── */}
        <div className="px-5 py-3 shrink-0">
          <div className="flex items-center gap-2.5 border border-gray-300 rounded-md px-3.5 py-2.5 focus-within:border-[#ffc107] focus-within:ring-2 focus-within:ring-[#ffc107]/20 transition-all bg-gray-50">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search or type city to select"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none min-w-0"
            />
            {query && (
              <button
                onClick={() => { setQuery(""); searchRef.current?.focus(); }}
                className="text-gray-400 hover:text-gray-600 shrink-0 text-xs font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── City grid / states ── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 pb-4 overscroll-contain"
        >
          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-xl bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg className="w-12 h-12 text-red-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
              <p className="text-sm font-medium text-gray-500">{error}</p>
            </div>
          )}

          {/* Empty search result */}
          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg className="w-12 h-12 text-gray-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
              <p className="text-sm font-medium text-gray-500">
                No cities found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
            </div>
          )}

          {/* City cards */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filtered.map((city) => {
                const isSelected = selectedCityId === city.id;
                const isHighlighted = highlighted === city.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => handleSelect(city)}
                    onMouseEnter={() => setHighlighted(city.id)}
                    onMouseLeave={() => setHighlighted(null)}
                    className={`
                      relative rounded-md overflow-hidden aspect-[4/3] text-left
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc107]
                      transition-transform duration-150 cursor-pointer
                      ${isHighlighted ? "scale-[1.03]" : "scale-100"}
                    `}
                    aria-pressed={isSelected}
                  >
                    {/* City image from API */}
                    <img
                      src={city.city_image}
                      alt={city.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://placehold.co/400x300/f3f4f6/9ca3af?text=${encodeURIComponent(city.name)}`;
                      }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                    {/* Selected ring */}
                    {isSelected && (
                      <div className="absolute inset-0 ring-3 ring-[#ffc107] ring-inset rounded-md" />
                    )}

                    {/* City name + check */}
                    <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2.5 flex items-end justify-between">
                      <div>
                        <span className="text-white font-semibold text-sm leading-tight drop-shadow-sm block">
                          {city.name}
                        </span>
                        <span className="text-white/70 text-xs leading-tight drop-shadow-sm">
                          {city.state_name}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#ffc107] flex items-center justify-center shrink-0 ml-1">
                          <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer CTA ── */}
        <div className="shrink-0 px-5 py-4 border-t border-gray-100 bg-white">
          {selectedCity ? (
            <button
              onClick={onClose}
              className="w-full cursor-pointer bg-[#ffc107] hover:bg-yellow-500 active:bg-yellow-600 text-black font-semibold py-3 rounded-md transition-colors text-sm"
            >
              Continue with {selectedCity.name}
            </button>
          ) : (
            <p className="text-center text-sm font-medium text-gray-400 py-1 tracking-wide uppercase">
              Select city to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}