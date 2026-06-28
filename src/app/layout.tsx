import type { Metadata } from "next";
import { Playfair_Display, Barlow, Barlow_Condensed } from "next/font/google";
import { CartProvider } from "@/lib/cart/CartContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ANFASSC — Authentic Nigeria Football & Allied Sports Supporters Club",
    template: "%s | ANFASSC",
  },
  description:
    "Nigeria's official, CAF-recognised and FIFA-endorsed football supporters club. Over 30 years of supporting the Super Eagles and Nigerian athletes worldwide.",
  keywords: ["ANFASSC", "Nigeria football supporters", "Super Eagles", "CAF", "FIFA", "AFCON"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://authenticnfassc.org"),
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "ANFASSC",
    title: "ANFASSC — Nigeria's Official Football Supporters Club",
    description: "CAF-recognised & FIFA-endorsed. Over 30 years supporting the Super Eagles.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANFASSC — Nigeria's Official Football Supporters Club",
    description: "CAF-recognised & FIFA-endorsed. Over 30 years supporting the Super Eagles.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}