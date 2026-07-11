import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import {
  formatArticleDate,
  getAllArticleSlugs,
  getArticleBySlug,
} from "@/lib/articles";
import { getBookingHref } from "@/lib/booking";
import { PRACTICE_NAME } from "@/lib/practice";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo/schemas";
import { getServiceBySlug } from "@/lib/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | ${PRACTICE_NAME}`,
    description: article.description,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedService = article.relatedServiceSlug
    ? getServiceBySlug(article.relatedServiceSlug)
    : undefined;

  return (
    <MarketingShell>
      <JsonLd data={buildArticleJsonLd(article)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Articles", path: "/articles" },
          { name: article.title, path: `/articles/${article.slug}` },
        ])}
      />
      <main id="main-content" className="bg-ice-bg">
        <article className="section-container py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/articles"
              className="text-sm font-medium text-brand-primary hover:underline"
            >
              ← All guides
            </Link>

            <header className="mt-6">
              <p className="text-sm text-muted-foreground">
                Published {formatArticleDate(article.datePublished)}
                <span className="mx-2 text-border" aria-hidden="true">
                  ·
                </span>
                Updated {formatArticleDate(article.dateModified)}
                <span className="mx-2 text-border" aria-hidden="true">
                  ·
                </span>
                {article.readingTimeMinutes} min read
              </p>
              <h1 className="mt-3">{article.title}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {article.description}
              </p>
            </header>

            <div className="mt-12 space-y-10">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-semibold text-foreground">
                    {section.heading}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-14 rounded-2xl bg-brand-primary/5 px-6 py-8 text-center sm:px-10">
              <h2 className="text-xl font-semibold text-foreground">
                Ready to book?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Schedule online in under two minutes. We&apos;ll take it from
                there — gently.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  className="focus-glow rounded-full bg-brand-accent px-8 text-white hover:bg-brand-accent-hover"
                >
                  <Link href={getBookingHref()}>Book Appointment</Link>
                </Button>
                {relatedService ? (
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href={`/services/${relatedService.slug}`}>
                      Explore {relatedService.shortTitle}
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      </main>
    </MarketingShell>
  );
}
