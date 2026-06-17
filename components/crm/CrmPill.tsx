import type { Stage, Relationship } from "@/lib/crmData";

/* Exact RGB values from volt-extension/src/wrapper/scripts/crm/crm.scss */
const STAGE_RGB: Record<NonNullable<Stage>, string> = {
  lead:    "59, 130, 246",
  closing: "217, 119, 6",
  won:     "88, 184, 54",
  lost:    "239, 68, 68",
};

const STAGE_LABEL: Record<NonNullable<Stage>, string> = {
  lead:    "Lead",
  closing: "Closing",
  won:     "Won",
  lost:    "Lost",
};

const REL_RGB: Record<NonNullable<Relationship>, string> = {
  customer:  "13, 148, 136",
  partner:   "139, 92, 246",
  vendor:    "234, 88, 12",
  team:      "71, 105, 134",
  personal:  "219, 39, 119",
  automated: "120, 124, 130",
  unknown:   "120, 124, 130",
};

const REL_LABEL: Record<NonNullable<Relationship>, string> = {
  customer:  "Customer",
  partner:   "Partner",
  vendor:    "Vendor",
  team:      "Team",
  personal:  "Personal",
  automated: "Automated",
  unknown:   "Unknown",
};

function Pill({ rgb, label }: { rgb: string; label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        borderRadius: "9999px",
        padding: "3px 10px",
        fontSize: "12px",
        fontWeight: 500,
        whiteSpace: "nowrap",
        background: `rgba(${rgb}, 0.13)`,
        color: `rgb(${rgb})`,
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "currentColor",
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
}

export function StagePill({ value }: { value: Stage }) {
  if (!value) return null;
  return <Pill rgb={STAGE_RGB[value]} label={STAGE_LABEL[value]} />;
}

export function RelPill({ value }: { value: Relationship }) {
  if (!value) return null;
  return <Pill rgb={REL_RGB[value]} label={REL_LABEL[value]} />;
}
