import { createHmac, timingSafeEqual } from "crypto";

const SIGNATURE_TOLERANCE_SECONDS = 300;

/** Skip HMAC checks in local dev; enforced in production when a secret is set. */
export function shouldSkipCalendlyWebhookVerification(): boolean {
  if (process.env.CALENDLY_SKIP_WEBHOOK_VERIFICATION === "true") return true;
  if (process.env.CALENDLY_SKIP_WEBHOOK_VERIFICATION === "false") return false;
  return process.env.NODE_ENV !== "production";
}

function parseSignatureHeader(header: string) {
  const parts = header.split(",");
  const timestamp = parts.find((p) => p.startsWith("t="))?.slice(2);
  const signature = parts.find((p) => p.startsWith("v1="))?.slice(3);
  return { timestamp, signature };
}

export function verifyCalendlySignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string | undefined
): boolean {
  if (!signatureHeader || !secret) return false;

  const { timestamp, signature } = parseSignatureHeader(signatureHeader);
  if (!timestamp || !signature) return false;

  const timestampSeconds = Number(timestamp);
  if (!Number.isFinite(timestampSeconds)) return false;

  const age = Math.abs(Math.floor(Date.now() / 1000) - timestampSeconds);
  if (age > SIGNATURE_TOLERANCE_SECONDS) return false;

  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  try {
    const expectedBuffer = Buffer.from(expected, "hex");
    const receivedBuffer = Buffer.from(signature, "hex");
    if (expectedBuffer.length !== receivedBuffer.length) return false;
    return timingSafeEqual(expectedBuffer, receivedBuffer);
  } catch {
    return false;
  }
}
