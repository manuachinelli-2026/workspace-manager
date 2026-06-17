"use client";

import { useState } from "react";
import { Search, Upload } from "lucide-react";
import { CRM_ROWS, TEAM_MEMBERS } from "@/lib/crmData";
import CrmTable from "@/components/crm/CrmTable";

const CHAT_TABS = ["All chats", "Contacts", "Groups"];
const VIEW_TABS = ["All", "Needs reply", "Pipeline", "Customers", "Follow-ups due"];

export default function CrmPage() {
  const [activeMember, setActiveMember] = useState("Todos");
  const [chatTab, setChatTab] = useState("All chats");
  const [viewTab, setViewTab] = useState("All");
  const [search, setSearch] = useState("");

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

  function initials(name: string) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");
  }

  const AVATAR_COLORS = ["#58b836", "#66baff", "#a855f7", "#f59e0b", "#ec4899", "#14b8a6"];

  function avatarColor(name: string) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return AVATAR_COLORS[h % AVATAR_COLORS.length];
  }

  const tabBase =
    "px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer";
  const tabActive =
    "bg-[rgba(255,255,255,0.1)] text-[#fcfcfc] font-medium";
  const tabInactive =
    "text-[rgba(252,252,252,0.5)] hover:text-[rgba(252,252,252,0.8)]";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-0">
        <h1 className="text-lg font-semibold text-[#fcfcfc] mb-4">CRM</h1>

        {/* Team member filter */}
        <div className="flex items-center gap-2 mb-4">
          {TEAM_MEMBERS.map((member) => {
            const active = activeMember === member;
            const isAll = member === "Todos";
            return (
              <button
                key={member}
                onClick={() => setActiveMember(member)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all"
                style={{
                  background: active
                    ? "rgba(88,184,54,0.15)"
                    : "rgba(255,255,255,0.05)",
                  color: active ? "#58b836" : "rgba(252,252,252,0.6)",
                  border: active
                    ? "1px solid rgba(88,184,54,0.4)"
                    : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {!isAll && (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: avatarColor(member) }}
                  >
                    {initials(member)}
                  </div>
                )}
                <span className="font-medium">{member}</span>
              </button>
            );
          })}
        </div>

        {/* Tabs + controls row */}
        <div
          className="flex items-center justify-between pb-0 border-b border-[rgba(255,255,255,0.06)]"
        >
          <div className="flex items-center gap-1">
            {/* Chat type tabs */}
            <div className="flex gap-0.5 mr-3">
              {CHAT_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setChatTab(tab)}
                  className={`${tabBase} ${chatTab === tab ? tabActive : tabInactive}`}
                >
                  {tab}
                  {tab === "All chats" && (
                    <span className="ml-1.5 text-[10px] text-[rgba(252,252,252,0.3)]">
                      {filteredRows.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-4 bg-[rgba(255,255,255,0.1)] mx-1" />

            {/* View tabs */}
            <div className="flex gap-0.5">
              {VIEW_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setViewTab(tab)}
                  className={`${tabBase} ${viewTab === tab ? tabActive : tabInactive}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 pb-1">
            <span className="text-xs text-[rgba(252,252,252,0.3)]">
              {filteredRows.length} records
            </span>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
              style={{
                border: "1px solid rgba(88,184,54,0.4)",
                color: "#58b836",
              }}
            >
              <Upload size={12} />
              Import
            </button>
            <div className="relative">
              <Search
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[rgba(252,252,252,0.3)]"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-[#282b2e] border border-[rgba(255,255,255,0.08)] rounded-lg pl-7 pr-3 py-1.5 text-sm text-[#fcfcfc] placeholder:text-[rgba(252,252,252,0.3)] focus:outline-none focus:border-[rgba(255,255,255,0.2)] w-48 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 pt-0">
        <CrmTable rows={filteredRows} />
      </div>
    </div>
  );
}
