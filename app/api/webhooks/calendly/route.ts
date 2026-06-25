import { NextResponse } from "next/server";
import {
  handleInviteeCanceled,
  handleInviteeCreated,
} from "@/lib/calendly/handlers";
import type { CalendlyWebhookPayload } from "@/lib/calendly/types";
import {
  shouldSkipCalendlyWebhookVerification,
  verifyCalendlySignature,
} from "@/lib/calendly/verify-signature";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const skipVerification = shouldSkipCalendlyWebhookVerification();

  if (!skipVerification) {
    const signatureHeader = request.headers.get("calendly-webhook-signature");
    const isValid = verifyCalendlySignature(
      rawBody,
      signatureHeader,
      process.env.CALENDLY_WEBHOOK_SECRET
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let payload: CalendlyWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as CalendlyWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  console.log("Calendly webhook received:", payload.event);

  try {
    switch (payload.event) {
      case "invitee.created":
        await handleInviteeCreated(payload);
        break;
      case "invitee.canceled":
        await handleInviteeCanceled(payload);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("Calendly webhook handler error:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
