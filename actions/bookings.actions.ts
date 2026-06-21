"use server";

import { cookies } from "next/headers";
import {
  createBookingOrderApi,
  getBookingPaymentStatusApi,
  getCustomerBookingsApi,
  getBookingDetailApi,
  type CreateOrderParams,
  type CreateOrderResult,
  type PaymentStatusResult,
} from "@/services/booking.service";
import type {
  BookingTabFilter,
  BookingDetail,
  PaginatedBookings,
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
