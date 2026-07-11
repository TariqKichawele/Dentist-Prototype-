import { type Article } from "@/lib/articles";
import { FEATURED_FAQ_ITEMS, FAQ_ITEMS, type FaqItem } from "@/lib/faq";
import {
  ADDRESS_COUNTRY,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  EMAIL,
  MAIN_PHONE,
  OPENING_HOURS_SPEC,
  POSTAL_CODE,
  PRACTICE_NAME,
  SOCIAL_LINKS,
  STREET_ADDRESS,
} from "@/lib/practice";
import { type ServiceCategory } from "@/lib/services";
import { getSiteUrl } from "@/lib/site";

type JsonLd = Record<string, unknown>;

export function buildDentistJsonLd(): JsonLd {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${siteUrl}/#dentist`,
    name: PRACTICE_NAME,
    url: siteUrl,
    telephone: MAIN_PHONE,
    email: EMAIL,
    image: `${siteUrl}/og-image.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: STREET_ADDRESS,
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      postalCode: POSTAL_CODE,
      addressCountry: ADDRESS_COUNTRY,
    },
    openingHoursSpecification: OPENING_HOURS_SPEC.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...spec.days],
      opens: spec.opens,
      closes: spec.closes,
    })),
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.google,
    ],
    priceRange: "$$",
  };
}

export function buildFaqPageJsonLd(
  items: FaqItem[] = FAQ_ITEMS,
  pagePath = "/faq"
): JsonLd {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}${pagePath}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildFeaturedFaqJsonLd(): JsonLd {
  return buildFaqPageJsonLd(FEATURED_FAQ_ITEMS, "/");
}

export function buildServiceJsonLd(service: ServiceCategory): JsonLd {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/services/${service.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    description: service.description,
    url,
    provider: {
      "@id": `${siteUrl}/#dentist`,
    },
    areaServed: {
      "@type": "City",
      name: ADDRESS_LOCALITY,
    },
    serviceType: service.services,
  };
}

export function buildArticleJsonLd(article: Article): JsonLd {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/articles/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Organization",
      name: article.authorName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Dentist",
      "@id": `${siteUrl}/#dentist`,
      name: PRACTICE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: `${siteUrl}/og-image.png`,
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[]
): JsonLd {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
