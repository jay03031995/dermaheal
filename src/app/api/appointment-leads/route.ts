/**
 * POST /api/appointment-leads
 *
 * Captures lightweight appointment intent from call and WhatsApp CTAs.
 * Full form submissions continue to use /api/bookings.
 */
import { NextResponse, type NextRequest } from "next/server";
import { writeClient } from "@/sanity/lib/client";
import { dataset, projectId } from "@/sanity/env";

export const dynamic = "force-dynamic";

type Body = {
  channel?: "call" | "whatsapp";
  label?: string;
  location?: string;
  targetPhone?: string;
  pageUrl?: string;
  source?: string;
  name?: string;
  phone?: string;
  email?: string;
  age?: string;
  concern?: string;
  city?: string;
  doctor?: string;
  doctorName?: string;
};

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

function cleanText(value?: string, max = 500) {
  const trimmed = (value ?? "").trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

function cleanUrl(value?: string) {
  const raw = cleanText(value, 1000);
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(req: NextRequest) {
  const token = process.env.SANITY_API_TOKEN;
  if (!projectId || projectId === "missing") {
    return bad(
      "Server is missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to environment variables and redeploy.",
      500,
    );
  }
  if (!dataset) {
    return bad(
      "Server is missing NEXT_PUBLIC_SANITY_DATASET. Add it to environment variables and redeploy.",
      500,
    );
  }
  if (!token) {
    return bad(
      "Server is missing SANITY_API_TOKEN. Add it to environment variables and redeploy.",
      500,
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return bad("Invalid JSON body");
  }

  if (body.channel !== "call" && body.channel !== "whatsapp") {
    return bad("Lead channel must be call or whatsapp");
  }

  try {
    const client = writeClient(token);
    const doc = await client.create({
      _type: "appointment",
      status: "new",
      leadType: "cta",
      leadChannel: body.channel,
      name: cleanText(body.name, 120),
      phone: cleanText(body.phone, 80),
      email: cleanText(body.email, 160),
      ageRange: cleanText(body.age, 80),
      concern: cleanText(body.concern, 160),
      preferredClinic: cleanText(body.city, 200),
      doctor: cleanText(body.doctor, 120),
      doctorName: cleanText(body.doctorName, 160),
      ctaLabel: cleanText(body.label, 160),
      ctaLocation: cleanText(body.location, 160),
      targetPhone: cleanText(body.targetPhone, 80),
      pageUrl: cleanUrl(body.pageUrl),
      submittedAt: new Date().toISOString(),
      source: cleanText(body.source, 160) || "website-cta",
    });

    return NextResponse.json({ ok: true, id: doc._id });
  } catch (err) {
    console.error("[/api/appointment-leads] write failed:", err);
    return bad("Failed to save appointment lead", 500);
  }
}
