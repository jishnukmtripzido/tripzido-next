import { FAQItem } from "@/types";

const FAQ_LEFT: FAQItem[] = [
  {
    question: "Why should I rent a bike with Tripzido?",
    answer:
      "Tripzido partners with verified local rental vendors across popular destinations in India. You get transparent pricing, no hidden fees, and the freedom to explore at your own pace on a well-maintained bike.",
  },
  {
    question: "What documents do I need to rent a bike?",
    answer:
      "You'll need a valid driving licence (with two-wheeler endorsement), a government-issued photo ID (Aadhaar, Passport, or Voter ID), and a security deposit. International riders may need an IDP along with their home licence.",
  },
  {
    question: "Am I old enough to rent a bike?",
    answer:
      "The minimum age to rent a bike through Tripzido is 18 years. For larger engine capacity bikes (above 250cc), some vendors may require you to be at least 21 years old. Age requirements vary by vendor.",
  },
];

const FAQ_RIGHT: FAQItem[] = [
  {
    question: "Can I book a bike for someone else?",
    answer:
      "Yes, you can book on behalf of someone else. However, the person picking up the bike must carry their own valid driving licence and ID proof. The booking name and rider name can differ.",
  },
  {
    question: "Any tips for picking the right bike?",
    answer:
      "For hilly or off-road terrain like Wayanad or Coorg, go for a 200–250cc bike. For city or coastal rides, a 100–150cc scooter or commuter works great. Always check luggage capacity if you're carrying bags.",
  },
  {
    question: "Are all fees included in the rental price?",
    answer:
      "The price shown includes the base rental and applicable taxes. Fuel, helmet (in some cases), and any extra-distance charges may be billed separately by the vendor at pick-up. Always review the vendor's policy before confirming.",
  },
];

function FAQColumn({ items }: { items: FAQItem[] }) {
  return (
    <div className="flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
            <span className="text-base font-semibold text-gray-900">
              {item.question}
            </span>
            <svg
              className="w-5 h-5 text-gray-500 transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </summary>
          <div className="px-5 py-4 text-sm text-gray-700 leading-relaxed border-t border-gray-200">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="pt-12 px-4 lg:px-8 mx-auto xl:mx-[121.5px] xl:px-0">
      <h2 className="text-[1.37rem] md:text-2xl font-extrabold text-gray-900 mb-6">
        Frequently asked questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <FAQColumn items={FAQ_LEFT} />
        <FAQColumn items={FAQ_RIGHT} />
      </div>
    </section>
  );
}
