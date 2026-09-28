import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VirtualWallet — Kontrol ettiğiniz kripto cüzdanı",
  description:
    "VirtualWallet bağımsız cüzdan arayüzü önizlemesi. Mobil ve masaüstü için tasarlandı; Trust Wallet ile bağlantılı değildir."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
