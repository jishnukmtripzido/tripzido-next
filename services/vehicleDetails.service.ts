// services/vehicleDetails.service.ts
import { api } from "@/lib/api";
import type { VehicleDetailsResponse } from "@/types/vehicleDetails.types";

export interface VehicleDetailsParams {
  vehicle_id: string | number;
  location_id: string | number;
  location_name: string;
  pickup_datetime: string;
  dropoff_datetime: string;
  city_id: string;
  package_id?: string;
}

export async function getVehicleDetailsApi(
  params: VehicleDetailsParams,
): Promise<VehicleDetailsResponse> {
  const query = new URLSearchParams({
    location_id: String(params.location_id),
    location_name: params.location_name,
    pickup_datetime: params.pickup_datetime,
    dropoff_datetime: params.dropoff_datetime,
    city_id: params.city_id,
    ...(params.package_id && { package_id: params.package_id }),
  });

  const data = await api.get<{ data: VehicleDetailsResponse }>(
    `/api/vehicles/${params.vehicle_id}/?${query.toString()}`,
    { cache: "no-store" },
  );

  return data.data;
}

// ── Independent secondary calls ───────────────────────────────────────

export async function getCancellationPolicyApi(
  vehicleId: string | number,
): Promise<CancellationPolicy> {
  const data = await api.get<{ data: CancellationPolicy }>(
    `/api/administrations/cancellation-policy/`,
    { cache: "force-cache" }, // policy rarely changes — safe to cache
  );
  return data.data;
}

export async function getVehicleReviewsApi(
  vehicleId: string | number,
  page: number = 1,
  pageSize: number = 10,
): Promise<ReviewsResponse> {
  const data = await api.get<{ data: ReviewsResponse }>(
    `/api/vehicles/${vehicleId}/reviews/?page=${page}&page_size=${pageSize}`,
    { cache: "no-store" },
  );
  return data.data;
}

export async function getCityPickupLocationsApi(
  cityId: string | number,
): Promise<PickupLocationOption[]> {
  const data = await api.get<{ data: PickupLocationOption[] }>(
    `/api/locations/pickup-locations/by-city/${cityId}/`,
    { revalidate: 3600 }, // revalidate every hour
  );
  return data.data;
}

// ── Types for the new endpoints ───────────────────────────────────────

// export interface CancellationPolicy {
//   rules: CancellationRule[];
//   note?: string;
// }

// export interface CancellationRule {
//   hours_before_pickup: number; // e.g. 24
//   refund_percentage: number; // e.g. 100
//   label: string; // e.g. "More than 24 hours before pickup"
//   description: string; // e.g. "Full refund"
// }
export interface CancellationRule {
  hours_before_pickup: number; // e.g. 24
  refund_percentage: number; // e.g. 100
  label: string; // e.g. "More than 24 hours before pickup"
  description: string; // e.g. "Full refund"
}

export interface CancellationPolicy {
  full_payment_rules: CancellationRule[];
  partial_payment_rules: CancellationRule[];
  note?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
}
export interface ReviewRatingItem {
  criterion: string;
  criterion_label: string;
  score: number;
}

export interface RatingBreakdownItem {
  criterion: string;
  criterion_label: string;
  average_score: number;
  count: number;
}

export interface ReviewItem {
  id: number;
  author_name: string;
  rating: number | null; // null when a review has no scored criteria yet
  comment: string;
  created_at: string;
  vehicle_name: string;
  ratings: ReviewRatingItem[]; // per-criterion scores this reviewer gave
}

export interface ReviewsResponse {
  average_rating: number;
  total_reviews: number;
  rating_breakdown: RatingBreakdownItem[];
  pagination: PaginationMeta;
  results: ReviewItem[];
}

export interface PickupLocationOption {
  id: number;
  location_name: string;
  city_id: number;
}

export interface LocationTimingDay {
  day_of_week: number;
  day_name: string;
  is_closed: boolean;
  timing: string;
}

export interface LocationTiming {
  has_schedule: boolean;
  days: LocationTimingDay[];
}

export async function getLocationTimingApi(
  listingId: string | number,
): Promise<LocationTiming | null> {
  const data = await api.get<{ data: LocationTiming | null }>(
    `/api/vehicles/${listingId}/location-timing/`,
    { cache: "force-cache" },
  );
  return data.data;
}
