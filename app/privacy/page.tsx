import type { Metadata } from "next";
import Link from "next/link";
import { PRACTICE_NAME } from "@/lib/practice";

export const metadata: Metadata = {
  title: `Privacy Policy | ${PRACTICE_NAME}`,
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="section-container py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-brand-primary hover:underline"
        >
          ← Back to home
        </Link>
        <h1 className="mt-6">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <p>
            {PRACTICE_NAME} is committed to protecting your personal information.
            This policy describes how we collect, use, and safeguard information
            you provide when using our website or booking an appointment.
          </p>
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Information We Collect
            </h2>
            <p className="mt-2">
              When you book online, we collect your name, email, phone number,
              insurance information, and appointment preferences. We use this
              information solely to schedule and manage your dental care.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              HIPAA Compliance
            </h2>
            <p className="mt-2">
              Protected health information is handled in accordance with HIPAA
              regulations. We do not sell or share your health information with
              third parties for marketing purposes.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions about this policy? Contact us at{" "}
              <a
                href="mailto:hello@gentledentalcare.com"
                className="text-brand-primary hover:underline"
              >
                hello@gentledentalcare.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
