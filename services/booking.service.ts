import { api } from "@/lib/api";
import type {
  BookingTabFilter,
  BookingDetail,
  PaginatedBookings,
  CancellationPreview,
  CancellationReasonCode,
  BookingCancellation,
  BookingConfirmationData,
} from "@/types/booking.types";

export interface CreateOrderParams {
  listing_id: number;
  package_id: number;
  pickup_datetime: string;
  dropoff_datetime: string;
  quantity: number;
  payment_mode: "FULL" | "PARTIAL";
}

export interface CreateOrderResult {
  order_id: string;
  payment_session_id: string;
  amount: number;
}

export async function createBookingOrderApi(
  params: CreateOrderParams,
  token: string,
): Promise<CreateOrderResult> {
  const data = await api.post<{ data: CreateOrderResult }>(
    "/api/bookings/checkout/",
    params,
    { token },
  );
  return data.data;
}

export interface PaymentStatusResult {
  status: "INITIATED" | "PENDING" | "SUCCESS" | "FAILED";
  // Added: BookingCheckoutService.get_status() on the backend now
  // returns this alongside booking_references. A bulk booking creates
  // multiple Booking rows sharing one booking_group_id but each with
  // its own booking_reference — the confirmation page needs the group
  // id, since a list of references can't be looked up as one unit.
  booking_group_id: string;
  booking_references: string[];
}

export async function getBookingPaymentStatusApi(
  orderId: string,
  token: string,
): Promise<PaymentStatusResult> {
  const data = await api.get<{ data: PaymentStatusResult }>(
    `/api/bookings/checkout/status/${orderId}/`,
    { token, cache: "no-store" },
  );
  return data.data;
}

// ── Profile page: bookings list + detail ──────────────────────────────

export async function getCustomerBookingsApi(
  token: string,
  tab: BookingTabFilter,
  page: number = 1,
): Promise<PaginatedBookings> {
  const query = new URLSearchParams({
    status: tab,
    page: String(page),
  });

  const data = await api.get<{ data: PaginatedBookings }>(
    `/api/bookings/?${query.toString()}`,
    { token, cache: "no-store" },
  );
  return data.data;
}

export async function getBookingDetailApi(
  token: string,
  bookingId: number,
): Promise<BookingDetail> {
  const data = await api.get<{ data: BookingDetail }>(
    `/api/bookings/${bookingId}/`,
    { token, cache: "no-store" },
  );
  return data.data;
}

// ── Booking confirmation (post-checkout) ────────────────────────────────

export async function getBookingConfirmationApi(
  token: string,
  groupId: string,
): Promise<BookingConfirmationData> {
  const data = await api.get<{ data: BookingConfirmationData }>(
    `/api/bookings/confirmation/?group=${encodeURIComponent(groupId)}`,
    { token, cache: "no-store" },
  );
  return data.data;
}

// ── Cancellation ────────────────────────────────────────────────────────

export async function getCancellationPreviewApi(
  token: string,
  bookingId: number,
): Promise<CancellationPreview> {
  const data = await api.get<{ data: CancellationPreview }>(
    `/api/bookings/${bookingId}/cancellation-preview/`,
    { token, cache: "no-store" },
  );
  return data.data;
}

export async function cancelBookingApi(
  token: string,
  bookingId: number,
  reasonCode: CancellationReasonCode,
  reasonText: string,
): Promise<BookingCancellation> {
  const data = await api.post<{ data: BookingCancellation }>(
    `/api/bookings/${bookingId}/cancel/`,
    { reason_code: reasonCode, reason_text: reasonText },
    { token },
  );
  return data.data;
}
