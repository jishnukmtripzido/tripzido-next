import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { destinations, stats } from "./data";

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
            <Link href={`/destinations/${dest.slug}`} key={dest.id}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group cursor-pointer">
                {/* Visual banner */}
                <div
                  className={`relative h-40 bg-gradient-to-br ${dest.gradient} flex flex-col items-center justify-center overflow-hidden`}
                >
                  {dest.image ? (
                    <>
                      <Image
                        src={dest.image}
                        alt={`${dest.name}, ${dest.state}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Dark gradient overlay so the name/tag stay readable over any photo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    </>
                  ) : (
                    <span className="text-6xl mb-1">{dest.emoji}</span>
                  )}

                  <div className="relative flex flex-col items-center">
                    <span className="text-white font-bold text-lg drop-shadow-sm">
                      {dest.name}
                    </span>
                    <span className="text-white/80 text-xs drop-shadow-sm">
                      {dest.state}
                    </span>
                  </div>

                  {dest.tag && (
                    <span
                      className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${dest.tagColor}`}
                    >
                      {dest.tag}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-sm text-font-main-sub mb-3 leading-relaxed">
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
                      <p className="text-xs font-semibold text-font-main-sub mb-1">
                        {dest.distance}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-yellow-600 group-hover:underline">
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
          <h3 className="text-xl font-extrabold mb-2">Bangaluru · Ooty</h3>
          <p className="text-gray-400 text-sm">
            We&apos;re bringing tripzido to more destinations every month.
          </p>
        </div>
      </section>
    </main>
  );
}
