"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getBookingHref } from "@/lib/booking";
import { MAIN_PHONE_HREF, PRACTICE_NAME } from "@/lib/practice";
import { Menu, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/#services", label: "Services", sectionId: "services" },
  { href: "/#team", label: "Team", sectionId: "team" },
  { href: "/#results", label: "Results", sectionId: "results" },
  { href: "/#pricing", label: "Pricing", sectionId: "pricing" },
  { href: "/#testimonials", label: "Reviews", sectionId: "testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/#contact", label: "Contact", sectionId: "contact" },
] as const;

const SECTION_IDS = NAV_LINKS.flatMap((l) =>
  "sectionId" in l && l.sectionId ? [l.sectionId] : []
);

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header className="glass-nav">
      <div className="section-container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label={`${PRACTICE_NAME} home`}
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-brand-primary text-sm font-bold text-white">
            GD
          </div>
          <span className="hidden font-semibold text-foreground sm:inline">
            {PRACTICE_NAME}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const sectionId =
              "sectionId" in link ? link.sectionId : undefined;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-primary",
                  sectionId && activeSection === sectionId
                    ? "text-brand-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="gap-0 p-0 sm:max-w-sm">
              <DialogHeader className="border-b border-border px-6 py-4">
                <DialogTitle className="text-left">{PRACTICE_NAME}</DialogTitle>
              </DialogHeader>
              <nav
                className="flex flex-col px-2 py-4"
                aria-label="Mobile navigation"
              >
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 space-y-2 border-t border-border px-2 pt-4">
                  <Button
                    asChild
                    className="focus-glow h-11 w-full rounded-full bg-brand-accent text-white hover:bg-brand-accent-hover"
                  >
                    <Link
                      href={getBookingHref()}
                      onClick={() => setMenuOpen(false)}
                    >
                      Book Appointment
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 w-full rounded-full"
                  >
                    <a href={MAIN_PHONE_HREF}>
                      <Phone className="size-4" aria-hidden="true" />
                      Call Office
                    </a>
                  </Button>
                </div>
              </nav>
            </DialogContent>
          </Dialog>

          <Button
            asChild
            className={cn(
              "focus-glow hidden rounded-full bg-brand-accent px-6 text-white hover:bg-brand-accent-hover md:inline-flex",
              "h-10 text-sm font-semibold"
            )}
          >
            <Link href={getBookingHref()}>Book Appointment</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function MobileNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t border-slate-100 bg-white/95 px-4 py-3 backdrop-blur-md md:hidden"
      aria-label="Mobile navigation"
    >
      <a
        href={MAIN_PHONE_HREF}
        className="flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-brand-primary"
      >
        <Phone className="size-5" aria-hidden="true" />
        Call Office
      </a>
      <Button
        asChild
        className="focus-glow h-12 flex-[2.2] rounded-full bg-brand-accent text-base font-semibold text-white hover:bg-brand-accent-hover"
      >
        <Link href={getBookingHref()}>Book Now</Link>
      </Button>
    </nav>
  );
}
