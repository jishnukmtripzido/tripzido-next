// components/layout/Header.tsx
import { getIsLoggedIn ,getRefreshToken} from "@/lib/auth";
import HeaderClient from "./HeaderClient";

type HeaderProps = {
  logoWidth?: number;
  logoHeight?: number;
  logoTextSize?: string;
  linkIconsSize?: number;
  userNameFirstLetterSize?: number;
  userNameFirstLetter?: string;
  headerLgScreenMx?: string;
  headerValues?: string;
};

export default async function Header({
  logoWidth,
  logoHeight,
  logoTextSize,
  linkIconsSize,
  userNameFirstLetterSize,
  userNameFirstLetter,
  headerLgScreenMx,
  headerValues,
}: HeaderProps) {
  const isLoggedIn = await getIsLoggedIn();
  // const refreshToken = await getRefreshToken();


  return (
    <HeaderClient
      isLoggedIn={isLoggedIn}
      logoWidth={logoWidth}
      logoHeight={logoHeight}
      logoTextSize={logoTextSize}
      linkIconsSize={linkIconsSize}
      userNameFirstLetterSize={userNameFirstLetterSize}
      userNameFirstLetter={userNameFirstLetter}
      headerLgScreenMx={headerLgScreenMx}
      headerValues={headerValues}
    />
  );
}


