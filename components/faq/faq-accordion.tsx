import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type FaqItem } from "@/lib/faq";
import {
  EMERGENCY_PHONE,
  EMERGENCY_PHONE_HREF,
  MAIN_PHONE_HREF,
} from "@/lib/practice";

function FaqAnswer({ item }: { item: FaqItem }) {
  if (item.id === "insurance") {
    const [before, after] = item.answer.split("Call us");
    return (
      <p>
        {before}
        <a href={MAIN_PHONE_HREF} className="font-medium text-brand-primary">
          Call us
        </a>
        {after}
      </p>
    );
  }

  if (item.id === "emergency") {
    const [before, after] = item.answer.split(EMERGENCY_PHONE);
    return (
      <p>
        {before}
        <a
          href={EMERGENCY_PHONE_HREF}
          className="font-semibold text-destructive hover:underline"
        >
          {EMERGENCY_PHONE}
        </a>
        {after}
      </p>
    );
  }

  return <p>{item.answer}</p>;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <FaqAnswer item={item} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
