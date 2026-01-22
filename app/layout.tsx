import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "מחשבון גימטריה של אותיות",
  description: "מחשבון לחישוב ערכי גימטריה כולל מילוי (חלקי, מלא) של אותיות בעברית - מילוי יודין, אלפין וההין.",
  openGraph: {
    title: "מחשבון גימטריה של אותיות",
    description: "גלה את המשמעות הנסתרת של המילים - מחשבון גימטריה של אותיות.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
