// components/layout/Header.tsx
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

  // Fetch user profile if logged in to get the actual username
  let userName: string | null = null;
  if (isLoggedIn) {
    const profile = await getProfile();
    userName = `${profile?.first_name} ${profile?.last_name}` || null;
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
