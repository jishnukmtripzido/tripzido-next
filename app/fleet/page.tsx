import Link from "next/link";
import Header from "@/components/layout/Header";

const bikes = [
  // Scooters
  {
    id: 1,
    category: "Scooter",
    name: "Honda Activa 6G",
    price: 299,
    cc: "110cc",
    fuel: "Petrol",
    mileage: "60 km/l",
    seats: 2,
    tag: "Best Seller",
    tagColor: "bg-green-100 text-green-700",
    emoji: "🛵",
    desc: "The most popular scooter in India. Smooth, reliable, and perfect for city rides.",
  },
  {
    id: 2,
    category: "Scooter",
    name: "TVS Jupiter",
    price: 279,
    cc: "110cc",
    fuel: "Petrol",
    mileage: "62 km/l",
    seats: 2,
    tag: "Great Value",
    tagColor: "bg-blue-100 text-blue-700",
    emoji: "🛵",
    desc: "Wide footboard and extra storage. Ideal for comfortable everyday commutes.",
  },
  {
    id: 3,
    category: "Scooter",
    name: "Suzuki Access 125",
    price: 319,
    cc: "125cc",
    fuel: "Petrol",
    mileage: "55 km/l",
    seats: 2,
    tag: null,
    tagColor: "",
    emoji: "🛵",
    desc: "Premium feel with a punchy 125cc engine. Great for hilly terrain.",
  },
  // Motorcycles
  {
    id: 4,
    category: "Motorcycle",
    name: "Royal Enfield Classic 350",
    price: 799,
    cc: "350cc",
    fuel: "Petrol",
    mileage: "35 km/l",
    seats: 2,
    tag: "Top Pick",
    tagColor: "bg-amber-100 text-amber-700",
    emoji: "🏍️",
    desc: "The quintessential touring bike. Built for long rides through mountains and valleys.",
  },
  {
    id: 5,
    category: "Motorcycle",
    name: "Bajaj Pulsar 150",
    price: 449,
    cc: "150cc",
    fuel: "Petrol",
    mileage: "45 km/l",
    seats: 2,
    tag: null,
    tagColor: "",
    emoji: "🏍️",
    desc: "Sporty and agile. A go-to choice for riders who love a spirited ride.",
  },
  {
    id: 6,
    category: "Motorcycle",
    name: "KTM Duke 200",
    price: 699,
    cc: "200cc",
    fuel: "Petrol",
    mileage: "35 km/l",
    seats: 2,
    tag: "Performance",
    tagColor: "bg-orange-100 text-orange-700",
    emoji: "🏍️",
    desc: "Naked aggressor built for thrill-seekers. Lightweight frame, powerful engine.",
  },
  // Electric
  {
    id: 7,
    category: "Electric",
    name: "Ola S1 Pro",
    price: 399,
    cc: "Electric",
    fuel: "Electric",
    mileage: "181 km/charge",
    seats: 2,
    tag: "⚡ Eco Pick",
    tagColor: "bg-teal-100 text-teal-700",
    emoji: "⚡",
    desc: "India's best-selling electric scooter. Fast charging, futuristic features.",
  },
  {
    id: 8,
    category: "Electric",
    name: "TVS iQube Electric",
    price: 369,
    cc: "Electric",
    fuel: "Electric",
    mileage: "145 km/charge",
    seats: 2,
    tag: "⚡ Eco Pick",
    tagColor: "bg-teal-100 text-teal-700",
    emoji: "⚡",
    desc: "Smooth, silent, and smart. Built for eco-conscious urban riders.",
  },
];

const categories = ["All", "Scooter", "Motorcycle", "Electric"];

export default function FleetPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header headerValues="w-full px-0 py-2 border-b border-gray-100 relative z-30 shadow-header" />
      {/* Hero */}
      {/* Hero */}
      <section className="bg-black text-white py-16 px-4 text-center">
        <span className="inline-block bg-brand-yellow text-black text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Our Fleet
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Ride the bike you love
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          From zippy scooters to touring motorcycles and silent electrics — pick
          your perfect ride for any adventure.
        </p>
      </section>

      {/* Category tabs */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors ${
                cat === "All"
                  ? "bg-brand-yellow border-brand-yellow text-black"
                  : "border-gray-200 text-gray-600 hover:border-brand-yellow hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {["Scooter", "Motorcycle", "Electric"].map((cat) => (
          <div key={cat} className="mb-12">
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
              {cat === "Electric" ? "⚡" : cat === "Motorcycle" ? "🏍️" : "🛵"}{" "}
              {cat === "Electric" ? "Electric Bikes" : `${cat}s`}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bikes
                .filter((b) => b.category === cat)
                .map((bike) => (
                  <div
                    key={bike.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                  >
                    {/* Image placeholder */}
                    <div className="h-44 bg-gradient-to-br from-amber-50 to-yellow-100 flex items-center justify-center text-7xl">
                      {bike.emoji}
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900">{bike.name}</h3>
                        {bike.tag && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bike.tagColor}`}
                          >
                            {bike.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{bike.desc}</p>

                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center bg-gray-50 rounded-lg py-1.5">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                            Engine
                          </p>
                          <p className="text-xs font-bold text-gray-700">
                            {bike.cc}
                          </p>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg py-1.5">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                            Fuel
                          </p>
                          <p className="text-xs font-bold text-gray-700">
                            {bike.fuel}
                          </p>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg py-1.5">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                            Range
                          </p>
                          <p className="text-xs font-bold text-gray-700">
                            {bike.mileage}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-extrabold text-gray-900">
                            ₹{bike.price}
                          </span>
                          <span className="text-xs text-gray-400"> /day</span>
                        </div>
                        <Link href="/">
                          <button className="px-4 py-2 bg-brand-yellow rounded-lg text-sm font-bold hover:bg-[#e6ac00] transition-colors">
                            Book Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-brand-yellow py-12 text-center px-4">
        <h2 className="text-2xl font-extrabold text-black mb-2">
          Can&apos;t find what you&apos;re looking for?
        </h2>
        <p className="text-sm text-black/70 mb-5">
          Search availability by city and date to see all bikes near you.
        </p>
        <Link href="/">
          <button className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors">
            Search Bikes
          </button>
        </Link>
      </section>
    </main>
  );
}
