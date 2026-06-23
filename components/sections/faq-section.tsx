import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EMERGENCY_PHONE,
  EMERGENCY_PHONE_HREF,
  MAIN_PHONE_HREF,
} from "@/lib/practice";

const FAQ_ITEMS = [
  {
    id: "insurance",
    question: "Do you take my insurance?",
    answer: (
      <p>
        We accept most major dental insurance plans including Delta Dental,
        Cigna, Aetna, MetLife, Guardian, and UnitedHealthcare. Not sure if
        you&apos;re covered?{" "}
        <a href={MAIN_PHONE_HREF} className="font-medium text-brand-primary">
          Call us
        </a>{" "}
        and we&apos;ll verify your benefits before your visit — at no cost to
        you.
      </p>
    ),
  },
  {
    id: "first-visit",
    question: "What happens during my first cleaning visit?",
    answer: (
      <p>
        Your first visit includes a comprehensive exam, digital X-rays (if
        needed), a gentle professional cleaning, and a personalized treatment
        plan. Plan for about 60–90 minutes. We&apos;ll walk you through every
        step so there are no surprises.
      </p>
    ),
  },
  {
    id: "emergency",
    question: "What if I have a dental emergency right now?",
    answer: (
      <p>
        For dental emergencies, call us immediately at{" "}
        <a
          href={EMERGENCY_PHONE_HREF}
          className="font-semibold text-destructive hover:underline"
        >
          {EMERGENCY_PHONE}
        </a>
        . We reserve same-day slots for urgent cases including severe pain,
        knocked-out teeth, and broken restorations. After hours? Our on-call
        dentist will return your call within 30 minutes.
      </p>
    ),
  },
  {
    id: "pricing",
    question: "How much will my visit cost?",
    answer: (
      <p>
        Costs vary by procedure and insurance coverage. We provide upfront
        estimates before any treatment begins. New patients without insurance
        can take advantage of our $99 New Patient Special, which includes an
        exam, X-rays, and cleaning.
      </p>
    ),
  },
  {
    id: "anxiety",
    question: "I'm anxious about dental visits. Can you help?",
    answer: (
      <p>
        Absolutely. We offer nitrous oxide (laughing gas), oral sedation, and
        a calm, unhurried approach. Tell us about your concerns when booking —
        we&apos;ll tailor your visit to keep you comfortable every step of the
        way.
      </p>
    ),
  },
];

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

        <Accordion type="single" collapsible className="w-full max-w-3xl">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
