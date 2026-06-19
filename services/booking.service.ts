import { api } from "@/lib/api";

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
