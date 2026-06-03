"use server";

import { cookies } from "next/headers";

type VerifyOtpPayload = {
  phone_number: string;
  otp: string;
};

type VerifyOtpResponse = {
  success: boolean;
  message: string;
  data?: {
    access_token: string;
    refresh_token: string;
  };
};

export async function verifyOtpAndLogin(
  phone_number: string,
  otp: string
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/users/verify-otp/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: phone_number, otp: otp } satisfies VerifyOtpPayload),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return { success: false, message: "Failed to verify OTP" };
  }

  const data: VerifyOtpResponse = await res.json();

  if (!data.success || !data.data) {
    return { success: false, message: data.message || "OTP verification failed" };
  }

  const cookieStore = await cookies();

  cookieStore.set("access_token", data.data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days — adjust to match your JWT expiry
  });

  // Optionally store refresh token too (longer-lived, same flags)
  cookieStore.set("refresh_token", data.data.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return { success: true, message: "Logged in successfully" };
}