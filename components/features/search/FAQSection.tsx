import { FAQ_LEFT, FAQ_RIGHT } from "@/lib/constants";
import type { FAQItem } from "@/types/home.types";

function FAQColumn({ items }: { items: FAQItem[] }) {
  return (
    <div className="flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
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
      <h2 className="text-[1.37rem] md:text-2xl font-bold text-gray-900 mb-6">
        Frequently asked questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <FAQColumn items={FAQ_LEFT} />
        <FAQColumn items={FAQ_RIGHT} />
      </div>
    </section>
  );
}
