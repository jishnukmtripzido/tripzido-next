"use server";

import { redirect } from "next/navigation";
import { searchSchema } from "@/validations/searchSchema.validations";
import { toISO } from "@/lib/dateUtils";
import type { SearchActionState } from "@/types/search.types";

export async function searchVehiclesAction(payload: {
  city_id: number;
  city_name: string;
  pickup_datetime: Date;
  dropoff_datetime: Date;
}): Promise<SearchActionState> {
  const parsed = searchSchema.safeParse(payload);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] as string] = issue.message;
    }
    return { success: false, errors };
  }

  const { city_id, pickup_datetime, dropoff_datetime } = parsed.data;

  const params = new URLSearchParams({
    city_id: String(city_id),
    city_name: payload.city_name,
    pickup: toISO(pickup_datetime),
    dropoff: toISO(dropoff_datetime),
  });

  redirect(`/searchresult?${params.toString()}`);
}
