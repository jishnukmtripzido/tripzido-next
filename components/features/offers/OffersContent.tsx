"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";

const offers = [
  {
    id: 1,
    code: "TRIP10",
    title: "First Ride Discount",
    subtitle: "10% off your first booking",
    desc: "Brand new to tripzido? Welcome! Use this code at checkout and enjoy 10% off your very first bike rental.",
    discount: "10% OFF",
    color: "from-amber-400 to-yellow-500",
    textColor: "text-yellow-900",
    badgeBg: "bg-yellow-100",
    badgeText: "text-yellow-800",
    tag: "New Users",
    validUntil: "31 Dec 2025",
    minBooking: "No minimum",
    maxDiscount: "₹200",
  },
  {
    id: 2,
    code: "WEEKEND20",
    title: "Weekend Getaway Deal",
    subtitle: "20% off Fri–Sun bookings",
    desc: "Planning a weekend escape? Book any bike for a Friday–Sunday window and get 20% off the total rental cost.",
    discount: "20% OFF",
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-900",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    tag: "Weekend Special",
    validUntil: "31 Mar 2026",
    minBooking: "₹500 booking",
    maxDiscount: "₹500",
  },
  {
    id: 3,
    code: "EV15",
    title: "Go Green, Ride Electric",
    subtitle: "15% off all electric bikes",
    desc: "Choose an electric bike and save 15%. Better for the planet, lighter on your wallet. Available across all EV models.",
    discount: "15% OFF",
    color: "from-green-500 to-emerald-600",
    textColor: "text-green-900",
    badgeBg: "bg-green-100",
    badgeText: "text-green-800",
    tag: "⚡ Electric",
    validUntil: "30 Jun 2026",
    minBooking: "No minimum",
    maxDiscount: "₹300",
  },
  {
    id: 4,
    code: "LONGRIDE",
    title: "Long Ride Saver",
    subtitle: "Flat ₹300 off on 5+ day rentals",
    desc: "Going on a longer adventure? Rent any bike for 5 or more days and get a flat ₹300 discount on your booking.",
    discount: "₹300 OFF",
    color: "from-purple-500 to-violet-600",
    textColor: "text-purple-900",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    tag: "Long Trips",
    validUntil: "31 Dec 2025",
    minBooking: "5+ day rental",
    maxDiscount: "₹300 flat",
  },
  {
    id: 5,
    code: "REFER50",
    title: "Refer a Friend",
    subtitle: "Both of you get ₹50 credit",
    desc: "Invite a friend to tripzido. When they complete their first booking, both of you get ₹50 wallet credit instantly.",
    discount: "₹50 CREDIT",
    color: "from-rose-400 to-pink-500",
    textColor: "text-rose-900",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-800",
    tag: "Referral",
    validUntil: "Ongoing",
    minBooking: "Friend's first booking",
    maxDiscount: "₹50 per referral",
  },
  {
    id: 6,
    code: "MONSOON25",
    title: "Monsoon Madness",
    subtitle: "25% off hill station bookings",
    desc: "Love the rains? Book a bike at any hill station during monsoon season and enjoy a juicy 25% discount.",
    discount: "25% OFF",
    color: "from-teal-500 to-cyan-600",
    textColor: "text-teal-900",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-800",
    tag: "Seasonal",
    validUntil: "30 Sep 2025",
    minBooking: "₹800 booking",
    maxDiscount: "₹750",
  },
];

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 bg-white/90 hover:bg-white border border-dashed border-gray-400 rounded-lg px-3 py-2 transition-colors group"
    >
      <span className="font-mono font-bold text-sm text-gray-800 tracking-widest">
        {code}
      </span>
      <span className="text-xs font-semibold text-gray-500 group-hover:text-black transition-colors">
        {copied ? "✅ Copied!" : "Copy"}
      </span>
    </button>
  );
}

export default function OffersContent() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header headerValues="w-full px-0 py-2 border-b border-gray-100 relative z-30 shadow-header" />
      {/* Hero */}
      <section className="bg-black text-white py-16 px-4 text-center">
        <span className="inline-block bg-brand-yellow text-black text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Offers & Deals
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Save more, ride more
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Exclusive discounts and promo codes for every kind of rider. Copy a
          code and apply it at checkout.
        </p>
      </section>

      {/* Announcement banner */}
      <div className="bg-brand-yellow py-3 text-center px-4">
        <p className="text-sm font-semibold text-black">
          🎉 Limited time — Use{" "}
          <span className="font-mono font-black">TRIP10</span> for 10% off your
          first ride. No expiry conditions!
        </p>
      </div>

      {/* Offer Cards */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Coloured top band */}
              <div
                className={`bg-gradient-to-r ${offer.color} px-6 py-5 flex items-center justify-between`}
              >
                <div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${offer.badgeBg} ${offer.badgeText}`}
                  >
                    {offer.tag}
                  </span>
                  <h3
                    className={`font-extrabold text-lg mt-1 ${offer.textColor}`}
                  >
                    {offer.title}
                  </h3>
                  <p
                    className={`text-sm font-medium ${offer.textColor} opacity-80`}
                  >
                    {offer.subtitle}
                  </p>
                </div>
                <div className="text-3xl font-black text-white/30 select-none">
                  {offer.discount}
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {offer.desc}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 uppercase tracking-wide font-semibold text-[10px]">
                      Min. Booking
                    </p>
                    <p className="font-bold text-gray-700 mt-0.5">
                      {offer.minBooking}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 uppercase tracking-wide font-semibold text-[10px]">
                      Max Discount
                    </p>
                    <p className="font-bold text-gray-700 mt-0.5">
                      {offer.maxDiscount}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <CopyButton code={offer.code} />
                  <p className="text-[10px] text-gray-400">
                    Valid till {offer.validUntil}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Terms */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-white border border-gray-100 rounded-2xl px-6 py-5 text-xs text-gray-400 space-y-1">
          <p className="font-bold text-gray-600 mb-2">Terms & Conditions</p>
          <p>• Only one promo code can be applied per booking.</p>
          <p>• Offers are non-transferable and cannot be exchanged for cash.</p>
          <p>
            • tripzido reserves the right to modify or withdraw offers at any
            time.
          </p>
          <p>
            • Discounts apply to base rental price only, not to add-ons or
            deposits.
          </p>
          <p>
            • Some offers may be limited to specific cities or bike categories.
          </p>
        </div>
      </section>
    </main>
  );
}
