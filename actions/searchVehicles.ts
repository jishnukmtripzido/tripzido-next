"use server";

import { redirect } from "next/navigation";
import { searchSchema } from "@/lib/validations/searchSchema";

export type SearchActionState = {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
};

export type VehicleLocation = {
  id: number;
  location_id: number;
  location_name: string;
  city_id: number;
  city_name: string;
  vendor_id: number;
  vendor_name: string;
  daily_price: string | null;
  available_count: number;
  security_deposit_amount: string;
  km_limit_per_day: number;
  excess_charge_per_km: string;
  late_return_penalty_per_hour: string;
  doorstep_delivery_enabled: boolean;
  pay_at_pickup_enabled: boolean;
  partial_payment_enabled: boolean;
  partial_payment_percentage: string | null;
  operating_hours_start: string | null;
  operating_hours_end: string | null;
  pricing_packages: {
    id: number;
    package_type: {
      id: number;
      name: string;
    };
    price_per_day: string;
    min_days: number;
    max_days: number | null;
  }[];
  images: {
    id: number;
    image: string;
    is_primary: boolean;
    sort_order: number;
  }[];
};

export type VehicleSearchResult = {
  id: number;
  name: string;
  brand: string;
  make_year: number;
  transmission_type: string;
  fuel_type: string;
  seats: number;
  cc: number;
  mileage_kmpl: string;
  primary_image: string;
  locations: VehicleLocation[];
};

function toISO(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
}

export async function searchVehiclesAction(payload: {
  city_id: number;
  city_name: string;
  pickup_datetime: Date;
  dropoff_datetime: Date;
}): Promise<SearchActionState> {

  // 1. Validate
  const parsed = searchSchema.safeParse(payload);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    }
    return { success: false, errors };
  }

  const { city_id, pickup_datetime, dropoff_datetime } = parsed.data;

  // 2. Redirect with search params — page will handle the API call
  const params = new URLSearchParams({
    city_id: String(city_id),
    city_name: payload.city_name,
    pickup: toISO(pickup_datetime),
    dropoff: toISO(dropoff_datetime),
  });

  redirect(`/searchresult?${params.toString()}`);
}