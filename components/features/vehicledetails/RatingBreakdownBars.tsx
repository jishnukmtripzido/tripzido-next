import type { RatingBreakdownItem } from "@/services/vehicleDetails.service";

export default function RatingBreakdownBars({
  breakdown,
}: {
  breakdown: RatingBreakdownItem[];
}) {
  if (!breakdown.length) return null;

  return (
    <div className="space-y-2.5">
      {breakdown.map((item) => (
        <div key={item.criterion} className="flex items-center gap-3">
          <span className="text-xs text-font-main-sub w-32 sm:w-36 shrink-0 truncate">
            {item.criterion_label}
          </span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 rounded-full"
              style={{ width: `${(item.average_score / 5) * 100}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-font-main-sub w-7 text-right shrink-0">
            {item.average_score.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}
