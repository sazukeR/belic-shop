import type { Metadata } from "next";

import { inter } from "@/config/fonts";

import "./globals.css";

export const metadata: Metadata = {
 title: {
  template: "%s - Belic | Shop",
  default: "Home - Belic | Shop",
 },
 description: "Una tienda virtual de productos",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
 return (
  <html>
   <body className={inter.className}>{children}</body>
  </html>
 );
}
