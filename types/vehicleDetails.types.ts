// types/vehicleDetails.types.ts

/** A single package option (e.g. "Daily Package") */
export interface VehiclePackage {
  id: number;
  name: string;
  /** Package category, e.g. "Daily", "Weekly", "Hourly" */
  category: string;
  /** The package's own standard duration, in hours */
  duration_hours: number;
  /** Base price for one unit of this package (e.g. one day, one week) */
  price_per_day: number;
  /** price_per_day × however many units are needed to cover the searched duration */
  total_price: number;
  /** Per-package km cap, or null if unlimited */
  km_limit: number | null;
  /** Pre-formatted km limit string, e.g. "700 km included" or "No Distance Limit" */
  total_km_limit: string;
  /** e.g. "Daily Package (₹ 499 per Day)" — pre-formatted label from API */
  label?: string;
  /** True if this is the package the backend selected by default for the searched dates */
  is_default: boolean;
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
  vehicle_type_id: number;
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
  /** id of the package the backend picked as default (matches an entry in `packages`, or null if none applicable) */
  selected_package_id: number | null;
  /** Human-readable searched duration, e.g. "2 weeks" — null if no dates were supplied */
  searched_duration: string | null;
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
  is_available: boolean;
  availability_message: string | null;
}

/** Query params expected on /vehicledetails/[id] */
export interface VehicleDetailsSearchParams {
  location_id: string;
  location_name: string;
  pickup: string; // ISO datetime
  dropoff: string; // ISO datetime
  city_id: string;
  reviews_page?: string;
  package_id?: string;
}
