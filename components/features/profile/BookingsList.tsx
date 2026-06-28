"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCustomerBookings } from "@/actions/bookings.actions";
import type { BookingListItem, BookingTabFilter } from "@/types/booking.types";

const TABS: { key: BookingTabFilter; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "ongoing", label: "Ongoing" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// ── Booking image with fallback ───────────────────────────────────────

function BookingImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState<string | null>(src);

  if (!imgSrc) {
    return <span className="text-xs text-gray-400">No image</span>;
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 1280px) 100vw, 192px"
      quality={75}
      className="object-contain p-2 mix-blend-multiply"
      onError={() => setImgSrc(null)}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────

export default function BookingsList() {
  const [currentTab, setCurrentTab] = useState<BookingTabFilter>("pending");
  const [bookings, setBookings] = useState<BookingListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getCustomerBookings(currentTab).then((data) => {
      if (!isMounted) return;
      setBookings(data?.results ?? []);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [currentTab]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your past and upcoming rides.
        </p>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
        {/* Internal Tabs */}
        <div className="flex border-b border-gray-100 px-6 pt-2 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setCurrentTab(tab.key)}
              className={`px-6 py-4 text-sm font-semibold transition-all relative whitespace-nowrap ${
                currentTab === tab.key
                  ? "text-black"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
              {currentTab === tab.key && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-yellow rounded-t-md" />
              )}
            </button>
          ))}
        </div>

        {/* Bookings Feed */}
        <div className="p-6 space-y-6">
          {isLoading && (
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-40 rounded-xl border border-gray-100 animate-pulse bg-gray-50"
                />
              ))}
            </div>
          )}

          {!isLoading && bookings.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No {currentTab} bookings found.
            </div>
          )}

          {!isLoading &&
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col xl:flex-row gap-6 p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
              >
                {/* Vehicle Image */}
                <div className="relative w-full xl:w-48 h-32 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden border border-gray-100">
                  {booking.image ? (
                    <BookingImage src={booking.image} alt={booking.vehicle} />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.vehicle}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Booking ID : {booking.booking_reference} | Booking Date
                        : {formatDateTime(booking.booking_date)}
                      </p>
                      <p className="text-sm font-medium text-gray-700 mt-1">
                        Hub Details : {booking.location}
                      </p>
                    </div>
                    <Link
                      href={`/profile/bookings/${booking.id}`}
                      className="text-xs font-bold text-brand-yellow hover:text-[#e6ac00] uppercase tracking-wider hidden sm:block"
                    >
                      View Details
                    </Link>
                  </div>

                  {/* Trip Details Footer */}
                  <div className="mt-6 flex flex-wrap gap-4 items-center justify-between border-t border-gray-50 pt-4">
                    <div className="flex items-center text-xs md:text-sm font-medium text-gray-600 gap-2 md:gap-4 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {formatDateTime(booking.start_date)}
                      </div>
                      <span className="text-gray-300 hidden md:block">---</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                        {booking.duration}
                      </span>
                      <span className="text-gray-300 hidden md:block">---</span>
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {formatDateTime(booking.end_date)}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                      <p className="text-sm font-bold text-gray-900">
                        Paid : ₹ {booking.paid.toFixed(2)}
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        Deposit : ₹ {booking.deposit.toFixed(2)}
                      </p>
                    </div>

                    {/* View Details Mobile */}
                    <Link
                      href={`/profile/bookings/${booking.id}`}
                      className="text-xs font-bold text-brand-yellow hover:text-[#e6ac00] uppercase tracking-wider sm:hidden mt-2 w-full text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
