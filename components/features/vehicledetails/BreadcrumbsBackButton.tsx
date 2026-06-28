"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label }: { label: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
        // After navigation settles, refresh the page
        setTimeout(() => router.refresh(), 300);
      }}
      className="hover:text-font-main-sub transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}
