"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { useCityContext } from "@/contexts/CityContext";
import { getPopularRentalsApi } from "@/services/vehicle.service";
import { FALLBACK_POPULAR_RENTALS } from "@/lib/constants";
import type { PopularRental } from "@/types/search.types";

interface Props {
  initialRentals: PopularRental[];
}

export default function PopularRentals({ initialRentals }: Props) {
  const { selectedCityId, selectedCityName } = useCityContext();
  const [rentals, setRentals] = useState<PopularRental[]>(initialRentals);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { trackRef, viewportRef, canPrev, canNext, prev, next } = useCarousel({
    visibleCards: 4,
    gap: 20,
  });

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    let cancelled = false;

    async function fetchRentals() {
      setLoading(true);
      try {
        const data = await getPopularRentalsApi(selectedCityId);
        if (!cancelled && data && data.length > 0) setRentals(data);
      } catch {
        // keep current rentals on error
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRentals();
    return () => {
      cancelled = true;
    };
  }, [selectedCityId]);

  return (
    <section className="pt-12 px-4 lg:px-8 mx-auto xl:mx-[121.5px] xl:px-0">
      <div className="mb-7">
        <h2 className="text-[1.37rem] md:text-2xl font-bold text-gray-900">
          Popular rentals in {selectedCityName}
        </h2>
        <p className="text-sm text-gray-700 mt-1">
          Explore the misty hills and forest trails on two wheels
        </p>
      </div>

      <div className="relative group">
        <div
          ref={viewportRef}
          className="overflow-x-auto md:overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            ref={trackRef}
            className={`flex gap-5 md:[transition:transform_300ms_ease-in-out] transition-opacity duration-200 ${
              loading ? "opacity-40 pointer-events-none" : "opacity-100"
            }`}
          >
            {rentals.map((rental) => (
              <PopularRentalCard key={rental.id} rental={rental} />
            ))}
          </div>
        </div>

        <CarouselButton direction="prev" onClick={prev} visible={canPrev} />
        <CarouselButton direction="next" onClick={next} visible={canNext} />
      </div>
    </section>
  );
}

// ── Card ──────────────────────────────────────────────────────────────

function PopularRentalCard({ rental }: { rental: PopularRental }) {
  const [imgSrc, setImgSrc] = useState<string | null>(rental.image_url ?? null);

  return (
    <div className="border border-gray-200 bg-[#f7fafc] shadow-md rounded-md overflow-hidden flex-shrink-0 min-w-[240px] md:min-w-0 flex flex-col">
      {/* Name on top */}
      <div className="px-4 pt-4 pb-2 text-center">
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug">
          {rental.name}
        </h3>
      </div>

      {/* Vehicle image */}
      <div className="relative h-40 bg-white flex items-center justify-center px-3">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={rental.name}
            fill
            sizes="(max-width: 640px) 240px, (max-width: 1280px) 25vw, 300px"
            quality={75}
            className="object-contain p-4 transition-transform duration-300 bg-[#f7fafc]"
            onError={() => setImgSrc(null)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <span className="text-gray-400 text-xs font-medium text-center px-2">
              {rental.name}
            </span>
          </div>
        )}

        {rental.tag && (
          <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide bg-brand-yellow text-black z-10">
            {rental.tag}
          </span>
        )}
      </div>

      {/* Pickup location + Book Now */}
      <div className="px-4 pt-3 pb-4 mt-auto border-t border-gray-100 flex flex-col gap-3">
        {rental.pickup_location_name && (
          <div className="flex items-center justify-center gap-1 text-xs text-gray-700">
            <svg
              className="w-3.5 h-3.5 shrink-0 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate">{rental.pickup_location_name}</span>
          </div>
        )}

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-full bg-brand-yellow cursor-pointer hover:bg-yellow-500 text-black text-sm font-bold py-2.5 rounded-md transition-colors tracking-wide uppercase"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

// ── Carousel button ───────────────────────────────────────────────────

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
      className={`hidden md:flex absolute ${
        direction === "prev" ? "-left-5" : "-right-5"
      } top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg border border-gray-100 rounded-full items-center justify-center text-gray-400 hover:text-black z-30 disabled:opacity-30 disabled:cursor-not-allowed`}
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
