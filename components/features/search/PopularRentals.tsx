"use client";

import { useState } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import { POPULAR_BIKES, POPULAR_BIKE_FILTER_TABS } from "@/lib/constants";
import BikeCard from "@/components/features/search/BikeCard";

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
      <div className="mt-5 mb-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-3 flex-nowrap">
          {POPULAR_BIKE_FILTER_TABS.map((tab) => (
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
          ref={viewportRef}
          className="overflow-x-auto md:overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            ref={trackRef}
            className="flex gap-5 md:[transition:transform_300ms_ease-in-out]"
          >
            {POPULAR_BIKES.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        </div>
        <CarouselButton direction="prev" onClick={prev} visible={canPrev} />
        <CarouselButton direction="next" onClick={next} visible={canNext} />
      </div>
    </section>
  );
}

function CarouselButton({
  direction,
  onClick,
  visible,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  visible: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!visible}
      style={{ visibility: visible ? "visible" : "hidden" }}
      className={`hidden md:flex absolute ${direction === "prev" ? "-left-5" : "-right-5"} top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg border border-gray-100 rounded-full items-center justify-center text-gray-400 hover:text-black z-30 disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
