import Image from "next/image";
import { Award, GraduationCap, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const TEAM = [
  {
    name: "Dr. Sarah Johnson, DDS",
    role: "Lead Dentist & Practice Owner",
    bio: "With over 15 years of experience, Dr. Johnson specializes in gentle restorative care and cosmetic dentistry. She believes every patient deserves a calm, judgment-free visit — and takes the time to explain every option before treatment begins.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    credentials: ["ADA Member", "Invisalign Provider", "Sedation Certified"],
  },
];

const OFFICE_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80",
    alt: "Bright, modern reception area with comfortable seating",
    caption: "Welcoming reception",
  },
  {
    src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80",
    alt: "State-of-the-art dental operatory with digital equipment",
    caption: "Digital imaging & same-day crowns",
  },
  {
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
    alt: "Dental team preparing treatment room for a patient",
    caption: "Gentle, patient-first care",
  },
];

export function TeamSection() {
  const doctor = TEAM[0];

  return (
    <section id="team" className="bg-ice-bg py-16 md:py-24">
      <div className="section-container">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2>Meet Your Dentist</h2>
            <p className="mt-3 text-muted-foreground">
              You&apos;ll know exactly who is caring for your smile before you
              ever sit in the chair.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-square">
              <Image
                src={doctor.image}
                alt={`${doctor.name}, lead dentist at Gentle Dental Care`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {doctor.name}
                </h3>
                <p className="mt-1 text-brand-secondary">{doctor.role}</p>
              </div>

              <p className="leading-relaxed text-muted-foreground">{doctor.bio}</p>

              <ul className="flex flex-wrap gap-3">
                {doctor.credentials.map((credential) => (
                  <li
                    key={credential}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-1.5 text-sm font-medium text-brand-primary"
                  >
                    <Award className="size-4 shrink-0" aria-hidden="true" />
                    {credential}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <div className="flex items-start gap-3">
                  <GraduationCap
                    className="mt-0.5 size-5 shrink-0 text-brand-secondary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      University of Michigan, DDS
                    </p>
                    <p className="text-sm text-muted-foreground">
                      15+ years in practice
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart
                    className="mt-0.5 size-5 shrink-0 text-brand-accent"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Anxiety-free approach
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sedation & gentle techniques
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-16">
            <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
              Our Office
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {OFFICE_PHOTOS.map((photo) => (
                <figure
                  key={photo.caption}
                  className="group overflow-hidden rounded-xl border border-border bg-surface-white"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <figcaption className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
