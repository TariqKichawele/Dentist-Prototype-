import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { BookingPageContent } from "@/components/booking/booking-page-content";
import { Spinner } from "@/components/ui/spinner";

export const metadata: Metadata = {
  title: "Book Appointment | Gentle Dental Care",
  description:
    "Schedule your dental appointment online in under 2 minutes. Routine cleanings, cosmetic consultations, and emergency visits available.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-[calc(100vh-4rem)] bg-ice-bg py-10 md:py-16">
        <div className="section-container">
          <Suspense
            fallback={
              <div className="flex justify-center py-24">
                <Spinner className="size-8 text-brand-primary" />
              </div>
            }
          >
            <BookingPageContent />
          </Suspense>
        </div>
      </main>
    </>
  );
}
