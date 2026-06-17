"use client";

import { useState } from "react";
import { Clock, Users, CreditCard, CheckCircle2, XCircle, MinusCircle, X } from "lucide-react";

interface Member {
  name: string;
  initials: string;
  avatarColor: string;
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
    avatarColor: "#58b836",
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
    avatarColor: "#66baff",
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
    avatarColor: "#a855f7",
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
    avatarColor: "#f59e0b",
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
    avatarColor: "#ec4899",
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
    avatarColor: "#14b8a6",
    status: "invited",
    voltCloud: null,
    hubspot: null,
    license: "pending",
    hoursSaved: null,
    lastActive: null,
  },
];

function StatusBadge({ status }: { status: Member["status"] }) {
  if (status === "active") {
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#58b836]" />
        <span className="text-sm text-[rgba(252,252,252,0.8)]">Activo</span>
      </div>
    );
  }
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: "rgba(102,186,255,0.15)", color: "#66baff" }}
    >
      📩 Invitado
    </span>
  );
}

function VoltCloudStatus({ value }: { value: Member["voltCloud"] }) {
  if (value === null) return <span className="text-[rgba(252,252,252,0.2)] text-sm">—</span>;
  if (value === "connected")
    return (
      <div className="flex items-center gap-1.5">
        <CheckCircle2 size={14} className="text-[#58b836]" />
        <span className="text-sm text-[rgba(252,252,252,0.7)]">Conectado</span>
      </div>
    );
  return (
    <div className="flex items-center gap-1.5">
      <XCircle size={14} className="text-[rgba(252,252,252,0.3)]" />
      <span className="text-sm text-[rgba(252,252,252,0.4)]">Sin conectar</span>
    </div>
  );
}

function HubSpotStatus({ value }: { value: Member["hubspot"] }) {
  if (value === null) return <span className="text-[rgba(252,252,252,0.2)] text-sm">—</span>;
  if (value === "linked")
    return (
      <div className="flex items-center gap-1.5">
        <CheckCircle2 size={14} className="text-[#58b836]" />
        <span className="text-sm text-[rgba(252,252,252,0.7)]">Vinculado</span>
      </div>
    );
  return (
    <div className="flex items-center gap-1.5">
      <MinusCircle size={14} className="text-[#f59e0b]" />
      <span className="text-sm text-[rgba(252,252,252,0.4)]">Pendiente</span>
    </div>
  );
}

function LicenseStatus({ value }: { value: Member["license"] }) {
  if (value === "active")
    return (
      <span
        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
        style={{ background: "rgba(88,184,54,0.15)", color: "#58b836" }}
      >
        ✅ Activa
      </span>
    );
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
    >
      ⏳ Pendiente
    </span>
  );
}

function InviteModal({ onClose }: { onClose: () => void }) {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (!value.trim()) return;
    setSent(true);
    setTimeout(onClose, 1200);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 relative"
        style={{ background: "#282b2e", border: "1px solid rgba(255,255,255,0.1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[rgba(252,252,252,0.4)] hover:text-[rgba(252,252,252,0.8)]"
        >
          <X size={16} />
        </button>
        <h2 className="text-base font-semibold text-[#fcfcfc] mb-1">Invitar asesor</h2>
        <p className="text-sm text-[rgba(252,252,252,0.5)] mb-4">
          Ingresá el teléfono o email del asesor. Le llegará un link de descarga.
        </p>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="+54 11 1234-5678 o email@empresa.com"
          className="w-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-3.5 py-2.5 text-sm text-[#fcfcfc] placeholder:text-[rgba(252,252,252,0.3)] focus:outline-none focus:border-[#58b836] mb-4 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={sent}
          className="w-full bg-[#58b836] hover:bg-[#4ea32e] text-white font-semibold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-60"
        >
          {sent ? "¡Invitación enviada!" : "Enviar invitación"}
        </button>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [showInvite, setShowInvite] = useState(false);

  const statCards = [
    {
      icon: Clock,
      label: "Horas ahorradas esta semana",
      value: "47.5h",
      sub: "↑ 12% vs semana anterior",
      subColor: "#58b836",
    },
    {
      icon: Users,
      label: "Promedio por asesor",
      value: "9.5h",
      sub: "/ semana",
      subColor: "rgba(252,252,252,0.4)",
    },
    {
      icon: CreditCard,
      label: "Licencias activas",
      value: "5 / 6",
      sub: "1 pendiente de activación",
      subColor: "#f59e0b",
    },
  ];

  const headerCls =
    "px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-[rgba(252,252,252,0.4)] whitespace-nowrap";

  return (
    <div className="px-6 py-6">
      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-[#fcfcfc]">Equipo</h1>
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
          style={{ background: "#58b836" }}
        >
          + Invitar asesor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl p-5"
            style={{
              background: "#282b2e",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <card.icon size={14} className="text-[rgba(252,252,252,0.4)]" />
              <span className="text-xs text-[rgba(252,252,252,0.5)]">{card.label}</span>
            </div>
            <p className="text-2xl font-bold text-[#fcfcfc] mb-1">{card.value}</p>
            <p className="text-xs" style={{ color: card.subColor }}>
              {card.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Members table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "#282b2e",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <th className={headerCls}>Miembro</th>
              <th className={headerCls}>Estado</th>
              <th className={headerCls}>Volt Cloud</th>
              <th className={headerCls}>HubSpot</th>
              <th className={headerCls}>Licencia</th>
              <th className={headerCls}>Horas ahorradas</th>
              <th className={headerCls}>Último activo</th>
            </tr>
          </thead>
          <tbody>
            {MEMBERS.map((m, i) => (
              <tr
                key={m.name}
                style={{
                  borderBottom:
                    i < MEMBERS.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                {/* Member */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: m.avatarColor }}
                    >
                      {m.initials}
                    </div>
                    <span className="text-sm font-medium text-[#fcfcfc]">{m.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={m.status} />
                </td>
                <td className="px-4 py-3.5">
                  <VoltCloudStatus value={m.voltCloud} />
                </td>
                <td className="px-4 py-3.5">
                  <HubSpotStatus value={m.hubspot} />
                </td>
                <td className="px-4 py-3.5">
                  <LicenseStatus value={m.license} />
                </td>
                <td className="px-4 py-3.5">
                  {m.hoursSaved !== null ? (
                    <span className="text-sm font-semibold text-[#fcfcfc]">
                      {m.hoursSaved}h
                    </span>
                  ) : (
                    <span className="text-[rgba(252,252,252,0.2)] text-sm">—</span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  {m.lastActive ? (
                    <span className="text-sm text-[rgba(252,252,252,0.5)]">{m.lastActive}</span>
                  ) : (
                    <span className="text-[rgba(252,252,252,0.2)] text-sm">—</span>
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
