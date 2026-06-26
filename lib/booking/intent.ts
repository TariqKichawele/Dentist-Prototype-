import { createAdminClient } from "@/lib/supabase/admin";

export type BookingIntentInput = {
  email: string;
  practitionerId: string;
  appointmentTypeId: string;
  insurance: string;
};

export type BookingIntent = {
  practitioner_id: string;
  appointment_type_id: string;
  insurance: string;
};

export function formatInsuranceLabel(value: string): string {
  if (value === "no-insurance") return "Out-of-pocket / No Insurance";
  return value;
}

export async function upsertBookingIntent(input: BookingIntentInput) {
  const supabase = createAdminClient();

  const { error } = await supabase.from("booking_intents").upsert(
    {
      email: input.email.toLowerCase().trim(),
      practitioner_id: input.practitionerId,
      appointment_type_id: input.appointmentTypeId,
      insurance: formatInsuranceLabel(input.insurance),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" }
  );

  if (error) throw error;
}

export async function getBookingIntent(
  email: string
): Promise<BookingIntent | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("booking_intents")
    .select("practitioner_id, appointment_type_id, insurance")
    .eq("email", email.toLowerCase().trim())
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function deleteBookingIntent(email: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("booking_intents")
    .delete()
    .eq("email", email.toLowerCase().trim());

  if (error) throw error;
}

export async function resolveAppointmentTypeId(slug: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("appointment_types")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data?.id ?? null;
}
