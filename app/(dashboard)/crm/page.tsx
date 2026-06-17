"use client";

import { useState } from "react";
import { CRM_ROWS, TEAM_MEMBERS } from "@/lib/crmData";
import CrmTable from "@/components/crm/CrmTable";

const CHAT_TABS = ["All chats", "Contacts", "Groups"];
const VIEW_TABS = ["All", "Needs reply", "Pipeline", "Customers", "Follow-ups due"];

const STAGES = ["All stages", "Lead", "Closing", "Won", "Lost"];

const ALL_REGIONS = ["All regions", ...Array.from(
  new Set(CRM_ROWS.map((r) => r.region).filter(Boolean) as string[])
).sort()];

const SELECT_STYLE: React.CSSProperties = {
  appearance: "none",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  padding: "5px 28px 5px 10px",
  fontSize: "13px",
  color: "rgba(252,252,252,0.75)",
  cursor: "pointer",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.12s",
};

function FilterSelect({
  value,
  onChange,
  options,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  icon: string;
}) {
  const isActive = value !== options[0];
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <span
        className="material-symbols-outlined"
        style={{
          position: "absolute",
          left: "8px",
          fontSize: "14px",
          color: isActive ? "#a0ff79" : "rgba(252,252,252,0.3)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {icon}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...SELECT_STYLE,
          paddingLeft: "26px",
          borderColor: isActive ? "rgba(160,255,121,0.35)" : "rgba(255,255,255,0.08)",
          color: isActive ? "#a0ff79" : "rgba(252,252,252,0.75)",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "#1f1f1f", color: "#fcfcfc" }}>
            {o}
          </option>
        ))}
      </select>
      <span
        className="material-symbols-outlined"
        style={{
          position: "absolute",
          right: "6px",
          fontSize: "14px",
          color: "rgba(252,252,252,0.3)",
          pointerEvents: "none",
        }}
      >
        expand_more
      </span>
    </div>
  );
}

export default function CrmPage() {
  const [assignedTo, setAssignedTo]   = useState("All");
  const [chatTab, setChatTab]         = useState("All chats");
  const [viewTab, setViewTab]         = useState("All");
  const [stage, setStage]             = useState("All stages");
  const [region, setRegion]           = useState("All regions");
  const [search, setSearch]           = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredRows = CRM_ROWS.filter((row) => {
    if (assignedTo !== "All" && row.assignedTo !== assignedTo) return false;
    if (chatTab === "Contacts" && row.isGroup) return false;
    if (chatTab === "Groups" && !row.isGroup) return false;
    if (viewTab === "Needs reply" && row.direction !== "in") return false;
    if (viewTab === "Pipeline" && !row.stage) return false;
    if (viewTab === "Customers" && row.relationship !== "customer") return false;
    if (viewTab === "Follow-ups due" && !row.followUp) return false;
    if (stage !== "All stages" && row.stage !== stage.toLowerCase()) return false;
    if (region !== "All regions" && row.region !== region) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!row.name.toLowerCase().includes(q) && !row.lastMessage.toLowerCase().includes(q))
        return false;
    }
    return true;
  });

  const activeFilterCount = [
    assignedTo !== "All",
    stage !== "All stages",
    region !== "All regions",
  ].filter(Boolean).length;

  function clearFilters() {
    setAssignedTo("All");
    setStage("All stages");
    setRegion("All regions");
  }

  function TabBtn({ label, active, onClick, count }: { label: string; active: boolean; onClick: () => void; count?: number }) {
    return (
      <button
        onClick={onClick}
        style={{
          border: "none",
          background: active ? "#1a1a1a" : "transparent",
          color: active ? "#fcfcfc" : "rgba(252,252,252,0.5)",
          fontSize: "13px",
          fontWeight: active ? 600 : 500,
          padding: "5px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          whiteSpace: "nowrap",
          boxShadow: active ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
          transition: "color 0.12s",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.8)"; }}
        onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.5)"; }}
      >
        {label}
        {count !== undefined && (
          <span style={{ fontSize: "11px", color: "rgba(252,252,252,0.35)", fontWeight: 400 }}>{count}</span>
        )}
      </button>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      {/* Header area */}
      <div style={{ padding: "16px 16px 0", flexShrink: 0 }}>
        <h1 style={{ fontSize: "20px", fontWeight: 500, color: "#fcfcfc", marginBottom: "12px" }}>
          CRM
        </h1>

        {/* Toolbar: tabs + filters + right controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            paddingBottom: "10px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            flexWrap: "wrap",
          }}
        >
          {/* Left: tab groups */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", background: "#252525", borderRadius: "8px", padding: "2px", gap: "2px" }}>
              {CHAT_TABS.map((tab) => (
                <TabBtn key={tab} label={tab} active={chatTab === tab} onClick={() => setChatTab(tab)}
                  count={tab === "All chats" ? filteredRows.length : undefined} />
              ))}
            </div>

            <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.06)", flexShrink: 0 }} />

            <div style={{ display: "flex", background: "#252525", borderRadius: "8px", padding: "2px", gap: "2px" }}>
              {VIEW_TABS.map((tab) => (
                <TabBtn key={tab} label={tab} active={viewTab === tab} onClick={() => setViewTab(tab)} />
              ))}
            </div>

            <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.06)", flexShrink: 0 }} />

            {/* Dropdowns */}
            <FilterSelect
              value={assignedTo === "All" ? "All" : assignedTo}
              onChange={setAssignedTo}
              options={TEAM_MEMBERS}
              icon="person"
            />
            <FilterSelect value={stage} onChange={setStage} options={STAGES} icon="flag" />
            <FilterSelect value={region} onChange={setRegion} options={ALL_REGIONS} icon="language" />

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  fontSize: "12px", color: "rgba(252,252,252,0.4)",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "inherit", padding: "4px 6px", borderRadius: "6px",
                  transition: "color 0.12s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(239,68,68,0.8)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.4)")}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>close</span>
                Clear {activeFilterCount > 1 ? `${activeFilterCount} filters` : "filter"}
              </button>
            )}
          </div>

          {/* Right: record count + import + search */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <span style={{ fontSize: "12px", color: "rgba(252,252,252,0.35)", whiteSpace: "nowrap" }}>
              {filteredRows.length} records
            </span>

            <button
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "5px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
                border: "1px solid rgba(160,255,121,0.35)", color: "#a0ff79",
                background: "transparent", cursor: "pointer", transition: "background 0.15s", fontFamily: "inherit",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(160,255,121,0.08)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>upload</span>
              Import
            </button>

            <div style={{ position: "relative" }}>
              <span className="material-symbols-outlined" style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "rgba(252,252,252,0.3)", pointerEvents: "none" }}>
                search
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: searchFocused ? "1px solid #a0ff79" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px", padding: "6px 10px 6px 30px",
                  width: "180px", fontSize: "13px", color: "#fcfcfc",
                  outline: "none", transition: "border-color 0.15s", fontFamily: "inherit",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        <CrmTable rows={filteredRows} />
      </div>
    </div>
  );
}
