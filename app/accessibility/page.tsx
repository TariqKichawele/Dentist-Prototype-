import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL_HREF, PRACTICE_NAME } from "@/lib/practice";

export const metadata: Metadata = {
  title: `Accessibility Statement | ${PRACTICE_NAME}`,
  alternates: {
    canonical: "/accessibility",
  },
};

export default function AccessibilityPage() {
  return (
    <main id="main-content" className="section-container py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-brand-primary hover:underline"
        >
          ← Back to home
        </Link>
        <h1 className="mt-6">Accessibility Statement</h1>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <p>
            {PRACTICE_NAME} is committed to ensuring our website is accessible
            to all patients, including those with disabilities. We strive to
            conform to WCAG 2.1 Level AA guidelines.
          </p>
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Accessibility Features
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Keyboard-navigable menus and booking flow</li>
              <li>Semantic HTML headings and landmarks</li>
              <li>Visible focus indicators on interactive elements</li>
              <li>Skip-to-content link for screen reader users</li>
              <li>Reduced-motion support for users with vestibular disorders</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">Feedback</h2>
            <p className="mt-2">
              If you encounter accessibility barriers on our website, please
              contact us at{" "}
              <a href={EMAIL_HREF} className="text-brand-primary hover:underline">
                hello@gentledentalcare.com
              </a>
              . We welcome your feedback and will work to address issues
              promptly.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
