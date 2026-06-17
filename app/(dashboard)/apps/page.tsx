"use client";

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
    description:
      "Sincronización bidireccional de contactos, deals y actividad de WhatsApp con tu CRM.",
    icon: "hub",
    connected: true,
    connectedBy: "Admin",
  },
  {
    name: "Linear",
    description:
      "Creá issues de Linear directamente desde conversaciones de WhatsApp.",
    icon: "linear_scale",
    connected: true,
    connectedBy: "Admin",
  },
  {
    name: "Zendesk",
    description:
      "Convertí chats de WhatsApp en tickets de soporte automáticamente.",
    icon: "headset_mic",
    connected: false,
  },
  {
    name: "Google Calendar",
    description:
      "Agendá reuniones y seguimientos directamente desde WhatsApp.",
    icon: "calendar_month",
    connected: false,
  },
  {
    name: "Slack",
    description:
      "Recibí notificaciones de chats prioritarios y follow-ups en Slack.",
    icon: "notifications",
    connected: false,
  },
  {
    name: "Pipedrive",
    description:
      "Sincronizá tu pipeline de ventas con las conversaciones de WhatsApp.",
    icon: "insights",
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
};

export default function AppsPage() {
  return (
    <div
      style={{ padding: "16px 16px", overflowY: "auto", height: "100%" }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 400,
            color: "#fcfcfc",
            marginBottom: "4px",
          }}
        >
          App Store
        </h1>
        <p
          style={{ fontSize: "13px", color: "rgba(252,252,252,0.5)" }}
        >
          Conectá Volt con tus herramientas de trabajo
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
        }}
      >
        {INTEGRATIONS.map((app) => {
          const rgb = ICON_COLORS[app.name] ?? "120, 124, 130";
          return (
            <div
              key={app.name}
              style={{
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                background: "#1f1f1f",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.15s, background 0.15s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(160,255,121,0.25)";
                (e.currentTarget as HTMLDivElement).style.background = "#252525";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLDivElement).style.background = "#1f1f1f";
              }}
            >
              {/* Top row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  {/* Icon */}
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
                        fontVariationSettings:
                          '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
                      }}
                    >
                      {app.icon}
                    </span>
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#fcfcfc",
                        lineHeight: 1.2,
                      }}
                    >
                      {app.name}
                    </p>
                    {app.connected && app.connectedBy && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginTop: "3px",
                        }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{
                            fontSize: "11px",
                            color: "#a0ff79",
                            fontVariationSettings:
                              '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24',
                          }}
                        >
                          check_circle
                        </span>
                        <span
                          style={{ fontSize: "11px", color: "#a0ff79" }}
                        >
                          Conectado · por {app.connectedBy}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status badge */}
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
                    Conectado
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
                    No conectado
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(252,252,252,0.5)",
                  lineHeight: 1.55,
                  flex: 1,
                }}
              >
                {app.description}
              </p>

              {/* Button */}
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
                {app.connected ? "Gestionar" : "Conectar"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
