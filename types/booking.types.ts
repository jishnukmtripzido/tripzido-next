// types/booking.types.ts

export type BookingStatus =
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED"
  | "PAYMENT_FAILED"
  | "EXPIRED";

export type BookingTabFilter =
  | "pending"
  | "confirmed"
  | "ongoing"
  | "completed"
  | "cancelled";

export type BookingListItem = {
  id: number;
  booking_reference: string;
  vehicle: string;
  image: string | null;
  location: string;
  booking_date: string;
  start_date: string;
  end_date: string;
  duration: string;
  paid: number;
  deposit: number;
  status: BookingStatus;
  status_label: string;
};

export type PaginatedBookings = {
  average_rating?: never;
  pagination: {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    next: string | null;
    previous: string | null;
  };
  results: BookingListItem[];
};

export type BookingPayment = {
  id: number;
  payment_type: "PARTIAL" | "FULL";
  amount: string;
  status: string;
  gateway_order_id: string;
  gateway_payment_id: string;
  initiated_at: string;
  completed_at: string | null;
  failed_at: string | null;
  failure_reason: string;
};

export type BookingDetail = {
  id: number;
  booking_reference: string;
  vehicle_name: string;
  vehicle_image: string | null;
  transmission_type: string;
  fuel_type: string;
  vendor_name: string;
  pickup_location_name: string;
  pickup_location_address: string | null;
  package_name: string | null;
  start_date: string;
  end_date: string;
  duration: string;
  status: BookingStatus;
  status_label: string;
  payment_mode: string;
  payment_mode_label: string;
  listing_amount: string;
  advance_amount: string;
  remaining_amount: string;
  security_deposit_amount: string;
  platform_tc_version: string;
  handed_over_at: string | null;
  returned_at: string | null;
  cancelled_at: string | null;
  cancelled_by_role: string;
  payments: BookingPayment[];
  can_cancel: boolean;
  created_at: string;
};
