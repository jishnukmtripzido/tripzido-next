"use client";

import Link from "next/link";
import { useCarousel } from "@/hooks/useCarousel";

const OFFERS = [
  {
    id: "1",
    featured: true,
    title: "Get Flat Rs. 100 OFF",
    description: (
      <>
        Get Flat <strong>Rs. 100 OFF</strong> on orders above Rs. 2,000
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
  },
  {
    id: "2",
    title: "Get Flat Rs. 50 OFF",
    description: <>Get Flat Rs. 50 off on orders above Rs. 1,000</>,
    icon: (
      <svg
        className="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "3",
    title: "Get Flat Rs. 200 OFF",
    description: <>Get Flat Rs. 200 off on orders above Rs. 5,000</>,
    icon: (
      <svg
        className="w-6 h-6 text-gray-500"
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
    ),
  },
  {
    id: "4",
    title: "Get Flat Rs. 500 OFF",
    description: <>Get Flat Rs. 500 off on orders above Rs. 10,000</>,
    icon: (
      <svg
        className="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "5",
    title: "Free Ride Voucher",
    description: <>Refer a friend and earn a free 1-day ride voucher</>,
    icon: (
      <svg
        className="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

export default function OffersSection() {
  const { trackRef, viewportRef, canPrev, canNext, prev, next } = useCarousel({
    visibleCards: 4,
    gap: 16,
  });

  return (
    <section className="px-4 lg:px-8 py-12 mx-auto xl:mx-[121.5px] xl:px-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl pb-2 md:pb-0 md:text-2xl font-bold whitespace-nowrap">
          Travel more, spend less
        </h2>
        <Link
          href="#"
          className="hidden md:block text-blue-900 font-semibold text-sm hover:underline shrink-0 ml-4"
        >
          Learn more about your offers
        </Link>
      </div>

      {/* Carousel — mobile: overflow-x scroll | desktop: JS carousel via hook */}
      <div className="relative group">
        <div
          id="offersScrollWrapper"
          ref={viewportRef}
          className="overflow-x-auto md:overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            id="offersCarouselTrack"
            ref={trackRef}
            className="flex gap-4 md:[transition:transform_300ms_ease-in-out]"
          >
            {OFFERS.map((offer) => (
              <div
                key={offer.id}
                className={`rounded-md p-4 h-28 flex flex-col justify-between flex-shrink-0
                  min-w-[260px] md:min-w-0
                  ${
                    offer.featured
                      ? "bg-[#ffc107]"
                      : "bg-white border border-gray-300 hover:shadow-md transition-shadow"
                  }`}
              >
                {offer.featured ? (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {offer.icon}
                      <span className="font-bold text-sm">{offer.title}</span>
                    </div>
                    <p className="text-xs font-normal leading-relaxed">
                      {offer.description}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-sm leading-tight">
                        {offer.title}
                      </h3>
                      {offer.icon}
                    </div>
                    <p className="text-gray-700 text-xs font-normal">
                      {offer.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Prev — hidden until needed, mirrors original style="visibility:hidden" */}
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

      <Link
        href="#"
        className="md:hidden block text-blue-900 font-semibold text-sm hover:underline mt-4"
      >
        Learn more about your offers
      </Link>
    </section>
  );
}
