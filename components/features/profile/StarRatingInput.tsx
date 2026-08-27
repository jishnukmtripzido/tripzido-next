"use client";

import { useState } from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const SIZE_MAP = { sm: "w-5 h-5", md: "w-7 h-7", lg: "w-9 h-9" };
const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

export default function StarRatingInput({
  value,
  onChange,
  size = "md",
  disabled,
}: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value;
  const sizeClass = SIZE_MAP[size];

  return (
    <div
      className="flex items-center gap-1"
      onMouseLeave={() => setHovered(null)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          className={`p-1 -m-1 rounded transition-transform ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer hover:scale-110"
          }`}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <svg
            className={`${sizeClass} transition-colors ${
              star <= display ? "text-yellow-400" : "text-gray-200"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d={STAR_PATH} />
          </svg>
        </button>
      ))}
    </div>
  );
}
