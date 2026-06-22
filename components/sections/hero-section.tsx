"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBooking } from "@/components/providers/booking-provider";
import { Award, ShieldCheck, Star } from "lucide-react";

const SERVICES = [
  "Routine Cleaning",
  "Cosmetic Consultation",
  "Emergency Visit",
  "Whitening",
];

export function HeroSection() {
  const { openBooking } = useBooking();

  return (
    <section className="section-container py-12 md:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative z-10 flex min-w-0 flex-col gap-8">
          <div className="space-y-4">
            <h1>Gentle Dental Care Tailored to Your Schedule.</h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Book a routine cleaning or specialized procedure online in under 2
              minutes. Accepting new patients and all major insurance.
            </p>
          </div>

          <div className="grid gap-4 rounded-2xl border border-border bg-surface-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <div className="flex flex-col gap-2">
              <label htmlFor="zip-code" className="text-xs font-medium text-foreground">
                Zip Code
              </label>
              <Input
                id="zip-code"
                placeholder="Enter your zip code"
                className="h-11 rounded-xl focus-visible:border-brand-primary focus-visible:ring-brand-primary/15"
                aria-label="Zip code"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="service-select" className="text-xs font-medium text-foreground">
                Service
              </label>
              <Select>
                <SelectTrigger
                  id="service-select"
                  size="default"
                  className="!h-11 w-full rounded-xl focus-visible:border-brand-primary focus-visible:ring-brand-primary/15"
                  aria-label="Select a service"
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((service) => (
                    <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, "-")}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <span className="hidden text-xs sm:block sm:invisible" aria-hidden="true">
                Action
              </span>
              <Button
                onClick={() => openBooking()}
                className="h-11 w-full rounded-full bg-brand-accent px-6 font-semibold text-white hover:bg-brand-accent-hover sm:w-auto"
              >
                Book Online Now
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => openBooking()}
              size="lg"
              className="h-12 w-full rounded-full bg-brand-accent px-8 text-base font-semibold text-white hover:bg-brand-accent-hover sm:w-fit"
            >
              Book Online Now — Free First Consultation
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-12 w-full justify-start rounded-full px-0 text-brand-primary hover:bg-brand-primary/5 sm:w-fit sm:px-4"
              asChild
            >
              <a href="#pricing">View Price Transparency Guide</a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <Star className="size-4 fill-warning text-warning" aria-hidden="true" />
              Google Rating 4.9★ (320+ reviews)
            </span>
            <span className="hidden text-border sm:inline" aria-hidden="true">|</span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-brand-secondary" aria-hidden="true" />
              ADA Certified
            </span>
            <span className="hidden text-border sm:inline" aria-hidden="true">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Award className="size-4 text-brand-primary" aria-hidden="true" />
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
