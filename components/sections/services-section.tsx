import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SERVICE_CATEGORIES } from "@/lib/services";
import { Sparkles, Shield, Stethoscope, type LucideIcon } from "lucide-react";

const ICONS: Record<(typeof SERVICE_CATEGORIES)[number]["icon"], LucideIcon> = {
  shield: Shield,
  stethoscope: Stethoscope,
  sparkles: Sparkles,
};

export function ServicesSection() {
  return (
    <section id="services" className="section-container py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2>Services Designed Around Your Needs</h2>
        <p className="mt-3 text-muted-foreground">
          Clear, jargon-free care categories so you can find exactly what you
          need and book in seconds.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {SERVICE_CATEGORIES.map((category) => {
          const Icon = ICONS[category.icon];
          return (
            <Card
              key={category.slug}
              className="flex flex-col gap-2 rounded-xl border-border bg-surface-white shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-col items-center gap-2 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand-primary/10">
                  <Icon
                    className="size-6 text-brand-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <CardTitle className="w-full text-center text-lg text-foreground">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center pb-0">
                <p className="text-center text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col border-0 bg-transparent pt-2 pb-6">
                <Button
                  asChild
                  variant="outline"
                  className="focus-glow w-full rounded-full border-brand-primary text-brand-primary hover:bg-brand-primary/5"
                >
                  <Link href={`/services/${category.slug}`}>Learn more</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
