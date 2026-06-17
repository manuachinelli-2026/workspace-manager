import type { Stage, Relationship } from "@/lib/crmData";

const STAGE_STYLES: Record<NonNullable<Stage>, { bg: string; text: string; label: string }> = {
  lead: { bg: "rgba(245,158,11,0.2)", text: "#f59e0b", label: "Lead" },
  closing: { bg: "rgba(102,186,255,0.2)", text: "#66baff", label: "Closing" },
  won: { bg: "rgba(88,184,54,0.2)", text: "#58b836", label: "Won" },
  lost: { bg: "rgba(239,68,68,0.2)", text: "#ef4444", label: "Lost" },
};

const REL_STYLES: Record<NonNullable<Relationship>, { bg: string; text: string; label: string }> = {
  customer: { bg: "rgba(20,184,166,0.2)", text: "#14b8a6", label: "Customer" },
  partner: { bg: "rgba(168,85,247,0.2)", text: "#a855f7", label: "Partner" },
  vendor: { bg: "rgba(249,115,22,0.2)", text: "#f97316", label: "Vendor" },
  team: { bg: "rgba(102,186,255,0.2)", text: "#66baff", label: "Team" },
  personal: { bg: "rgba(236,72,153,0.2)", text: "#ec4899", label: "Personal" },
  automated: { bg: "rgba(160,255,121,0.15)", text: "#a0ff79", label: "Automated" },
  unknown: { bg: "rgba(255,255,255,0.08)", text: "rgba(252,252,252,0.5)", label: "Unknown" },
};

export function StagePill({ value }: { value: Stage }) {
  if (!value) return null;
  const s = STAGE_STYLES[value];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ background: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}

export function RelPill({ value }: { value: Relationship }) {
  if (!value) return null;
  const s = REL_STYLES[value];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ background: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}
