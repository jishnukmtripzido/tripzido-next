import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

// 1. Keep your page info here
export const metadata: Metadata = {
  title: "Tripzido - Bike Rentals for Every Kind of Trip",
  description:
    "Great bikes at great prices from trusted rental partners across India.",
};

// 2. Put your browser theme color here
export const viewport: Viewport = {
  themeColor: "#fed250",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {/* <Header /> */}
        <main className="bg-white text-font-main-sub font-sans min-h-screen">
          {children}
        </main>
        <Footer />

        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      </body>
    </html>
  );
}
