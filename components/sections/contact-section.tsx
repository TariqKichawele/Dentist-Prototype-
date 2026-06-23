import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  EMAIL,
  EMAIL_HREF,
  FULL_ADDRESS,
  MAIN_PHONE,
  MAIN_PHONE_HREF,
  MAPS_URL,
  OFFICE_HOURS,
  PARKING_NOTE,
} from "@/lib/practice";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="section-container py-16 md:py-24">
      <ScrollReveal>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2>Visit Us</h2>
          <p className="mt-3 text-muted-foreground">
            Conveniently located with free parking. Walk-ins welcome for
            emergencies during office hours.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal delay={100}>
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10">
                <MapPin
                  className="size-5 text-brand-primary"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Address
                </h3>
                <p className="mt-1 text-muted-foreground">{FULL_ADDRESS}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {PARKING_NOTE}
                </p>
                <Button
                  variant="link"
                  className="mt-2 h-auto p-0 text-brand-primary"
                  asChild
                >
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions →
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/10">
                <Clock
                  className="size-5 text-brand-secondary"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Office Hours
                </h3>
                <dl className="mt-2 space-y-1">
                  {OFFICE_HOURS.map(({ day, hours }) => (
                    <div
                      key={day}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <dt className="text-muted-foreground">{day}</dt>
                      <dd className="font-medium text-foreground">{hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10">
                  <Phone
                    className="size-5 text-brand-accent"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Phone
                  </h3>
                  <a
                    href={MAIN_PHONE_HREF}
                    className="mt-1 block text-brand-primary hover:underline"
                  >
                    {MAIN_PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10">
                  <Mail
                    className="size-5 text-brand-primary"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Email
                  </h3>
                  <a
                    href={EMAIL_HREF}
                    className="mt-1 block text-brand-primary hover:underline"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="overflow-hidden rounded-2xl border border-border bg-muted">
            <iframe
              title="Gentle Dental Care office location on Google Maps"
              src="https://maps.google.com/maps?q=123+Smile+Avenue+Dental&output=embed"
              className="aspect-[4/3] w-full border-0 lg:aspect-square"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
