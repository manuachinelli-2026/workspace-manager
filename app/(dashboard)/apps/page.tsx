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

function IntegrationCard({ app }: { app: Integration }) {
  const rgb = ICON_COLORS[app.name] ?? "120, 124, 130";
  return (
    <div
      style={{
        borderRadius: "10px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        background: "#282b2e",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.15s, background 0.15s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(160,255,121,0.2)";
        (e.currentTarget as HTMLDivElement).style.background = "#2e3135";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLDivElement).style.background = "#282b2e";
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: `rgba(${rgb}, 0.13)`,
              border: `1px solid rgba(${rgb}, 0.2)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "20px",
                color: `rgb(${rgb})`,
                fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
              }}
            >
              {app.icon}
            </span>
          </div>

          <div>
            <p style={{ fontSize: "15px", fontWeight: 500, color: "#fcfcfc", lineHeight: 1.2 }}>
              {app.name}
            </p>
            {app.connected && app.connectedBy && (
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "3px" }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "11px",
                    color: "#a0ff79",
                    fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24',
                  }}
                >
                  check_circle
                </span>
                <span style={{ fontSize: "11px", color: "#a0ff79" }}>
                  Connected · by {app.connectedBy}
                </span>
              </div>
            )}
          </div>
        </div>

        {app.connected ? (
          <span
            style={{
              fontSize: "11px",
              padding: "3px 9px",
              borderRadius: "9999px",
              fontWeight: 500,
              background: "rgba(88,184,54,0.13)",
              color: "rgb(88,184,54)",
              whiteSpace: "nowrap",
            }}
          >
            Connected
          </span>
        ) : (
          <span
            style={{
              fontSize: "11px",
              padding: "3px 9px",
              borderRadius: "9999px",
              fontWeight: 500,
              background: "rgba(255,255,255,0.07)",
              color: "rgba(252,252,252,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            Not connected
          </span>
        )}
      </div>

      <p style={{ fontSize: "13px", color: "rgba(252,252,252,0.5)", lineHeight: 1.55, flex: 1 }}>
        {app.description}
      </p>

      <button
        style={
          app.connected
            ? {
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                border: "none",
                background: "rgba(255,255,255,0.07)",
                color: "rgba(252,252,252,0.7)",
                cursor: "pointer",
                transition: "background 0.15s",
                fontFamily: "inherit",
              }
            : {
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                border: "1px solid rgba(160,255,121,0.35)",
                background: "transparent",
                color: "#a0ff79",
                cursor: "pointer",
                transition: "background 0.15s",
                fontFamily: "inherit",
              }
        }
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = app.connected
            ? "rgba(255,255,255,0.12)"
            : "rgba(160,255,121,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = app.connected
            ? "rgba(255,255,255,0.07)"
            : "transparent";
        }}
      >
        {app.connected ? "Manage" : "Connect"}
      </button>
    </div>
  );
}

export default function AppsPage() {
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);

  const connected = INTEGRATIONS.filter((i) => i.connected);
  const available = INTEGRATIONS.filter((i) => !i.connected);

  return (
    <div style={{ padding: "16px", overflowY: "auto", height: "100%" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 400, color: "#fcfcfc", marginBottom: "4px" }}>
          App Store
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(252,252,252,0.5)" }}>
          Connect Volt with your work tools
        </p>
      </div>

      {/* Connected integrations */}
      <div style={{ marginBottom: "24px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "rgba(252,252,252,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "10px",
          }}
        >
          Active · {connected.length}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {connected.map((app) => (
            <IntegrationCard key={app.name} app={app} />
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
          color: "rgba(252,252,252,0.6)",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.15s, color 0.15s, border-color 0.15s",
          fontFamily: "inherit",
          textAlign: "left",
        }}
        onMouseEnter={(e) => {
          if (!marketplaceOpen) {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.85)";
          }
        }}
        onMouseLeave={(e) => {
          if (!marketplaceOpen) {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.6)";
          }
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "16px", color: marketplaceOpen ? "#a0ff79" : "inherit" }}
        >
          storefront
        </span>
        <span style={{ flex: 1, color: marketplaceOpen ? "#fcfcfc" : "inherit" }}>
          Explore marketplace
        </span>
        <span
          style={{ fontSize: "12px", color: "rgba(252,252,252,0.3)", marginRight: "4px" }}
        >
          {available.length} available
        </span>
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: "16px",
            color: "rgba(252,252,252,0.35)",
            transform: marketplaceOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
          }}
        >
          expand_more
        </span>
      </button>

      {/* Marketplace grid */}
      {marketplaceOpen && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            marginTop: "12px",
          }}
        >
          {available.map((app) => (
            <IntegrationCard key={app.name} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
