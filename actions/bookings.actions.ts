"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  createBookingOrderApi,
  getBookingPaymentStatusApi,
  getCustomerBookingsApi,
  getBookingDetailApi,
  getCancellationPreviewApi,
  cancelBookingApi,
  type CreateOrderParams,
  type CreateOrderResult,
  type PaymentStatusResult,
} from "@/services/booking.service";
import type {
  BookingTabFilter,
  BookingDetail,
  PaginatedBookings,
  CancellationPreview,
  CancellationReasonCode,
  BookingCancellation,
} from "@/types/booking.types";

export interface CreateOrderActionResult {
  success: boolean;
  data?: CreateOrderResult;
  message?: string;
}

export async function createBookingOrderAction(
  params: CreateOrderParams,
): Promise<CreateOrderActionResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Please sign in to complete your booking.",
    };
  }

  try {
    const data = await createBookingOrderApi(params, accessToken);
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "Unable to create booking order.",
    };
  }
}

export interface PaymentStatusActionResult {
  success: boolean;
  data?: PaymentStatusResult;
  message?: string;
}

export async function getBookingPaymentStatusAction(
  orderId: string,
): Promise<PaymentStatusActionResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Please sign in to check booking status.",
    };
  }

  try {
    const data = await getBookingPaymentStatusApi(orderId, accessToken);
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unable to fetch status.",
    };
  }
}

// ── Profile page: bookings list + detail ──────────────────────────────

/**
 * getCustomerBookings
 * -------------------
 * Fetches the logged-in user's bookings for one tab (pending / confirmed
 * / ongoing / completed / cancelled).
 *
 * Returns: PaginatedBookings | null
 * - null if not logged in or the request fails
 */
export async function getCustomerBookings(
  tab: BookingTabFilter,
  page: number = 1,
): Promise<PaginatedBookings | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    return await getCustomerBookingsApi(accessToken, tab, page);
  } catch {
    return null;
  }
}

/**
 * getBookingDetail
 * ----------------
 * Fetches full detail for a single booking owned by the logged-in user.
 *
 * Returns: BookingDetail | null
 */
export async function getBookingDetail(
  bookingId: number,
): Promise<BookingDetail | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    return await getBookingDetailApi(accessToken, bookingId);
  } catch {
    return null;
  }
}

// ── Cancellation ────────────────────────────────────────────────────────

export interface CancellationPreviewActionResult {
  success: boolean;
  data?: CancellationPreview;
  message?: string;
}

/**
 * getCancellationPreview
 * -----------------------
 * Fetches the refund breakdown the customer would receive if they
 * cancelled this booking right now, without actually cancelling it.
 */
export async function getCancellationPreview(
  bookingId: number,
): Promise<CancellationPreviewActionResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return { success: false, message: "Please sign in to continue." };
  }

  try {
    const data = await getCancellationPreviewApi(accessToken, bookingId);
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error
          ? err.message
          : "Unable to load cancellation details.",
    };
  }
}

export interface CancelBookingActionResult {
  success: boolean;
  data?: BookingCancellation;
  message?: string;
}

/**
 * cancelBooking
 * -------------
 * Cancels a CONFIRMED booking owned by the logged-in user. Revalidates
 * the booking detail page so the UI reflects the new CANCELLED status
 * immediately after this resolves.
 */
export async function cancelBooking(
  bookingId: number,
  reasonCode: CancellationReasonCode,
  reasonText: string = "",
): Promise<CancelBookingActionResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return { success: false, message: "Please sign in to continue." };
  }

  try {
    const data = await cancelBookingApi(
      accessToken,
      bookingId,
      reasonCode,
      reasonText,
    );
    revalidatePath(`/profile/bookings/${bookingId}`);
    revalidatePath("/profile");
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unable to cancel booking.",
    };
  }
}
