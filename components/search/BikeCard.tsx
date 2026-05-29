
"use client"

import { Bike } from "@/types";

export default function BikeCard({ bike }: { bike: Bike }) {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden flex-shrink-0 min-w-[240px] md:min-w-0">
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
          <button className="bg-[#ffc107] hover:bg-yellow-500 text-black text-sm font-medium px-5 py-2 rounded-md transition-colors">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
}