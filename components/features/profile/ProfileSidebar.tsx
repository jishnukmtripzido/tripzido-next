"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProfile } from "@/actions/profile.actions";

// Icons are defined first so NAV_ITEMS (evaluated at module load) can
// reference them without hitting the temporal dead zone.
const UserIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const NAV_ITEMS = [
  {
    href: "/profile",
    label: "Profile",
    icon: UserIcon,
    isActive: (pathname: string) => pathname === "/profile",
  },
  {
    href: "/profile/bookings/pending",
    label: "Bookings",
    icon: CalendarIcon,
    isActive: (pathname: string) => pathname.startsWith("/profile/bookings"),
  },
] as const;

export default function ProfileSidebar() {
  const pathname = usePathname() ?? "";
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getProfile().then((data) => {
      if (isMounted && data?.name) setName(data.name);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
      {/* User Header */}
      <div className="flex flex-col items-center px-8 py-10 border-b border-gray-50 bg-gradient-to-b from-amber-50/70 to-white">
        <div className="relative w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden mb-4">
          <Image
            src="/icon/man.png"
            alt="Profile avatar"
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <h2 className="text-lg font-bold text-gray-900 text-center">
          {name ?? "Welcome"}
        </h2>
        <p className="text-xs text-gray-400 mt-1">Tripzido member</p>
      </div>

      {/* Navigation — real links now, not state setters */}
      <nav className="flex flex-col py-2">
        {NAV_ITEMS.map((item) => {
          const active = item.isActive(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-8 py-4 text-sm font-medium transition-all duration-200 border-l-4 ${
                active
                  ? "bg-amber-50 text-black border-brand-yellow"
                  : "text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${active ? "text-brand-yellow" : "text-gray-400"}`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
