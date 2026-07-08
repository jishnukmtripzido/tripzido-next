import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import { destinations, getDestinationBySlug } from "../data";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-renders one static page per destination at build time.
export function generateStaticParams() {
  return destinations.map((dest) => ({ slug: dest.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return {};

  return {
    title: `${dest.name} Bike Rentals & Ride Guide | Tripzido`,
    description: dest.desc,
  };
}

export default async function DestinationBlogPage({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);

  if (!dest) {
    notFound();
  }

  // "Book Now" hands off to the home page search widget via query params.
  // The home page's search widget needs to read `destination` (and
  // optionally `city`) from the URL on mount and prefill the pickup
  // location field with it — see note below the component.
  const bookNowHref = `/?destination=${encodeURIComponent(dest.name)}`;

  return (
    <main className="min-h-screen bg-white">
      <Header headerValues="w-full px-0 py-2 border-b border-gray-100 relative z-30 shadow-header" />

      {/* Hero */}
      <section
        className={`relative h-[320px] md:h-[420px] bg-gradient-to-br ${dest.gradient} overflow-hidden`}
      >
        {dest.image && (
          <>
            <Image
              src={dest.image}
              alt={`${dest.name}, ${dest.state}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          </>
        )}

        <div className="relative max-w-4xl mx-auto h-full flex flex-col justify-end px-4 pb-8">
          <Link
            href="/destinations"
            className="text-white/80 text-sm mb-3 hover:text-white transition-colors w-fit"
          >
            ← All destinations
          </Link>
          {dest.tag && (
            <span
              className={`w-fit text-[11px] font-bold px-2.5 py-1 rounded-full mb-3 ${dest.tagColor}`}
            >
              {dest.tag}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm">
            {dest.name}
          </h1>
          <p className="text-white/80 text-sm md:text-base mt-1">
            {dest.state} · {dest.distance}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        {/* Highlights strip */}
        <div className="flex flex-wrap gap-2 mb-8">
          {dest.highlights.map((h) => (
            <span
              key={h}
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Intro */}
        <p className="text-lg text-font-main-sub leading-relaxed mb-10">
          {dest.blog.intro}
        </p>

        {/* Sections */}
        <div className="space-y-8 mb-10">
          {dest.blog.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {section.heading}
              </h2>
              <p className="text-font-main-sub leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Best time to visit */}
        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-2">
            Best time to visit
          </h3>
          <p className="text-sm text-font-main-sub leading-relaxed">
            {dest.blog.bestTimeToVisit}
          </p>
        </div>

        {/* Riding tips */}
        <div className="bg-gray-50 rounded-xl p-5 mb-10">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Riding tips</h3>
          <ul className="space-y-2">
            {dest.blog.ridingTips.map((tip, idx) => (
              <li
                key={idx}
                className="text-sm text-font-main-sub leading-relaxed flex gap-2"
              >
                <span className="text-yellow-600 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Book Now CTA */}
        <div className="rounded-2xl bg-black text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow mb-1">
              Ready to ride?
            </p>
            <h3 className="text-xl font-extrabold">
              Book a bike in {dest.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Best for {dest.bestFor.toLowerCase()}
            </p>
          </div>
          <Link
            href={bookNowHref}
            className="shrink-0 bg-brand-yellow text-black font-bold text-sm px-6 py-3 rounded-full hover:brightness-95 transition-all"
          >
            Book Now →
          </Link>
        </div>
      </section>
    </main>
  );
}
