import {
  extractCalendlyUuid,
  normalizeCalendlyUrl,
  normalizeEventTypeUri,
  type CalendlyWebhookPayload,
} from "@/lib/calendly/types";
import {
  deleteBookingIntent,
  getBookingIntent,
  type BookingIntent,
} from "@/lib/booking/intent";
import { upsertPatient } from "@/lib/patients/upsert";
import { createAdminClient } from "@/lib/supabase/admin";

async function resolvePractitionerService(
  eventTypeUri: string,
  intent?: BookingIntent | null
) {
  if (intent) {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("practitioner_services")
      .select("id, practitioner_id, appointment_type_id, calendly_event_url")
      .eq("practitioner_id", intent.practitioner_id)
      .eq("appointment_type_id", intent.appointment_type_id)
      .maybeSingle();

    if (data) return data;
  }

  const supabase = createAdminClient();
  const normalizedUri = normalizeEventTypeUri(eventTypeUri);

  const { data: byUri, error: byUriError } = await supabase
    .from("practitioner_services")
    .select("id, practitioner_id, appointment_type_id, calendly_event_url")
    .eq("calendly_event_type_uri", normalizedUri);

  if (byUriError) throw byUriError;

  if (byUri?.length === 1) return byUri[0];

  if (byUri && byUri.length > 1 && intent?.practitioner_id) {
    return (
      byUri.find((service) => service.practitioner_id === intent.practitioner_id) ??
      null
    );
  }

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

function resolveInviteeName(
  invitee: CalendlyWebhookPayload["payload"]
): { firstName: string | null; lastName: string | null } {
  const firstName = invitee.first_name?.trim() || null;
  const lastName = invitee.last_name?.trim() || null;
  if (firstName || lastName) {
    return { firstName, lastName };
  }
  return splitName(invitee.name);
}

function extractPhone(
  invitee: CalendlyWebhookPayload["payload"]
): string | null {
  const sms = invitee.text_reminder_number?.trim();
  if (sms) return sms;

  const fromQuestion = invitee.questions_and_answers?.find((q) =>
    /phone/i.test(q.question)
  )?.answer?.trim();

  return fromQuestion || null;
}

export async function handleInviteeCreated(payload: CalendlyWebhookPayload) {
  const invitee = payload.payload;
  const scheduledEvent = invitee.scheduled_event;
  const calendlyUuid = extractCalendlyUuid(invitee.uri);
  const { firstName, lastName } = resolveInviteeName(invitee);
  const phone = extractPhone(invitee);
  const patientEmail = invitee.email.toLowerCase();
  const bookingIntent = await getBookingIntent(patientEmail);
  const insuranceFromCalendly = extractInsurance(invitee.questions_and_answers);
  const insurance = insuranceFromCalendly ?? bookingIntent?.insurance ?? null;

  const patientId = await upsertPatient({
    email: invitee.email,
    firstName,
    lastName,
    phone,
  });

  const mapping = scheduledEvent?.event_type
    ? await resolvePractitionerService(scheduledEvent.event_type, bookingIntent)
    : null;

  if (!scheduledEvent?.start_time || !scheduledEvent?.end_time) {
    throw new Error("Calendly webhook missing scheduled event times");
  }

  const practitionerId =
    bookingIntent?.practitioner_id ?? mapping?.practitioner_id ?? null;
  const appointmentTypeId =
    bookingIntent?.appointment_type_id ?? mapping?.appointment_type_id ?? null;

  const supabase = createAdminClient();
  const { error } = await supabase.from("appointments").upsert(
    {
      calendly_uuid: calendlyUuid,
      patient_id: patientId,
      practitioner_id: practitionerId,
      appointment_type_id: appointmentTypeId,
      calendly_event_uri: scheduledEvent.uri ?? invitee.event ?? null,
      status: "scheduled",
      start_time: scheduledEvent.start_time,
      end_time: scheduledEvent.end_time,
      patient_email: patientEmail,
      patient_name: invitee.name,
      insurance,
    },
    { onConflict: "calendly_uuid" }
  );

  if (error) throw error;

  if (bookingIntent) {
    await deleteBookingIntent(patientEmail);
  }
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
