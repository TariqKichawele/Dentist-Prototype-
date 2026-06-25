"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, ChevronLeft, ChevronRight, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Practitioner } from "@/lib/database.types";

type TeamCarouselProps = {
  team: Practitioner[];
};

export function TeamCarousel({ team }: TeamCarouselProps) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const current = team[index % team.length];

  const changeIndex = (next: number) => {
    setAnimating(true);
    setTimeout(() => {
      setIndex(next);
      setAnimating(false);
    }, 150);
  };

  const goNext = () => changeIndex((index + 1) % team.length);
  const goPrev = () => changeIndex((index - 1 + team.length) % team.length);

  if (!current) return null;

  return (
    <div>
      <div
        className={cn(
          "grid items-center gap-10 transition-opacity duration-150 lg:grid-cols-2 lg:gap-16",
          animating ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-square">
          {current.image_url && (
            <Image
              src={current.image_url}
              alt={`${current.name}, dentist at Gentle Dental Care`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-2xl font-semibold text-foreground">
              {current.name}
            </h3>
            {current.role && (
              <p className="mt-1 text-brand-secondary">{current.role}</p>
            )}
          </div>

          {current.bio && (
            <p className="leading-relaxed text-muted-foreground">{current.bio}</p>
          )}

          {current.credentials?.length > 0 && (
            <ul className="flex flex-wrap gap-3">
              {current.credentials.map((credential) => (
                <li
                  key={credential}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-1.5 text-sm font-medium text-brand-primary"
                >
                  <Award className="size-4 shrink-0" aria-hidden="true" />
                  {credential}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            <div className="flex items-start gap-3">
              <GraduationCap
                className="mt-0.5 size-5 shrink-0 text-brand-secondary"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  University of Michigan, DDS
                </p>
                <p className="text-sm text-muted-foreground">
                  15+ years in practice
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Heart
                className="mt-0.5 size-5 shrink-0 text-brand-accent"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Anxiety-free approach
                </p>
                <p className="text-sm text-muted-foreground">
                  Sedation & gentle techniques
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {team.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goPrev}
            aria-label="Previous team member"
            className="rounded-full"
          >
            <ChevronLeft />
          </Button>
          <span className="min-w-16 text-center text-sm text-muted-foreground">
            {index + 1} / {team.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={goNext}
            aria-label="Next team member"
            className="rounded-full"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
