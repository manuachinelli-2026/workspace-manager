"use client";

import { useState } from "react";
import { CRM_ROWS, TEAM_MEMBERS } from "@/lib/crmData";
import CrmTable from "@/components/crm/CrmTable";

const CHAT_TABS = ["All chats", "Contacts", "Groups"];
const VIEW_TABS = ["All", "Needs reply", "Pipeline", "Customers", "Follow-ups due"];

const AVATAR_COLORS = [
  "71, 105, 134",
  "13, 148, 136",
  "139, 92, 246",
  "217, 119, 6",
  "219, 39, 119",
  "59, 130, 246",
];

function memberAvatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function CrmPage() {
  const [activeMember, setActiveMember] = useState("Todos");
  const [chatTab, setChatTab] = useState("All chats");
  const [viewTab, setViewTab] = useState("All");
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredRows = CRM_ROWS.filter((row) => {
    if (activeMember !== "Todos" && row.assignedTo !== activeMember) return false;
    if (chatTab === "Contacts" && row.isGroup) return false;
    if (chatTab === "Groups" && !row.isGroup) return false;
    if (viewTab === "Needs reply" && row.direction !== "in") return false;
    if (viewTab === "Pipeline" && !row.stage) return false;
    if (viewTab === "Customers" && row.relationship !== "customer") return false;
    if (viewTab === "Follow-ups due" && !row.followUp) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!row.name.toLowerCase().includes(q) && !row.lastMessage.toLowerCase().includes(q))
        return false;
    }
    return true;
  });

  function TabBtn({
    label,
    active,
    onClick,
    count,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
    count?: number;
  }) {
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
          transition: "color 0.15s",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          if (!active)
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.8)";
        }}
        onMouseLeave={(e) => {
          if (!active)
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.5)";
        }}
      >
        {label}
        {count !== undefined && (
          <span
            style={{
              fontSize: "11px",
              color: "rgba(252,252,252,0.35)",
              fontWeight: 400,
            }}
          >
            {count}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
      }}
    >
      {/* Header area */}
      <div style={{ padding: "16px 16px 0", flexShrink: 0 }}>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 400,
            color: "#fcfcfc",
            marginBottom: "12px",
          }}
        >
          CRM
        </h1>

        {/* Team member filter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "10px",
            flexWrap: "wrap",
          }}
        >
          {TEAM_MEMBERS.map((member) => {
            const active = activeMember === member;
            const isAll = member === "Todos";
            const rgb = memberAvatarColor(member);
            return (
              <button
                key={member}
                onClick={() => setActiveMember(member)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: isAll ? "4px 12px" : "4px 10px 4px 5px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 500,
                  border: active
                    ? "1px solid rgba(160,255,121,0.35)"
                    : "1px solid rgba(255,255,255,0.08)",
                  background: active ? "rgba(160,255,121,0.1)" : "rgba(255,255,255,0.04)",
                  color: active ? "#a0ff79" : "rgba(252,252,252,0.6)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.8)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.6)";
                  }
                }}
              >
                {!isAll && (
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: `rgba(${rgb}, 0.25)`,
                      border: `1px solid rgba(${rgb}, 0.4)`,
                      color: `rgb(${rgb})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {initials(member)}
                  </div>
                )}
                {member}
              </button>
            );
          })}
        </div>

        {/* Toolbar: tabs + right controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            paddingBottom: "0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Left: tab groups */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Chat type segmented */}
            <div
              style={{
                display: "flex",
                background: "#252525",
                borderRadius: "8px",
                padding: "2px",
                gap: "2px",
              }}
            >
              {CHAT_TABS.map((tab) => (
                <TabBtn
                  key={tab}
                  label={tab}
                  active={chatTab === tab}
                  onClick={() => setChatTab(tab)}
                  count={tab === "All chats" ? filteredRows.length : undefined}
                />
              ))}
            </div>

            {/* Divider */}
            <div
              style={{
                width: "1px",
                height: "20px",
                background: "rgba(255,255,255,0.06)",
                flexShrink: 0,
              }}
            />

            {/* View segmented */}
            <div
              style={{
                display: "flex",
                background: "#252525",
                borderRadius: "8px",
                padding: "2px",
                gap: "2px",
              }}
            >
              {VIEW_TABS.map((tab) => (
                <TabBtn
                  key={tab}
                  label={tab}
                  active={viewTab === tab}
                  onClick={() => setViewTab(tab)}
                />
              ))}
            </div>
          </div>

          {/* Right: record count + import + search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              paddingBottom: "2px",
              flexShrink: 0,
            }}
          >
            <span
              style={{ fontSize: "12px", color: "rgba(252,252,252,0.35)", whiteSpace: "nowrap" }}
            >
              {filteredRows.length} records
            </span>

            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                border: "1px solid rgba(160,255,121,0.35)",
                color: "#a0ff79",
                background: "transparent",
                cursor: "pointer",
                transition: "background 0.15s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(160,255,121,0.08)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
              }
            >
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                upload
              </span>
              Import
            </button>

            {/* Search */}
            <div style={{ position: "relative" }}>
              <span
                className="material-symbols-outlined"
                style={{
                  position: "absolute",
                  left: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "15px",
                  color: "rgba(252,252,252,0.3)",
                  pointerEvents: "none",
                }}
              >
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
                  border: searchFocused
                    ? "1px solid #a0ff79"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "6px 10px 6px 30px",
                  width: "200px",
                  fontSize: "13px",
                  color: "#fcfcfc",
                  outline: "none",
                  transition: "border-color 0.15s",
                  fontFamily: "inherit",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table — fills remaining height */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
        }}
      >
        <CrmTable rows={filteredRows} />
      </div>
    </div>
  );
}
