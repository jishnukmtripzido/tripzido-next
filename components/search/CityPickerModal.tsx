"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── Types ── */
interface City {
  name: string;
  imageUrl: string;
}

/* ── Data ── */
const CITIES: City[] = [
  {
    name: "Agra",
    imageUrl:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=70",
  },
  {
    name: "Ahmedabad",
    imageUrl:
      "https://images.unsplash.com/photo-1599030285906-f84f5e2e9578?w=400&q=70",
  },
  {
    name: "Amritsar",
    imageUrl:
      "https://images.unsplash.com/photo-1588416499018-d8c621e7d2c2?w=400&q=70",
  },
  {
    name: "Bangalore",
    imageUrl:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=70",
  },
  {
    name: "Bhopal",
    imageUrl:
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400&q=70",
  },
  {
    name: "Chennai",
    imageUrl:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=70",
  },
  {
    name: "Coorg",
    imageUrl:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=400&q=70",
  },
  {
    name: "Delhi",
    imageUrl:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=70",
  },
  {
    name: "Goa",
    imageUrl:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=70",
  },
  {
    name: "Hyderabad",
    imageUrl:
      "https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=400&q=70",
  },
  {
    name: "Jaipur",
    imageUrl:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=70",
  },
  {
    name: "Kochi",
    imageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=70",
  },
  {
    name: "Kolkata",
    imageUrl:
      "https://images.unsplash.com/photo-1558431382-27e303142255?w=400&q=70",
  },
  {
    name: "Manali",
    imageUrl:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=70",
  },
  {
    name: "Mumbai",
    imageUrl:
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&q=70",
  },
  {
    name: "Mysuru",
    imageUrl:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=70",
  },
  {
    name: "Ooty",
    imageUrl:
      "https://images.unsplash.com/photo-1580889240911-ade839c5b0c4?w=400&q=70",
  },
  {
    name: "Pune",
    imageUrl:
      "https://images.unsplash.com/photo-1559297434-fae8a1916a79?w=400&q=70",
  },
  {
    name: "Rishikesh",
    imageUrl:
      "https://images.unsplash.com/photo-1591018533821-5d0e06a9517c?w=400&q=70",
  },
  {
    name: "Shimla",
    imageUrl:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=400&q=70",
  },
  {
    name: "Srinagar",
    imageUrl:
      "https://images.unsplash.com/photo-1586183189334-1bdc8b0e7e0a?w=400&q=70",
  },
  {
    name: "Udaipur",
    imageUrl:
      "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400&q=70",
  },
  {
    name: "Varanasi",
    imageUrl:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=400&q=70",
  },
  {
    name: "Wayanad",
    imageUrl:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=400&q=70",
  },
];

/* ── Props ── */
interface CityPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (city: string) => void;
  selectedCity?: string;
}

export default function CityPickerModal({
  isOpen,
  onClose,
  onSelect,
  selectedCity,
}: CityPickerModalProps) {
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = CITIES.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  /* Auto-focus search on open */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchRef.current?.focus(), 80);
      setQuery("");
      setHighlighted(null);
    }
  }, [isOpen]);

  /* Lock body scroll on mobile when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Keyboard: Escape to close */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  function handleSelect(name: string) {
    onSelect(name);
    onClose();
  }

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Select city"
    >
      {/* Dim overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full bg-white rounded-t-2xl max-h-[92dvh] sm:rounded-2xl sm:max-w-4xl sm:mx-6 sm:h-[85vh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            {/* Logo mark */}
            <div className="bg-[#ffc107] p-1.5 rounded-lg">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
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
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        {/* ── Search bar ── */}
        <div className="px-5 py-3 shrink-0">
          <div className="flex items-center gap-2.5 border border-gray-300 rounded-xl px-3.5 py-2.5 focus-within:border-[#ffc107] focus-within:ring-2 focus-within:ring-[#ffc107]/20 transition-all bg-gray-50">
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
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
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                className="text-gray-400 hover:text-gray-600 shrink-0 text-xs font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── City grid ── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 pb-4 overscroll-contain min-h-[320px] sm:min-h-0"
        >
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg
                className="w-12 h-12 text-gray-200 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
              <p className="text-sm font-medium text-gray-500">
                No cities found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-15">
              {filtered.map((city) => {
                const isSelected = selectedCity === city.name;
                const isHighlighted = highlighted === city.name;
                return (
                  <button
                    key={city.name}
                    onClick={() => handleSelect(city.name)}
                    onMouseEnter={() => setHighlighted(city.name)}
                    onMouseLeave={() => setHighlighted(null)}
                    className={`
                      relative rounded-xl overflow-hidden aspect-[4/3] text-left
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc107]
                      transition-transform duration-150 cursor-pointer
                      ${isHighlighted ? "scale-[1.03]" : "scale-100"}
                    `}
                    aria-pressed={isSelected}
                  >
                    {/* City image */}
                    <img
                      src={city.imageUrl}
                      alt={city.name}
                      className="w-full h-full object-cover "
                      loading="lazy"
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `https://placehold.co/400x300/f3f4f6/9ca3af?text=${encodeURIComponent(
                          city.name
                        )}`;
                      }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                    {/* Selected ring */}
                    {isSelected && (
                      <div className="absolute inset-0 ring-3 ring-[#ffc107] ring-inset rounded-xl" />
                    )}

                    {/* City name */}
                    <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2.5 flex items-end justify-between">
                      <span className="text-white font-semibold text-sm leading-tight drop-shadow-sm">
                        {city.name}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#ffc107] flex items-center justify-center shrink-0 ml-1">
                          <svg
                            className="w-3 h-3 text-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M5 13l4 4L19 7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                            />
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
              className="w-full cursor-pointer bg-[#ffc107] hover:bg-yellow-500 active:bg-yellow-600 text-black font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Continue with {selectedCity}
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
