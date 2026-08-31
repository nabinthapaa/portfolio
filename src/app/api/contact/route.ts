import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Must stay on the Node runtime. Nodemailer opens a TCP/TLS socket to the SMTP
// server, which the edge runtime cannot do.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITS = { name: 100, email: 254, message: 5000 } as const;

const SEND_TIMEOUT_MS = 8_000;

const RATE = { limit: 5, windowMs: 60_000 };

// Netlify rejects bursts at the edge before this function is invoked (see
// netlify/edge-functions/contact-rate-limit.ts). This is a second layer that
// also covers local dev and non-Netlify hosts. It is per-instance, so a
// serverless deployment can serve more than `limit` across scaled instances --
// it blunts bursts rather than enforcing a global quota.
const hits = new Map<string, { count: number; resetAt: number }>();

const clientIp = (request: Request) =>
  request.headers.get("x-nf-client-connection-ip") ??
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  "unknown";

const isRateLimited = (ip: string) => {
  const now = Date.now();
  for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key);

  const entry = hits.get(ip);
  if (!entry) {
    hits.set(ip, { count: 1, resetAt: now + RATE.windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE.limit;
};

type Field = keyof typeof LIMITS;

const readField = (body: Record<string, unknown>, field: Field) => {
  const value = body[field];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > LIMITS[field]) return null;
  return trimmed;
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const config = () => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL,
    SMTP_SECURE,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    return null;
  }

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : Number(SMTP_PORT) === 465,
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: CONTACT_TO_EMAIL,
    from: CONTACT_FROM_EMAIL || SMTP_USER,
  };
};

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(RATE.windowMs / 1000) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill every field they find; humans never see this one.
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = readField(body, "name");
  const email = readField(body, "email");
  const message = readField(body, "message");

  if (!name || !email || !message || !isEmail(email)) {
    return NextResponse.json(
      { error: "Please fill in your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const smtp = config();
  if (!smtp) {
    console.error("Contact form: SMTP environment variables are not configured.");
    return NextResponse.json(
      { error: "The contact form is not available right now." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
    connectionTimeout: SEND_TIMEOUT_MS,
    greetingTimeout: SEND_TIMEOUT_MS,
    socketTimeout: SEND_TIMEOUT_MS,
  });

  try {
    await transporter.sendMail({
      // `from` must be an address the SMTP account is allowed to send as, or
      // SPF/DKIM will fail. The visitor's address goes in replyTo instead.
      from: `"Portfolio contact" <${smtp.from}>`,
      to: smtp.to,
      replyTo: `"${name}" <${email}>`,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  } catch (error) {
    // Logged server-side only: SMTP errors can contain credentials or host detail.
    console.error("Contact form: send failed.", error);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
