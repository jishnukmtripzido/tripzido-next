"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCustomerBookings } from "@/actions/bookings.actions";
import BookingStatusBadge from "./BookingStatusBadge";
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
    return (
      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
        No image
      </div>
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 1280px) 100vw, 192px"
      quality={75}
      className="object-contain p-3 mix-blend-multiply"
      onError={() => setImgSrc(null)}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────

type BookingsListProps = {
  /** Comes from the route segment, e.g. /profile/bookings/confirmed */
  status: BookingTabFilter;
};

export default function BookingsList({ status }: BookingsListProps) {
  const [bookings, setBookings] = useState<BookingListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getCustomerBookings(status).then((data) => {
      if (!isMounted) return;
      setBookings(data?.results ?? []);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [status]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your past and upcoming rides.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs — each one is a real, shareable URL now */}
        <div className="flex border-b border-gray-100 px-4 sm:px-6 pt-2 overflow-x-auto">
          {TABS.map((tab) => {
            const isActive = status === tab.key;
            return (
              <Link
                key={tab.key}
                href={`/profile/bookings/${tab.key}`}
                className={`px-4 sm:px-6 py-4 text-sm font-semibold transition-all relative whitespace-nowrap ${
                  isActive ? "text-black" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-yellow rounded-t-md" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bookings Feed */}
        <div className="p-4 sm:p-6 space-y-5">
          {isLoading && (
            <div className="space-y-5">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-40 rounded-xl border border-gray-100 animate-pulse bg-gray-50"
                />
              ))}
            </div>
          )}

          {!isLoading && bookings.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-brand-yellow"
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
              </div>
              <p className="text-gray-700 font-semibold">
                No {status} bookings
              </p>
              <p className="text-sm text-gray-400 mt-1 max-w-xs">
                Bookings in this state will show up here as soon as they do.
              </p>
            </div>
          )}

          {!isLoading &&
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col xl:flex-row gap-5 p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
              >
                {/* Vehicle Image */}
                <div className="relative w-full xl:w-48 h-32 bg-gray-50 rounded-lg shrink-0 overflow-hidden border border-gray-100">
                  {booking.image ? (
                    <BookingImage src={booking.image} alt={booking.vehicle} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-gray-900 truncate">
                          {booking.vehicle}
                        </h3>
                        <BookingStatusBadge status={status} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Booking ID: {booking.booking_reference} ·{" "}
                        {formatDateTime(booking.booking_date)}
                      </p>
                      <p className="text-sm font-medium text-gray-700 mt-1">
                        {booking.location}
                      </p>
                    </div>
                    <Link
                      href={`/profile/bookings/detail/${booking.id}`}
                      className="text-xs font-bold text-brand-yellow hover:text-[#e6ac00] uppercase tracking-wider hidden sm:block shrink-0"
                    >
                      View Details
                    </Link>
                  </div>

                  {/* Trip Details Footer */}
                  <div className="mt-5 flex flex-wrap gap-3 items-center justify-between border-t border-gray-50 pt-4">
                    <div className="flex items-center text-xs md:text-sm font-medium text-gray-600 gap-2 md:gap-4 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <CalendarGlyph />
                        {formatDateTime(booking.start_date)}
                      </div>
                      <span className="text-gray-300 hidden md:block">→</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                        {booking.duration}
                      </span>
                      <span className="text-gray-300 hidden md:block">→</span>
                      <div className="flex items-center gap-1.5">
                        <CalendarGlyph />
                        {formatDateTime(booking.end_date)}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-sm font-bold text-gray-900">
                        Paid: ₹{booking.paid.toFixed(2)}
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        Deposit: ₹{booking.deposit.toFixed(2)}
                      </p>
                    </div>

                    {/* View Details Mobile */}
                    <Link
                      href={`/profile/bookings/detail/${booking.id}`}
                      className="text-xs font-bold text-brand-yellow hover:text-[#e6ac00] uppercase tracking-wider sm:hidden w-full text-center"
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

function CalendarGlyph() {
  return (
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
  );
}
