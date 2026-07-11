export type ArticleSection = {
  heading: string;
  body: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  readingTimeMinutes: number;
  relatedServiceSlug?: string;
  sections: ArticleSection[];
};

export const ARTICLES: Article[] = [
  {
    slug: "what-to-expect-at-your-first-dental-visit",
    title: "What to Expect at Your First Dental Visit",
    description:
      "A calm walkthrough of your first appointment at Gentle Dental Care — timing, paperwork, exam, cleaning, and what happens next.",
    datePublished: "2026-06-01",
    dateModified: "2026-07-01",
    authorName: "Gentle Dental Care",
    readingTimeMinutes: 5,
    relatedServiceSlug: "preventative",
    sections: [
      {
        heading: "Before you arrive",
        body: "Book online in under two minutes or call the office. Bring a photo ID, your insurance card if you have one, and a list of medications. If you can, fill out new patient forms ahead of time so check-in feels quick instead of rushed.",
      },
      {
        heading: "The first 10 minutes",
        body: "You'll meet our front desk team, confirm insurance or self-pay details, and share any concerns — including dental anxiety. Tell us what has (or hasn't) worked for you in the past. We use that information to pace the visit.",
      },
      {
        heading: "Exam, X-rays & cleaning",
        body: "Most first visits include a comprehensive exam, digital X-rays when needed, and a gentle professional cleaning. Plan for about 60–90 minutes. We'll explain what we see in plain language and answer questions as we go — no jargon dump at the end.",
      },
      {
        heading: "Your personalized plan",
        body: "Before you leave, you'll get a clear summary: what's healthy, what to watch, and any recommended next steps with timing and cost estimates. If nothing urgent is needed, we'll simply schedule your next preventative visit and send you home with practical home-care tips.",
      },
    ],
  },
  {
    slug: "how-to-handle-a-dental-emergency",
    title: "How to Handle a Dental Emergency",
    description:
      "What counts as a dental emergency, what to do in the first hour, and how Gentle Dental Care triages same-day urgent care.",
    datePublished: "2026-06-08",
    dateModified: "2026-07-05",
    authorName: "Gentle Dental Care",
    readingTimeMinutes: 4,
    relatedServiceSlug: "restorative",
    sections: [
      {
        heading: "What counts as urgent",
        body: "Severe tooth pain, a knocked-out or cracked tooth, swelling, uncontrolled bleeding, or a broken restoration that leaves a sharp edge or exposed nerve — these warrant a same-day call. If you're unsure, call anyway; we'd rather triage a false alarm than have you wait in pain.",
      },
      {
        heading: "First steps at home",
        body: "Rinse gently with cool water. For a knocked-out tooth, hold it by the crown (not the root), keep it moist in milk or saliva, and get to us quickly. Use a cold compress for swelling. Over-the-counter pain relief can help if it's safe for you — avoid placing aspirin directly on gums.",
      },
      {
        heading: "How we respond",
        body: "Call our emergency line as soon as you can. We reserve same-day slots for urgent cases. After hours, our on-call dentist aims to return your call within 30 minutes with guidance and next steps.",
      },
      {
        heading: "After the crisis",
        body: "Once you're comfortable, we'll outline restorative options — filling, crown, root canal, or other care — with upfront estimates. The goal is simple: relieve pain first, then restore the tooth with a plan you understand.",
      },
    ],
  },
  {
    slug: "is-professional-whitening-right-for-you",
    title: "Is Professional Whitening Right for You?",
    description:
      "How in-office whitening compares to drugstore kits, who is a good candidate, and what to expect from a cosmetic consult.",
    datePublished: "2026-06-15",
    dateModified: "2026-07-08",
    authorName: "Gentle Dental Care",
    readingTimeMinutes: 5,
    relatedServiceSlug: "cosmetic",
    sections: [
      {
        heading: "Professional vs. at-home kits",
        body: "Drugstore strips can lighten mild surface stains, but results vary and sensitive teeth often pay the price. Professional whitening uses clinical-strength gel under supervision, with gum protection and a shade goal tailored to your enamel — typically brighter, more even, and longer lasting than DIY options.",
      },
      {
        heading: "Who is a good candidate",
        body: "Whitening works best on natural tooth enamel with yellow or brown staining from coffee, tea, wine, or aging. It does not change the color of crowns, veneers, or large fillings. If you have untreated cavities or gum disease, we'll address those first so whitening is safe and effective.",
      },
      {
        heading: "Sensitivity & aftercare",
        body: "Temporary sensitivity is common and usually fades within a day or two. We'll share desensitizing tips and foods/drinks to pause for 24–48 hours (dark berries, coffee, red wine) so your new shade settles evenly.",
      },
      {
        heading: "Start with a cosmetic consult",
        body: "A short consult confirms whether whitening, veneers, or another option fits your goals and budget. There's no hard sell — just clear recommendations and a booking path when you're ready. Many patients pair whitening with a routine cleaning for an efficient refresh.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return ARTICLES.map((article) => article.slug);
}

export function formatArticleDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${isoDate}T12:00:00`));
}
