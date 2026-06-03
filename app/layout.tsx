import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";




export const metadata: Metadata = {
  title: "Tripzido - Bike Rentals for Every Kind of Trip",
  description: "Great bikes at great prices from trusted rental partners across India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {/* <Header /> */}
        <main className="bg-white text-[#1a1a1a] font-sans min-h-screen">
          {children}
        </main>
        <Footer />
        
<Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      </body>
    </html>
  );
}