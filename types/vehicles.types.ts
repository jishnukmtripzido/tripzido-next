// types/vehicles.types.ts
export type VehicleLocation = {
  id: number;
  location_id: number;
  location_name: string;
  city_id: string;
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
    package_type: { id: number; name: string };
    price: string;
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
  vehicle_type: string;
  seats: number;
  cc: number;
  mileage_kmpl: string;
  primary_image: string;
  locations: VehicleLocation[];
  pay_at_pickup_enabled: boolean;
};

export type VehicleSearchParams = {
  city_id: string;
  pickup_datetime: string;
  dropoff_datetime: string;
};
