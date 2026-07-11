import type { BookingTabFilter } from "@/types/booking.types";

const STATUS_STYLES: Record<BookingTabFilter, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  confirmed: "bg-blue-50 text-blue-700 border-blue-100",
  ongoing: "bg-emerald-50 text-emerald-700 border-emerald-100",
  completed: "bg-gray-100 text-gray-600 border-gray-200",
  cancelled: "bg-red-50 text-red-600 border-red-100",
};

const STATUS_LABELS: Record<BookingTabFilter, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  ongoing: "Ongoing",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function BookingStatusBadge({
  status,
}: {
  status: BookingTabFilter;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
