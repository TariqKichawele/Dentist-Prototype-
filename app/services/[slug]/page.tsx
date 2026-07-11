import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { getBookingHref } from "@/lib/booking";
import { PRACTICE_NAME } from "@/lib/practice";
import {
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo/schemas";
import {
  getAllServiceSlugs,
  getServiceBySlug,
  SERVICE_CATEGORIES,
} from "@/lib/services";
import { Check } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} | ${PRACTICE_NAME}`,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | ${PRACTICE_NAME}`,
      description: service.metaDescription,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = SERVICE_CATEGORIES.filter((s) => s.slug !== service.slug);

  return (
    <MarketingShell>
      <JsonLd data={buildServiceJsonLd(service)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <main id="main-content" className="bg-ice-bg">
        <div className="section-container py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/#services"
              className="text-sm font-medium text-brand-primary hover:underline"
            >
              ← All services
            </Link>

            <p className="mt-6 text-sm font-medium uppercase tracking-wide text-brand-secondary">
              {service.shortTitle} care
            </p>
            <h1 className="mt-2">{service.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {service.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="focus-glow rounded-full bg-brand-accent px-8 text-white hover:bg-brand-accent-hover"
              >
                <Link href={getBookingHref(service.bookingService)}>
                  {service.ctaLabel}
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/faq">Read FAQs</Link>
              </Button>
            </div>

            <div className="mt-12 space-y-10 text-muted-foreground">
              <p className="text-base leading-relaxed text-foreground/90">
                {service.intro}
              </p>

              {service.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-semibold text-foreground">
                    {section.heading}
                  </h2>
                  <p className="mt-3 leading-relaxed">{section.body}</p>
                </section>
              ))}

              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  Who it&apos;s for
                </h2>
                <ul className="mt-4 space-y-3">
                  {service.whoItsFor.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        className="mt-0.5 size-5 shrink-0 text-brand-secondary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  What to expect
                </h2>
                <ul className="mt-4 space-y-3">
                  {service.whatToExpect.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        className="mt-0.5 size-5 shrink-0 text-brand-secondary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  Treatments in this category
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.services.map((name) => (
                    <li
                      key={name}
                      className="rounded-full border border-border bg-surface-white px-4 py-1.5 text-sm text-foreground"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-14 rounded-2xl bg-brand-primary/5 px-6 py-8 text-center sm:px-10">
              <h2 className="text-xl font-semibold text-foreground">
                Ready when you are
              </h2>
              <p className="mt-2 text-muted-foreground">
                Book online in under two minutes. Accepting new patients and most
                major insurance.
              </p>
              <Button
                asChild
                className="focus-glow mt-6 rounded-full bg-brand-accent px-8 text-white hover:bg-brand-accent-hover"
              >
                <Link href={getBookingHref(service.bookingService)}>
                  {service.ctaLabel}
                </Link>
              </Button>
            </div>

            <div className="mt-12 border-t border-border pt-10">
              <h2 className="text-lg font-semibold text-foreground">
                Explore other services
              </h2>
              <ul className="mt-4 space-y-3">
                {otherServices.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/services/${other.slug}`}
                      className="font-medium text-brand-primary hover:underline"
                    >
                      {other.title}
                    </Link>
                    <span className="text-muted-foreground">
                      {" "}
                      — {other.tagline}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </MarketingShell>
  );
}
