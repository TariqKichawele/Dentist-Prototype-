"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/providers/booking-provider";
import { Sparkles, Shield, Stethoscope } from "lucide-react";

const SERVICE_CATEGORIES = [
  {
    id: "preventative",
    title: "Preventative Care",
    description: "Routine Cleanings, X-Rays, Check-ups",
    icon: Shield,
    services: ["Routine Cleaning", "Dental X-Rays", "Annual Check-up"],
    highlight: "High-volume lead generator",
  },
  {
    id: "restorative",
    title: "Advanced Restorative",
    description: "Root Canals, Crowns, Fillings",
    icon: Stethoscope,
    services: ["Root Canal", "Dental Crown", "Tooth Filling"],
    highlight: "Pain-driven, high-intent leads",
  },
  {
    id: "cosmetic",
    title: "Cosmetic / Aesthetics",
    description: "Veneers, Professional Whitening, Clear Aligners",
    icon: Sparkles,
    services: ["Veneers", "Professional Whitening", "Clear Aligners"],
    highlight: "High-value margin leads",
  },
];

export function ServicesSection() {
  const { openBooking } = useBooking();

  return (
    <section id="services" className="section-container py-16 md:py-24">
      <div className="mb-12 max-w-2xl">
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
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-brand-primary/10">
                  <Icon className="size-6 text-brand-primary" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <CardTitle className="text-lg text-foreground">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {category.services.map((service) => (
                    <li key={service} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-brand-secondary" aria-hidden="true" />
                      {service}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-2 border-t-0 bg-transparent pt-0">
                {category.services.map((service) => (
                  <Button
                    key={service}
                    variant="outline"
                    onClick={() => openBooking(service)}
                    className="h-10 w-full rounded-xl border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5"
                  >
                    Check Availability for {service}
                  </Button>
                ))}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
