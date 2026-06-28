// components/features/profile/BookingVehicleImage.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function BookingVehicleImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [imgSrc, setImgSrc] = useState<string | null>(src);

  if (!imgSrc) {
    return <span className="text-xs text-gray-400">No image</span>;
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="160px"
      quality={75}
      className="object-contain p-2 mix-blend-multiply"
      onError={() => setImgSrc(null)}
    />
  );
}
