// types/profile.types.ts

export type Profile = {
  id: number;
  name: string;
  email: string | null;
  mobile_number: string;
  mobile_verified: boolean;
  address: string;
};

export type ProfileUpdatePayload = {
  name?: string;
  email?: string | null;
  address?: string;
};

export type ProfileActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: Profile;
};
