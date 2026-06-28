"use client";

import { useState } from "react";
import Image from "next/image";
import type { VehiclePickupLocation } from "@/types/vehicleDetails.types";

interface Props {
  location: VehiclePickupLocation;
}

export default function PickupLocation({ location }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=800x400&markers=color:red%7C${location.latitude},${location.longitude}&key=${apiKey}`;

  const [imgSrc, setImgSrc] = useState<string | null>(mapUrl);

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Pickup Location</h2>
      <div className="grid grid-cols-1 gap-6 items-start">
        <div>
          <p className="font-semibold text-font-main-sub text-base">
            {location.location_name}
          </p>
          {location.exact_address_revealed_after_booking && (
            <p className="text-sm text-green-700 mt-2">
              * Exact location will be provided after the booking is confirmed.
              *
            </p>
          )}
        </div>

        <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center overflow-hidden relative">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={`Map showing ${location.location_name}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={75}
              className="object-cover opacity-70"
              onError={() => setImgSrc(null)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm">Map unavailable</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
