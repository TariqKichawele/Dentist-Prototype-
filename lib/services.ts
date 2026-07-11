export type ServiceCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  services: string[];
  bookingService: string;
  ctaLabel: string;
  icon: "shield" | "stethoscope" | "sparkles";
  metaDescription: string;
  intro: string;
  sections: { heading: string; body: string }[];
  whoItsFor: string[];
  whatToExpect: string[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "preventative",
    title: "Preventative Care",
    shortTitle: "Preventative",
    tagline: "Stay ahead of problems with calm, thorough checkups.",
    description:
      "Routine cleanings, exams, and X-rays that keep your smile healthy — without the rush or jargon.",
    services: ["Routine Cleaning", "Dental X-Rays", "Annual Check-up"],
    bookingService: "cleaning",
    ctaLabel: "Book Cleaning",
    icon: "shield",
    metaDescription:
      "Preventative dental care in Smile City — cleanings, exams, and X-rays. Book a gentle checkup online in under 2 minutes.",
    intro:
      "Preventative care is the simplest way to avoid bigger treatments later. At Gentle Dental Care, every cleaning and checkup is unhurried, clearly explained, and tailored to your comfort level — whether you come in twice a year or you're overdue and a little nervous.",
    sections: [
      {
        heading: "What preventative care includes",
        body: "Your visit typically covers a professional cleaning to remove plaque and tartar, a comprehensive exam of your teeth and gums, and digital X-rays when they're needed to catch issues early. We'll also talk through home care tips that actually fit your routine — not a lecture, just practical guidance.",
      },
      {
        heading: "Why it matters",
        body: "Small problems are easier (and usually less expensive) to treat when we find them early. Regular visits help protect against cavities, gum disease, and unexpected pain — and they give you a clear picture of where your oral health stands today.",
      },
      {
        heading: "Insurance & new patients",
        body: "Most dental plans cover preventative cleanings and exams at a high percentage. Not sure what's covered? Call us before your visit and we'll verify your benefits at no cost. New patients are welcome, and online booking takes under two minutes.",
      },
    ],
    whoItsFor: [
      "Patients due (or overdue) for a cleaning",
      "New patients who want a gentle first visit",
      "Anyone who prefers clear, jargon-free explanations",
      "Families looking for consistent, calm care",
    ],
    whatToExpect: [
      "A 60–90 minute first visit if you're new to the practice",
      "Digital X-rays only when clinically useful",
      "A written or verbal summary of findings before you leave",
      "A personalized recall schedule (often every 6 months)",
    ],
  },
  {
    slug: "restorative",
    title: "Advanced Restorative",
    shortTitle: "Restorative",
    tagline: "Repair damage gently — with a clear plan and no surprises.",
    description:
      "Fillings, crowns, and root canals delivered with upfront estimates and a calm, step-by-step approach.",
    services: ["Root Canal", "Dental Crown", "Tooth Filling"],
    bookingService: "other",
    ctaLabel: "Book Consultation",
    icon: "stethoscope",
    metaDescription:
      "Restorative dentistry in Smile City — fillings, crowns, and root canals with upfront estimates. Book a consultation online.",
    intro:
      "When a tooth is damaged, cracked, or infected, restorative care puts strength and comfort back. We explain every option in plain language, share costs before treatment starts, and move at a pace that respects dental anxiety — never pressure, always clarity.",
    sections: [
      {
        heading: "Common restorative treatments",
        body: "Tooth-colored fillings repair cavities with a natural look. Crowns restore teeth that are cracked, heavily filled, or weakened after a root canal. Root canal therapy relieves infection and pain while saving your natural tooth whenever possible. We'll recommend only what you need — nothing more.",
      },
      {
        heading: "Comfort-first appointments",
        body: "Tell us about past dental experiences when you book. We offer nitrous oxide and oral sedation options, take breaks when you need them, and check in throughout the procedure. Many patients are surprised by how manageable treatment feels when the plan is clear.",
      },
      {
        heading: "Upfront estimates",
        body: "Before any restorative work begins, you'll receive an estimate that factors in your insurance (if applicable) and out-of-pocket responsibility. Financing is available for larger plans. No surprise bills after the fact.",
      },
    ],
    whoItsFor: [
      "Patients with tooth pain, sensitivity, or a broken filling",
      "Anyone told they may need a crown or root canal",
      "People who want a second opinion with transparent pricing",
      "Anxious patients who need a slower, gentler pace",
    ],
    whatToExpect: [
      "A consultation to diagnose the issue and review options",
      "Digital imaging when helpful for planning",
      "A written estimate before treatment",
      "Follow-up guidance for healing and home care",
    ],
  },
  {
    slug: "cosmetic",
    title: "Cosmetic / Aesthetics",
    shortTitle: "Cosmetic",
    tagline: "A brighter, more confident smile — on your timeline.",
    description:
      "Whitening, veneers, and clear aligners planned around your goals, budget, and comfort.",
    services: ["Veneers", "Professional Whitening", "Clear Aligners"],
    bookingService: "cosmetic",
    ctaLabel: "Book Cosmetic Consult",
    icon: "sparkles",
    metaDescription:
      "Cosmetic dentistry in Smile City — whitening, veneers, and clear aligners. Book a cosmetic consultation online.",
    intro:
      "Cosmetic dentistry should feel exciting, not overwhelming. Whether you want a subtle refresh or a fuller smile makeover, we start with a conversation about your goals, then map a realistic plan — including timing, maintenance, and cost — so you always know what's next.",
    sections: [
      {
        heading: "Whitening, veneers & aligners",
        body: "Professional whitening delivers a brighter shade safely under clinical supervision. Porcelain veneers can reshape chips, gaps, and discoloration that whitening alone won't fix. Clear aligners straighten teeth discreetly with a series of custom trays — we're an Invisalign provider and will confirm if aligners are a good fit for you.",
      },
      {
        heading: "A consult before commitment",
        body: "Your cosmetic consultation covers photos or digital previews when useful, a discussion of what's realistic for your enamel and bite, and honest talk about longevity and upkeep. You'll leave with options — not a hard sell.",
      },
      {
        heading: "Pairing beauty with health",
        body: "We won't skip the foundation. If cavities or gum concerns show up during your consult, we'll address health first so cosmetic results last. Many patients combine a cleaning with a whitening plan for an efficient path to a fresher smile.",
      },
    ],
    whoItsFor: [
      "Anyone self-conscious about stains, chips, or gaps",
      "Patients considering Invisalign or clear aligners",
      "People who want whitening that lasts longer than drugstore kits",
      "Patients exploring veneers and want a clear cost picture",
    ],
    whatToExpect: [
      "A cosmetic consult focused on your goals and budget",
      "Before/after examples relevant to your case",
      "A phased plan if you prefer to treat in stages",
      "Home-care tips to protect your results",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICE_CATEGORIES.map((service) => service.slug);
}
