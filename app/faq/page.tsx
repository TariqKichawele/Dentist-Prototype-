import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { getBookingHref } from "@/lib/booking";
import { FAQ_ITEMS } from "@/lib/faq";
import { PRACTICE_NAME } from "@/lib/practice";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${PRACTICE_NAME}`,
  description:
    "Insurance, first visits, emergencies, pricing, anxiety, kids, payments, and more — clear answers from Gentle Dental Care.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <MarketingShell>
      <JsonLd data={buildFaqPageJsonLd(FAQ_ITEMS, "/faq")} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <main id="main-content" className="bg-ice-bg">
        <div className="section-container py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/#faq"
              className="text-sm font-medium text-brand-primary hover:underline"
            >
              ← Back to home
            </Link>
            <h1 className="mt-6">Frequently Asked Questions</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Everything patients usually ask before booking — insurance,
              comfort options, kids, payments, and same-day care.
            </p>

            <div className="mt-10 rounded-2xl border border-border bg-surface-white px-4 py-2 sm:px-6">
              <FaqAccordion items={FAQ_ITEMS} />
            </div>

            <div className="mt-12 rounded-2xl bg-brand-primary/5 px-6 py-8 text-center sm:px-10">
              <h2 className="text-xl font-semibold text-foreground">
                Still have a question?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Book online in under two minutes, or call the office — we&apos;re
                happy to help before your visit.
              </p>
              <Button
                asChild
                className="focus-glow mt-6 rounded-full bg-brand-accent px-8 text-white hover:bg-brand-accent-hover"
              >
                <Link href={getBookingHref()}>Book Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </MarketingShell>
  );
}
