import type { Metadata } from "next";
import "./globals.css";
import CartDrawer from "./components/CartDrawer"; // Import Drawer
import { Gravitas_One } from "next/font/google";
import "@fontsource/bbh-sans-bartle";

const gravitas = Gravitas_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gravitas",
});

export const metadata: Metadata = {
  title: "I'M NOT HUMAN | Streetwear & Digital Art",
  description: "Discover rare unisex collections and complete style sets. Curated by Rootrager & Melika.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gravitas.variable} antialiased`}
      >
        <CartDrawer /> {/* Global Cart Drawer */}
        {children}
      </body>
    </html>
  );
}
