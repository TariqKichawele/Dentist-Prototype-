import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { getBookingHref } from "@/lib/booking";
import { PRACTICE_NAME } from "@/lib/practice";
import { buildBreadcrumbJsonLd } from "@/lib/seo/schemas";
import { SERVICE_CATEGORIES } from "@/lib/services";

export const metadata: Metadata = {
  title: `Dental Services | ${PRACTICE_NAME}`,
  description:
    "Preventative, restorative, and cosmetic dental care in Smile City. Clear options, gentle visits, and online booking in under 2 minutes.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesIndexPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <main id="main-content" className="bg-ice-bg">
        <div className="section-container py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/#services"
              className="text-sm font-medium text-brand-primary hover:underline"
            >
              ← Back to home
            </Link>
            <h1 className="mt-6">Dental Services</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Three clear care paths — preventative, restorative, and cosmetic —
              so you can find what you need and book with confidence.
            </p>

            <ul className="mt-10 space-y-4">
              {SERVICE_CATEGORIES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block rounded-2xl border border-border bg-surface-white p-6 transition-shadow hover:shadow-md"
                  >
                    <h2 className="text-xl font-semibold text-foreground">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      {service.description}
                    </p>
                    <p className="mt-3 text-sm font-medium text-brand-primary">
                      Learn more →
                    </p>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-12 text-center">
              <Button
                asChild
                className="focus-glow rounded-full bg-brand-accent px-8 text-white hover:bg-brand-accent-hover"
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
