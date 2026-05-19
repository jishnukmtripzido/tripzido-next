"use client";

import { useState } from "react";
import Link from "next/link";

interface BikeCardProps {
  id: number;
  name: string;
  specs: string;
  rating: number;
  reviewCount: number;
  price: number;
  imageUrl: string;
  badge?: { text: string; color: "yellow" | "green" | "blue" };
  extras: string[];
}

function StarRating({ rating }: { rating: number }) {
  const starPath =
    "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating) ? "text-[#ffc107]" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d={starPath} />
        </svg>
      ))}
    </div>
  );
}

export default function BikeCard({
  id,
  name,
  specs,
  rating,
  reviewCount,
  price,
  imageUrl,
  badge,
  extras,
}: BikeCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  const badgeClasses = {
    yellow: "bg-[#ffc107] text-gray-800",
    green: "bg-green-500 text-white",
    blue: "bg-blue-500 text-white",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:border-gray-300">
      {/* Image */}
      <div className="relative h-44 sm:h-40 flex items-center justify-center bg-gray-50">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-contain p-4"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/300x160/f3f4f6/9ca3af?text=${encodeURIComponent(name)}`;
          }}
        />
        {badge && (
          <span
            className={`absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeClasses[badge.color]}`}
          >
            {badge.text}
          </span>
        )}
        <button
          onClick={() => setWishlisted((w) => !w)}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-colors hover:cursor-pointer"
          aria-label="Add to wishlist"
        >
          <svg
            className={`w-4 h-4 transition-colors ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
            fill={wishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      {/* Details */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-medium text-gray-900 text-[15px] leading-snug">{name}</h3>
        <p className="text-[11px] text-gray-500 mt-0.5 mb-2">{specs}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <StarRating rating={rating} />
          <span className="text-[11px] font-semibold text-gray-700">{rating.toFixed(1)}</span>
          <span className="text-[11px] text-gray-400">({reviewCount})</span>
        </div>

        {/* Extras */}
        <div className="flex flex-wrap gap-1 mb-3">
          {extras.map((extra) => (
            <span
              key={extra}
              className="text-[10px] bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 font-medium"
            >
              {extra}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-end justify-between">
          <div>
            <div className="text-[10px] text-gray-500">Starting from</div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-semibold text-gray-900">₹{price.toLocaleString("en-IN")}</span>
              <span className="text-[10px] text-gray-500">/day</span>
            </div>
          </div>
          <Link href="/vehicledetails">
            <button className="bg-[#ffc107] hover:bg-yellow-500 text-black text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
              Book now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
