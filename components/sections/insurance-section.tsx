"use client";

import { PartnerLogo } from "@/components/ui/partner-logo";
import { INSURANCE_PARTNERS } from "@/lib/brand-assets";

const MARQUEE_ITEMS = [...INSURANCE_PARTNERS, ...INSURANCE_PARTNERS];

export function InsuranceSection() {
  return (
    <section
      id="insurance"
      className="partner-marquee w-full border-y border-border bg-surface-white py-5 md:py-6"
      aria-label="Accepted insurance plans"
    >
      <div className="partner-marquee-viewport overflow-hidden">
        <ul className="partner-marquee-track flex w-max items-center">
          {MARQUEE_ITEMS.map((partner, index) => (
            <li
              key={`${partner.name}-${index}`}
              className="flex shrink-0 items-center justify-center px-8 md:px-12"
              aria-hidden={index >= INSURANCE_PARTNERS.length}
            >
              <PartnerLogo
                name={partner.name}
                src={partner.logo}
                variant="strip"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
