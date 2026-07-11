import type { Metadata } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { PRACTICE_NAME } from "@/lib/practice";
import { buildDentistJsonLd } from "@/lib/seo/schemas";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${PRACTICE_NAME} | Book Online in Under 2 Minutes`,
  description:
    "Book a routine cleaning or specialized procedure online. Accepting new patients and all major insurance. Gentle, anxiety-free dental care tailored to your schedule.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `${PRACTICE_NAME} | Book Online in Under 2 Minutes`,
    description:
      "Gentle, anxiety-free dental care. Book online in under 2 minutes. Accepting new patients and all major insurance.",
    type: "website",
    locale: "en_US",
    siteName: PRACTICE_NAME,
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${PRACTICE_NAME} — Book your appointment online`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRACTICE_NAME} | Book Online`,
    description:
      "Gentle, anxiety-free dental care. Book online in under 2 minutes.",
    images: ["/og-image.png"],
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
      className={`${jakarta.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col pb-20 md:pb-0">
        <JsonLd data={buildDentistJsonLd()} />
        <Link href="#main-content" className="skip-link">
          Skip to main content
        </Link>
        {children}
      </body>
    </html>
  );
}
