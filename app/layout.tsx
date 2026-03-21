import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InfluenceMap — Find the perfect influencers for your brand",
  description:
    "InfluenceMap uses AI to find creators who are the perfect fit for your brand — matched by niche, audience, engagement, and proven track record.",
  openGraph: {
    title: "InfluenceMap — Find the perfect influencers for your brand",
    description:
      "InfluenceMap uses AI to find creators who are the perfect fit for your brand — matched by niche, audience, engagement, and proven track record.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
