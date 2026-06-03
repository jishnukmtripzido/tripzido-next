"use server";

import { cookies } from "next/headers";

export async function logoutAction(): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const accessToken = cookieStore.get("access_token")?.value;

  if (!refreshToken) {
    // No refresh token — just clear cookies and treat as logged out
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return { success: true, message: "Logged out successfully" };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Even if backend fails, clear cookies so user is effectively logged out client-side
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");
      return {
        success: false,
        message: data?.message || "Logout failed on server, but you've been signed out locally.",
      };
    }

    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return { success: true, message: data?.message || "Logged out successfully" };
  } catch {
    // Network error — still clear cookies
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return {
      success: false,
      message: "Could not reach server. You've been signed out locally.",
    };
  }
}