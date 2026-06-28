import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import { AuthProvider } from "@/contexts/AuthContext";
import { getIsLoggedIn } from "@/lib/auth";
import { getProfile } from "@/actions/profile.actions";

export const metadata: Metadata = {
  title: "Tripzido - Bike Rentals for Every Kind of Trip",
  description:
    "Great bikes at great prices from trusted rental partners across India.",
};

export const viewport: Viewport = {
  themeColor: "#fed250",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = await getIsLoggedIn();

  let userName: string | null = null;

  if (isLoggedIn) {
    try {
      const profile = await getProfile();
      if (profile) {
        const fullName = [profile.first_name, profile.last_name]
          .filter(Boolean)
          .join(" ")
          .trim();
        userName = fullName || null;
      }
    } catch {
      // token expired / invalid — Header.tsx handles the redirect itself
    }
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider isLoggedIn={isLoggedIn} userName={userName}>
          <main className="bg-white text-font-main-sub font-sans min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>

        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      </body>
    </html>
  );
}
