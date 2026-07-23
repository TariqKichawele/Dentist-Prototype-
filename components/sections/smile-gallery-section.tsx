import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBookingHref } from "@/lib/booking";
import { SMILE_CASES } from "@/lib/smile-gallery";

export function SmileGallerySection() {
  return (
    <section id="results" className="bg-surface-white py-16 md:py-24">
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2>Real Smile Transformations</h2>
          <p className="mt-3 text-muted-foreground">
            Before and after results from whitening, aligners, and veneers.
            Sample results — every smile plan is personalized.
          </p>
        </div>

        <div className="grid items-stretch gap-8 md:grid-cols-3 md:gap-6">
          {SMILE_CASES.map((smileCase) => (
            <figure key={smileCase.id} className="flex h-full flex-col gap-3">
              <div className="relative aspect-[5/6] w-full overflow-hidden rounded-xl bg-muted">
                <Image
                  src={smileCase.composite.src}
                  alt={smileCase.composite.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <figcaption className="text-center">
                <p className="font-semibold text-foreground">
                  {smileCase.treatment}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {smileCase.summary}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            className="focus-glow h-11 rounded-full bg-brand-accent px-7 font-semibold text-white hover:bg-brand-accent-hover"
          >
            <Link href={getBookingHref("cosmetic")}>
              Book a Free Cosmetic Consult
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
