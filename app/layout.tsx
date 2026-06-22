import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { BookingProvider } from "@/components/providers/booking-provider";
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
  title: "Gentle Dental Care | Book Online in Under 2 Minutes",
  description:
    "Book a routine cleaning or specialized procedure online. Accepting new patients and all major insurance. Gentle, anxiety-free dental care tailored to your schedule.",
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
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
