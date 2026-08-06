import { NextResponse } from "next/server";

/**
 * Franchise lead intake.
 *
 * Deliberate differences from the old PH endpoint, which accepted GET, had no
 * rate limiting, and logged each lead's name/phone/email to the browser console:
 *  - POST only
 *  - honeypot + per-IP rate limit
 *  - no personal data written to logs, ever
 */

/**
 * Two separate limits, because they defend against different things.
 *
 * `burst` guards the endpoint against being hammered. `leads` caps how many
 * *accepted* submissions one IP can file. Validation failures deliberately do
 * NOT count against `leads` — otherwise three typos would lock a genuine
 * applicant out of the only conversion path on the site.
 *
 * In-memory, which is correct for a single VPS process. Move to Redis if this
 * is ever scaled horizontally.
 */
const BURST = { windowMs: 60_000, max: 20 };
const LEADS = { windowMs: 10 * 60_000, max: 3 };

type Bucket = Map<string, { count: number; resetAt: number }>;
const burstHits: Bucket = new Map();
const leadHits: Bucket = new Map();

function overLimit(
  bucket: Bucket,
  ip: string,
  { windowMs, max }: { windowMs: number; max: number },
): boolean {
  const now = Date.now();
  const entry = bucket.get(ip);

  if (!entry || now > entry.resetAt) {
    bucket.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > max;
}

/** Keeps the maps from growing without bound on a long-lived process. */
function sweep(bucket: Bucket) {
  if (bucket.size < 5_000) return;
  const now = Date.now();
  for (const [key, entry] of bucket) {
    if (now > entry.resetAt) bucket.delete(key);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  sweep(burstHits);
  sweep(leadHits);

  if (overLimit(burstHits, ip, BURST)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: only a bot fills this.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    // Report success so the bot does not retry with a different shape.
    return NextResponse.json({ ok: true });
  }

  const str = (key: string) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  const name = str("name");
  const phone = str("phone");
  const email = str("email");
  const city = str("city");
  const message = str("message");

  const valid =
    name.length >= 2 &&
    phone.replace(/[^\d]/g, "").length >= 8 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    city.length >= 2;

  if (!valid) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  // Counted only now the submission is a genuine, well-formed lead.
  if (overLimit(leadHits, ip, LEADS)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.FRANCHISE_INBOX;
  const from = process.env.FRANCHISE_FROM ?? "TIANLALA <onboarding@resend.dev>";

  if (!apiKey || !inbox) {
    /*
     * Demo mode: no mail provider configured yet.
     *
     * The form completes so the site is demoable without any third-party
     * signup, but the lead is NOT delivered anywhere. Only the requested area
     * is logged — never the name, phone or email.
     *
     * `delivered: false` in the response keeps the API honest about what
     * actually happened.
     *
     * BEFORE REAL TRAFFIC: set RESEND_API_KEY and FRANCHISE_INBOX. Until then
     * every enquiry submitted here is lost.
     */
    console.warn(
      "[franchise] DEMO MODE — mail is not configured, so this lead was accepted but NOT delivered. " +
        "Set RESEND_API_KEY and FRANCHISE_INBOX to start receiving enquiries.",
    );
    console.warn(`[franchise] lead received for area: ${city}`);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Preferred area", city],
    ["Message", message || "-"],
  ];

  const html = `
    <h2>New franchise enquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="font-weight:bold">${label}</td><td>${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [inbox],
        reply_to: email,
        subject: `Franchise enquiry — ${city}`,
        html,
      }),
    });

    if (!res.ok) {
      // Log the status only. The response body can echo submitted data.
      console.error("[franchise] mail provider rejected send", res.status);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch {
    console.error("[franchise] mail provider unreachable");
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
