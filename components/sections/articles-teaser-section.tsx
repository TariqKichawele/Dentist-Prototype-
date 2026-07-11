import Link from "next/link";
import { ARTICLES, formatArticleDate } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

export function ArticlesTeaserSection() {
  return (
    <section id="guides" className="section-container py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2>Guides for Confident Care</h2>
        <p className="mt-3 text-muted-foreground">
          Short reads to help you prepare, decide, and book with less stress.
        </p>
      </div>

      <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        {ARTICLES.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/articles/${article.slug}`}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface-white p-6 transition-shadow hover:shadow-md"
            >
              <p className="text-xs text-muted-foreground">
                Updated {formatArticleDate(article.dateModified)}
              </p>
              <h3 className="mt-2 text-base font-semibold text-foreground">
                {article.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {article.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-primary">
                Read guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center">
        <Link
          href="/articles"
          className="text-sm font-medium text-brand-primary hover:underline"
        >
          View all guides
        </Link>
      </p>
    </section>
  );
}
