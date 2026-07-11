import type { Metadata } from "next";
import { EmergencyBanner } from "@/components/layout/emergency-banner";
import { Footer } from "@/components/layout/footer";
import { Navbar, MobileNav } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { GuaranteeSection } from "@/components/sections/guarantee-section";
import { InsuranceSection } from "@/components/sections/insurance-section";
import { TeamSection } from "@/components/sections/team-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ArticlesTeaserSection } from "@/components/sections/articles-teaser-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { buildFeaturedFaqJsonLd } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={buildFeaturedFaqJsonLd()} />
      <EmergencyBanner />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <InsuranceSection />
        <ServicesSection />
        <GuaranteeSection />
        <TeamSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <ArticlesTeaserSection />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
