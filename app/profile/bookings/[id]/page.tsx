import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookingDetail } from "@/actions/bookings.actions";

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

const STATUS_STYLES: Record<string, string> = {
  PENDING_PAYMENT: "bg-amber-50 text-amber-700 border-amber-100",
  CONFIRMED: "bg-blue-50 text-blue-700 border-blue-100",
  ONGOING: "bg-indigo-50 text-indigo-700 border-indigo-100",
  COMPLETED: "bg-green-50 text-green-700 border-green-100",
  CANCELLED: "bg-gray-100 text-gray-600 border-gray-200",
  PAYMENT_FAILED: "bg-red-50 text-red-700 border-red-100",
  EXPIRED: "bg-gray-100 text-gray-600 border-gray-200",
};

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bookingId = Number(id);

  if (!Number.isFinite(bookingId)) {
    notFound();
  }

  const booking = await getBookingDetail(bookingId);

  if (!booking) {
    notFound();
  }

  const statusStyle =
    STATUS_STYLES[booking.status] ??
    "bg-gray-100 text-gray-600 border-gray-200";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/profile"
            className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
          >
            &larr; Back to Bookings
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Booking {booking.booking_reference}
          </h1>
        </div>
        <span
          className={`inline-flex items-center py-1.5 px-3 rounded-full text-xs font-semibold border ${statusStyle}`}
        >
          {booking.status_label}
        </span>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Vehicle + trip info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex gap-6">
            <div className="w-40 h-28 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden border border-gray-100">
              {booking.vehicle_image ? (
                <img
                  src={booking.vehicle_image}
                  alt={booking.vehicle_name}
                  className="object-contain h-full w-full p-2 mix-blend-multiply"
                />
              ) : (
                <span className="text-xs text-gray-400">No image</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {booking.vehicle_name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {booking.transmission_type} &bull; {booking.fuel_type}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Rented from {booking.vendor_name}
              </p>
              {booking.package_name && (
                <p className="text-sm font-medium text-gray-700 mt-1">
                  Package: {booking.package_name}
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DetailItem
              label="Pickup / Start"
              value={formatDateTime(booking.start_date)}
            />
            <DetailItem
              label="Dropoff / End"
              value={formatDateTime(booking.end_date)}
            />
            <DetailItem label="Duration" value={booking.duration} />
            <DetailItem
              label="Hub"
              value={
                booking.pickup_location_address
                  ? `${booking.pickup_location_name} — ${booking.pickup_location_address}`
                  : booking.pickup_location_name
              }
            />
          </div>

          <div className="border-t border-gray-100 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <DetailItem
              label="Rent Amount"
              value={`₹ ${booking.listing_amount}`}
            />
            <DetailItem label="Paid" value={`₹ ${booking.advance_amount}`} />
            <DetailItem
              label="Remaining"
              value={`₹ ${booking.remaining_amount}`}
            />
            <DetailItem
              label="Security Deposit"
              value={`₹ ${booking.security_deposit_amount}`}
            />
            <DetailItem
              label="Payment Mode"
              value={booking.payment_mode_label}
            />
          </div>

          {(booking.handed_over_at ||
            booking.returned_at ||
            booking.cancelled_at) && (
            <div className="border-t border-gray-100 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {booking.handed_over_at && (
                <DetailItem
                  label="Handed Over"
                  value={formatDateTime(booking.handed_over_at)}
                />
              )}
              {booking.returned_at && (
                <DetailItem
                  label="Returned"
                  value={formatDateTime(booking.returned_at)}
                />
              )}
              {booking.cancelled_at && (
                <DetailItem
                  label="Cancelled"
                  value={`${formatDateTime(booking.cancelled_at)} by ${booking.cancelled_by_role}`}
                />
              )}
            </div>
          )}
        </div>

        {/* Payment history sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Payment History
          </h3>
          {booking.payments.length === 0 ? (
            <p className="text-sm text-gray-500">No payments recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {booking.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">
                      ₹ {payment.amount}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      {payment.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {payment.payment_type} &bull;{" "}
                    {formatDateTime(payment.initiated_at)}
                  </p>
                  {payment.failure_reason && (
                    <p className="text-xs text-red-600 mt-1">
                      {payment.failure_reason}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}
