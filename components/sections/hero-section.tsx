import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBookingHref } from "@/lib/booking";
import { Award, ShieldCheck, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="section-container py-12 md:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative z-10 flex min-w-0 flex-col gap-8 overflow-hidden">
          <div className="space-y-4">
            <h1>Gentle Dental Care Tailored to Your Schedule.</h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Book a routine cleaning or specialized procedure online in under 2
              minutes. Accepting new patients and all major insurance.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="focus-glow h-12 w-full rounded-full bg-brand-accent px-8 text-base font-semibold text-white hover:bg-brand-accent-hover sm:w-fit"
          >
            <Link href={getBookingHref()}>
              Book Online Now — Free First Consultation
            </Link>
          </Button>

          <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <Star
                className="size-3.5 shrink-0 fill-warning text-warning"
                aria-hidden="true"
              />
              Google Rating 4.9★ (320+ reviews)
            </span>
            <span className="hidden sm:inline text-border" aria-hidden="true">
              |
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck
                className="size-3.5 shrink-0 text-brand-secondary"
                aria-hidden="true"
              />
              ADA Certified
            </span>
            <span className="hidden sm:inline text-border" aria-hidden="true">
              |
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Award
                className="size-3.5 shrink-0 text-brand-primary"
                aria-hidden="true"
              />
              Invisalign Provider
            </span>
          </div>
        </div>

        <div className="relative z-0 aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-square">
          <Image
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
            alt="Dr. Sarah Johnson greeting a patient in a modern, sunlit dental office clinical environment"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
