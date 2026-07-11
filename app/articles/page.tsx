import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import {
  ARTICLES,
  formatArticleDate,
} from "@/lib/articles";
import { PRACTICE_NAME } from "@/lib/practice";
import { buildBreadcrumbJsonLd } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: `Dental Care Guides | ${PRACTICE_NAME}`,
  description:
    "Practical guides from Gentle Dental Care — first visits, emergencies, whitening, and more. Clear advice in plain language.",
  alternates: {
    canonical: "/articles",
  },
};

export default function ArticlesIndexPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Articles", path: "/articles" },
        ])}
      />
      <main id="main-content" className="bg-ice-bg">
        <div className="section-container py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/"
              className="text-sm font-medium text-brand-primary hover:underline"
            >
              ← Back to home
            </Link>
            <h1 className="mt-6">Dental Care Guides</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Short, practical articles to help you prepare for visits, handle
              urgent situations, and choose cosmetic care with confidence.
            </p>

            <ul className="mt-10 space-y-4">
              {ARTICLES.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="block rounded-2xl border border-border bg-surface-white p-6 transition-shadow hover:shadow-md"
                  >
                    <p className="text-sm text-muted-foreground">
                      Updated {formatArticleDate(article.dateModified)}
                      <span className="mx-2 text-border" aria-hidden="true">
                        ·
                      </span>
                      {article.readingTimeMinutes} min read
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-foreground">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      {article.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </MarketingShell>
  );
}
