"use client";

import Link from "next/link";
import Header from "../../layout/HeaderClient";

export default function SearchResultHeaderSmallScreen() {
  return (
    <Header
      logoWidth={4}
      logoHeight={4}
      logoTextSize="xl"
      linkIconsSize={4}
      headerLgScreenMx="xl:mx-[80.5px] xl:px-0"
      headerValues="md:hidden w-full bg-white py-2 border-b border-gray-100 text-gray-900"
    />
  );
}
