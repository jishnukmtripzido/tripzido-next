import Link from "next/link";
import Image from "next/image";
import type { BookingConfirmationData } from "@/types/booking.types";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function BookingConfirmationSummary({
  data,
}: {
  data: BookingConfirmationData;
}) {
  const isMultiVehicle = data.vehicle_count > 1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* Success header */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-9 h-9 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h1>
        <p className="text-sm text-gray-500 mt-1">
          {isMultiVehicle
            ? `${data.vehicle_count} vehicles booked together. Details for each are below.`
            : "Your ride is booked. Details are below."}
        </p>
      </div>

      {/* Payment summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <SummaryStat label="Vehicles" value={String(data.vehicle_count)} />
        <SummaryStat label="Payment Mode" value={data.payment_mode} />
        <SummaryStat label="Paid" value={`₹ ${data.total_paid.toFixed(2)}`} />
        <SummaryStat
          label="Deposit"
          value={`₹ ${data.total_deposit.toFixed(2)}`}
        />
      </div>

      {/* One card per vehicle */}
      <div className="space-y-4">
        {data.bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row gap-5"
          >
            <div className="relative w-full sm:w-40 h-28 bg-gray-50 rounded-lg shrink-0 overflow-hidden border border-gray-100">
              {booking.vehicle_image ? (
                <Image
                  src={booking.vehicle_image}
                  alt={booking.vehicle_name}
                  fill
                  sizes="160px"
                  quality={75}
                  className="object-contain p-2 mix-blend-multiply"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                  No image
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-3 flex-wrap">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {booking.vehicle_name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Booking ID: {booking.booking_reference}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {booking.pickup_location_name}
                  </p>
                </div>
                <Link
                  href={`/profile/bookings/detail/${booking.id}`}
                  className="text-xs font-bold text-brand-yellow hover:text-[#e6ac00] uppercase tracking-wider shrink-0"
                >
                  View Details
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 border-t border-gray-50 pt-4">
                <span>{formatDateTime(booking.start_date)}</span>
                <span className="text-gray-300">→</span>
                <span>{formatDateTime(booking.end_date)}</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                  {booking.duration}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-2">
        <Link
          href="/profile/bookings"
          className="inline-block px-6 py-3 text-sm font-semibold rounded-md bg-brand-yellow text-black hover:bg-[#e6ac00] transition-colors"
        >
          Go to my bookings
        </Link>
      </div>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  );
}
