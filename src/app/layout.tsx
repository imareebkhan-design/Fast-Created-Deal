import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL = "https://www.fastcreditdeal.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Fast Credit Deal | Reduce Your EMI by ₹20K–₹50K/Month",
  description:
    "Consolidate multiple loans into one. Lower your monthly EMI by ₹20,000–₹50,000. Free analysis in 2 hours. 13 years · 40+ bank partners.",
  keywords: [
    "EMI consolidation",
    "loan consolidation India",
    "reduce EMI",
    "personal loan consolidation",
    "salaried loan help",
    "Delhi NCR loan",
    "Mumbai loan",
    "Bangalore loan",
    "Fast Credit Deal",
  ],
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Fast Credit Deal | Reduce Your EMI by ₹20K–₹50K/Month",
    description:
      "We consolidate your multiple loans into one — cutting your monthly EMI by ₹20,000–₹50,000. Free analysis. WhatsApp response in 2 hours.",
    siteName: "Fast Credit Deal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fast Credit Deal — EMI Consolidation Specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast Credit Deal | Reduce Your EMI by ₹20K–₹50K/Month",
    description:
      "Consolidate your loans. Cut your EMI by ₹20,000–₹50,000/month. Free analysis in 2 hours.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} !scroll-smooth h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FAFAFA" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
