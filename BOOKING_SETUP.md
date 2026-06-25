# Calendly & Supabase Booking Setup

Copy `.env.example` to `.env.local` and fill in your credentials. Never commit `.env.local`.

## Supabase

1. Install the [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started).
2. From the project root, run:

```bash
supabase start
supabase db reset   # applies migrations + seed.sql
```

3. Copy the printed `API URL`, `anon key`, and `service_role key` into `.env.local`.

## Calendly embed URLs

Update placeholder URLs in [`supabase/seed.sql`](supabase/seed.sql) (or via Supabase Studio) with your real event-type links, e.g. `https://calendly.com/your-org/dr-johnson-cleaning`.

Also set `calendly_event_type_uri` to the API URI from Calendly (e.g. `https://api.calendly.com/event_types/XXXXXXXX`) so webhooks can map bookings to practitioners.

## Calendly webhooks

Webhooks require a **public HTTPS URL**. For local development, use a tunnel:

```bash
# Example with ngrok
ngrok http 3000
```

Register a webhook subscription in [Calendly Integrations](https://calendly.com/integrations) or via the API:

- **URL:** `https://your-domain.com/api/webhooks/calendly` (or your ngrok URL + `/api/webhooks/calendly`)
- **Events:** `invitee.created`, `invitee.canceled`
- **Signing key:** copy into `CALENDLY_WEBHOOK_SECRET` in `.env.local`

**Local dev:** `npm run dev` skips signature verification automatically so you can POST test payloads to `http://localhost:3000/api/webhooks/calendly` without a signing key.

**Production:** set `CALENDLY_WEBHOOK_SECRET` from your Calendly webhook subscription. The route verifies `Calendly-Webhook-Signature` (HMAC-SHA256 over `timestamp.rawBody`) before writing to the database.

## Calendly MCP (optional, for AI assistants)

Calendly provides an official MCP at `https://mcp.calendly.com` for managing event types and availability from Claude/ChatGPT. It is **not** used by the patient booking UI — the app uses `react-calendly` embed + webhooks instead.

## Run the app

```bash
npm run dev
```

Visit `/book` to walk through: Service → Practitioner → Insurance → Details → Calendly → Confirmation.
