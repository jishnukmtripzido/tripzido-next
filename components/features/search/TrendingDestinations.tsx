import Image from "next/image";
import { TOP_DESTINATIONS, BOTTOM_DESTINATIONS } from "@/lib/constants";
import type { Destination } from "@/types/home.types";

function DestinationCard({
  destination,
  priority = false,
  className = "",
}: {
  destination: Destination;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden cursor-pointer group ${className}`}
    >
      <Image
        src={destination.imageUrl}
        alt={destination.name}
        fill
        placeholder="blur"
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px"
        quality={75}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <span className="text-white font-extrabold text-xl drop-shadow">
          {destination.name} <span className="text-xs">{destination.flag}</span>
        </span>
      </div>
    </div>
  );
}

export default function TrendingDestinations() {
  return (
    <section className="py-12 px-4 lg:px-8 mx-auto xl:mx-[121.5px] xl:px-0">
      <div className="mb-6">
        <h2 className="text-[1.37rem] md:text-2xl font-bold text-gray-900">
          Trending destinations
        </h2>
        <p className="text-sm text-gray-700 mt-1">
          Most popular choices for travelers from India
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {TOP_DESTINATIONS.map((dest, i) => (
          <DestinationCard
            key={dest.name}
            destination={dest}
            priority={i < 2}
            className="h-64"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {BOTTOM_DESTINATIONS.map((dest) => (
          <DestinationCard
            key={dest.name}
            destination={dest}
            className="h-52"
          />
        ))}
      </div>
    </section>
  );
}
