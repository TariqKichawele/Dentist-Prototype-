/**
 * Seeds practitioners, appointment types, and Calendly mappings into the
 * linked Supabase project using the service role key from .env.local.
 *
 * Usage: npm run db:seed
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  const lines = readFileSync(path, "utf8").split("\n");
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    env[trimmed.slice(0, idx)] = trimmed.slice(idx + 1);
  }
  return env;
}

const PRACTITIONERS = [
  {
    id: "a0000001-0000-4000-8000-000000000001",
    name: "Dr. Sarah Johnson, DDS",
    email: "sarah.johnson@gentledental.example",
    specialty: "General & Cosmetic Dentistry",
    bio: "With over 15 years of experience, Dr. Johnson specializes in gentle restorative care and cosmetic dentistry.",
    image_url:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    role: "Lead Dentist & Practice Owner",
    credentials: ["ADA Member", "Invisalign Provider", "Sedation Certified"],
  },
  {
    id: "a0000001-0000-4000-8000-000000000002",
    name: "Dr. Michael Chen, DMD",
    email: "michael.chen@gentledental.example",
    specialty: "Endodontics & Restorative",
    bio: "Dr. Chen focuses on root canals, crowns, and complex restorative cases with a calm, patient-first approach.",
    image_url:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
    role: "Associate Dentist",
    credentials: ["Endodontics Specialist", "CEREC Certified"],
  },
  {
    id: "a0000001-0000-4000-8000-000000000003",
    name: "Dr. Emily Rivera, DDS",
    email: "emily.rivera@gentledental.example",
    specialty: "Pediatric & Preventive Care",
    bio: "Dr. Rivera helps families build healthy habits with gentle cleanings and anxiety-free pediatric visits.",
    image_url:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
    role: "Pediatric Dentist",
    credentials: ["Board Certified Pediatric Dentist", "Sedation Certified"],
  },
];

const APPOINTMENT_TYPES = [
  {
    id: "b0000001-0000-4000-8000-000000000001",
    slug: "cleaning",
    name: "Routine Cleaning & Exam",
    duration_minutes: 60,
    description: "Professional cleaning, exam, and X-rays as needed.",
  },
  {
    id: "b0000001-0000-4000-8000-000000000002",
    slug: "emergency",
    name: "Tooth Pain / Emergency",
    duration_minutes: 30,
    description:
      "Same-day relief for tooth pain, swelling, or dental trauma.",
  },
  {
    id: "b0000001-0000-4000-8000-000000000003",
    slug: "cosmetic",
    name: "Cosmetic Consultation",
    duration_minutes: 45,
    description: "Smile makeover planning: veneers, whitening, and Invisalign.",
  },
  {
    id: "b0000001-0000-4000-8000-000000000004",
    slug: "other",
    name: "Other",
    duration_minutes: 30,
    description: "General consultation for any dental concern.",
  },
];

const PRACTITIONER_SERVICES = [
  {
    practitioner_id: "a0000001-0000-4000-8000-000000000001",
    appointment_type_id: "b0000001-0000-4000-8000-000000000001",
    calendly_event_url: "https://calendly.com/tariqkichawele01/teeth-cleaning-1",
    calendly_event_type_uri:
      "https://api.calendly.com/event_types/0b8607c3-1b4a-4918-b03e-aae4f239d205",
  },
  {
    practitioner_id: "a0000001-0000-4000-8000-000000000001",
    appointment_type_id: "b0000001-0000-4000-8000-000000000002",
    calendly_event_url: "https://calendly.com/tariqkichawele01/emergency-service",
    calendly_event_type_uri:
      "https://api.calendly.com/event_types/f4da8ebf-fcb8-4fae-865e-04132762dba1",
  },
  {
    practitioner_id: "a0000001-0000-4000-8000-000000000001",
    appointment_type_id: "b0000001-0000-4000-8000-000000000003",
    calendly_event_url: "https://calendly.com/tariqkichawele01/cosmetic-procedure",
    calendly_event_type_uri:
      "https://api.calendly.com/event_types/e3eb7246-0379-4a7d-99c1-4167a12bb4ed",
  },
  {
    practitioner_id: "a0000001-0000-4000-8000-000000000001",
    appointment_type_id: "b0000001-0000-4000-8000-000000000004",
    calendly_event_url: "https://calendly.com/tariqkichawele01/consultancy",
    calendly_event_type_uri:
      "https://api.calendly.com/event_types/cf377985-a841-47bf-a964-890e57b67520",
  },
  {
    practitioner_id: "a0000001-0000-4000-8000-000000000002",
    appointment_type_id: "b0000001-0000-4000-8000-000000000002",
    calendly_event_url: "https://calendly.com/tariqkichawele01/emergency-service",
    calendly_event_type_uri:
      "https://api.calendly.com/event_types/f4da8ebf-fcb8-4fae-865e-04132762dba1",
  },
  {
    practitioner_id: "a0000001-0000-4000-8000-000000000002",
    appointment_type_id: "b0000001-0000-4000-8000-000000000003",
    calendly_event_url: "https://calendly.com/tariqkichawele01/cosmetic-procedure",
    calendly_event_type_uri:
      "https://api.calendly.com/event_types/e3eb7246-0379-4a7d-99c1-4167a12bb4ed",
  },
  {
    practitioner_id: "a0000001-0000-4000-8000-000000000002",
    appointment_type_id: "b0000001-0000-4000-8000-000000000004",
    calendly_event_url: "https://calendly.com/tariqkichawele01/consultancy",
    calendly_event_type_uri:
      "https://api.calendly.com/event_types/cf377985-a841-47bf-a964-890e57b67520",
  },
  {
    practitioner_id: "a0000001-0000-4000-8000-000000000003",
    appointment_type_id: "b0000001-0000-4000-8000-000000000001",
    calendly_event_url: "https://calendly.com/tariqkichawele01/teeth-cleaning-1",
    calendly_event_type_uri:
      "https://api.calendly.com/event_types/0b8607c3-1b4a-4918-b03e-aae4f239d205",
  },
  {
    practitioner_id: "a0000001-0000-4000-8000-000000000003",
    appointment_type_id: "b0000001-0000-4000-8000-000000000002",
    calendly_event_url: "https://calendly.com/tariqkichawele01/emergency-service",
    calendly_event_type_uri:
      "https://api.calendly.com/event_types/f4da8ebf-fcb8-4fae-865e-04132762dba1",
  },
  {
    practitioner_id: "a0000001-0000-4000-8000-000000000003",
    appointment_type_id: "b0000001-0000-4000-8000-000000000004",
    calendly_event_url: "https://calendly.com/tariqkichawele01/consultancy",
    calendly_event_type_uri:
      "https://api.calendly.com/event_types/cf377985-a841-47bf-a964-890e57b67520",
  },
];

async function main() {
  const env = loadEnvLocal();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);

  const { error: probeError } = await supabase
    .from("appointment_types")
    .select("slug")
    .limit(1);

  if (probeError) {
    console.error("\nDatabase tables are missing. Apply the schema first:\n");
    console.error("  1. npx supabase login");
    console.error("  2. npx supabase link --project-ref amzemvnnbimhcknelrao");
    console.error("  3. npm run db:push\n");
    console.error("Or paste supabase/remote_setup.sql into the Supabase SQL Editor.\n");
    console.error("Error:", probeError.message);
    process.exit(1);
  }

  const { error: practitionersError } = await supabase
    .from("practitioners")
    .upsert(PRACTITIONERS, { onConflict: "id" });

  if (practitionersError) {
    console.error("Failed to seed practitioners:", practitionersError.message);
    process.exit(1);
  }

  const { error: typesError } = await supabase
    .from("appointment_types")
    .upsert(APPOINTMENT_TYPES, { onConflict: "id" });

  if (typesError) {
    console.error("Failed to seed appointment_types:", typesError.message);
    process.exit(1);
  }

  const { error: servicesError } = await supabase
    .from("practitioner_services")
    .upsert(PRACTITIONER_SERVICES, {
      onConflict: "practitioner_id,appointment_type_id",
    });

  if (servicesError) {
    console.error("Failed to seed practitioner_services:", servicesError.message);
    process.exit(1);
  }

  const { data: slugs } = await supabase
    .from("appointment_types")
    .select("slug")
    .order("slug");

  console.log("Seed complete. Appointment types:", slugs?.map((r) => r.slug).join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
