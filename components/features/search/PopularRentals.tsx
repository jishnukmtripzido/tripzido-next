"use client";

import { useCarousel } from "@/hooks/useCarousel";
import type { PopularRental } from "@/types/search.types";

interface Props {
  rentals: PopularRental[];
  cityName: string;
}

export default function PopularRentals({ rentals, cityName }: Props) {
  const { trackRef, viewportRef, canPrev, canNext, prev, next } = useCarousel({
    visibleCards: 4,
    gap: 20,
  });

  return (
    <section className="pt-12 px-4 lg:px-8 mx-auto xl:mx-[121.5px] xl:px-0">
      <div className="mb-7">
        <h2 className="text-[1.37rem] md:text-2xl font-bold text-gray-900">
          Popular rentals in {cityName}
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
            className="flex gap-5 md:[transition:transform_300ms_ease-in-out]"
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
  const specs = [
    rental.vehicle_type_category === "SCOOTER"
      ? "Scooter"
      : rental.vehicle_type_category === "BIKE"
        ? "Bike"
        : rental.vehicle_type_category,
    rental.transmission_type === "AUTOMATIC" ? "Automatic" : "Manual",
  ]
    .filter(Boolean)
    .join(" · ");

  const imageUrl =
    rental.image_url ??
    `https://placehold.co/400x200/f3f4f6/9ca3af?text=${encodeURIComponent(rental.name)}`;

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden flex-shrink-0 min-w-[240px] md:min-w-0">
      <div className="relative h-48 bg-white flex items-center justify-center p-3">
        <img
          src={imageUrl}
          alt={rental.name}
          className="w-full h-full object-contain transition-transform duration-300 p-4"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/400x200/f3f4f6/9ca3af?text=${encodeURIComponent(rental.name)}`;
          }}
        />
        {rental.tag && (
          <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide bg-brand-yellow text-black">
            {rental.tag}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-[15px]">{rental.name}</h3>
        <p className="text-xs text-gray-700 mt-0.5">{specs}</p>

        <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-100">
          <div>
            <span className="text-[11px] text-gray-700">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-medium text-gray-900">
                ₹
                {rental.display_price
                  ? Number(rental.display_price).toLocaleString("en-IN")
                  : "—"}
              </span>
              <span className="text-xs text-gray-700 font-medium">/ day</span>
            </div>
          </div>
          <button className="bg-brand-yellow hover:bg-yellow-500 text-black text-sm font-medium px-5 py-2 rounded-md transition-colors">
            Book now
          </button>
        </div>
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
