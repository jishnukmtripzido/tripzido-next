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
