"use client";

import { useState } from "react";

interface Member {
  name: string;
  initials: string;
  avatarRgb: string;
  status: "active" | "invited";
  voltCloud: "connected" | "disconnected" | null;
  hubspot: "linked" | "pending" | null;
  license: "active" | "pending";
  hoursSaved: number | null;
  lastActive: string | null;
}

const MEMBERS: Member[] = [
  {
    name: "Lucia Leal",
    initials: "LL",
    avatarRgb: "88, 184, 54",
    status: "active",
    voltCloud: "disconnected",
    hubspot: "linked",
    license: "active",
    hoursSaved: 14,
    lastActive: "2h ago",
  },
  {
    name: "Michelle H d A",
    initials: "MH",
    avatarRgb: "59, 130, 246",
    status: "active",
    voltCloud: "disconnected",
    hubspot: "linked",
    license: "active",
    hoursSaved: 11,
    lastActive: "4h ago",
  },
  {
    name: "Humand",
    initials: "HU",
    avatarRgb: "139, 92, 246",
    status: "active",
    voltCloud: "connected",
    hubspot: null,
    license: "active",
    hoursSaved: 9,
    lastActive: "1h ago",
  },
  {
    name: "Humand",
    initials: "HU",
    avatarRgb: "13, 148, 136",
    status: "active",
    voltCloud: "disconnected",
    hubspot: null,
    license: "active",
    hoursSaved: 8,
    lastActive: "3d ago",
  },
  {
    name: "Humand",
    initials: "HU",
    avatarRgb: "217, 119, 6",
    status: "active",
    voltCloud: "connected",
    hubspot: null,
    license: "active",
    hoursSaved: 7,
    lastActive: "6h ago",
  },
  {
    name: "Muralles",
    initials: "MU",
    avatarRgb: "234, 88, 12",
    status: "active",
    voltCloud: "disconnected",
    hubspot: null,
    license: "pending",
    hoursSaved: null,
    lastActive: "1d ago",
  },
  {
    name: "+55 32 98164-313",
    initials: "55",
    avatarRgb: "120, 124, 130",
    status: "active",
    voltCloud: "connected",
    hubspot: null,
    license: "pending",
    hoursSaved: null,
    lastActive: "5h ago",
  },
  {
    name: "Aspasia | HUMAND",
    initials: "AH",
    avatarRgb: "219, 39, 119",
    status: "active",
    voltCloud: "connected",
    hubspot: "linked",
    license: "pending",
    hoursSaved: null,
    lastActive: "30m ago",
  },
  {
    name: "Carolina Giraldo",
    initials: "CG",
    avatarRgb: "71, 105, 134",
    status: "active",
    voltCloud: "connected",
    hubspot: null,
    license: "pending",
    hoursSaved: null,
    lastActive: "20m ago",
  },
  {
    name: "Humand",
    initials: "HU",
    avatarRgb: "88, 184, 54",
    status: "active",
    voltCloud: "connected",
    hubspot: null,
    license: "pending",
    hoursSaved: null,
    lastActive: "45m ago",
  },
];

function Pill({ rgb, label, icon }: { rgb: string; label: string; icon?: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        borderRadius: "9999px",
        padding: "3px 10px",
        fontSize: "12px",
        fontWeight: 500,
        background: `rgba(${rgb}, 0.13)`,
        color: `rgb(${rgb})`,
        whiteSpace: "nowrap",
      }}
    >
      {icon && (
        <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>
          {icon}
        </span>
      )}
      {label}
    </span>
  );
}

function StatusCell({ status }: { status: Member["status"] }) {
  if (status === "active") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#a0ff79",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.8)" }}>Active</span>
      </div>
    );
  }
  return <Pill rgb="59, 130, 246" label="Invited" />;
}

function VoltCloudCell({ value }: { value: Member["voltCloud"] }) {
  if (value === null)
    return <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.2)" }}>—</span>;
  if (value === "connected")
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: "14px",
            color: "#a0ff79",
            fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24',
          }}
        >
          check_circle
        </span>
        <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.65)" }}>Connected</span>
      </div>
    );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span
        className="material-symbols-outlined"
        style={{ fontSize: "14px", color: "rgba(252,252,252,0.2)" }}
      >
        radio_button_unchecked
      </span>
      <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.35)" }}>Not connected</span>
    </div>
  );
}

function HubSpotCell({ value }: { value: Member["hubspot"] }) {
  if (value === null)
    return <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.2)" }}>—</span>;
  if (value === "linked")
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: "14px",
            color: "#a0ff79",
            fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24',
          }}
        >
          check_circle
        </span>
        <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.65)" }}>Linked</span>
      </div>
    );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span
        className="material-symbols-outlined"
        style={{ fontSize: "14px", color: "rgb(217, 119, 6)" }}
      >
        pending
      </span>
      <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.35)" }}>Pending</span>
    </div>
  );
}

function LicenseCell({ value }: { value: Member["license"] }) {
  if (value === "active")
    return <Pill rgb="88, 184, 54" label="Active" icon="check_circle" />;
  return <Pill rgb="217, 119, 6" label="Pending" icon="pending" />;
}

function InviteModal({ onClose }: { onClose: () => void }) {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(false);

  function handleSend() {
    if (!value.trim()) return;
    setSent(true);
    setTimeout(onClose, 1400);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.65)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          borderRadius: "16px",
          padding: "24px",
          position: "relative",
          background: "#282b2e",
          border: "1px solid rgba(255,255,255,0.1)",
          animation: "volt-login-in 0.15s cubic-bezier(0.16,1,0.3,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes volt-login-in {
            from { opacity: 0; transform: translateY(6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "none",
            border: "none",
            color: "rgba(252,252,252,0.35)",
            cursor: "pointer",
            display: "flex",
            padding: "4px",
            borderRadius: "6px",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.7)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.35)")
          }
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>close</span>
        </button>

        <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#fcfcfc", marginBottom: "4px" }}>
          Invite user
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(252,252,252,0.5)",
            marginBottom: "16px",
            lineHeight: 1.5,
          }}
        >
          Enter a phone number or email. The user will receive a download link and invitation.
        </p>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="+1 555 123 4567 or user@company.com"
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.04)",
            border: focused ? "1px solid #a0ff79" : "1px solid rgba(255,255,255,0.1)",
            boxShadow: focused ? "0 0 0 3px rgba(160,255,121,0.18)" : "none",
            borderRadius: "10px",
            padding: "11px 14px",
            fontSize: "14px",
            color: "#fcfcfc",
            outline: "none",
            transition: "border-color 0.15s, box-shadow 0.15s",
            marginBottom: "12px",
            fontFamily: "inherit",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleSend}
          disabled={sent}
          style={{
            width: "100%",
            background: sent ? "rgba(160,255,121,0.5)" : "#a0ff79",
            color: "#1a1a1a",
            fontWeight: 600,
            fontSize: "14px",
            border: "none",
            borderRadius: "10px",
            padding: "12px",
            cursor: sent ? "default" : "pointer",
            transition: "background 0.15s",
            fontFamily: "inherit",
          }}
        >
          {sent ? "Invitation sent!" : "Send invitation"}
        </button>
      </div>
    </div>
  );
}

const HEADER_CELL_STYLE: React.CSSProperties = {
  padding: "8px 12px",
  textAlign: "left",
  fontSize: "11px",
  fontWeight: 500,
  color: "rgba(252,252,252,0.4)",
  whiteSpace: "nowrap",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

export default function WorkspacePage() {
  const [showInvite, setShowInvite] = useState(false);

  const totalMembers = MEMBERS.length;
  const activeMembers = MEMBERS.filter((m) => m.license === "active").length;
  const totalHours = MEMBERS.reduce((s, m) => s + (m.hoursSaved ?? 0), 0);
  const avgHours = activeMembers > 0
    ? (totalHours / activeMembers).toFixed(1)
    : "0";

  return (
    <div style={{ padding: "16px", overflowY: "auto", height: "100%" }}>
      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <h1 style={{ fontSize: "22px", fontWeight: 400, color: "#fcfcfc" }}>Workspace</h1>
        <button
          onClick={() => setShowInvite(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
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
            ((e.currentTarget as HTMLButtonElement).style.background = "rgba(160,255,121,0.08)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
          }
        >
          <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>
            person_add
          </span>
          Invite
        </button>
      </div>

      {/* Compact stats bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0",
          marginBottom: "20px",
          padding: "14px 16px",
          borderRadius: "10px",
          background: "#282b2e",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: "22px", fontWeight: 600, color: "#fcfcfc", lineHeight: 1 }}>
            {totalHours}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(252,252,252,0.45)", marginLeft: "5px" }}>
            h saved this week
          </span>
        </div>
        <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
        <div style={{ flex: 1, paddingLeft: "20px" }}>
          <span style={{ fontSize: "22px", fontWeight: 600, color: "#fcfcfc", lineHeight: 1 }}>
            {avgHours}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(252,252,252,0.45)", marginLeft: "5px" }}>
            h avg / user
          </span>
        </div>
        <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
        <div style={{ flex: 1, paddingLeft: "20px" }}>
          <span style={{ fontSize: "22px", fontWeight: 600, color: "#fcfcfc", lineHeight: 1 }}>
            {activeMembers}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(252,252,252,0.45)", marginLeft: "5px" }}>
            / {totalMembers} active licenses
          </span>
        </div>
      </div>

      {/* Section header */}
      <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontSize: "11px",
          fontWeight: 500,
          color: "rgba(252,252,252,0.4)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          Members · {totalMembers}
        </span>
      </div>

      {/* Members table — flat, no outer card wrapper */}
      <div
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.02)" }}>
              <th style={HEADER_CELL_STYLE}>Member</th>
              <th style={HEADER_CELL_STYLE}>Status</th>
              <th style={HEADER_CELL_STYLE}>Volt Cloud</th>
              <th style={HEADER_CELL_STYLE}>HubSpot</th>
              <th style={HEADER_CELL_STYLE}>License</th>
              <th style={HEADER_CELL_STYLE}>Hours saved</th>
              <th style={HEADER_CELL_STYLE}>Last active</th>
            </tr>
          </thead>
          <tbody>
            {MEMBERS.map((m, i) => (
              <MemberRow key={`${m.name}-${i}`} m={m} isLast={i === MEMBERS.length - 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MemberRow({ m, isLast }: { m: Member; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.06)",
        background: hovered ? "rgba(255,255,255,0.025)" : "transparent",
        transition: "background 0.15s",
      }}
    >
      <td style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: `rgba(${m.avatarRgb}, 0.18)`,
              border: `1px solid rgba(${m.avatarRgb}, 0.35)`,
              color: `rgb(${m.avatarRgb})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {m.initials}
          </div>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#fcfcfc" }}>
            {m.name}
          </span>
        </div>
      </td>
      <td style={{ padding: "10px 12px" }}>
        <StatusCell status={m.status} />
      </td>
      <td style={{ padding: "10px 12px" }}>
        <VoltCloudCell value={m.voltCloud} />
      </td>
      <td style={{ padding: "10px 12px" }}>
        <HubSpotCell value={m.hubspot} />
      </td>
      <td style={{ padding: "10px 12px" }}>
        <LicenseCell value={m.license} />
      </td>
      <td style={{ padding: "10px 12px" }}>
        {m.hoursSaved !== null ? (
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#fcfcfc" }}>
            {m.hoursSaved}h
          </span>
        ) : (
          <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.2)" }}>—</span>
        )}
      </td>
      <td style={{ padding: "10px 12px" }}>
        {m.lastActive ? (
          <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.5)" }}>
            {m.lastActive}
          </span>
        ) : (
          <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.2)" }}>—</span>
        )}
      </td>
    </tr>
  );
}
