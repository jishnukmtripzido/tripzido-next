"use server";

import { cookies } from "next/headers";
import { getProfileApi, updateProfileApi } from "@/services/profile.service";
import type {
  Profile,
  ProfileUpdatePayload,
  ProfileActionState,
} from "@/types/profile.types";

/**
 * getProfile
 * ----------
 * Fetches the logged-in user's profile using the access token stored in
 * the HTTP-only cookie set during login (see verifyOtpAndLogin).
 *
 * Returns: Profile | null
 * - null if there's no access token (not logged in) or the request fails
 */
export async function getProfile(): Promise<Profile | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await getProfileApi(accessToken);
    return response.success ? response.data : null;
  } catch {
    return null;
  }
}

/**
 * updateProfile
 * -------------
 * Applies a partial update (name / email / address) to the logged-in
 * user's profile.
 *
 * Returns: Promise<ProfileActionState>
 */
export async function updateProfile(
  payload: ProfileUpdatePayload,
): Promise<ProfileActionState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return { success: false, message: "You must be logged in to do this." };
  }

  try {
    const response = await updateProfileApi(accessToken, payload);
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to update profile",
    };
  }
}
