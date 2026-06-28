export type ModalType =
  | "city"
  | "date"
  | "date-dropoff"
  | "time"
  | "pickup-time"
  | "dropoff-time"
  | null;

export type DropdownType =
  | "date"
  | "date-dropoff"
  | "pickup-time"
  | "dropoff-time"
  | null;
export type SelectedCity = { id: number; name: string };
export type TimeState = { hour: number; minute: number };

export type SearchActionState = {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
};

export type Offer = {
  id: number;
  title: string;
  description: string;
  icon_type: "STAR" | "CALCULATOR" | "LIGHTNING" | "BELL" | "COIN";
  coupon_code: string;
  discount_amount: string | null;
  min_order_amount: string | null;
  valid_from: string | null;
  valid_until: string | null;
  sort_order: number;
  is_featured: boolean;
};

export type PopularRental = {
  id: number;
  city_id: number;
  city_name: string;
  vehicle_type_id: number;
  name: string;
  brand: string;
  vehicle_type_category: string;
  fuel_type: string;
  transmission_type: string;
  seats: number;
  display_price: string | null;
  image_url: string | null;
  tag: string;
  sort_order: number;
  pickup_location_id: number | null;
  pickup_location_name: string | null;
};
