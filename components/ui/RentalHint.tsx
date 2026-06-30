import type { RentalHint as RentalHintData } from "@/lib/rentalUtils";

interface RentalHintProps {
  message: RentalHintData | null;
  onDismiss?: () => void;
}

export default function RentalHint({ message, onDismiss }: RentalHintProps) {
  if (!message) return null;

  return (
    <div className="mt-3 flex items-start gap-2 rounded-md border border-orange-200/80 bg-orange-50 px-4 py-3 text-sm text-orange-800">
      <svg
        className="w-4 h-4 mt-0.5 shrink-0"
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
      <div className="flex-1">
        <p className="font-semibold">{message.title}</p>
        <p className="hidden md:block mt-1 text-orange-700">
          {message.subtitle}
        </p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="text-orange-400 hover:text-orange-600 shrink-0 -mr-1 -mt-0.5"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
