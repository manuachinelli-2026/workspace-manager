"use client";

import { CheckCircle2 } from "lucide-react";

interface Integration {
  name: string;
  description: string;
  emoji: string;
  connected: boolean;
  connectedBy?: string;
}

const INTEGRATIONS: Integration[] = [
  {
    name: "HubSpot",
    description: "Sincronización bidireccional de contactos, deals y actividad de WhatsApp con tu CRM.",
    emoji: "🟠",
    connected: true,
    connectedBy: "Admin",
  },
  {
    name: "Linear",
    description: "Creá issues de Linear directamente desde conversaciones de WhatsApp.",
    emoji: "🟣",
    connected: true,
    connectedBy: "Admin",
  },
  {
    name: "Zendesk",
    description: "Convertí chats de WhatsApp en tickets de soporte automáticamente.",
    emoji: "🟢",
    connected: false,
  },
  {
    name: "Google Calendar",
    description: "Agendá reuniones y seguimientos directamente desde WhatsApp.",
    emoji: "🔵",
    connected: false,
  },
  {
    name: "Slack",
    description: "Recibí notificaciones de chats prioritarios y follow-ups en Slack.",
    emoji: "🟡",
    connected: false,
  },
  {
    name: "Pipedrive",
    description: "Sincronizá tu pipeline de ventas con las conversaciones de WhatsApp.",
    emoji: "🔴",
    connected: false,
  },
];

export default function AppsPage() {
  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-[#fcfcfc] mb-1">App Store</h1>
        <p className="text-sm text-[rgba(252,252,252,0.5)]">
          Conectá Volt con tus herramientas de trabajo
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {INTEGRATIONS.map((app) => (
          <div
            key={app.name}
            className="rounded-xl p-5 flex flex-col gap-4 transition-colors group"
            style={{
              background: "#282b2e",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.border =
                "1px solid rgba(88,184,54,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.border =
                "1px solid rgba(255,255,255,0.06)";
            }}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{app.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-[#fcfcfc]">{app.name}</p>
                  {app.connected && app.connectedBy && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <CheckCircle2 size={11} className="text-[#58b836]" />
                      <span className="text-[11px] text-[#58b836]">
                        Conectado · por {app.connectedBy}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status badge */}
              {app.connected ? (
                <span
                  className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: "rgba(88,184,54,0.15)",
                    color: "#58b836",
                  }}
                >
                  Conectado
                </span>
              ) : (
                <span
                  className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    color: "rgba(252,252,252,0.45)",
                  }}
                >
                  No conectado
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-[rgba(252,252,252,0.5)] leading-relaxed flex-1">
              {app.description}
            </p>

            {/* Button */}
            <button
              className="w-full py-2 rounded-lg text-sm font-semibold transition-colors"
              style={
                app.connected
                  ? {
                      background: "rgba(255,255,255,0.07)",
                      color: "rgba(252,252,252,0.7)",
                    }
                  : {
                      background: "#58b836",
                      color: "#fff",
                    }
              }
            >
              {app.connected ? "Gestionar" : "Conectar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
