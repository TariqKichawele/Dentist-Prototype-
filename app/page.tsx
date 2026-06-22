import { Navbar, MobileNav } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { GuaranteeSection } from "@/components/sections/guarantee-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <GuaranteeSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
      </main>
      <footer className="border-t border-border bg-surface-white py-10">
        <div className="section-container flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Gentle Dental Care. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="tel:+15551234567" className="hover:text-brand-primary">
              (555) 123-4567
            </a>
            <a
              href="https://maps.google.com/?q=123+Smile+Avenue+Dental"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-primary"
            >
              123 Smile Avenue, Suite 200
            </a>
          </div>
        </div>
      </footer>
      <MobileNav />
    </>
  );
}
