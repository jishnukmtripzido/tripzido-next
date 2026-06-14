// types/vehicleDetails.types.ts

/** A single package option (e.g. "Daily Package") */
export interface VehiclePackage {
  id: number;
  name: string;
  price_per_day: number;
  /** e.g. "Daily Package (₹ 499 per Day)" — pre-formatted label from API */
  label?: string;
}

/** Fare breakdown returned for a specific package + date range */
export interface FareDetails {
  rent_amount: number;
  total: number;
  /** Amount still to be paid at pickup */
  remaining_rent: number;
  /** Advance payment due now */
  advance_payment: number;
  /** Refundable deposit (paid at pickup) */
  refundable_deposit: number;
}

/** Pickup location details for the vehicle */
export interface VehiclePickupLocation {
  id: number;
  location_name: string;
  /** Shown to user only after booking is confirmed */
  exact_address_revealed_after_booking: boolean;
  /** Operating window e.g. "9:00 AM - 10:00 PM" */
  operating_hours: string;
  latitude?: number;
  longitude?: number;
}

/** Full vehicle details response from GET /api/vehicles/:id */
export interface VehicleDetailsResponse {
  id: number;
  name: string;
  make_year: number;
  transmission_type: string;
  fuel_type: string;
  seats: number;
  cc: number;
  mileage_kmpl: number;
  top_speed_kmph: number;
  fuel_capacity_litres: number;
  kerb_weight_kg: number;
  km_limit_per_day: number | null; // null = unlimited
  /** Array of gallery image URLs */
  images: string[];
  primary_image: string;
  available_count: number;
  packages: VehiclePackage[];
  fare_details: FareDetails;
  pickup_location: VehiclePickupLocation;
  /** Policies shown in "Things to remember" */
  policies: {
    security_deposit: number;
    distance_limit: string; // "No Limit" or "300 km"
    late_penalty_per_hour: number;
    location_timings: string;
    excess_charge: string; // "N/A" or formatted string
  };
  terms_and_conditions: string[];
  pay_at_pickup_enabled: boolean;
}

/** Query params expected on /vehicledetails/[id] */
export interface VehicleDetailsSearchParams {
  location_id: string;
  location_name: string;
  pickup: string; // ISO datetime
  dropoff: string; // ISO datetime
  city_id: string;
  reviews_page?: string;
}
