import { api } from "@/lib/api";

export interface CheckoutSummaryParams {
  listing_id: string | number;
  package_id: string | number;
  pickup_datetime: string;
  dropoff_datetime: string;
}

export interface ThingsToRemember {
  km_limit: string;
  excess_charge: string;
  location_timings: string;
  late_penalty_per_hour: number;
}

export interface CheckoutSummary {
  listing_id: number;
  package_id: number;
  package_name: string;
  vehicle_name: string;
  primary_image: string | null;
  available_count: number;
  unit_rent_amount: number;
  unit_refundable_deposit: number;
  can_pay_partial: boolean;
  partial_payment_percentage: number | null;
  pickup_datetime: string;
  dropoff_datetime: string;
  duration_label: string;
  pickup_location_name: string;
  things_to_remember: ThingsToRemember;
}

export async function getCheckoutSummaryApi(
  params: CheckoutSummaryParams,
): Promise<CheckoutSummary> {
  const query = new URLSearchParams({
    listing_id: String(params.listing_id),
    package_id: String(params.package_id),
    pickup_datetime: params.pickup_datetime,
    dropoff_datetime: params.dropoff_datetime,
  });

  const data = await api.get<{ data: CheckoutSummary }>(
    `/api/vehicles/checkout-summary/?${query.toString()}`,
    { cache: "no-store" },
  );

  return data.data;
}
