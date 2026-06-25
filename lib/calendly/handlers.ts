import { createAdminClient } from "@/lib/supabase/admin";
import {
  extractCalendlyUuid,
  normalizeCalendlyUrl,
  normalizeEventTypeUri,
  type CalendlyWebhookPayload,
} from "@/lib/calendly/types";

async function upsertPatient(
  email: string,
  firstName: string | null,
  lastName: string | null,
  phone: string | null
) {
  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("patients")
    .select("id")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (existing) {
    await supabase
      .from("patients")
      .update({
        first_name: firstName,
        last_name: lastName,
        phone: phone ?? undefined,
      })
      .eq("id", existing.id);
    return existing.id;
  }

  const { data: created, error } = await supabase
    .from("patients")
    .insert({
      email: email.toLowerCase(),
      first_name: firstName,
      last_name: lastName,
      phone,
    })
    .select("id")
    .single();

  if (error) throw error;
  return created.id;
}

async function resolvePractitionerService(eventTypeUri: string) {
  const supabase = createAdminClient();
  const normalizedUri = normalizeEventTypeUri(eventTypeUri);

  const { data: byUri } = await supabase
    .from("practitioner_services")
    .select("id, practitioner_id, appointment_type_id, calendly_event_url")
    .eq("calendly_event_type_uri", normalizedUri)
    .maybeSingle();

  if (byUri) return byUri;

  const { data: allServices } = await supabase
    .from("practitioner_services")
    .select("id, practitioner_id, appointment_type_id, calendly_event_url");

  if (!allServices?.length) return null;

  return (
    allServices.find(
      (service) =>
        normalizeCalendlyUrl(service.calendly_event_url) ===
        normalizeCalendlyUrl(eventTypeUri)
    ) ?? null
  );
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: null };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function extractInsurance(
  questions?: CalendlyWebhookPayload["payload"]["questions_and_answers"]
) {
  if (!questions?.length) return null;
  const match = questions.find((q) =>
    /insurance/i.test(q.question)
  );
  return match?.answer ?? null;
}

export async function handleInviteeCreated(payload: CalendlyWebhookPayload) {
  const invitee = payload.payload;
  const scheduledEvent = invitee.scheduled_event;
  const calendlyUuid = extractCalendlyUuid(invitee.uri);
  const { firstName, lastName } = splitName(invitee.name);
  const insurance = extractInsurance(invitee.questions_and_answers);

  const patientId = await upsertPatient(
    invitee.email,
    firstName,
    lastName,
    null
  );

  const mapping = await resolvePractitionerService(scheduledEvent.event_type);

  const supabase = createAdminClient();
  const { error } = await supabase.from("appointments").upsert(
    {
      calendly_uuid: calendlyUuid,
      patient_id: patientId,
      practitioner_id: mapping?.practitioner_id ?? null,
      appointment_type_id: mapping?.appointment_type_id ?? null,
      calendly_event_uri: scheduledEvent.uri,
      status: "scheduled",
      start_time: scheduledEvent.start_time,
      end_time: scheduledEvent.end_time,
      patient_email: invitee.email.toLowerCase(),
      patient_name: invitee.name,
      insurance,
    },
    { onConflict: "calendly_uuid" }
  );

  if (error) throw error;
}

export async function handleInviteeCanceled(payload: CalendlyWebhookPayload) {
  const calendlyUuid = extractCalendlyUuid(payload.payload.uri);
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("appointments")
    .update({ status: "canceled" })
    .eq("calendly_uuid", calendlyUuid);

  if (error) throw error;
}
