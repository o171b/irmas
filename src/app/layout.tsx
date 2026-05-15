import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartSheet } from "@/components/features/cart/CartSheet";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: { default: "IRMAS — Women's Boutique", template: "%s | IRMAS" },
  description:
    "Discover curated women's fashion at IRMAS. Shop the latest in dresses, tops, shoes, accessories, and more.",
  openGraph: {
    title: "IRMAS — Women's Boutique",
    description:
      "Discover curated women's fashion at IRMAS. Shop the latest in dresses, tops, shoes, accessories, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="stylesheet" href="/tailwind.css" />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <CartSheet />
      </body>
    </html>
  );
}
