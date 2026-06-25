import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const practitionerId = searchParams.get("practitionerId");
  const appointmentTypeSlug = searchParams.get("appointmentTypeSlug");

  if (!practitionerId || !appointmentTypeSlug) {
    return NextResponse.json(
      { error: "practitionerId and appointmentTypeSlug are required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data: appointmentType, error: typeError } = await supabase
    .from("appointment_types")
    .select("*")
    .eq("slug", appointmentTypeSlug)
    .maybeSingle();

  if (typeError) {
    return NextResponse.json({ error: typeError.message }, { status: 500 });
  }

  if (!appointmentType) {
    return NextResponse.json(
      { error: "Appointment type not found" },
      { status: 404 }
    );
  }

  const appointmentTypeId = appointmentType.id;

  const { data: mapping, error: mappingError } = await supabase
    .from("practitioner_services")
    .select("calendly_event_url")
    .eq("practitioner_id", practitionerId)
    .eq("appointment_type_id", appointmentTypeId)
    .maybeSingle();

  if (mappingError) {
    return NextResponse.json({ error: mappingError.message }, { status: 500 });
  }

  if (!mapping) {
    return NextResponse.json(
      {
        error:
          "No Calendly scheduling link is configured for this practitioner and service.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ url: mapping.calendly_event_url });
}
