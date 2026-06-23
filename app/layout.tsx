import type { Metadata } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { PRACTICE_NAME } from "@/lib/practice";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
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
    images: [
      {
        url: "/og-image.svg",
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
    images: ["/og-image.svg"],
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
        <Link href="#main-content" className="skip-link">
          Skip to main content
        </Link>
        {children}
      </body>
    </html>
  );
}
