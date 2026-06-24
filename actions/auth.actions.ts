"use server";

import { cookies } from "next/headers";
import { verifyOtpApi, logoutApi } from "@/services/auth.service";
import type { AuthActionResult } from "@/types/auth.types";
import { registerVerifyOtpApi } from "@/services/auth.service";

/**
 * verifyOtpAndLogin
 * -----------------
 * Verifies a one-time password (OTP) for the given phone number by
 * calling the backend API. On success, stores the returned access and
 * refresh tokens as HTTP-only cookies and returns a success status.
 *
 * Parameters:
 * - phone_number: string — the user's phone number to verify
 * - otp: string — the one-time password provided by the user
 *
 * Returns: Promise<{ success: boolean; message: string }>
 * - success: true if verification succeeded and tokens were set
 * - message: human-readable status or error message
 */
export async function verifyOtpAndLogin(
  phone_number: string,
  otp: string,
): Promise<AuthActionResult> {
  try {
    const data = await verifyOtpApi(phone_number, otp);

    if (!data.success || !data.data) {
      return {
        success: false,
        message: data.message || "OTP verification failed",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("access_token", data.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("refresh_token", data.data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return { success: true, message: "Logged in successfully" };
  } catch {
    return { success: false, message: "Failed to verify OTP" };
  }
}

// Action for logout functionality. Clears tokens from cookies and calls backend to invalidate refresh token. Handles various edge cases for missing tokens and network errors gracefully.
/**
 * logoutAction
 * ------------
 * Logs the user out by reading the refresh token from cookies and
 * calling the backend logout endpoint to invalidate it. Regardless of
 * backend response (or network errors), the function clears access and
 * refresh tokens from the cookie store so the user is signed out
 * client-side.
 *
 * Returns: Promise<{ success: boolean; message: string }>
 * - success: indicates whether server logout succeeded (or cookies were cleared)
 * - message: human-readable status or error message
 */
export async function logoutAction(): Promise<AuthActionResult> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const accessToken = cookieStore.get("access_token")?.value;

  const clearCookies = async () => {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
  };

  if (!refreshToken) {
    await clearCookies();
    return { success: true, message: "Logged out successfully" };
  }

  try {
    const data = await logoutApi(accessToken!, refreshToken);
    await clearCookies();
    return {
      success: true,
      message: data?.message || "Logged out successfully",
    };
  } catch {
    await clearCookies();
    return {
      success: false,
      message: "Could not reach server. You've been signed out locally.",
    };
  }
}

/**
 * registerAndLogin
 * ----------------
 * Verifies the registration OTP.  On success, stores JWT tokens in
 * HTTP-only cookies — identical behaviour to verifyOtpAndLogin — so
 * the user is immediately authenticated after signing up.
 *
 * Parameters:
 *   phone_number – the number used during registration
 *   otp          – the 4-digit code the user received
 *
 * Returns: Promise<{ success: boolean; message: string }>
 */
export async function registerAndLogin(
  phone_number: string,
  otp: string,
): Promise<AuthActionResult> {
  try {
    const data = await registerVerifyOtpApi(phone_number, otp);

    if (!data.success || !data.data) {
      return {
        success: false,
        message: data.message || "OTP verification failed",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("access_token", data.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("refresh_token", data.data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return { success: true, message: "Registration complete. Welcome!" };
  } catch {
    return { success: false, message: "Failed to verify OTP" };
  }
}

export async function clearTokensAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}
