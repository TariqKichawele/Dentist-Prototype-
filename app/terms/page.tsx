import type { Metadata } from "next";
import Link from "next/link";
import { PRACTICE_NAME } from "@/lib/practice";

export const metadata: Metadata = {
  title: `Terms of Service | ${PRACTICE_NAME}`,
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main id="main-content" className="section-container py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-brand-primary hover:underline"
        >
          ← Back to home
        </Link>
        <h1 className="mt-6">Terms of Service</h1>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <p>
            By using the {PRACTICE_NAME} website and online booking system, you
            agree to these terms of service.
          </p>
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Online Booking
            </h2>
            <p className="mt-2">
              Appointment requests submitted online are subject to confirmation
              by our office. We will contact you if we need to reschedule or
              verify insurance details before your visit.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Pricing Estimates
            </h2>
            <p className="mt-2">
              Prices displayed on this website are estimates. Final costs depend
              on your insurance coverage, treatment needs, and clinical findings
              during your visit.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Cancellations
            </h2>
            <p className="mt-2">
              Please provide at least 24 hours notice if you need to cancel or
              reschedule your appointment so we can offer the slot to another
              patient.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
