import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { FEATURED_FAQ_ITEMS } from "@/lib/faq";
import { ArrowRight } from "lucide-react";

export function FaqSection() {
  return (
    <section id="faq" className="bg-surface-white py-16 md:py-24">
      <div className="section-container flex flex-col items-center">
        <div className="mb-10 max-w-2xl text-center">
          <h2>Frequently Asked Questions</h2>
          <p className="mt-3 text-muted-foreground">
            Answers to the questions patients ask most before booking.
          </p>
        </div>

        <div className="w-full max-w-3xl">
          <FaqAccordion items={FEATURED_FAQ_ITEMS} />
        </div>

        <div className="mt-10 max-w-xl text-center">
          <p className="text-sm text-muted-foreground">
            Looking for payment options, kids&apos; visits, cancellations, or
            same-day openings? We cover those too.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-4 rounded-full border-brand-primary text-brand-primary hover:bg-brand-primary/5"
          >
            <Link href="/faq">
              Browse all FAQs
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
