import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBookingHref } from "@/lib/booking";
import { Sparkles, Shield, Stethoscope } from "lucide-react";

const SERVICE_CATEGORIES = [
  {
    id: "preventative",
    title: "Preventative Care",
    description: "Routine Cleanings, X-Rays, Check-ups",
    icon: Shield,
    services: ["Routine Cleaning", "Dental X-Rays", "Annual Check-up"],
    bookingService: "cleaning",
    ctaLabel: "Book Cleaning",
  },
  {
    id: "restorative",
    title: "Advanced Restorative",
    description: "Root Canals, Crowns, Fillings",
    icon: Stethoscope,
    services: ["Root Canal", "Dental Crown", "Tooth Filling"],
    bookingService: "other",
    ctaLabel: "Book Consultation",
  },
  {
    id: "cosmetic",
    title: "Cosmetic / Aesthetics",
    description: "Veneers, Professional Whitening, Clear Aligners",
    icon: Sparkles,
    services: ["Veneers", "Professional Whitening", "Clear Aligners"],
    bookingService: "cosmetic",
    ctaLabel: "Book Cosmetic Consult",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-container py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2>Services Designed Around Your Needs</h2>
        <p className="mt-3 text-muted-foreground">
          Clear, jargon-free care categories so you can find exactly what you
          need and book in seconds.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {SERVICE_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className="flex flex-col rounded-xl border-border bg-surface-white shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-col items-center gap-2 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand-primary/10">
                  <Icon
                    className="size-6 text-brand-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <CardTitle className="w-full text-center text-lg text-foreground">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-center">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col items-center pb-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {category.services.map((service) => (
                    <li key={service} className="flex items-center gap-2">
                      <span
                        className="size-1.5 shrink-0 rounded-full bg-brand-secondary"
                        aria-hidden="true"
                      />
                      {service}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="justify-center border-0 bg-transparent pt-0 pb-6">
                <Button
                  asChild
                  variant="outline"
                  className="focus-glow rounded-full border-brand-primary text-brand-primary hover:bg-brand-primary/5"
                >
                  <Link href={getBookingHref(category.bookingService)}>
                    {category.ctaLabel}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
