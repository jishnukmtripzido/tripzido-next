interface Props {
  value: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const SIZE_MAP = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-7 h-7" };
const STAR_PATH =
  "M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z";

export default function StarRating({
  value,
  size = "md",
  showValue = false,
}: Props) {
  const clamped = Math.max(0, Math.min(5, value));
  const sizeClass = SIZE_MAP[size];

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = Math.max(0, Math.min(1, clamped - (star - 1)));
          return (
            <span key={star} className={`relative inline-block ${sizeClass}`}>
              <svg
                className={`absolute inset-0 ${sizeClass} text-gray-200`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d={STAR_PATH} />
              </svg>
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <svg
                  className={`${sizeClass} text-yellow-400`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d={STAR_PATH} />
                </svg>
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-font-main-sub ml-1">
          {clamped.toFixed(1)}
        </span>
      )}
    </div>
  );
}
