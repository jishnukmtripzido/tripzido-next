import Link from "next/link";
import Header from "@/components/layout/Header";

const steps = [
  {
    step: "01",
    emoji: "📍",
    title: "Choose your city & dates",
    desc: "Enter your pickup city, pick-up date & time, and drop-off date. We'll show you all available bikes in real time.",
    color: "bg-amber-50 border-amber-200",
    accent: "text-amber-600",
  },
  {
    step: "02",
    emoji: "🛵",
    title: "Pick your perfect ride",
    desc: "Filter by price, model type, or fuel. Compare specs, read reviews, and choose the bike that fits your journey.",
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-600",
  },
  {
    step: "03",
    emoji: "📋",
    title: "Book & pay securely",
    desc: "Complete your booking in under 2 minutes. Pay online via UPI, card, or wallet. Get instant confirmation on WhatsApp & email.",
    color: "bg-green-50 border-green-200",
    accent: "text-green-600",
  },
  {
    step: "04",
    emoji: "🏍️",
    title: "Pick up & ride free",
    desc: "Head to the pickup point with your ID & license. Quick inspection, sign-off, and you're on the road — no hassle.",
    color: "bg-purple-50 border-purple-200",
    accent: "text-purple-600",
  },
];

const faqs = [
  {
    q: "What documents do I need to rent a bike?",
    a: "A valid driving licence (2-wheeler), a government-issued ID (Aadhaar, Passport or Voter ID), and a security deposit are required. International travellers may use a valid international driving permit.",
  },
  {
    q: "Is fuel included in the rental price?",
    a: "No, fuel is not included. You'll receive the bike with a standard fuel level and are expected to return it at the same level. Electric bikes are returned with a full charge.",
  },
  {
    q: "Can I extend my rental period?",
    a: "Yes! You can extend via the app or by calling our support team, subject to availability. Extensions are charged on a pro-rata basis.",
  },
  {
    q: "Is there a security deposit?",
    a: "Yes, a refundable security deposit of ₹1,000–₹3,000 is collected at pickup, depending on the bike model. It's fully refunded after inspection on return.",
  },
  {
    q: "What if the bike breaks down?",
    a: "We provide 24/7 roadside assistance. In case of a breakdown not caused by you, we'll replace the bike or arrange a pickup at no extra cost.",
  },
  {
    q: "Is insurance included?",
    a: "All bikes come with basic third-party insurance as required by law. You can opt for our premium damage waiver at checkout for additional peace of mind.",
  },
];

const perks = [
  {
    emoji: "✅",
    title: "No hidden charges",
    desc: "Price shown is price paid. Taxes included.",
  },
  {
    emoji: "🔒",
    title: "Secure payments",
    desc: "UPI, cards & wallets accepted. 100% safe checkout.",
  },
  {
    emoji: "📞",
    title: "24/7 support",
    desc: "Our team is always a call or chat away.",
  },
  // {
  //   emoji: "🛡️",
  //   title: "Insured rides",
  //   desc: "All bikes carry valid third-party insurance.",
  // },
  {
    emoji: "🔄",
    title: "Flexible returns",
    desc: "Drop off at the same location with ease.",
  },
  {
    emoji: "⭐",
    title: "Verified bikes",
    desc: "Every bike is inspected before your ride.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header headerValues="w-full px-0 py-2 border-b border-gray-100 relative z-30 shadow-header" />
      {/* Hero */}
      <section className="bg-black text-white py-16 px-4 text-center">
        <span className="inline-block bg-brand-yellow text-black text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          How It Works
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Rent a bike in 4 easy steps
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          From browsing to riding — the whole process takes less than 5 minutes.
        </p>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute left-[28px] top-10 bottom-10 w-0.5 bg-gray-200 z-0" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex gap-6 rounded-2xl border p-6 ${step.color} z-10`}
              >
                <div
                  className={`w-14 h-14 shrink-0 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm border border-gray-100`}
                >
                  {step.emoji}
                </div>
                <div>
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${step.accent}`}
                  >
                    Step {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-0.5 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/">
            <button className="bg-brand-yellow px-8 py-3.5 rounded-xl font-bold text-black hover:bg-[#e6ac00] transition-colors text-sm">
              Start your booking →
            </button>
          </Link>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-8">
            Why ride with tripzido?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="p-5 rounded-2xl bg-gray-50 border border-gray-100 text-center"
              >
                <div className="text-3xl mb-2">{perk.emoji}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  {perk.title}
                </h3>
                <p className="text-xs text-gray-500">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-14">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-8">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm"
            >
              <h3 className="font-bold text-gray-900 text-sm mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-yellow py-12 text-center px-4">
        <h2 className="text-2xl font-extrabold text-black mb-2">
          Ready to hit the road?
        </h2>
        <p className="text-sm text-black/70 mb-5">
          Hundreds of bikes available across 5+ cities in India.
        </p>
        <Link href="/">
          <button className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors">
            Book a bike now
          </button>
        </Link>
      </section>
    </main>
  );
}
