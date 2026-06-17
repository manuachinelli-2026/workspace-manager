"use client";

import { CheckCircle2, MinusCircle, Download } from "lucide-react";

const LICENSE_ROWS = [
  {
    name: "Manuel Achinelli",
    initials: "MA",
    color: "#58b836",
    license: "active" as const,
    voltCloud: true,
    hubspot: true,
    renewal: "15 Jul 2026",
  },
  {
    name: "Santiago Rodríguez",
    initials: "SR",
    color: "#66baff",
    license: "active" as const,
    voltCloud: true,
    hubspot: true,
    renewal: "15 Jul 2026",
  },
  {
    name: "Valentina López",
    initials: "VL",
    color: "#a855f7",
    license: "active" as const,
    voltCloud: true,
    hubspot: false,
    renewal: "15 Jul 2026",
  },
  {
    name: "Nicolás Bravo",
    initials: "NB",
    color: "#f59e0b",
    license: "active" as const,
    voltCloud: false,
    hubspot: false,
    renewal: "15 Jul 2026",
  },
  {
    name: "Camila Torres",
    initials: "CT",
    color: "#ec4899",
    license: "pending" as const,
    voltCloud: false,
    hubspot: false,
    renewal: null,
  },
  {
    name: "Martín Pérez",
    initials: "MP",
    color: "#14b8a6",
    license: "pending" as const,
    voltCloud: false,
    hubspot: false,
    renewal: null,
  },
];

const PAYMENT_HISTORY = [
  { date: "15 Jun 2026", amount: "$299.00", invoice: "INV-2026-06" },
  { date: "15 May 2026", amount: "$299.00", invoice: "INV-2026-05" },
  { date: "15 Apr 2026", amount: "$299.00", invoice: "INV-2026-04" },
];

function CheckOrDash({ value }: { value: boolean }) {
  if (value)
    return <CheckCircle2 size={15} className="text-[#58b836]" />;
  return <MinusCircle size={15} className="text-[rgba(252,252,252,0.2)]" />;
}

export default function BillingPage() {
  const activeLicenses = LICENSE_ROWS.filter((r) => r.license === "active").length;
  const totalLicenses = LICENSE_ROWS.length;
  const usagePct = (activeLicenses / totalLicenses) * 100;

  const headerCls =
    "px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-[rgba(252,252,252,0.4)] whitespace-nowrap";

  return (
    <div className="px-6 py-6 max-w-4xl">
      <h1 className="text-lg font-semibold text-[#fcfcfc] mb-6">Facturación</h1>

      {/* Plan card */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{
          background: "#282b2e",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(88,184,54,0.2)", color: "#58b836" }}
              >
                Business
              </span>
              <span className="text-[rgba(252,252,252,0.4)] text-xs">Plan activo</span>
            </div>
            <p className="text-2xl font-bold text-[#fcfcfc]">
              $299
              <span className="text-sm font-normal text-[rgba(252,252,252,0.5)]">/mes</span>
            </p>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(252,252,252,0.7)",
            }}
          >
            Cambiar plan
          </button>
        </div>

        {/* Usage bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[rgba(252,252,252,0.6)]">Licencias</span>
            <span className="text-sm font-semibold text-[#fcfcfc]">
              {activeLicenses} / {totalLicenses} activas
            </span>
          </div>
          <div className="h-2 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${usagePct}%`, background: "#58b836" }}
            />
          </div>
          <p className="text-xs text-[rgba(252,252,252,0.4)] mt-1.5">
            {totalLicenses - activeLicenses} licencias pendientes de activación
          </p>
        </div>
      </div>

      {/* Licenses table */}
      <div
        className="rounded-xl overflow-hidden mb-6"
        style={{
          background: "#282b2e",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)]">
          <h2 className="text-sm font-semibold text-[#fcfcfc]">Detalle de licencias</h2>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <th className={headerCls}>Asesor</th>
              <th className={headerCls}>Licencia</th>
              <th className={headerCls}>Volt Cloud</th>
              <th className={headerCls}>HubSpot</th>
              <th className={headerCls}>Renovación</th>
            </tr>
          </thead>
          <tbody>
            {LICENSE_ROWS.map((row, i) => (
              <tr
                key={row.name}
                style={{
                  borderBottom:
                    i < LICENSE_ROWS.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{ background: row.color }}
                    >
                      {row.initials}
                    </div>
                    <span className="text-sm text-[#fcfcfc]">{row.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  {row.license === "active" ? (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(88,184,54,0.15)", color: "#58b836" }}
                    >
                      ✅ Activa
                    </span>
                  ) : (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
                    >
                      ⏳ Pendiente
                    </span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <CheckOrDash value={row.voltCloud} />
                </td>
                <td className="px-4 py-3.5">
                  <CheckOrDash value={row.hubspot} />
                </td>
                <td className="px-4 py-3.5">
                  {row.renewal ? (
                    <span className="text-sm text-[rgba(252,252,252,0.6)]">{row.renewal}</span>
                  ) : (
                    <span className="text-[rgba(252,252,252,0.2)] text-sm">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment history */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "#282b2e",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)]">
          <h2 className="text-sm font-semibold text-[#fcfcfc]">Historial de pagos</h2>
        </div>
        <div className="divide-y divide-[rgba(255,255,255,0.04)]">
          {PAYMENT_HISTORY.map((payment) => (
            <div key={payment.invoice} className="px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-[rgba(252,252,252,0.6)]">{payment.date}</span>
                <span className="text-sm font-semibold text-[#fcfcfc]">{payment.amount}</span>
                <span
                  className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                  style={{ background: "rgba(88,184,54,0.15)", color: "#58b836" }}
                >
                  Pagado
                </span>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-[rgba(252,252,252,0.4)] hover:text-[rgba(252,252,252,0.7)] transition-colors">
                <Download size={12} />
                {payment.invoice}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
