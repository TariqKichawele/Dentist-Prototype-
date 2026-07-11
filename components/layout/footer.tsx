import Link from "next/link";
import { getBookingHref } from "@/lib/booking";
import {
  EMAIL,
  EMAIL_HREF,
  FULL_ADDRESS,
  MAIN_PHONE,
  MAIN_PHONE_HREF,
  MAPS_URL,
  OFFICE_HOURS,
  PRACTICE_NAME,
  SOCIAL_LINKS,
} from "@/lib/practice";
import { SocialIconLink } from "@/components/ui/social-icon-link";

const QUICK_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/articles", label: "Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/#team", label: "Our Team" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
  { href: getBookingHref(), label: "Book Online" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/accessibility", label: "Accessibility" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-white py-12 md:py-16">
      <div className="section-container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label={`${PRACTICE_NAME} home`}
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-brand-primary text-sm font-bold text-white">
                GD
              </div>
              <span className="font-semibold text-foreground">
                {PRACTICE_NAME}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Gentle, anxiety-free dental care tailored to your schedule.
              Accepting new patients.
            </p>
            <div className="mt-4 flex gap-3">
              <SocialIconLink
                platform="instagram"
                href={SOCIAL_LINKS.instagram}
              />
              <SocialIconLink
                platform="facebook"
                href={SOCIAL_LINKS.facebook}
              />
              <SocialIconLink platform="google" href={SOCIAL_LINKS.google} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={MAIN_PHONE_HREF}
                  className="hover:text-brand-primary"
                >
                  {MAIN_PHONE}
                </a>
              </li>
              <li>
                <a href={EMAIL_HREF} className="hover:text-brand-primary">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-primary"
                >
                  {FULL_ADDRESS}
                </a>
              </li>
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-foreground">
              Hours
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {OFFICE_HOURS.map(({ day, hours }) => (
                <li key={day}>
                  {day}: {hours}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              <a
                href="/forms/new-patient.pdf"
                className="font-medium text-brand-primary hover:underline"
              >
                Download new patient forms
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8 text-center text-sm text-muted-foreground md:text-left">
          <p>
            © {new Date().getFullYear()} {PRACTICE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
