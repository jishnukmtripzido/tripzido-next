import Link from "next/link";
import { getBookingConfirmation } from "@/actions/bookings.actions";
import BookingConfirmationSummary from "@/components/features/profile/BookingConfirmationSummary";

// Next.js 15+/16: searchParams is a Promise and must be awaited —
// same pattern as `params` elsewhere in this app.
export default async function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string; ref?: string }>;
}) {
  const { group, ref } = await searchParams;

  // `ref` (a single booking_reference) can't represent a bulk booking —
  // several Booking rows share one booking_group_id but each get their
  // own reference. `group` is the identifier this page actually needs.
  // See the README for updating whatever redirects here after payment
  // (likely your checkout/processing page) to send `group` instead.
  if (!group) {
    return <MissingGroupState hasLegacyRef={Boolean(ref)} />;
  }

  const result = await getBookingConfirmation(group);

  if (!result.success || !result.data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <h1 className="text-xl font-bold text-gray-900">
            We couldn&apos;t find this booking
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {result.message ??
              "This confirmation link may have expired or doesn't belong to your account."}
          </p>
          <Link
            href="/profile/bookings/confirmed"
            className="inline-block mt-6 px-5 py-2.5 text-sm font-semibold rounded-md bg-brand-yellow text-black hover:bg-[#e6ac00] transition-colors"
          >
            Go to my bookings
          </Link>
        </div>
      </div>
    );
  }

  return <BookingConfirmationSummary data={result.data} />;
}

function MissingGroupState({ hasLegacyRef }: { hasLegacyRef: boolean }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
        <h1 className="text-xl font-bold text-gray-900">
          Missing booking reference
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {hasLegacyRef
            ? "This link uses an old-style confirmation URL that's no longer supported. Please check your bookings list instead."
            : "This page needs a booking group id in the URL to show your confirmation."}
        </p>
        <Link
          href="/profile/bookings/confirmed"
          className="inline-block mt-6 px-5 py-2.5 text-sm font-semibold rounded-md bg-brand-yellow text-black hover:bg-[#e6ac00] transition-colors"
        >
          Go to my bookings
        </Link>
      </div>
    </div>
  );
}
