import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getBookingHref } from "@/lib/booking";
import { MAIN_PHONE, MAIN_PHONE_HREF } from "@/lib/practice";
import { Calendar, Phone } from "lucide-react";

export function CtaSection() {
  return (
    <section className="bg-brand-primary py-16 md:py-20">
      <div className="section-container">
        <ScrollReveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <div className="space-y-4">
              <h2 className="text-white">
                Ready for a Healthier, Brighter Smile?
              </h2>
              <p className="text-lg text-white/80">
                Book online in under 2 minutes — or call us at {MAIN_PHONE} to
                speak with our friendly front desk team.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                asChild
                size="lg"
                className="focus-glow h-12 rounded-full bg-brand-accent px-8 text-base font-semibold text-white hover:bg-brand-accent-hover"
              >
                <Link href={getBookingHref()}>
                  <Calendar className="size-5" aria-hidden="true" />
                  Book Your Appointment
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="focus-glow h-12 rounded-full border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <a href={MAIN_PHONE_HREF}>
                  <Phone className="size-5" aria-hidden="true" />
                  Call {MAIN_PHONE}
                </a>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
