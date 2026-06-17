"use client";

import { useState } from "react";

interface Integration {
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  connectedBy?: string;
}

const INTEGRATIONS: Integration[] = [
  {
    name: "HubSpot",
    description: "Two-way sync of contacts, deals, and WhatsApp activity with your CRM.",
    icon: "hub",
    connected: true,
    connectedBy: "Admin",
  },
  {
    name: "Linear",
    description: "Create Linear issues directly from WhatsApp conversations.",
    icon: "linear_scale",
    connected: true,
    connectedBy: "Admin",
  },
  {
    name: "Zendesk",
    description: "Automatically convert WhatsApp chats into support tickets.",
    icon: "headset_mic",
    connected: false,
  },
  {
    name: "Google Calendar",
    description: "Schedule meetings and follow-ups directly from WhatsApp.",
    icon: "calendar_month",
    connected: false,
  },
  {
    name: "Slack",
    description: "Receive notifications for priority chats and follow-ups in Slack.",
    icon: "notifications",
    connected: false,
  },
  {
    name: "Pipedrive",
    description: "Sync your sales pipeline with WhatsApp conversations.",
    icon: "insights",
    connected: false,
  },
  {
    name: "Notion",
    description: "Log WhatsApp conversations and contacts directly to Notion pages.",
    icon: "description",
    connected: false,
  },
  {
    name: "Salesforce",
    description: "Push WhatsApp leads and activity into your Salesforce org.",
    icon: "cloud",
    connected: false,
  },
];

const ICON_COLORS: Record<string, string> = {
  HubSpot: "234, 88, 12",
  Linear: "139, 92, 246",
  Zendesk: "13, 148, 136",
  "Google Calendar": "59, 130, 246",
  Slack: "217, 119, 6",
  Pipedrive: "219, 39, 119",
  Notion: "120, 124, 130",
  Salesforce: "71, 105, 134",
};

function ActiveRow({ app }: { app: Integration }) {
  const rgb = ICON_COLORS[app.name] ?? "120, 124, 130";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px 16px",
        borderRadius: "10px",
        background: "#1f1f1f",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
    >
      {/* Icon */}
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "9px",
          background: `rgba(${rgb}, 0.12)`,
          border: `1px solid rgba(${rgb}, 0.2)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "18px", color: `rgb(${rgb})`, fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24' }}
        >
          {app.icon}
        </span>
      </div>

      {/* Name + sub */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "14px", fontWeight: 500, color: "#fcfcfc", lineHeight: 1.2 }}>{app.name}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "10px", color: "#a0ff79", fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}
          >
            circle
          </span>
          <span style={{ fontSize: "11px", color: "rgba(252,252,252,0.4)" }}>
            Connected · by {app.connectedBy}
          </span>
        </div>
      </div>

      {/* Manage */}
      <button
        style={{
          padding: "6px 14px",
          borderRadius: "9999px",
          fontSize: "12px",
          fontWeight: 500,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "transparent",
          color: "rgba(252,252,252,0.6)",
          cursor: "pointer",
          transition: "border-color 0.12s, color 0.12s",
          fontFamily: "inherit",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.22)";
          (e.currentTarget as HTMLButtonElement).style.color = "#fcfcfc";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.6)";
        }}
      >
        Manage
      </button>
    </div>
  );
}

function MarketplaceCard({ app }: { app: Integration }) {
  const rgb = ICON_COLORS[app.name] ?? "120, 124, 130";
  return (
    <div
      style={{
        borderRadius: "10px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        background: "#1a1a1a",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(160,255,121,0.2)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: `rgba(${rgb}, 0.12)`,
            border: `1px solid rgba(${rgb}, 0.2)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "16px", color: `rgb(${rgb})`, fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24' }}
          >
            {app.icon}
          </span>
        </div>
        <p style={{ fontSize: "13.5px", fontWeight: 500, color: "#fcfcfc" }}>{app.name}</p>
      </div>

      <p style={{ fontSize: "12px", color: "rgba(252,252,252,0.45)", lineHeight: 1.55, flex: 1 }}>
        {app.description}
      </p>

      <button
        style={{
          width: "100%",
          padding: "7px",
          borderRadius: "9999px",
          fontSize: "12px",
          fontWeight: 600,
          border: "1px solid rgba(160,255,121,0.35)",
          background: "transparent",
          color: "#a0ff79",
          cursor: "pointer",
          transition: "background 0.12s",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(160,255,121,0.07)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
      >
        Connect
      </button>
    </div>
  );
}

export default function AppsPage() {
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);

  const connected = INTEGRATIONS.filter((i) => i.connected);
  const available = INTEGRATIONS.filter((i) => !i.connected);

  return (
    <div style={{ padding: "24px 28px", overflowY: "auto", height: "100%" }}>
      <div style={{ maxWidth: "720px" }}>
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 500, color: "#fcfcfc", marginBottom: "4px" }}>
            App Store
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(252,252,252,0.45)" }}>
            Connect Volt with your work tools
          </p>
        </div>

        {/* Active integrations */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, color: "rgba(252,252,252,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
            Active · {connected.length}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {connected.map((app) => (
              <ActiveRow key={app.name} app={app} />
            ))}
          </div>
        </div>

        {/* Marketplace toggle */}
        <button
          onClick={() => setMarketplaceOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: marketplaceOpen ? "rgba(255,255,255,0.04)" : "transparent",
            color: marketplaceOpen ? "#fcfcfc" : "rgba(252,252,252,0.55)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 0.12s, color 0.12s",
            fontFamily: "inherit",
            textAlign: "left",
          }}
          onMouseEnter={(e) => {
            if (!marketplaceOpen) {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.8)";
            }
          }}
          onMouseLeave={(e) => {
            if (!marketplaceOpen) {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.55)";
            }
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px", color: marketplaceOpen ? "#a0ff79" : "inherit" }}>
            storefront
          </span>
          <span style={{ flex: 1 }}>Explore marketplace</span>
          <span style={{ fontSize: "12px", color: "rgba(252,252,252,0.3)", marginRight: "4px" }}>
            {available.length} available
          </span>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "16px", color: "rgba(252,252,252,0.3)", transform: marketplaceOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
          >
            expand_more
          </span>
        </button>

        {/* Marketplace grid */}
        {marketplaceOpen && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "10px" }}>
            {available.map((app) => (
              <MarketplaceCard key={app.name} app={app} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
