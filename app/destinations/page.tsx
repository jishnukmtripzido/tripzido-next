import Link from "next/link";
import Header from "@/components/layout/Header";

const destinations = [
  {
    id: 1,
    name: "Wayanad",
    state: "Kerala",
    emoji: "🌿",
    gradient: "from-green-400 to-emerald-600",
    tag: "Trending",
    tagColor: "bg-green-100 text-green-700",
    bikes: 18,
    desc: "Misty hills, coffee estates, and wildlife sanctuaries. Perfect for a scenic two-wheel escape.",
    highlights: ["Chembra Peak", "Edakkal Caves", "Pookode Lake"],
    bestFor: "Nature lovers",
    distance: "270 km from Bangalore",
  },
  {
    id: 2,
    name: "Coorg",
    state: "Karnataka",
    emoji: "☕",
    gradient: "from-amber-500 to-orange-600",
    tag: "Popular",
    tagColor: "bg-amber-100 text-amber-700",
    bikes: 22,
    desc: "Scotland of India — lush coffee plantations, cascading waterfalls and cool mountain air.",
    highlights: ["Abbey Falls", "Raja's Seat", "Dubare Forest"],
    bestFor: "Weekend riders",
    distance: "250 km from Bangalore",
  },
  {
    id: 3,
    name: "Goa",
    state: "Goa",
    emoji: "🏖️",
    gradient: "from-cyan-400 to-blue-500",
    tag: "Beach Vibes",
    tagColor: "bg-blue-100 text-blue-700",
    bikes: 35,
    desc: "Sun, sand and coastal roads. Bikes are the best way to hop between Goa's legendary beaches.",
    highlights: ["Baga Beach", "Old Goa Church", "Dudhsagar Falls"],
    bestFor: "Beach lovers",
    distance: "600 km from Bangalore",
  },
  {
    id: 4,
    name: "Manali",
    state: "Himachal Pradesh",
    emoji: "🏔️",
    gradient: "from-blue-500 to-indigo-600",
    tag: "Adventure",
    tagColor: "bg-indigo-100 text-indigo-700",
    bikes: 28,
    desc: "Snow-capped peaks and winding Himalayan roads. A bucket-list destination for every biker.",
    highlights: ["Rohtang Pass", "Solang Valley", "Old Manali"],
    bestFor: "Adventure riders",
    distance: "530 km from Delhi",
  },
  {
    id: 5,
    name: "Rishikesh",
    state: "Uttarakhand",
    emoji: "🕉️",
    gradient: "from-orange-400 to-red-500",
    tag: "Spiritual",
    tagColor: "bg-orange-100 text-orange-700",
    bikes: 14,
    desc: "Where the Ganges flows wild — ride through ashrams, suspension bridges and riverside cafes.",
    highlights: ["Laxman Jhula", "Ram Jhula", "Triveni Ghat"],
    bestFor: "Soul seekers",
    distance: "240 km from Delhi",
  },
  {
    id: 6,
    name: "Munnar",
    state: "Kerala",
    emoji: "🍃",
    gradient: "from-lime-500 to-green-600",
    tag: "Scenic",
    tagColor: "bg-lime-100 text-lime-700",
    bikes: 16,
    desc: "Rolling tea gardens and cool mountain roads through Kerala's highest ranges.",
    highlights: ["Top Station", "Eravikulam NP", "Mattupetty Dam"],
    bestFor: "Scenic riders",
    distance: "130 km from Kochi",
  },
];

const stats = [
  { value: "20+", label: "Cities" },
  { value: "500+", label: "Bikes" },
  { value: "50K+", label: "Happy Riders" },
  { value: "4.8★", label: "Avg Rating" },
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header headerValues="w-full px-0 py-2 border-b border-gray-100 relative z-30 shadow-header" />

      {/* Hero */}
      <section className="bg-black text-white py-16 px-4 text-center">
        <span className="inline-block bg-brand-yellow text-black text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Destinations
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Explore India on two wheels
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          From misty hill stations to sun-soaked beaches — we&apos;ve got bikes
          waiting for you at India&apos;s most iconic destinations.
        </p>
      </section>

      {/* Stats */}
      <div className="bg-brand-yellow">
        <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-extrabold text-black">{s.value}</p>
              <p className="text-xs font-semibold text-black/70 uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link href="/" key={dest.id}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group cursor-pointer">
                {/* Visual banner */}
                <div
                  className={`h-40 bg-gradient-to-br ${dest.gradient} flex flex-col items-center justify-center relative`}
                >
                  <span className="text-6xl mb-1">{dest.emoji}</span>
                  <span className="text-white font-bold text-lg">
                    {dest.name}
                  </span>
                  <span className="text-white/70 text-xs">{dest.state}</span>
                  {dest.tag && (
                    <span
                      className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${dest.tagColor}`}
                    >
                      {dest.tag}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                    {dest.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dest.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">{dest.distance}</p>
                      <p className="text-xs font-semibold text-gray-700">
                        {dest.bikes} bikes available
                      </p>
                    </div>
                    <span className="text-sm font-bold text-brand-yellow group-hover:underline">
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming soon banner */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-black rounded-2xl px-6 py-8 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow mb-2">
            Expanding Soon
          </p>
          <h3 className="text-xl font-extrabold mb-2">
            Leh · Spiti · Ooty · Darjeeling · Andaman
          </h3>
          <p className="text-gray-400 text-sm">
            We&apos;re bringing tripzido to more destinations every month.
          </p>
        </div>
      </section>
    </main>
  );
}
