import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const BASE = process.env.VOLT_API_URL;
  const EMAIL = process.env.VOLT_API_EMAIL;
  const PASSWORD = process.env.VOLT_API_PASSWORD;
  const WS_ID = process.env.VOLT_WORKSPACE_ID;

  const steps: Record<string, unknown> = {
    env: {
      VOLT_API_URL: BASE ?? "MISSING",
      VOLT_API_EMAIL: EMAIL ? EMAIL.replace(/.(?=.{4})/g, "*") : "MISSING",
      VOLT_API_PASSWORD: PASSWORD ? "SET (hidden)" : "MISSING",
      VOLT_WORKSPACE_ID: WS_ID ?? "MISSING",
    },
  };

  if (!BASE || !EMAIL || !PASSWORD || !WS_ID) {
    return NextResponse.json({ ok: false, steps, error: "Missing env vars" }, { status: 500 });
  }

  // Step 1: authenticate
  let authToken: string | null = null;
  try {
    const loginRes = await fetch(`${BASE}/web/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${encodeURIComponent(EMAIL)}&password=${encodeURIComponent(PASSWORD)}`,
      cache: "no-store",
    });
    const setCookie = loginRes.headers.get("set-cookie");
    authToken = setCookie?.match(/auth_token=([^;]+)/)?.[1] ?? null;
    steps.auth = { status: loginRes.status, tokenReceived: !!authToken };
  } catch (e) {
    steps.auth = { error: String(e) };
    return NextResponse.json({ ok: false, steps, error: "Auth fetch failed" }, { status: 502 });
  }

  if (!authToken) {
    return NextResponse.json({ ok: false, steps, error: "Auth succeeded but no token in cookie" }, { status: 401 });
  }

  // Step 2: fetch workspace page
  let wsHtml = "";
  try {
    const wsRes = await fetch(`${BASE}/web/workspaces/${WS_ID}`, {
      headers: { Cookie: `auth_token=${authToken}` },
      cache: "no-store",
    });
    wsHtml = await wsRes.text();
    const memberLinkCount = (wsHtml.match(/\/web\/workspaces\/[^/]+\/members\/[0-9a-f-]{36}/g) ?? []).length;
    steps.workspace = { status: wsRes.status, htmlLength: wsHtml.length, memberLinksFound: memberLinkCount };
  } catch (e) {
    steps.workspace = { error: String(e) };
    return NextResponse.json({ ok: false, steps, error: "Workspace fetch failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, steps });
}
