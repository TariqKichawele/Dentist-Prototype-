import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, Moon } from "lucide-react";

const GUARANTEES = [
  {
    icon: CreditCard,
    title: "No Insurance? No Problem.",
    description:
      "Our in-house membership plan covers cleanings, exams, and discounts on all treatments — starting at $29/month.",
  },
  {
    icon: Moon,
    title: "Sedation Options Available.",
    description:
      "Nitrous oxide and oral sedation for anxious patients. Our team is trained in gentle, fear-free techniques.",
  },
  {
    icon: Calendar,
    title: "Real-Time Online Scheduling.",
    description:
      "See live availability and book instantly. No more waiting days for a callback from the front desk.",
  },
];

export function GuaranteeSection() {
  return (
    <section className="bg-surface-white py-16 md:py-24">
      <div className="section-container">
        <div className="mb-12 text-center">
          <h2>The Anxiety-Free Guarantee</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            We remove the barriers that keep people from getting the care they
            need.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {GUARANTEES.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="rounded-xl border-border bg-ice-bg text-center shadow-sm"
              >
                <CardHeader className="flex flex-col items-center justify-center gap-4 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-secondary/10">
                    <Icon className="size-7 text-brand-secondary" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <CardTitle className="w-full text-center text-lg text-foreground">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
