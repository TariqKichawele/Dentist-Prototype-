"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBooking } from "@/components/providers/booking-provider";
import { Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const { openBooking } = useBooking();

  return (
    <header className="glass-nav">
      <div className="section-container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2" aria-label="Gentle Dental Care home">
          <div className="flex size-9 items-center justify-center rounded-xl bg-brand-primary text-sm font-bold text-white">
            GD
          </div>
          <span className="hidden font-semibold text-foreground sm:inline">
            Gentle Dental Care
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          onClick={() => openBooking()}
          className={cn(
            "hidden rounded-full bg-brand-accent px-6 text-white hover:bg-brand-accent-hover md:inline-flex",
            "h-10 text-sm font-semibold"
          )}
        >
          Book Appointment
        </Button>
      </div>
    </header>
  );
}

export function MobileNav() {
  const { openBooking } = useBooking();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t border-slate-100 bg-white/95 px-4 py-3 backdrop-blur-md md:hidden"
      aria-label="Mobile navigation"
    >
      <a
        href="tel:+15551234567"
        className="flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-brand-primary"
      >
        <Phone className="size-5" aria-hidden="true" />
        Call Office
      </a>
      <Button
        onClick={() => openBooking()}
        className="h-12 flex-[2.2] rounded-full bg-brand-accent text-base font-semibold text-white hover:bg-brand-accent-hover"
      >
        Book Now
      </Button>
    </nav>
  );
}
