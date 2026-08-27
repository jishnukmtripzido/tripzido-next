import StarRating from "./StarRating";
import type { ReviewItem } from "@/services/vehicleDetails.service";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="py-5 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-yellow-100 text-font-main-sub flex items-center justify-center text-xs font-bold shrink-0">
          {initials(review.author_name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <span className="text-sm font-semibold text-font-main-sub truncate">
              {review.author_name}
            </span>
            <span className="text-xs text-font-dim shrink-0">
              {formatDate(review.created_at)}
            </span>
          </div>

          {review.rating !== null && (
            <div className="mt-1">
              <StarRating value={review.rating} size="sm" showValue />
            </div>
          )}

          {review.comment && (
            <p className="text-sm text-font-main-sub mt-2 leading-relaxed break-words">
              {review.comment}
            </p>
          )}

          {review.ratings.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {review.ratings.map((r) => (
                <span
                  key={r.criterion}
                  className="text-[11px] bg-gray-50 border border-gray-200 text-font-dim rounded-full px-2.5 py-1"
                >
                  {r.criterion_label}: {r.score}/5
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
