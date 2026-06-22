"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  id: number;
  name: string;
  service: string;
  category: string;
  rating: number;
  text: string;
  image: string;
  verified: boolean;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Maria G.",
    service: "Professional Whitening",
    category: "whitening",
    rating: 5,
    text: "I was nervous about whitening but the team made me feel completely at ease. Results were incredible — 6 shades brighter in one visit!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    verified: true,
  },
  {
    id: 2,
    name: "James T.",
    service: "Routine Cleaning",
    category: "cleaning",
    rating: 5,
    text: "Best dental experience I've ever had. Online booking took 90 seconds and I was in and out in under an hour. Zero pain.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    verified: true,
  },
  {
    id: 3,
    name: "Priya S.",
    service: "Clear Aligners",
    category: "cosmetic",
    rating: 5,
    text: "The Invisalign consultation was thorough and honest. No pressure, just clear options. My smile transformation is almost complete!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    verified: true,
  },
  {
    id: 4,
    name: "David L.",
    service: "Emergency Visit",
    category: "emergency",
    rating: 5,
    text: "Called with a cracked tooth at 8pm. They got me in the next morning and fixed it same day. Lifesavers.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    verified: true,
  },
];

const FILTERS = [
  { id: "all", label: "All Reviews" },
  { id: "whitening", label: "Whitening" },
  { id: "cleaning", label: "Cleanings" },
  { id: "cosmetic", label: "Cosmetic" },
  { id: "emergency", label: "Emergency" },
];

export function TestimonialsSection() {
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(0);

  const filtered =
    filter === "all"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === filter);

  const current = filtered[index % filtered.length] ?? TESTIMONIALS[0];

  const goNext = () => setIndex((i) => (i + 1) % filtered.length);
  const goPrev = () => setIndex((i) => (i - 1 + filtered.length) % filtered.length);

  const handleFilter = (id: string) => {
    setFilter(id);
    setIndex(0);
  };

  return (
    <section id="testimonials" className="section-container py-16 md:py-24">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2>What Our Patients Say</h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Real reviews from real patients — filter by the service you&apos;re
            considering.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter testimonials">
          {FILTERS.map((f) => (
            <Button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              variant={filter === f.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilter(f.id)}
              className={cn(
                "rounded-full",
                filter === f.id && "bg-brand-primary text-white hover:bg-brand-primary/90"
              )}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden rounded-2xl border-border bg-surface-white shadow-sm">
        <CardContent className="p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <div className="relative mx-auto size-24 shrink-0 overflow-hidden rounded-full md:mx-0 md:size-28">
              <Image
                src={current.image}
                alt={`${current.name}, patient`}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="mb-3 flex items-center justify-center gap-1 md:justify-start">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-warning text-warning"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-foreground">
                &ldquo;{current.text}&rdquo;
              </blockquote>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <p className="font-semibold text-foreground">{current.name}</p>
                <Badge variant="outline" className="rounded-full border-brand-secondary/30 text-brand-secondary">
                  {current.service}
                </Badge>
                {current.verified && (
                  <Badge className="rounded-full bg-success/10 text-success hover:bg-success/10">
                    Verified Patient
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex justify-center gap-2 md:flex-col">
              <Button
                variant="outline"
                size="icon"
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="rounded-full"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goNext}
                aria-label="Next testimonial"
                className="rounded-full"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
