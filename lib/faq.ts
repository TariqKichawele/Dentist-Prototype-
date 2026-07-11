import { EMERGENCY_PHONE } from "@/lib/practice";

export type FaqItem = {
  id: string;
  question: string;
  /** Plain-text answer for UI and FAQPage JSON-LD */
  answer: string;
  /** Shown on the homepage FAQ section when true */
  featured?: boolean;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "insurance",
    question: "Do you take my insurance?",
    featured: true,
    answer:
      "We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, MetLife, Guardian, and UnitedHealthcare. Not sure if you're covered? Call us and we'll verify your benefits before your visit — at no cost to you.",
  },
  {
    id: "first-visit",
    question: "What happens during my first cleaning visit?",
    featured: true,
    answer:
      "Your first visit includes a comprehensive exam, digital X-rays (if needed), a gentle professional cleaning, and a personalized treatment plan. Plan for about 60–90 minutes. We'll walk you through every step so there are no surprises.",
  },
  {
    id: "emergency",
    question: "What if I have a dental emergency right now?",
    featured: true,
    answer: `For dental emergencies, call us immediately at ${EMERGENCY_PHONE}. We reserve same-day slots for urgent cases including severe pain, knocked-out teeth, and broken restorations. After hours? Our on-call dentist will return your call within 30 minutes.`,
  },
  {
    id: "pricing",
    question: "How much will my visit cost?",
    featured: true,
    answer:
      "Costs vary by procedure and insurance coverage. We provide upfront estimates before any treatment begins. New patients without insurance can take advantage of our $99 New Patient Special, which includes an exam, X-rays, and cleaning.",
  },
  {
    id: "anxiety",
    question: "I'm anxious about dental visits. Can you help?",
    featured: true,
    answer:
      "Absolutely. We offer nitrous oxide (laughing gas), oral sedation, and a calm, unhurried approach. Tell us about your concerns when booking — we'll tailor your visit to keep you comfortable every step of the way.",
  },
  {
    id: "new-patients",
    question: "Are you accepting new patients?",
    answer:
      "Yes — we're currently accepting new patients of all ages. You can book online in under two minutes, or call the office if you'd prefer to schedule by phone. Same-week openings are often available.",
  },
  {
    id: "prepare",
    question: "How should I prepare for my appointment?",
    answer:
      "Bring a photo ID, your insurance card (if you have one), and a list of any medications you're taking. Arrive about 10 minutes early for paperwork if it's your first visit — or download our new patient forms ahead of time to save time at check-in.",
  },
  {
    id: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, debit cards, HSA/FSA cards, and cash. We also offer flexible financing options for larger treatment plans. Ask our front desk about interest-free payment plans when you visit.",
  },
  {
    id: "kids",
    question: "Do you see children?",
    answer:
      "Yes. We welcome families and provide gentle, age-appropriate care for kids. If your child is nervous, let us know when you book — we take extra time and use a calm, step-by-step approach so the first visit feels safe and positive.",
  },
  {
    id: "cleaning-frequency",
    question: "How often should I get a cleaning?",
    answer:
      "Most patients benefit from a professional cleaning every six months. If you have gum disease, a history of cavities, or certain medical conditions, we may recommend visits every three to four months. We'll personalize the schedule after your exam.",
  },
  {
    id: "cancel",
    question: "What if I need to cancel or reschedule?",
    answer:
      "Life happens — we get it. Please give us at least 24 hours' notice when you need to change an appointment so we can offer the time to another patient. You can call the office or reply to your confirmation message to reschedule.",
  },
  {
    id: "same-day",
    question: "Do you offer same-day appointments?",
    answer:
      "Whenever possible, yes. We hold same-day openings for dental emergencies and try to accommodate urgent non-emergency needs as our schedule allows. Call us early in the day for the best chance of getting in.",
  },
];

export const FEATURED_FAQ_ITEMS = FAQ_ITEMS.filter((item) => item.featured);
