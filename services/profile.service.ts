// services/profile.service.ts

import { api } from "@/lib/api";
import type { Profile, ProfileUpdatePayload } from "@/types/profile.types";

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function getProfileApi(
  token: string,
): Promise<ApiEnvelope<Profile>> {
  return api.get<ApiEnvelope<Profile>>("/api/users/me/", {
    token,
    cache: "no-store",
  });
}

export async function updateProfileApi(
  token: string,
  payload: ProfileUpdatePayload,
): Promise<ApiEnvelope<Profile>> {
  return api.patch<ApiEnvelope<Profile>>("/api/users/me/", payload, { token });
}
