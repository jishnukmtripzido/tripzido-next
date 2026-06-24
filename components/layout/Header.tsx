// components/layout/Header.tsx
import { redirect } from "next/navigation";
import { getIsLoggedIn } from "@/lib/auth";
import { getProfile } from "@/actions/profile.actions";
import HeaderClient from "./HeaderClient";

type HeaderProps = {
  logoWidth?: number;
  logoHeight?: number;
  logoTextSize?: string;
  linkIconsSize?: number;
  headerLgScreenMx?: string;
  headerValues?: string;
};

export default async function Header({
  logoWidth,
  logoHeight,
  logoTextSize,
  linkIconsSize,
  headerLgScreenMx,
  headerValues,
}: HeaderProps) {
  const isLoggedIn = await getIsLoggedIn();

  let userName: string | null = null;

  if (isLoggedIn) {
    let profile = null;
    try {
      profile = await getProfile();
    } catch {
      // token expired / invalid — redirect to route handler which clears cookies
    }

    if (!profile) {
      redirect("/api/auth/clear-session");
    }

    const fullName = [profile.first_name, profile.last_name]
      .filter(Boolean)
      .join(" ")
      .trim();
    userName = fullName || null;
  }

  return (
    <HeaderClient
      isLoggedIn={isLoggedIn}
      logoWidth={logoWidth}
      logoHeight={logoHeight}
      logoTextSize={logoTextSize}
      linkIconsSize={linkIconsSize}
      headerLgScreenMx={headerLgScreenMx}
      headerValues={headerValues}
      userName={userName}
    />
  );
}
