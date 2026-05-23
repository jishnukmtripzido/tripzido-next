"use server";

import { redirect } from "next/navigation";
import { searchSchema } from "@/lib/validations/searchSchema";

export type SearchActionState = {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
};

export type VehicleSearchResult = {
  id: number;
  name: string;
  // extend with your actual DRF response shape
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