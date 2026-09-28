import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VaultView",
  description: "A secure wallet-connected asset dashboard"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
