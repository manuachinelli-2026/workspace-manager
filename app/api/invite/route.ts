import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE = () => process.env.VOLT_API_URL!;
const EMAIL = () => process.env.VOLT_API_EMAIL!;
const PASSWORD = () => process.env.VOLT_API_PASSWORD!;
const WS_ID = () => process.env.VOLT_WORKSPACE_ID!;

async function getAuthToken(): Promise<string | null> {
  const res = await fetch(`${BASE()}/web/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${encodeURIComponent(EMAIL())}&password=${encodeURIComponent(PASSWORD())}`,
    cache: "no-store",
  });
  const setCookie = res.headers.get("set-cookie");
  return setCookie?.match(/auth_token=([^;]+)/)?.[1] ?? null;
}

/** Search /web/users HTML table for a user matching the given normalized phone. */
async function findUserByPhone(
  phone: string,
  cookie: string
): Promise<{ userId: string; name: string } | null> {
  const res = await fetch(`${BASE()}/web/users`, {
    headers: { Cookie: `auth_token=${cookie}` },
    cache: "no-store",
  });
  const html = await res.text();

  for (const rowMatch of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const row = rowMatch[1];
    const uuidMatch = row.match(/\/web\/users\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/);
    if (!uuidMatch) continue;

    // Extract all text from cells, strip tags
    const cellText = row.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    // Phone digits in this row
    const rowPhones = [...cellText.matchAll(/\b(\d{10,15})\b/g)].map((m) => m[1]);
    if (!rowPhones.includes(phone)) continue;

    // Extract name from the second td (after the phone td)
    const tds = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)];
    let name = "Unknown";
    for (const td of tds) {
      const text = td[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      // Name cell usually has no long digit sequence
      if (text && !/^\d{10,}$/.test(text) && text !== "Free" && text !== "Premium") {
        name = text;
        break;
      }
    }

    return { userId: uuidMatch[1], name };
  }

  return null;
}

/** Add a user UUID to the workspace. */
async function addMemberToWorkspace(userId: string, cookie: string): Promise<boolean> {
  const res = await fetch(`${BASE()}/web/workspaces/${WS_ID()}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: `auth_token=${cookie}`,
    },
    body: `user_ids=${encodeURIComponent(userId)}&role=Member`,
    redirect: "manual",
    cache: "no-store",
  });
  // 303 redirect = success
  return res.status === 303 || res.status === 200;
}

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  if (!phone) return NextResponse.json({ status: "error", message: "phone required" }, { status: 400 });

  const normalized = String(phone).replace(/\D/g, "");
  if (!normalized) return NextResponse.json({ status: "error", message: "invalid phone" }, { status: 400 });

  const token = await getAuthToken();
  if (!token) return NextResponse.json({ status: "error", message: "auth failed" }, { status: 502 });

  const user = await findUserByPhone(normalized, token);
  if (!user) {
    return NextResponse.json({ status: "pending" });
  }

  const added = await addMemberToWorkspace(user.userId, token);
  if (!added) {
    return NextResponse.json({ status: "error", message: "failed to add member" }, { status: 502 });
  }

  return NextResponse.json({ status: "added", name: user.name, userId: user.userId });
}
