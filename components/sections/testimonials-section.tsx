"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { GOOGLE_REVIEWS_URL } from "@/lib/practice";

type Testimonial = {
  id: number;
  name: string;
  service: string;
  category: string;
  rating: number;
  text: string;
  when: string;
};

const PAGE_SIZE = 6;

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Maria G.",
    service: "Whitening",
    category: "whitening",
    rating: 5,
    when: "2 weeks ago",
    text: "I put off whitening for years because I thought it would hurt. It didn't. Dr. Sarah walked me through everything, and I was in and out in about an hour. My husband noticed the difference that night.",
  },
  {
    id: 2,
    name: "James T.",
    service: "Cleaning",
    category: "cleaning",
    rating: 5,
    when: "a month ago",
    text: "Booked online during lunch, confirmed in under two minutes. The hygienist (I think her name was Ana) was careful with a sensitive spot I've had for years. No lecture, just solid cleaning. Will keep coming back.",
  },
  {
    id: 3,
    name: "Priya S.",
    service: "Clear Aligners",
    category: "cosmetic",
    rating: 5,
    when: "3 weeks ago",
    text: "I went in for a consult expecting a hard sell on Invisalign. They were honest that I'd need about 10 months and showed me the plan on screen. Started last month and already seeing a shift in my front teeth.",
  },
  {
    id: 4,
    name: "David L.",
    service: "Emergency",
    category: "emergency",
    rating: 5,
    when: "5 days ago",
    text: "Cracked a molar on a Saturday popcorn binge. Called the emergency line around 7pm and they got me in first thing Monday. Fixed it same day. Front desk even helped me figure out what insurance would cover before I left.",
  },
  {
    id: 5,
    name: "Elena R.",
    service: "Family Visit",
    category: "cleaning",
    rating: 5,
    when: "2 months ago",
    text: "Brought both kids (7 and 10) for cleanings. The team was patient with my younger one who gets squirmy. They explained what they were doing instead of just diving in. Big deal for us.",
  },
  {
    id: 6,
    name: "Marcus W.",
    service: "Crown",
    category: "cosmetic",
    rating: 4,
    when: "6 weeks ago",
    text: "Needed a crown after an old filling finally gave out. Waited a bit in the lobby on a busy Thursday, but once I was in the chair everything was calm and clear. Crown looks natural — nobody can tell which tooth it is.",
  },
  {
    id: 7,
    name: "Sofia H.",
    service: "New Patient",
    category: "cleaning",
    rating: 5,
    when: "1 week ago",
    text: "First visit as a new patient. I usually hate dentists. They asked about my anxiety up front and never rushed me. Exam + cleaning + X-rays, and I actually left feeling okay about coming back in six months.",
  },
  {
    id: 8,
    name: "Chris P.",
    service: "Whitening",
    category: "whitening",
    rating: 5,
    when: "3 months ago",
    text: "Did the in-office whitening before my sister's wedding. Not Hollywood fake-white — just a cleaner version of my own smile. Staff followed up the next day to check on sensitivity. Nice touch.",
  },
  {
    id: 9,
    name: "Aisha N.",
    service: "Emergency",
    category: "emergency",
    rating: 4,
    when: "2 months ago",
    text: "Came in with a sudden toothache. They squeezed me in between patients. Pain calmed down after treatment and they gave me a straightforward estimate before doing anything extra. Appreciate that.",
  },
];

const FILTERS = [
  { id: "all", label: "All Reviews" },
  { id: "whitening", label: "Whitening" },
  { id: "cleaning", label: "Cleanings" },
  { id: "cosmetic", label: "Cosmetic" },
  { id: "emergency", label: "Emergency" },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rating
              ? "fill-warning text-warning"
              : "fill-transparent text-border"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);

  const filtered =
    filter === "all"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === filter);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE
  );
  const showPager = filtered.length > PAGE_SIZE;

  const handleFilter = (id: string) => {
    setFilter(id);
    setPage(0);
  };

  return (
    <section id="testimonials" className="section-container py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2>What Our Patients Say</h2>
        <p className="mt-3 text-muted-foreground">
          Recent Google reviews from patients in Smile City — filter by the
          visit you&apos;re considering.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Stars rating={5} />
          <span className="text-sm font-medium text-foreground">
            4.9 average · 320+ Google reviews
          </span>
        </div>
      </div>

      <div
        className="mb-8 flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Filter reviews"
      >
        {FILTERS.map((f) => (
          <Button
            key={f.id}
            id={`tab-${f.id}`}
            role="tab"
            aria-selected={filter === f.id}
            aria-controls="reviews-panel"
            tabIndex={filter === f.id ? 0 : -1}
            variant={filter === f.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilter(f.id)}
            onKeyDown={(e) => {
              const idx = FILTERS.findIndex((x) => x.id === f.id);
              if (e.key === "ArrowRight") {
                handleFilter(FILTERS[(idx + 1) % FILTERS.length].id);
              }
              if (e.key === "ArrowLeft") {
                handleFilter(
                  FILTERS[(idx - 1 + FILTERS.length) % FILTERS.length].id
                );
              }
            }}
            className={cn(
              "rounded-full",
              filter === f.id &&
                "bg-brand-primary text-white hover:bg-brand-primary/90"
            )}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <div
        id="reviews-panel"
        role="tabpanel"
        aria-labelledby={`tab-${filter}`}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((review) => (
          <article
            key={review.id}
            className="flex flex-col rounded-xl border border-border bg-surface-white p-5 text-left shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-sm font-semibold text-brand-primary"
                  aria-hidden="true"
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.when}</p>
                </div>
              </div>
              <span
                className="flex size-7 items-center justify-center rounded-full bg-[#4285F4] text-[11px] font-bold text-white"
                title="Google review"
                aria-label="Google review"
              >
                G
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Stars rating={review.rating} />
              <span className="text-xs text-muted-foreground">
                {review.service}
              </span>
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
              {review.text}
            </p>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No reviews in this category yet.
        </p>
      ) : null}

      {showPager ? (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
            aria-label="Previous reviews"
          >
            <ChevronLeft />
          </Button>
          <span className="text-sm text-muted-foreground">
            {safePage + 1} / {pageCount}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={safePage >= pageCount - 1}
            aria-label="Next reviews"
          >
            <ChevronRight />
          </Button>
        </div>
      ) : null}

      <div className="mt-10 flex justify-center">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline"
        >
          Read all 320+ reviews on Google
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
