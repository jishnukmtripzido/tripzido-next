"use server";

import { cookies } from "next/headers";
import {
  createBookingOrderApi,
  getBookingPaymentStatusApi,
  type CreateOrderParams,
  type CreateOrderResult,
  type PaymentStatusResult,
} from "@/services/booking.service";

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
