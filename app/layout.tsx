import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VirtualWallet — The crypto wallet you control",
  description:
    "A self-custody wallet experience for mobile and browser with multi-network support."
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
