"use client";

const LICENSE_ROWS = [
  {
    name: "Manuel Achinelli",
    initials: "MA",
    avatarRgb: "88, 184, 54",
    license: "active" as const,
    voltCloud: true,
    hubspot: true,
    renewal: "15 Jul 2026",
  },
  {
    name: "Santiago Rodríguez",
    initials: "SR",
    avatarRgb: "71, 105, 134",
    license: "active" as const,
    voltCloud: true,
    hubspot: true,
    renewal: "15 Jul 2026",
  },
  {
    name: "Valentina López",
    initials: "VL",
    avatarRgb: "139, 92, 246",
    license: "active" as const,
    voltCloud: true,
    hubspot: false,
    renewal: "15 Jul 2026",
  },
  {
    name: "Nicolás Bravo",
    initials: "NB",
    avatarRgb: "217, 119, 6",
    license: "active" as const,
    voltCloud: false,
    hubspot: false,
    renewal: "15 Jul 2026",
  },
  {
    name: "Camila Torres",
    initials: "CT",
    avatarRgb: "219, 39, 119",
    license: "pending" as const,
    voltCloud: false,
    hubspot: false,
    renewal: null,
  },
  {
    name: "Martín Pérez",
    initials: "MP",
    avatarRgb: "13, 148, 136",
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
    return (
      <span
        className="material-symbols-outlined"
        style={{
          fontSize: "15px",
          color: "#a0ff79",
          fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24',
        }}
      >
        check_circle
      </span>
    );
  return (
    <span
      className="material-symbols-outlined"
      style={{ fontSize: "15px", color: "rgba(252,252,252,0.2)" }}
    >
      remove
    </span>
  );
}

const HEADER_CELL: React.CSSProperties = {
  padding: "8px 16px",
  textAlign: "left",
  fontSize: "12px",
  fontWeight: 500,
  color: "rgba(252,252,252,0.45)",
  whiteSpace: "nowrap",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

export default function BillingPage() {
  const activeLicenses = LICENSE_ROWS.filter((r) => r.license === "active").length;
  const totalLicenses = LICENSE_ROWS.length;
  const usagePct = (activeLicenses / totalLicenses) * 100;

  return (
    <div
      style={{
        padding: "16px 16px",
        maxWidth: "900px",
        overflowY: "auto",
        height: "100%",
      }}
    >
      <h1
        style={{
          fontSize: "22px",
          fontWeight: 400,
          color: "#fcfcfc",
          marginBottom: "16px",
        }}
      >
        Facturación
      </h1>

      {/* Plan card */}
      <div
        style={{
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "16px",
          background: "#1f1f1f",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  background: "rgba(88,184,54,0.13)",
                  color: "rgb(88,184,54)",
                }}
              >
                Business
              </span>
              <span
                style={{ fontSize: "12px", color: "rgba(252,252,252,0.4)" }}
              >
                Plan activo
              </span>
            </div>
            <p
              style={{
                fontSize: "26px",
                fontWeight: 600,
                color: "#fcfcfc",
                lineHeight: 1,
              }}
            >
              $299
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "rgba(252,252,252,0.5)",
                  marginLeft: "4px",
                }}
              >
                /mes
              </span>
            </p>
          </div>
          <button
            style={{
              padding: "7px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(252,252,252,0.6)",
              background: "transparent",
              cursor: "pointer",
              transition: "border-color 0.15s, color 0.15s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(252,252,252,0.85)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(252,252,252,0.6)";
            }}
          >
            Cambiar plan
          </button>
        </div>

        {/* Usage bar */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.6)" }}>
              Licencias
            </span>
            <span
              style={{ fontSize: "13px", fontWeight: 600, color: "#fcfcfc" }}
            >
              {activeLicenses} / {totalLicenses} activas
            </span>
          </div>
          <div
            style={{
              height: "6px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: "9999px",
                width: `${usagePct}%`,
                background: "#a0ff79",
                transition: "width 0.3s",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "11px",
              color: "rgba(252,252,252,0.4)",
              marginTop: "6px",
            }}
          >
            {totalLicenses - activeLicenses} licencias pendientes de activación
          </p>
        </div>
      </div>

      {/* Licenses table */}
      <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "16px",
          background: "#1f1f1f",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#fcfcfc",
            }}
          >
            Detalle de licencias
          </h2>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={HEADER_CELL}>Asesor</th>
              <th style={HEADER_CELL}>Licencia</th>
              <th style={HEADER_CELL}>Volt Cloud</th>
              <th style={HEADER_CELL}>HubSpot</th>
              <th style={HEADER_CELL}>Renovación</th>
            </tr>
          </thead>
          <tbody>
            {LICENSE_ROWS.map((row, i) => (
              <tr
                key={row.name}
                style={{
                  borderBottom:
                    i < LICENSE_ROWS.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                }}
              >
                <td style={{ padding: "11px 16px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: `rgba(${row.avatarRgb}, 0.2)`,
                        border: `1px solid rgba(${row.avatarRgb}, 0.4)`,
                        color: `rgb(${row.avatarRgb})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {row.initials}
                    </div>
                    <span
                      style={{ fontSize: "13px", color: "#fcfcfc" }}
                    >
                      {row.name}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "11px 16px" }}>
                  {row.license === "active" ? (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "12px",
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        fontWeight: 500,
                        background: "rgba(88,184,54,0.13)",
                        color: "rgb(88,184,54)",
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: "12px",
                          fontVariationSettings:
                            '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24',
                        }}
                      >
                        check_circle
                      </span>
                      Activa
                    </span>
                  ) : (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "12px",
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        fontWeight: 500,
                        background: "rgba(217,119,6,0.13)",
                        color: "rgb(217,119,6)",
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "12px" }}
                      >
                        pending
                      </span>
                      Pendiente
                    </span>
                  )}
                </td>
                <td style={{ padding: "11px 16px" }}>
                  <CheckOrDash value={row.voltCloud} />
                </td>
                <td style={{ padding: "11px 16px" }}>
                  <CheckOrDash value={row.hubspot} />
                </td>
                <td style={{ padding: "11px 16px" }}>
                  {row.renewal ? (
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgba(252,252,252,0.6)",
                      }}
                    >
                      {row.renewal}
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgba(252,252,252,0.2)",
                      }}
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

      {/* Payment history */}
      <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          background: "#1f1f1f",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#fcfcfc",
            }}
          >
            Historial de pagos
          </h2>
        </div>
        <div>
          {PAYMENT_HISTORY.map((payment, i) => (
            <div
              key={payment.invoice}
              style={{
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom:
                  i < PAYMENT_HISTORY.length - 1
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "rgba(252,252,252,0.6)",
                  }}
                >
                  {payment.date}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#fcfcfc",
                  }}
                >
                  {payment.amount}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    fontWeight: 500,
                    background: "rgba(88,184,54,0.13)",
                    color: "rgb(88,184,54)",
                  }}
                >
                  Pagado
                </span>
              </div>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "12px",
                  color: "rgba(252,252,252,0.4)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.15s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(252,252,252,0.7)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(252,252,252,0.4)")
                }
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "14px" }}
                >
                  download
                </span>
                {payment.invoice}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
