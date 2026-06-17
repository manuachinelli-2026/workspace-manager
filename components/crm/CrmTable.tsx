"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, MoveUpRight, MoveDownLeft } from "lucide-react";
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
  "#58b836", "#66baff", "#a855f7", "#f59e0b",
  "#ec4899", "#14b8a6", "#f97316", "#ef4444",
];

function avatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

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
        : { key, dir: key === "activity" ? "asc" : "asc" }
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

  function SortIcon({ col }: { col: SortKey }) {
    if (sort.key !== col) return null;
    return sort.dir === "asc" ? (
      <ArrowDown size={12} className="inline ml-1" />
    ) : (
      <ArrowUp size={12} className="inline ml-1" />
    );
  }

  const headerCls =
    "px-3 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-[rgba(252,252,252,0.4)] select-none cursor-pointer hover:text-[rgba(252,252,252,0.7)] transition-colors whitespace-nowrap";
  const headerNoCursor =
    "px-3 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-[rgba(252,252,252,0.4)] whitespace-nowrap";

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[900px]">
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <th className={headerCls} onClick={() => toggleSort("name")}>
              Contact <SortIcon col="name" />
            </th>
            <th className={headerNoCursor}>Type</th>
            <th className={headerCls} onClick={() => toggleSort("stage")}>
              Stage <SortIcon col="stage" />
            </th>
            <th className={headerCls} onClick={() => toggleSort("activity")}>
              Activity <SortIcon col="activity" />
            </th>
            <th className={headerNoCursor}>Last message</th>
            <th className={headerNoCursor}>Follow-up</th>
            <th className={headerNoCursor}>Region</th>
            <th className={headerNoCursor}>Email</th>
            <th className={headerNoCursor}>Tags</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => {
            const selected = row.id === selectedId;
            return (
              <tr
                key={row.id}
                onClick={() => setSelectedId(selected ? null : row.id)}
                className="cursor-pointer transition-colors"
                style={{
                  background: selected
                    ? "rgba(88,184,54,0.07)"
                    : "transparent",
                  borderLeft: selected
                    ? "2px solid #58b836"
                    : "2px solid transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
                onMouseEnter={(e) => {
                  if (!selected)
                    (e.currentTarget as HTMLTableRowElement).style.background =
                      "#2f3336";
                }}
                onMouseLeave={(e) => {
                  if (!selected)
                    (e.currentTarget as HTMLTableRowElement).style.background =
                      "transparent";
                }}
              >
                {/* Contact */}
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 text-white"
                      style={{ background: avatarColor(row.name) }}
                    >
                      {initials(row.name)}
                    </div>
                    <span className="text-sm text-[#fcfcfc] font-medium truncate max-w-[160px]">
                      {row.name}
                    </span>
                  </div>
                </td>
                {/* Type */}
                <td className="px-3 py-2.5">
                  <RelPill value={row.relationship} />
                </td>
                {/* Stage */}
                <td className="px-3 py-2.5">
                  <StagePill value={row.stage} />
                </td>
                {/* Activity */}
                <td className="px-3 py-2.5">
                  <span className="text-sm text-[rgba(252,252,252,0.6)] tabular-nums">
                    {row.activity}
                  </span>
                </td>
                {/* Last message */}
                <td className="px-3 py-2.5 max-w-[260px]">
                  <div className="flex items-center gap-1.5">
                    {row.direction === "out" ? (
                      <MoveUpRight
                        size={11}
                        className="shrink-0 text-[rgba(252,252,252,0.35)]"
                      />
                    ) : (
                      <MoveDownLeft
                        size={11}
                        className="shrink-0 text-[rgba(252,252,252,0.35)]"
                      />
                    )}
                    <span className="text-sm text-[rgba(252,252,252,0.55)] truncate">
                      {row.lastMessage}
                    </span>
                  </div>
                </td>
                {/* Follow-up */}
                <td className="px-3 py-2.5">
                  {row.followUp && (
                    <span className="text-xs text-[#f59e0b]">{row.followUp}</span>
                  )}
                </td>
                {/* Region */}
                <td className="px-3 py-2.5">
                  {row.region && (
                    <span className="text-sm text-[rgba(252,252,252,0.6)] whitespace-nowrap">
                      {row.regionFlag} {row.region}
                    </span>
                  )}
                </td>
                {/* Email */}
                <td className="px-3 py-2.5">
                  {row.email && (
                    <span className="text-xs text-[rgba(252,252,252,0.5)] truncate max-w-[160px]">
                      {row.email}
                    </span>
                  )}
                </td>
                {/* Tags */}
                <td className="px-3 py-2.5">
                  {row.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{
                        background: "rgba(102,186,255,0.15)",
                        color: "#66baff",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
