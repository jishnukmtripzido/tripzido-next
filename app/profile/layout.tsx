import { ReactNode } from "react";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "My Profile | Tripzido",
  description: "Manage your Tripzido account, bookings, and preferences.",
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header
        logoWidth={4}
        logoHeight={4}
        logoTextSize="xl"
        linkIconsSize={4}
        userNameFirstLetterSize={8}
        userNameFirstLetter="J"
        headerLgScreenMx="xl:mx-[80.5px] xl:px-0"
        headerValues=" w-full  py-2 border-b border-gray-100 text-gray-900"
      />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="mx-auto px-4 lg:px-8 xl:mx-[121.5px] xl:px-0">
          {children}
        </div>
      </div>
    </>
  );
}
