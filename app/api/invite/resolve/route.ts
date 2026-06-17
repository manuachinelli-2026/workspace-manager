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

async function getUsersHtml(cookie: string): Promise<string> {
  const res = await fetch(`${BASE()}/web/users`, {
    headers: { Cookie: `auth_token=${cookie}` },
    cache: "no-store",
  });
  return res.text();
}

function findPhoneInHtml(html: string, phone: string): { userId: string; name: string } | null {
  for (const rowMatch of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const row = rowMatch[1];
    const uuidMatch = row.match(/\/web\/users\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/);
    if (!uuidMatch) continue;

    const cellText = row.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const rowPhones = [...cellText.matchAll(/\b(\d{10,15})\b/g)].map((m) => m[1]);
    if (!rowPhones.includes(phone)) continue;

    const tds = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)];
    let name = "Unknown";
    for (const td of tds) {
      const text = td[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (text && !/^\d{10,}$/.test(text) && text !== "Free" && text !== "Premium") {
        name = text;
        break;
      }
    }

    return { userId: uuidMatch[1], name };
  }
  return null;
}

async function addMember(userId: string, cookie: string): Promise<boolean> {
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
  return res.status === 303 || res.status === 200;
}

export async function POST(req: NextRequest) {
  const { phones } = await req.json();
  if (!Array.isArray(phones) || phones.length === 0) {
    return NextResponse.json({ resolved: [], stillPending: [] });
  }

  const normalized = phones.map((p: string) => String(p).replace(/\D/g, "")).filter(Boolean);

  const token = await getAuthToken();
  if (!token) return NextResponse.json({ error: "auth failed" }, { status: 502 });

  // Fetch users page once, search all phones against it
  const html = await getUsersHtml(token);

  const resolved: Array<{ phone: string; name: string; userId: string }> = [];
  const stillPending: string[] = [];

  for (const phone of normalized) {
    const user = findPhoneInHtml(html, phone);
    if (!user) { stillPending.push(phone); continue; }

    const added = await addMember(user.userId, token);
    if (added) {
      resolved.push({ phone, name: user.name, userId: user.userId });
    } else {
      stillPending.push(phone);
    }
  }

  return NextResponse.json({ resolved, stillPending });
}
