import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tripzido - Bike Rentals for Every Kind of Trip",
  description:
    "Great bikes at great prices from trusted rental partners across India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
