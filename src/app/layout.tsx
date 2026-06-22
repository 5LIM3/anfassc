import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ANFASSC — Authentic Nigeria Football & Allied Sports Supporters Club",
    template: "%s | ANFASSC",
  },
  description: "Nigeria's official, CAF-recognised and FIFA-endorsed football supporters club.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://authenticnfassc.org"),
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "ANFASSC",
    title: "ANFASSC — Nigeria's Official Football Supporters Club",
    description: "CAF-recognised & FIFA-endorsed. Over 30 years supporting the Super Eagles.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Barlow:wght@300;400;500;600;700&family=Barlow+Condensed:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
