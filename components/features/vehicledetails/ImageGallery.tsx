"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images?: string[];
}

// ── Thumbnail with individual fallback state ──────────────────────────

function Thumbnail({
  src,
  index,
  isActive,
  onClick,
}: {
  src: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const [imgSrc, setImgSrc] = useState<string | null>(src);

  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 relative w-12 h-10 md:w-20 md:h-16 rounded-md border-2 overflow-hidden bg-gray-50 transition-all ${
        isActive
          ? "border-gray-300"
          : "border-transparent hover:border-gray-200"
      }`}
    >
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={`Thumbnail ${index + 1}`}
          fill
          sizes="80px"
          quality={60}
          className="object-cover mix-blend-multiply"
          onError={() => setImgSrc(null)}
        />
      ) : (
        <div className="w-full h-full bg-gray-100" />
      )}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────

export default function ImageGallery({ images = [] }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState<string>(images[0] || "");
  const [mainImgSrc, setMainImgSrc] = useState<string | null>(
    images[0] || null,
  );

  // Keep main image in sync when activeImage changes
  function handleSelect(img: string) {
    setActiveImage(img);
    setMainImgSrc(img);
  }

  if (images.length === 0) {
    return (
      <div className="flex h-32 md:h-64 items-center justify-center rounded-md bg-gray-50 border border-gray-100">
        <span className="text-gray-400 text-sm">No images available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Main Image */}
      <div className="md:bg-gray-50 md:rounded-md flex items-center justify-center p-0 md:p-6 md:border border-gray-100 h-32 md:h-72 relative">
        {mainImgSrc ? (
          <Image
            src={mainImgSrc}
            alt="Main vehicle view"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={80}
            className="object-contain mix-blend-multiply transition-opacity duration-300"
            onError={() => setMainImgSrc(null)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <span className="text-gray-400 text-sm">Image unavailable</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 md:gap-3 mt-2 md:mt-4 overflow-x-auto pb-1 md:pb-2 scrollbar-hide hidden md:flex">
        {images.map((img, index) => (
          <Thumbnail
            key={index}
            src={img}
            index={index}
            isActive={activeImage === img}
            onClick={() => handleSelect(img)}
          />
        ))}
      </div>
    </div>
  );
}
