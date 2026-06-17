import { NextResponse } from "next/server";
import { fetchWorkspaceData } from "@/lib/voltApiScraper";

export const dynamic = "force-dynamic";

export async function GET() {
  const workspaceId = process.env.VOLT_WORKSPACE_ID;
  if (!workspaceId) {
    return NextResponse.json({ error: "VOLT_WORKSPACE_ID not configured" }, { status: 500 });
  }

  try {
    const data = await fetchWorkspaceData(workspaceId);
    if (!data) {
      return NextResponse.json({ error: "Auth failed or workspace not found" }, { status: 502 });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
