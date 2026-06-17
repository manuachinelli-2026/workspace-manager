import { NextResponse } from "next/server";
import { fetchWorkspaceData } from "@/lib/voltApiScraper";

// Revalidate cached data every 60 seconds
export const revalidate = 60;

export async function GET() {
  const workspaceId = process.env.VOLT_WORKSPACE_ID;
  if (!workspaceId) {
    return NextResponse.json({ error: "VOLT_WORKSPACE_ID not configured" }, { status: 500 });
  }

  const data = await fetchWorkspaceData(workspaceId);
  if (!data) {
    return NextResponse.json({ error: "Failed to fetch workspace data" }, { status: 502 });
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
    },
  });
}
