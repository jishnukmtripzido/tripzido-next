"use client";

import { useState } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import { Bike } from "@/types";
import BikeCard from "@/components/search/BikeCard";

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