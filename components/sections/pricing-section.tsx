import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PRICING_ITEMS = [
  {
    service: "New Patient Special",
    price: "$99",
    description: "Exam, X-rays, and cleaning for uninsured patients",
    popular: true,
  },
  {
    service: "Routine Cleaning",
    price: "$120–$180",
    description: "With insurance, most patients pay $0–$30 copay",
    popular: false,
  },
  {
    service: "Professional Whitening",
    price: "$399",
    description: "In-office treatment, results in one visit",
    popular: false,
  },
  {
    service: "Cosmetic Consultation",
    price: "Free",
    description: "Veneers, aligners, and smile design — no obligation",
    popular: false,
  },
  {
    service: "Emergency Visit",
    price: "$150+",
    description: "Same-day slots available; treatment costs vary",
    popular: false,
  },
  {
    service: "Membership Plan",
    price: "$29/mo",
    description: "2 cleanings/year + 20% off all treatments",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="section-container py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2>Transparent Pricing</h2>
        <p className="mt-3 text-muted-foreground">
          No surprise bills. We provide upfront estimates before any treatment
          begins.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRICING_ITEMS.map((item) => (
          <Card
            key={item.service}
            className={`rounded-xl border-border bg-surface-white ${
              item.popular ? "ring-2 ring-brand-accent" : ""
            }`}
          >
            <CardHeader>
              {item.popular && (
                <span className="mb-1 w-fit rounded-full bg-brand-accent/10 px-3 py-0.5 text-xs font-semibold text-brand-accent">
                  Most Popular
                </span>
              )}
              <CardTitle className="text-lg text-foreground">{item.service}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-brand-primary">{item.price}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button
          variant="outline"
          className="rounded-full border-brand-primary text-brand-primary hover:bg-brand-primary/5"
          asChild
        >
          <a href="#faq">See insurance & payment FAQ</a>
        </Button>
      </div>
    </section>
  );
}
