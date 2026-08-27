import { notFound } from "next/navigation";
import BookingsList from "@/components/features/profile/BookingsList";
import type { BookingTabFilter } from "@/types/booking.types";

const VALID_STATUSES: BookingTabFilter[] = [
  "pending",
  "confirmed",
  "ongoing",
  "completed",
  "cancelled",
];

// Pre-render all five status pages at build time.
export function generateStaticParams() {
  return VALID_STATUSES.map((status) => ({ status }));
}

// Next.js 15+/16: `params` is a Promise and must be awaited.
export default async function BookingsStatusPage({
  params,
}: {
  params: Promise<{ status: string }>;
}) {
  const { status: rawStatus } = await params;
  const status = rawStatus as BookingTabFilter;

  if (!VALID_STATUSES.includes(status)) {
    notFound();
  }

  return <BookingsList status={status} />;
}
