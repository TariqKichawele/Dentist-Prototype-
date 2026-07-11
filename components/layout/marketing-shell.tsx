import { Footer } from "@/components/layout/footer";
import { MobileNav, Navbar } from "@/components/layout/navbar";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <MobileNav />
    </>
  );
}
