import { PartnerLogo } from "@/components/ui/partner-logo";
import { INSURANCE_PARTNERS } from "@/lib/brand-assets";

export function InsuranceSection() {
  return (
    <section
      id="insurance"
      className="w-full border-y border-border bg-surface-white py-5 md:py-6"
      aria-label="Accepted insurance plans"
    >
      <ul className="flex w-full flex-nowrap items-stretch">
        {INSURANCE_PARTNERS.map((partner) => (
          <li
            key={partner.name}
            className="flex min-w-0 flex-1 items-center justify-center border-r border-border last:border-r-0"
          >
            <PartnerLogo
              name={partner.name}
              src={partner.logo}
              variant="strip"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
