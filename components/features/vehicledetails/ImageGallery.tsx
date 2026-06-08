"use client";
import { useState } from "react";

export default function ImageGallery({ images }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col w-full">
      {/* Main Image Container */}
      <div className="bg-gray-50 rounded-md flex items-center justify-center p-6 border border-gray-100 h-64 md:h-72">
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
                ? "border-blue-600"
                : "border-transparent hover:border-gray-300"
            }`}
          >
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
