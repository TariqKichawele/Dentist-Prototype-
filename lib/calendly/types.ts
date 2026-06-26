export type CalendlyWebhookPayload = {
  event: "invitee.created" | "invitee.canceled" | string;
  created_at: string;
  payload: {
    uri: string;
    email: string;
    name: string;
    first_name?: string | null;
    last_name?: string | null;
    text_reminder_number?: string | null;
    status: string;
    cancel_url?: string;
    reschedule_url?: string;
    event?: string;
    scheduled_event?: {
      uri: string;
      name: string;
      start_time: string;
      end_time: string;
      event_type: string;
      status: string;
    };
    questions_and_answers?: Array<{
      question: string;
      answer: string;
    }>;
  };
};

export function extractCalendlyUuid(inviteeUri: string): string {
  const parts = inviteeUri.split("/");
  return parts[parts.length - 1] ?? inviteeUri;
}

export function normalizeCalendlyUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`.replace(/\/$/, "");
  } catch {
    return url.replace(/\/$/, "");
  }
}

export function normalizeEventTypeUri(uri: string): string {
  return uri.replace(/\/$/, "");
}
