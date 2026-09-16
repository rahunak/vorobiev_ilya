import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/src/components/ui/sonner";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ремонт и строительство под ключ в Полоцке и Новополоцке — ИП Воробьев И.А.",
  description: "Официальный договор, фиксированная смета, поэтапная оплата. Ремонт квартир, электрика, сантехника, отделка, строительство домов и гаражей. Полоцк, Новополоцк, РБ и РФ.",
  authors: [{ name: "ИП Воробьев И.А." }],
  openGraph: {
    title: "Ремонт и строительство под ключ в Полоцке и Новополоцке — ИП Воробьев И.А.",
    description: "Официальный договор, фиксированная смета, поэтапная оплата. Ремонт квартир, электрика, сантехника, отделка, строительство домов и гаражей. Полоцк, Новополоцк, РБ и РФ.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${unbounded.variable}`}>
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
