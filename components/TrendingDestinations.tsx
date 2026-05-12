import { Destination } from "@/types";

const TOP_DESTINATIONS: Destination[] = [
  {
    name: "New Delhi",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    flag: "🇮🇳",
  },
  {
    name: "Bangalore",
    imageUrl: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
    flag: "🇮🇳",
  },
];

const BOTTOM_DESTINATIONS: Destination[] = [
  {
    name: "Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80",
    flag: "🇮🇳",
  },
  {
    name: "Chennai",
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
    flag: "🇮🇳",
  },
  {
    name: "Varanasi",
    imageUrl: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=600&q=80",
    flag: "🇮🇳",
  },
];

function DestinationCard({
  destination,
  className,
}: {
  destination: Destination;
  className?: string;
}) {
  return (
    <div className={`relative rounded-xl overflow-hidden cursor-pointer group ${className}`}>
      <img
        src={destination.imageUrl}
        alt={destination.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <span className="text-white font-extrabold text-xl drop-shadow">
          {destination.name} {destination.flag}
        </span>
      </div>
    </div>
  );
}

export default function TrendingDestinations() {
  return (
    <section className="py-12 px-4 lg:px-8 mx-auto xl:mx-[121.5px] xl:px-0">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Trending destinations</h2>
        <p className="text-sm text-gray-700 mt-1">Most popular choices for travelers from India</p>
      </div>

      {/* Top row — 2 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {TOP_DESTINATIONS.map((dest) => (
          <DestinationCard key={dest.name} destination={dest} className="h-64" />
        ))}
      </div>

      {/* Bottom row — 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {BOTTOM_DESTINATIONS.map((dest) => (
          <DestinationCard key={dest.name} destination={dest} className="h-52" />
        ))}
      </div>
    </section>
  );
}
