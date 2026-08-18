import Link from "next/link";
import { getBookingDetail } from "@/actions/bookings.actions";
import CancelBookingButton from "@/components/features/profile/CancelBookingButton";
import BookingVehicleImage from "@/components/features/profile/BookingVehicleImage";
import type { BookingPickupPoint } from "@/types/booking.types";

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

// Statuses that unlock the invoice download button — mirrors
// InvoiceService.INVOICE_ELIGIBLE_STATUSES on the backend, which is
// the actual source of truth/enforcement; this only controls whether
// the button is shown, not whether the download itself succeeds.
const INVOICE_ELIGIBLE_STATUSES = ["CONFIRMED", "ONGOING", "COMPLETED"];

// Was "/profile" — that URL is now the Profile *details* page, not
// bookings, now that each booking status has its own route.
const BOOKINGS_URL = "/profile/bookings";

// Handles either a plain string item, or an object item shaped like
// {text: "..."} / {label: "..."} / {description: "..."} — the exact
// shape terms_items is stored in wasn't confirmed, so this stays
// defensive rather than assuming one form.
function normalizeTermsItem(item: unknown): string {
  if (typeof item === "string") return item;
  if (item && typeof item === "object") {
    const obj = item as Record<string, unknown>;
    if (typeof obj.text === "string") return obj.text;
    if (typeof obj.label === "string") return obj.label;
    if (typeof obj.description === "string") return obj.description;
  }
  return String(item);
}

type PolicyIconType = "deposit" | "distance" | "document" | "alert" | "clock";

function PolicyIcon({ type }: { type: PolicyIconType }) {
  const paths: Record<PolicyIconType, React.ReactNode> = {
    deposit: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M3 6h18a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7a1 1 0 011-1z"
      />
    ),
    distance: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
      />
    ),
    document: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    alert: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    clock: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  };
  return (
    <svg
      className="w-5 h-5 text-gray-400 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {paths[type]}
    </svg>
  );
}

function PolicyRow({
  icon,
  label,
  value,
}: {
  icon: PolicyIconType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <PolicyIcon type={icon} />
      <p className="text-sm text-gray-700">
        {label}: <span className="font-bold text-gray-900">{value}</span>
      </p>
    </div>
  );
}

function buildMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

function PickupPointCard({ pickupPoint }: { pickupPoint: BookingPickupPoint }) {
  // Server-only env var — safe to read directly here since this whole
  // page is a React Server Component. Deliberately NOT prefixed with
  // NEXT_PUBLIC_.
  const apiKey = process.env.GOOGLEMAP_API_KEY;
  const hasCoords =
    pickupPoint.latitude !== null && pickupPoint.longitude !== null;

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-8">
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        {pickupPoint.label || "Pickup Point"}
      </h3>
      <p className="text-sm text-gray-700">{pickupPoint.address}</p>
      {pickupPoint.contact_numbers.length > 0 && (
        <p className="text-sm text-gray-500 mt-1">
          Contact: {pickupPoint.contact_numbers.join(", ")}
        </p>
      )}

      {/* lat/long takes priority — an interactive-preview embed that
          opens the full Google Maps app on click. pointerEvents: none
          on the iframe lets the click pass through to the wrapping
          <a> instead of being captured inside the embed's own
          browsing context. */}
      {hasCoords && apiKey && (
        <a
          href={buildMapsUrl(pickupPoint.latitude!, pickupPoint.longitude!)}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 rounded-lg overflow-hidden border border-gray-100 hover:opacity-90 transition-opacity"
        >
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${pickupPoint.latitude},${pickupPoint.longitude}`}
            width="100%"
            height="220"
            style={{ border: 0, pointerEvents: "none" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </a>
      )}

      {/* Falls back to the raw share-link only when there are no
          coordinates to embed — an arbitrary share-link URL can't be
          embedded as a preview, only linked to directly. */}
      {!hasCoords && pickupPoint.google_maps_link && (
        <a
          href={pickupPoint.google_maps_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-md bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
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
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Open in Google Maps
        </a>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="space-y-6">
      <Link
        href={BOOKINGS_URL}
        className="text-sm  font-medium text-gray-500 hover:text-gray-800 transition-colors"
      >
        &larr; Back to Bookings
      </Link>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-gray-900">Booking not found</h2>
        <p className="text-sm text-gray-500 mt-1 max-w-sm">{message}</p>
        <Link
          href={BOOKINGS_URL}
          className="mt-6 px-5 py-2.5 text-sm font-semibold rounded-md bg-brand-yellow text-black hover:bg-[#e6ac00] transition-colors"
        >
          Back to my bookings
        </Link>
      </div>
    </div>
  );
}

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bookingId = Number(id);

  if (!Number.isFinite(bookingId)) {
    return (
      <EmptyState message="That doesn't look like a valid booking link." />
    );
  }

  const booking = await getBookingDetail(bookingId);

  if (!booking) {
    return (
      <EmptyState message="We couldn't find this booking. It may not exist, or it may belong to a different account." />
    );
  }

  const statusStyle =
    STATUS_STYLES[booking.status] ??
    "bg-gray-100 text-gray-600 border-gray-200";

  const hasTermsAndConditions =
    !!booking.vendor_terms && booking.vendor_terms.terms_items.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link
            href={BOOKINGS_URL}
            className="text-sm  font-medium text-gray-500 hover:text-gray-800 transition-colors"
          >
            &larr; Back to Bookings
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Booking {booking.booking_reference}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center py-1.5 px-3 rounded-full text-xs font-semibold border ${statusStyle}`}
          >
            {booking.status_label}
          </span>
          {INVOICE_ELIGIBLE_STATUSES.includes(booking.status) && (
            <a
              href={`/api/bookings/${booking.id}/invoice`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
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
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Invoice
            </a>
          )}
          {booking.can_cancel && <CancelBookingButton bookingId={booking.id} />}
        </div>
      </div>

      {booking.cancellation && (
        <div className="bg-red-50 border border-red-100 rounded-md p-5">
          <h3 className="text-sm font-bold text-red-700 mb-2">
            This booking was cancelled
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <DetailItem
              label="Reason"
              value={booking.cancellation.reason_label}
            />
            <DetailItem
              label="Refund"
              value={`${booking.cancellation.refund_percentage}% — ₹ ${booking.cancellation.refundable_amount}`}
            />
            <DetailItem
              label="Cancelled On"
              value={formatDateTime(booking.cancellation.created_at)}
            />
          </div>
          {booking.cancellation.reason_text && (
            <p className="text-sm text-red-700 mt-3">
              &ldquo;{booking.cancellation.reason_text}&rdquo;
            </p>
          )}
        </div>
      )}

      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Vehicle + trip info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex gap-6">
            {/* Vehicle Image */}
            <div className="relative w-40 h-28 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden border border-gray-100">
              {booking.vehicle_image ? (
                <BookingVehicleImage
                  src={booking.vehicle_image}
                  alt={booking.vehicle_name}
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

      {booking.pickup_point && (
        <PickupPointCard pickupPoint={booking.pickup_point} />
      )}

      {booking.things_to_remember && (
        <div className="bg-white rounded-md shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Things to Remember
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PolicyRow
              icon="deposit"
              label="Security Deposit"
              value={`₹${booking.things_to_remember.security_deposit.toLocaleString("en-IN")}`}
            />
            <PolicyRow
              icon="distance"
              label="Distance Limit"
              value={booking.things_to_remember.distance_limit}
            />
            <PolicyRow
              icon="document"
              label="Late Penalty"
              value={
                booking.things_to_remember.late_penalty_per_hour > 0
                  ? `₹${booking.things_to_remember.late_penalty_per_hour}/hour`
                  : "N/A"
              }
            />
            <PolicyRow
              icon="alert"
              label="Excess Charge"
              value={booking.things_to_remember.excess_charge}
            />
            {/* <PolicyRow
              icon="clock"
              label="Operating Hours"
              value={booking.things_to_remember.location_timings}
            /> */}
          </div>
        </div>
      )}

      {hasTermsAndConditions && (
        <div className="bg-white rounded-md shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {booking.vendor_name}&rsquo;s Terms &amp; Conditions
          </h3>
          <ul className="space-y-2.5 list-disc list-inside text-sm text-gray-700">
            {booking.vendor_terms!.terms_items.map((item, i) => (
              <li key={i}>{normalizeTermsItem(item)}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center py-1.5 px-3 rounded-full text-xs font-semibold border ${statusStyle}`}
        >
          {booking.status_label}
        </span>
        {booking.can_cancel && <CancelBookingButton bookingId={booking.id} />}
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
