import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBookingHref } from "@/lib/booking";
import { PRACTICE_NAME } from "@/lib/practice";

export function HeroSection() {
  return (
    <section
      className="relative isolate min-h-[min(92svh,52rem)] overflow-hidden"
      aria-label="Welcome"
    >
      <div className="absolute inset-0">
        <video
          className="hero-video absolute inset-0 size-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/hero-dental-poster.jpg"
          aria-hidden="true"
        >
          <source src="/videos/hero-dental.mp4" type="video/mp4" />
        </video>
        <Image
          src="/videos/hero-dental-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover motion-safe:hidden"
          aria-hidden="true"
        />
        {/* Bright family-friendly wash — readable copy, video stays luminous */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/75 to-white/55 md:bg-gradient-to-r md:from-white md:via-white/88 md:to-sky-50/30"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ice-bg via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="section-container relative flex min-h-[min(92svh,52rem)] flex-col justify-center py-16 md:py-24">
        <div className="flex max-w-xl flex-col gap-6 md:gap-8">
          <div className="hero-enter space-y-4">
            <h1 className="font-display text-[2.5rem] leading-[1.1] font-bold tracking-tight text-brand-primary md:text-6xl lg:text-7xl">
              {PRACTICE_NAME}
            </h1>
            <p className="max-w-md text-xl font-medium leading-snug text-foreground md:text-2xl">
              Smiles for every member of the family.
            </p>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Book a cleaning or specialized visit online in under 2 minutes.
              New patients welcome.
            </p>
          </div>

          <div className="hero-enter hero-enter-delay">
            <Button
              asChild
              size="lg"
              className="focus-glow h-12 w-full rounded-full bg-brand-accent px-8 text-base font-semibold text-white hover:bg-brand-accent-hover sm:w-fit"
            >
              <Link href={getBookingHref()}>
                Book Online Now — Free First Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
