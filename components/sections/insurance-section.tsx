import { ScrollReveal } from "@/components/ui/scroll-reveal";

const INSURANCE_CARRIERS = [
  "Delta Dental",
  "Cigna",
  "Aetna",
  "MetLife",
  "Guardian",
  "UnitedHealthcare",
  "Humana",
  "Blue Cross",
];

export function InsuranceSection() {
  return (
    <section
      id="insurance"
      className="border-y border-border bg-surface-white py-10 md:py-14"
      aria-label="Accepted insurance plans"
    >
      <div className="section-container">
        <ScrollReveal>
          <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            We accept most major insurance plans
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {INSURANCE_CARRIERS.map((carrier) => (
              <li
                key={carrier}
                className="rounded-lg border border-border bg-ice-bg px-4 py-2.5 text-sm font-semibold text-brand-primary"
              >
                {carrier}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t see your plan?{" "}
            <a href="#faq" className="font-medium text-brand-primary hover:underline">
              Check our FAQ
            </a>{" "}
            or call — we&apos;ll verify your benefits at no cost.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
