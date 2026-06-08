import { api } from "@/lib/api";
import {
  VerifyOtpResponse,
  SendOtpResponse,
  LogoutResponse,
} from "@/types/auth.types";

export async function sendOtpApi(
  phone_number: string,
  turnstile_token: string,
): Promise<SendOtpResponse> {
  return api.post("/api/users/send-otp/", { phone_number, turnstile_token });
}

export async function verifyOtpApi(
  phone_number: string,
  otp: string,
): Promise<VerifyOtpResponse> {
  return api.post<VerifyOtpResponse>("/api/users/verify-otp/", {
    phone_number,
    otp,
  });
}

export async function logoutApi(
  accessToken: string,
  refreshToken: string,
): Promise<LogoutResponse> {
  return api.post<LogoutResponse>(
    "/api/users/logout/",
    { refresh_token: refreshToken },
    { token: accessToken },
  );
}
