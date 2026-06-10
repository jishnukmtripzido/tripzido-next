"use client";
import { useState } from "react";

// 1. Define the TypeScript interface for your props
interface ImageGalleryProps {
  images?: string[];
}

// 2. Apply the interface to the component signature
export default function ImageGallery({ images = [] }: ImageGalleryProps) {
  // Explicitly tell useState that activeImage will be a string
  const [activeImage, setActiveImage] = useState<string>(images[0] || "");

  // Early return if no images are provided
  if (images.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-md bg-gray-50 border border-gray-100">
        <span className="text-gray-400 text-sm">No images available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Main Image Container */}
      <div className="md:bg-gray-50 md:rounded-md flex items-center justify-center p-6 border-t md:border border-gray-100 h-64 md:h-72">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage}
          alt="Main vehicle view"
          className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={`flex-shrink-0 w-20 h-16 rounded-md border-2 overflow-hidden bg-gray-50 transition-all ${
              activeImage === img
                ? "border-gray-300"
                : "border-transparent hover:border-gray-200"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
