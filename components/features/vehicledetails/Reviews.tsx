// components/features/vehicledetails/Reviews.tsx
import { getVehicleReviewsApi } from "@/services/vehicleDetails.service";
import type { ReviewsResponse } from "@/services/vehicleDetails.service";

const MOCK_REVIEWS: ReviewsResponse = {
  average_rating: 4.5,
  total_count: 3,
  reviews: [
    {
      id: 1,
      author_name: "Rahul Menon",
      rating: 5,
      comment:
        "Excellent bike, very smooth ride through the hills. Pickup was hassle-free and the staff were helpful. Would definitely rent again!",
      created_at: "2026-05-10T09:00:00Z",
      vehicle_name: "Yamaha Fascino",
    },
    {
      id: 2,
      author_name: "Priya Nair",
      rating: 4,
      comment:
        "Good condition scooter. The fuel economy was great for our day trip. Minor scratch on the body but nothing that affected the ride.",
      created_at: "2026-04-22T14:30:00Z",
      vehicle_name: "Yamaha Fascino",
    },
    {
      id: 3,
      author_name: "Aditya Sharma",
      rating: 4,
      comment:
        "Comfortable ride for two. Documents process was straightforward. Pickup location was easy to find once we got the confirmed address.",
      created_at: "2026-03-15T11:15:00Z",
      vehicle_name: "Yamaha Fascino",
    },
  ],
};

interface Props {
  vehicleId: number;
}

export default async function Reviews({ vehicleId }: Props) {
  let data: ReviewsResponse;

  try {
    data = await getVehicleReviewsApi(vehicleId);
  } catch {
    data = MOCK_REVIEWS;
  }

  const { average_rating, total_count, reviews } = data;

  if (total_count === 0) return null;

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-lg font-bold text-gray-900">Reviews</h2>
        <div className="flex items-center gap-1.5">
          <StarIcon filled />
          <span className="text-sm font-semibold text-gray-900">
            {average_rating.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500">({total_count})</span>
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-4 border border-gray-200 lg:border-none rounded-md p-6 lg:p-0">
        {reviews.map((review, idx) => (
          <div
            key={review.id}
            className={`pb-4 ${idx < reviews.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
                  {review.author_name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {review.author_name}
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < review.rating} />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed ml-10">
              {review.comment}
            </p>
            <p className="text-xs text-gray-400 mt-1.5 ml-10">
              {new Date(review.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-200"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
