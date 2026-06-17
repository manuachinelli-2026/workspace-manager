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
    name: "Manuel Achinelli",
    initials: "MA",
    avatarRgb: "88, 184, 54",
    status: "active",
    voltCloud: "connected",
    hubspot: "linked",
    license: "active",
    hoursSaved: 12,
    lastActive: "hace 5m",
  },
  {
    name: "Santiago Rodríguez",
    initials: "SR",
    avatarRgb: "71, 105, 134",
    status: "active",
    voltCloud: "connected",
    hubspot: "linked",
    license: "active",
    hoursSaved: 9,
    lastActive: "hace 2h",
  },
  {
    name: "Valentina López",
    initials: "VL",
    avatarRgb: "139, 92, 246",
    status: "active",
    voltCloud: "connected",
    hubspot: "pending",
    license: "active",
    hoursSaved: 11,
    lastActive: "hace 30m",
  },
  {
    name: "Nicolás Bravo",
    initials: "NB",
    avatarRgb: "217, 119, 6",
    status: "active",
    voltCloud: "disconnected",
    hubspot: "pending",
    license: "active",
    hoursSaved: 6,
    lastActive: "hace 1d",
  },
  {
    name: "Camila Torres",
    initials: "CT",
    avatarRgb: "219, 39, 119",
    status: "invited",
    voltCloud: null,
    hubspot: null,
    license: "pending",
    hoursSaved: null,
    lastActive: null,
  },
  {
    name: "Martín Pérez",
    initials: "MP",
    avatarRgb: "13, 148, 136",
    status: "invited",
    voltCloud: null,
    hubspot: null,
    license: "pending",
    hoursSaved: null,
    lastActive: null,
  },
];

function Pill({
  rgb,
  label,
  icon,
}: {
  rgb: string;
  label: string;
  icon?: string;
}) {
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
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "12px" }}
        >
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
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#a0ff79",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "13px", color: "#fcfcfc" }}>Activo</span>
      </div>
    );
  }
  return <Pill rgb="59, 130, 246" label="Invitado" />;
}

function VoltCloudCell({ value }: { value: Member["voltCloud"] }) {
  if (value === null)
    return (
      <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.2)" }}>—</span>
    );
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
        <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.7)" }}>
          Conectado
        </span>
      </div>
    );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span
        className="material-symbols-outlined"
        style={{ fontSize: "14px", color: "rgba(252,252,252,0.25)" }}
      >
        radio_button_unchecked
      </span>
      <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.4)" }}>
        Sin conectar
      </span>
    </div>
  );
}

function HubSpotCell({ value }: { value: Member["hubspot"] }) {
  if (value === null)
    return (
      <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.2)" }}>—</span>
    );
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
        <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.7)" }}>
          Vinculado
        </span>
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
      <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.4)" }}>
        Pendiente
      </span>
    </div>
  );
}

function LicenseCell({ value }: { value: Member["license"] }) {
  if (value === "active")
    return <Pill rgb="88, 184, 54" label="Activa" icon="check_circle" />;
  return <Pill rgb="217, 119, 6" label="Pendiente" icon="pending" />;
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
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(252,252,252,0.7)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(252,252,252,0.35)")
          }
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            close
          </span>
        </button>

        <h2
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#fcfcfc",
            marginBottom: "4px",
          }}
        >
          Invitar asesor
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(252,252,252,0.5)",
            marginBottom: "16px",
            lineHeight: 1.5,
          }}
        >
          Ingresá el teléfono o email. El asesor recibirá un link de descarga e invitación.
        </p>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="+54 11 1234-5678 o email@empresa.com"
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.04)",
            border: focused
              ? "1px solid #a0ff79"
              : "1px solid rgba(255,255,255,0.1)",
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
          {sent ? "¡Invitación enviada!" : "Enviar invitación"}
        </button>
      </div>
    </div>
  );
}

const STAT_CARDS = [
  {
    icon: "schedule",
    label: "Horas ahorradas esta semana",
    value: "47.5h",
    sub: "↑ 12% vs semana anterior",
    subColor: "#a0ff79",
  },
  {
    icon: "group",
    label: "Promedio por asesor",
    value: "9.5h",
    sub: "/ semana",
    subColor: "rgba(252,252,252,0.4)",
  },
  {
    icon: "credit_card",
    label: "Licencias activas",
    value: "5 / 6",
    sub: "1 pendiente de activación",
    subColor: "rgb(217,119,6)",
  },
];

const HEADER_CELL_STYLE: React.CSSProperties = {
  padding: "8px 16px",
  textAlign: "left",
  fontSize: "12px",
  fontWeight: 500,
  color: "rgba(252,252,252,0.45)",
  whiteSpace: "nowrap",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

export default function TeamPage() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div style={{ padding: "16px 16px", overflowY: "auto", height: "100%" }}>
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
        <h1 style={{ fontSize: "22px", fontWeight: 400, color: "#fcfcfc" }}>Equipo</h1>
        <button
          onClick={() => setShowInvite(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 14px",
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
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            person_add
          </span>
          Invitar asesor
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {STAT_CARDS.map((card) => (
          <div
            key={card.label}
            style={{
              borderRadius: "10px",
              padding: "20px",
              background: "#1f1f1f",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "12px",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "15px", color: "rgba(252,252,252,0.4)" }}
              >
                {card.icon}
              </span>
              <span style={{ fontSize: "12px", color: "rgba(252,252,252,0.5)" }}>
                {card.label}
              </span>
            </div>
            <p
              style={{
                fontSize: "26px",
                fontWeight: 600,
                color: "#fcfcfc",
                marginBottom: "4px",
                lineHeight: 1.1,
              }}
            >
              {card.value}
            </p>
            <p style={{ fontSize: "12px", color: card.subColor }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Members table */}
      <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "#1f1f1f",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={HEADER_CELL_STYLE}>Miembro</th>
              <th style={HEADER_CELL_STYLE}>Estado</th>
              <th style={HEADER_CELL_STYLE}>Volt Cloud</th>
              <th style={HEADER_CELL_STYLE}>HubSpot</th>
              <th style={HEADER_CELL_STYLE}>Licencia</th>
              <th style={HEADER_CELL_STYLE}>Horas ahorradas</th>
              <th style={HEADER_CELL_STYLE}>Último activo</th>
            </tr>
          </thead>
          <tbody>
            {MEMBERS.map((m, i) => (
              <tr
                key={m.name}
                style={{
                  borderBottom:
                    i < MEMBERS.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                }}
              >
                {/* Member */}
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: `rgba(${m.avatarRgb}, 0.2)`,
                        border: `1px solid rgba(${m.avatarRgb}, 0.4)`,
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
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#fcfcfc",
                      }}
                    >
                      {m.name}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <StatusCell status={m.status} />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <VoltCloudCell value={m.voltCloud} />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <HubSpotCell value={m.hubspot} />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <LicenseCell value={m.license} />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  {m.hoursSaved !== null ? (
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#fcfcfc",
                      }}
                    >
                      {m.hoursSaved}h
                    </span>
                  ) : (
                    <span
                      style={{ fontSize: "13px", color: "rgba(252,252,252,0.2)" }}
                    >
                      —
                    </span>
                  )}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  {m.lastActive ? (
                    <span
                      style={{ fontSize: "13px", color: "rgba(252,252,252,0.5)" }}
                    >
                      {m.lastActive}
                    </span>
                  ) : (
                    <span
                      style={{ fontSize: "13px", color: "rgba(252,252,252,0.2)" }}
                    >
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
