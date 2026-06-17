"use client";

import { useState } from "react";
import { CrmRow } from "@/lib/crmData";
import { StagePill, RelPill } from "./CrmPill";

type SortKey = "name" | "activity" | "stage";
type SortDir = "asc" | "desc";

function initials(name: string) {
  return name
    .split(/[\s+&|]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const AVATAR_COLORS = [
  "71, 105, 134",   // team blue
  "13, 148, 136",   // teal
  "139, 92, 246",   // purple
  "217, 119, 6",    // amber
  "219, 39, 119",   // pink
  "59, 130, 246",   // blue
  "234, 88, 12",    // orange
  "88, 184, 54",    // green
];

function avatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

/* Exact grid from crm.scss */
const GRID_TEMPLATE =
  "minmax(220px, 1.5fr) 140px 130px 90px minmax(260px, 2fr) 110px 140px minmax(150px, 1fr) minmax(130px, 1fr)";

const HEADER_CELL: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "8px 12px",
  fontSize: "12px",
  fontWeight: 500,
  color: "rgba(252,252,252,0.45)",
  background: "transparent",
  border: "none",
  textAlign: "left",
  whiteSpace: "nowrap",
  cursor: "pointer",
  transition: "color 0.15s",
  fontFamily: "inherit",
};

const CELL: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  padding: "7px 12px",
  fontSize: "13px",
  color: "rgba(252,252,252,0.5)",
  minWidth: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

export default function CrmTable({ rows }: { rows: CrmRow[] }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "activity",
    dir: "asc",
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function toggleSort(key: SortKey) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  }

  const sorted = [...rows].sort((a, b) => {
    let cmp = 0;
    if (sort.key === "activity") cmp = a.activityMs - b.activityMs;
    else if (sort.key === "name") cmp = a.name.localeCompare(b.name);
    else if (sort.key === "stage")
      cmp = (a.stage ?? "").localeCompare(b.stage ?? "");
    return sort.dir === "asc" ? cmp : -cmp;
  });

  function SortArrow({ col }: { col: SortKey }) {
    if (sort.key !== col) return null;
    return (
      <span
        className="material-symbols-outlined"
        style={{ fontSize: "13px", color: "#fcfcfc" }}
      >
        {sort.dir === "asc" ? "arrow_upward" : "arrow_downward"}
      </span>
    );
  }

  return (
    <div style={{ overflowX: "auto", flex: 1, minHeight: 0 }}>
      <div
        role="table"
        style={{ minWidth: "1180px", width: "100%" }}
        aria-label="CRM"
      >
        {/* Header */}
        <div
          role="row"
          style={{
            display: "grid",
            gridTemplateColumns: GRID_TEMPLATE,
            position: "sticky",
            top: 0,
            zIndex: 2,
            background: "#1a1a1a",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Contact */}
          <button
            role="columnheader"
            style={{ ...HEADER_CELL, paddingLeft: "16px" }}
            onClick={() => toggleSort("name")}
          >
            Contact <SortArrow col="name" />
          </button>
          {/* Type */}
          <div role="columnheader" style={{ ...HEADER_CELL, cursor: "default" }}>
            Type
          </div>
          {/* Stage */}
          <button
            role="columnheader"
            style={HEADER_CELL}
            onClick={() => toggleSort("stage")}
          >
            Stage <SortArrow col="stage" />
          </button>
          {/* Activity */}
          <button
            role="columnheader"
            style={{
              ...HEADER_CELL,
              color: sort.key === "activity" ? "#fcfcfc" : "rgba(252,252,252,0.45)",
            }}
            onClick={() => toggleSort("activity")}
          >
            Activity <SortArrow col="activity" />
          </button>
          {/* Last message */}
          <div role="columnheader" style={{ ...HEADER_CELL, cursor: "default" }}>
            Last message
          </div>
          {/* Follow-up */}
          <div role="columnheader" style={{ ...HEADER_CELL, cursor: "default" }}>
            Follow-up
          </div>
          {/* Region */}
          <div role="columnheader" style={{ ...HEADER_CELL, cursor: "default" }}>
            Region
          </div>
          {/* Email */}
          <div role="columnheader" style={{ ...HEADER_CELL, cursor: "default" }}>
            Email
          </div>
          {/* Tags */}
          <div role="columnheader" style={{ ...HEADER_CELL, cursor: "default" }}>
            Tags
          </div>
        </div>

        {/* Body */}
        <div role="rowgroup">
          {sorted.map((row) => {
            const selected = row.id === selectedId;
            const rgb = avatarColor(row.name);
            return (
              <div
                key={row.id}
                role="row"
                onClick={() => setSelectedId(selected ? null : row.id)}
                style={{
                  display: "grid",
                  gridTemplateColumns: GRID_TEMPLATE,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  background: selected ? "rgba(160,255,121,0.08)" : "transparent",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!selected)
                    (e.currentTarget as HTMLDivElement).style.background = "#252525";
                }}
                onMouseLeave={(e) => {
                  if (!selected)
                    (e.currentTarget as HTMLDivElement).style.background = "transparent";
                }}
              >
                {/* Contact */}
                <div role="cell" style={{ ...CELL, paddingLeft: "16px", gap: "10px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: `rgba(${rgb}, 0.25)`,
                      border: `1px solid rgba(${rgb}, 0.4)`,
                      color: `rgb(${rgb})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {initials(row.name)}
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "#fcfcfc",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {row.name}
                  </span>
                </div>

                {/* Type */}
                <div role="cell" style={CELL}>
                  <RelPill value={row.relationship} />
                </div>

                {/* Stage */}
                <div role="cell" style={CELL}>
                  <StagePill value={row.stage} />
                </div>

                {/* Activity */}
                <div
                  role="cell"
                  style={{
                    ...CELL,
                    fontVariantNumeric: "tabular-nums",
                    gap: "6px",
                  }}
                >
                  <span>{row.activity}</span>
                  {row.direction === "in" && (
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#a0ff79",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>

                {/* Last message */}
                <div role="cell" style={{ ...CELL, gap: "6px" }}>
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: "13px",
                      flexShrink: 0,
                      color:
                        row.direction === "in"
                          ? "rgb(59,130,246)"
                          : "rgba(252,252,252,0.35)",
                    }}
                  >
                    {row.direction === "in" ? "call_received" : "call_made"}
                  </span>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {row.lastMessage}
                  </span>
                </div>

                {/* Follow-up */}
                <div role="cell" style={{ ...CELL, gap: "4px" }}>
                  {row.followUp && (
                    <>
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: "13px",
                          color: "rgba(252,252,252,0.35)",
                        }}
                      >
                        calendar_month
                      </span>
                      <span style={{ fontSize: "12px", color: "rgba(252,252,252,0.6)" }}>
                        {row.followUp}
                      </span>
                    </>
                  )}
                </div>

                {/* Region */}
                <div role="cell" style={{ ...CELL, gap: "6px" }}>
                  {row.region && (
                    <>
                      <span style={{ fontSize: "14px" }}>{row.regionFlag}</span>
                      <span>{row.region}</span>
                    </>
                  )}
                </div>

                {/* Email */}
                <div role="cell" style={CELL}>
                  {row.email && (
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "12px",
                      }}
                    >
                      {row.email}
                    </span>
                  )}
                </div>

                {/* Tags */}
                <div role="cell" style={{ ...CELL, gap: "4px", flexWrap: "wrap" }}>
                  {row.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "11px",
                        padding: "2px 7px",
                        borderRadius: "9999px",
                        background: "rgba(252,252,252,0.08)",
                        color: "rgba(252,252,252,0.6)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {!sorted.length && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "32px",
              color: "rgba(252,252,252,0.4)",
              fontSize: "14px",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "32px", opacity: 0.6 }}>
              filter_list_off
            </span>
            <span>No hay resultados</span>
          </div>
        )}
      </div>
    </div>
  );
}
