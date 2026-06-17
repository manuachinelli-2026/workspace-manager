/**
 * Server-side scraper for volt-api-proxy.
 * The backend only serves HTML (HTMX/SSR), so we parse it to extract JSON data.
 * This module is server-only — never import from client components.
 */

const BASE = process.env.VOLT_API_URL!;
const EMAIL = process.env.VOLT_API_EMAIL!;
const PASSWORD = process.env.VOLT_API_PASSWORD!;

export interface WorkspaceMember {
  userId: string;
  name: string;
  phone: string;
  role: "Owner" | "Admin" | "Member";
  joinedAt: string;
  plan: "Premium" | "Free" | "Business";
  voltCloud: "connected" | "disconnected";
  listCount: number;
}

export interface WorkspaceData {
  members: WorkspaceMember[];
  workspacePlan: string;
  updatedAt: string;
}

async function authenticate(): Promise<string | null> {
  const res = await fetch(`${BASE}/web/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${encodeURIComponent(EMAIL)}&password=${encodeURIComponent(PASSWORD)}`,
    cache: "no-store",
  });
  const cookie = res.headers.get("set-cookie");
  const token = cookie?.match(/auth_token=([^;]+)/)?.[1];
  return token ?? null;
}

function parseMembers(html: string): Array<{ userId: string; name: string; phone: string; role: string; joinedAt: string }> {
  const members: Array<{ userId: string; name: string; phone: string; role: string; joinedAt: string }> = [];

  // Extract member rows from the workspace page table
  // Each row has: name+phone cell, role, joinedAt, bindings
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
  let rowMatch;
  while ((rowMatch = rowRegex.exec(html)) !== null) {
    const row = rowMatch[1];
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) =>
      m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
    );
    if (cells.length < 3) continue;

    // Extract user ID from hx-delete attribute in this row
    const userIdMatch = row.match(/\/web\/workspaces\/[^/]+\/members\/([0-9a-f-]{36})/);
    if (!userIdMatch) continue;
    const userId = userIdMatch[1];

    // First cell text: "Lucia Leal 5493512336517 · Lucia Leal" or similar
    // The name appears before and after the phone — take only the part before the phone.
    const nameCell = cells[0];
    const phoneMatch = nameCell.match(/\b(\d{10,15})\b/);
    const phone = phoneMatch?.[1] ?? "";
    const beforePhone = phone ? nameCell.substring(0, nameCell.indexOf(phone)) : nameCell;
    const name = beforePhone.replace(/[·\s]+$/, "").replace(/\s+/g, " ").trim();

    const role = (cells[1] ?? "Member") as "Owner" | "Admin" | "Member";
    const joinedAt = cells[2] ?? "";

    members.push({ userId, name: name || "Unknown", phone, role, joinedAt });
  }

  return members;
}

function parseUserDetails(html: string): { plan: "Premium" | "Free" | "Business"; voltCloud: "connected" | "disconnected"; listCount: number } {
  // Plan: look for badge with active-paying class
  const planMatch = html.match(/badge-border-active-paying[^>]*>(Premium|Business)<\/span>/);
  const plan = (planMatch?.[1] ?? "Free") as "Premium" | "Free" | "Business";

  // Volt Cloud (session status): Connected = open session
  const connectedMatch = html.match(/\b(Connected|Open)\b/);
  const closedMatch = html.match(/\bClosed\b/);
  const voltCloud: "connected" | "disconnected" = connectedMatch ? "connected" : "disconnected";

  // List count: "No saved bindings" means 0; count any list rows
  const listCountMatch = html.match(/(\d+)\s+list/i);
  const listCount = listCountMatch ? parseInt(listCountMatch[1]) : 0;

  return { plan, voltCloud, listCount };
}

export async function fetchWorkspaceData(workspaceId: string): Promise<WorkspaceData | null> {
  const token = await authenticate();
  if (!token) return null;

  const cookie = `auth_token=${token}`;

  // Fetch workspace HTML
  const wsHtml = await fetch(`${BASE}/web/workspaces/${workspaceId}`, {
    headers: { Cookie: cookie },
    cache: "no-store",
  }).then((r) => r.text());

  const rawMembers = parseMembers(wsHtml);

  // Detect workspace plan
  const planMatch = wsHtml.match(/badge-border-active-paying[^>]*>(Workspace[^<]*)<\/span>/);
  const workspacePlan = planMatch?.[1]?.trim() ?? "Workspace";

  // Fetch user details in parallel
  const members = await Promise.all(
    rawMembers.map(async (m): Promise<WorkspaceMember> => {
      try {
        const userHtml = await fetch(`${BASE}/web/users/${m.userId}`, {
          headers: { Cookie: cookie },
          cache: "no-store",
        }).then((r) => r.text());
        const details = parseUserDetails(userHtml);
        return { ...m, role: m.role as "Owner" | "Admin" | "Member", ...details };
      } catch {
        return { ...m, role: m.role as "Owner" | "Admin" | "Member", plan: "Free", voltCloud: "disconnected", listCount: 0 };
      }
    })
  );

  return { members, workspacePlan, updatedAt: new Date().toISOString() };
}
