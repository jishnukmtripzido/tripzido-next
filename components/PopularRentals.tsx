"use client";

import { useState } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import { Bike } from "@/types";

const BIKES: Bike[] = [
  {
    id: "1",
    name: "Royal Enfield Himalayan",
    specs: "411cc · Adventure · Manual",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 1299,
    badge: { label: "Most booked", variant: "yellow" },
    tags: ["Free helmet", "Fuel included"],
  },
  {
    id: "2",
    name: "Honda Activa 6G",
    specs: "110cc · Scooter · Automatic",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 499,
    badge: { label: "Best value", variant: "green" },
    tags: ["Free helmet", "Storage box"],
  },
  {
    id: "3",
    name: "Royal Enfield Classic",
    specs: "349cc · Cruiser · Manual",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 999,
    tags: ["Free helmet", "Iconic ride"],
  },
  {
    id: "4",
    name: "TVS Ntorq 125",
    specs: "125cc · Scooter · Automatic",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 649,
    tags: ["Free helmet", "Sporty"],
  },
  {
    id: "5",
    name: "Bajaj Pulsar NS200",
    specs: "199cc · Street · Manual",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 849,
    tags: ["Free helmet", "ABS brakes"],
    rating: 4.4,
    reviewCount: 31,
  },
  {
    id: "6",
    name: "Yamaha MT-15 V2",
    specs: "155cc · Naked · Manual",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 899,
    tags: ["Free helmet", "VVA tech"],
    rating: 4.6,
    reviewCount: 58,
  },
];

const FILTER_TABS = [
  "All bikes",
  "Scooters",
  "Adventure",
  "Cruisers",
  "Electric",
  "Sports",
];

export default function PopularRentals() {
  const [activeFilter, setActiveFilter] = useState("All bikes");

  const { trackRef, viewportRef, canPrev, canNext, prev, next } = useCarousel({
    visibleCards: 4,
    gap: 20,
  });

  return (
    <section className="pt-12 px-4 lg:px-8 mx-auto xl:mx-[121.5px] xl:px-0">
      <div className="mb-2">
        <h2 className="text-[1.37rem] md:text-2xl font-extrabold text-gray-900">
          Popular rentals in Wayanad
        </h2>
        <p className="text-sm text-gray-700 mt-1">
          Explore the misty hills and forest trails on two wheels
        </p>
      </div>

      {/* Filter tabs */}
      <div
        id="filterTabsWrapper"
        className="mt-5 mb-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-3 flex-nowrap">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap flex-shrink-0 ${
                activeFilter === tab
                  ? "border-[#006CE4] text-[#006CE4] bg-white hover:bg-blue-50"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <div
          id="bikesScrollWrapper"
          ref={viewportRef}
          className="overflow-x-auto md:overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            id="bikesCarouselTrack"
            ref={trackRef}
            className="flex gap-5 md:[transition:transform_300ms_ease-in-out]"
          >
            {BIKES.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        </div>

        {/* Prev */}
        <button
          onClick={prev}
          disabled={!canPrev}
          style={{ visibility: canPrev ? "visible" : "hidden" }}
          className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg border border-gray-100 rounded-full items-center justify-center text-gray-400 hover:text-black z-30 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>

        {/* Next */}
        <button
          onClick={next}
          disabled={!canNext}
          className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg border border-gray-100 rounded-full items-center justify-center text-gray-400 hover:text-black z-30 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

function BikeCard({ bike }: { bike: Bike }) {
  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden flex-shrink-0 min-w-[240px] md:min-w-0">
      <div className="relative h-48 bg-white overflow-hidden flex items-center justify-center p-3">
        <img
          src={bike.imageUrl}
          alt={bike.name}
          className="w-full h-full object-contain transition-transform duration-300 p-4"
          onError={(e) => {
            (
              e.target as HTMLImageElement
            ).src = `https://placehold.co/400x200/f3f4f6/9ca3af?text=${encodeURIComponent(
              bike.name
            )}`;
          }}
        />
        {bike.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide ${
              bike.badge.variant === "yellow"
                ? "bg-[#ffc107] text-black"
                : "bg-green-500 text-white"
            }`}
          >
            {bike.badge.label}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="font-medium text-gray-900 text-[15px]">
              {bike.name}
            </h3>
            <p className="text-xs text-gray-700 mt-0.5">{bike.specs}</p>
          </div>
          {bike.rating && (
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <svg
                className="w-4 h-4 text-[#ffc107]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-semibold text-gray-700">
                {bike.rating}
              </span>
              <span className="text-xs text-gray-400">
                ({bike.reviewCount})
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 my-3">
          {bike.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-100">
          <div>
            <span className="text-[11px] text-gray-700">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-medium text-gray-900">
                ₹{bike.price.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-700 font-medium">/ day</span>
            </div>
          </div>
          <button className="bg-[#ffc107] hover:bg-yellow-500 text-black text-sm font-medium px-5 py-2 rounded-lg transition-colors">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
}
