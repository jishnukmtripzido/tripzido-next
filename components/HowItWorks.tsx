import { ReactElement } from "react";

interface Step {
  step: number;
  title: string;
  description: string;
  icon: ReactElement;
  active?: boolean;
}

const STEPS: Step[] = [
  {
    step: 1,
    title: "Find your Ride",
    description:
      "Enter your city, pick-up and drop date & time to choose from available two-wheelers at your desired go-hub.",
    active: true,
    icon: (
      <>
        <path
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </>
    ),
  },
  {
    step: 2,
    title: "Book your Ride",
    description:
      "Select your package and choose from the available payment options. Instant confirmation, no waiting.",
    icon: (
      <path
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    ),
  },
  {
    step: 3,
    title: "Get Ready to Ride",
    description:
      "Receive ride details via SMS & email. Reach the pick-up point on time, pay the security deposit (if applicable), and enjoy every moment.",
    icon: (
      <>
        <path
          d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </>
    ),
  },
  {
    step: 4,
    title: "End your Ride",
    description:
      "Drop the vehicle at the pick-up point. Security deposit is refunded after checking for damages and challans, if any.",
    icon: (
      <path
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="pt-12 px-4 lg:px-8 mx-auto xl:mx-[121.5px] xl:px-0">
      <div className="mb-10">
        <h2 className="text-[1.37rem] md:text-2xl font-extrabold text-gray-900">
          How it works
        </h2>
        <p className="text-sm text-gray-700 mt-1">
          Rent a bike in 4 simple steps — no hassle, no hidden surprises
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 relative">
        {/* Connector line (desktop only) */}
        <div className="hidden lg:block absolute top-[28px] left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-px bg-gray-200 z-0" />

        {STEPS.map((s, i) => (
          <div
            key={s.step}
            className={`relative flex flex-col items-start px-6 pb-8 lg:pb-0 group ${
              i > 0
                ? "border-t border-gray-100 lg:border-t-0 lg:border-l lg:border-gray-100"
                : ""
            }`}
          >
            {/* Icon circle */}
            <div
              className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-full shadow-md mb-5 shrink-0 transition-colors duration-200 ${
                s.active
                  ? "bg-[#ffc107]"
                  : "bg-white border-2 border-gray-200 group-hover:border-[#ffc107] group-hover:bg-amber-50"
              }`}
            >
              <svg
                className={`w-6 h-6 transition-colors duration-200 ${
                  s.active
                    ? "text-white"
                    : "text-gray-500 group-hover:text-[#ffc107]"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {s.icon}
              </svg>
              {/* Step badge */}
              <span
                className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 text-[10px] font-extrabold flex items-center justify-center leading-none transition-colors duration-200 ${
                  s.active
                    ? "bg-white border-[#ffc107] text-gray-800"
                    : "bg-gray-100 border-gray-300 text-gray-600 group-hover:bg-[#ffc107] group-hover:border-[#ffc107] group-hover:text-white"
                }`}
              >
                {s.step}
              </span>
            </div>

            <h3 className="font-extrabold text-gray-900 text-[15px] mb-2">
              {s.title}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
