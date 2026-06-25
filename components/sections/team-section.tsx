import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TeamCarousel } from "@/components/sections/team-carousel";
import { createClient } from "@/lib/supabase/server";
import type { Practitioner } from "@/lib/database.types";

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

export async function TeamSection() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let team: Practitioner[] = [];

  if (supabaseUrl && supabaseKey) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("practitioners")
      .select("*")
      .order("name");

    team = (data ?? []) as Practitioner[];
  }

  return (
    <section id="team" className="bg-ice-bg py-16 md:py-24">
      <div className="section-container">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2>Meet Your Dental Team</h2>
            <p className="mt-3 text-muted-foreground">
              You&apos;ll know exactly who is caring for your smile before you
              ever sit in the chair.
            </p>
          </div>
        </ScrollReveal>

        {team.length > 0 ? (
          <ScrollReveal delay={100}>
            <TeamCarousel team={team} />
          </ScrollReveal>
        ) : null}

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
