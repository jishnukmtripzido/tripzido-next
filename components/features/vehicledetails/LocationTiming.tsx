import { getLocationTimingCached } from "@/lib/cache";

interface Props {
  listingId: number;
}

export default async function LocationTiming({ listingId }: Props) {
  const timing = await getLocationTimingCached(listingId).catch(() => null);

  // No schedule_template assigned on the listing — nothing meaningful
  // to show, so the whole section is omitted rather than showing a
  // misleading "closed every day" table.
  if (!timing || !timing.has_schedule) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Location Timing</h2>
      <div className="bg-white border-none rounded-md p-0">
        <div className="space-y-2">
          {timing.days.map((day) => (
            <div
              key={day.day_of_week}
              className="flex items-center justify-between md:justify-start text-sm py-1"
            >
              <span className="flex items-center gap-2 text-font-main-sub font-medium md:w-40 shrink-0">
                <ClockIcon
                  className={day.is_closed ? "text-red-400" : "text-gray-700"}
                />
                {day.day_name}
              </span>
              <span
                className={
                  day.is_closed
                    ? "text-red-500 font-medium"
                    : "text-font-main-sub"
                }
              >
                {day.timing}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
