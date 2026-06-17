"use client";

/* Pricing from volt-landing/pricing page:
   WORKSPACE     $79 / user / month   — min 3 members
   WORKSPACE PRO $239 / user / month  — min 5 members
*/
const PLANS = {
  workspace: {
    name: "WORKSPACE",
    pricePerUser: 79,
    minMembers: 3,
    description: "Built for teams. Everything in Premium plus shared workspaces, integrations, and dedicated human support.",
    features: [
      "Everything in Premium",
      "Workspaces",
      "Shared lists",
      "Shared contacts",
      "Bulk add to groups",
      "Roles & permissions",
      "Priority chat support",
    ],
  },
  pro: {
    name: "WORKSPACE PRO",
    pricePerUser: 239,
    minMembers: 5,
    description: "Enterprise-grade. Everything in Workspace plus advanced security, SSO, custom onboarding, and SLA-backed support.",
    features: [
      "Everything in Workspace",
      "Zendesk, HubSpot & Linear integrations",
      "Live chats",
      "Customer Success Manager",
      "Follow ups",
    ],
  },
} as const;

const CURRENT_PLAN = "workspace" as const;

const LICENSE_ROWS = [
  { name: "Lucia Leal",          initials: "LL", avatarRgb: "88, 184, 54",   license: "active" as const,  voltCloud: false, hubspot: true,  renewal: "Jul 15, 2026" },
  { name: "Michelle H d A",      initials: "MH", avatarRgb: "59, 130, 246",  license: "active" as const,  voltCloud: false, hubspot: true,  renewal: "Jul 15, 2026" },
  { name: "Humand",              initials: "HU", avatarRgb: "139, 92, 246",  license: "active" as const,  voltCloud: true,  hubspot: false, renewal: "Jul 15, 2026" },
  { name: "Humand",              initials: "HU", avatarRgb: "13, 148, 136",  license: "active" as const,  voltCloud: false, hubspot: false, renewal: "Jul 15, 2026" },
  { name: "Humand",              initials: "HU", avatarRgb: "217, 119, 6",   license: "active" as const,  voltCloud: true,  hubspot: false, renewal: "Jul 15, 2026" },
  { name: "Muralles",            initials: "MU", avatarRgb: "234, 88, 12",   license: "pending" as const, voltCloud: false, hubspot: false, renewal: null },
  { name: "+55 32 98164-313",    initials: "55", avatarRgb: "120, 124, 130", license: "pending" as const, voltCloud: true,  hubspot: false, renewal: null },
  { name: "Aspasia | HUMAND",    initials: "AH", avatarRgb: "219, 39, 119",  license: "pending" as const, voltCloud: true,  hubspot: true,  renewal: null },
  { name: "Carolina Giraldo",    initials: "CG", avatarRgb: "71, 105, 134",  license: "pending" as const, voltCloud: true,  hubspot: false, renewal: null },
  { name: "Humand",              initials: "HU", avatarRgb: "88, 184, 54",   license: "pending" as const, voltCloud: true,  hubspot: false, renewal: null },
];

const PAYMENT_HISTORY = [
  { date: "Jun 15, 2026", amount: "$395.00", invoice: "INV-2026-06" },
  { date: "May 15, 2026", amount: "$395.00", invoice: "INV-2026-05" },
  { date: "Apr 15, 2026", amount: "$395.00", invoice: "INV-2026-04" },
];

function CheckOrDash({ value }: { value: boolean }) {
  return value ? (
    <span
      className="material-symbols-outlined"
      style={{ fontSize: "15px", color: "#a0ff79", fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}
    >
      check_circle
    </span>
  ) : (
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
  const plan = PLANS[CURRENT_PLAN];
  const activeUsers = LICENSE_ROWS.filter((r) => r.license === "active").length;
  const totalUsers = LICENSE_ROWS.length;
  const monthlyTotal = activeUsers * plan.pricePerUser;
  const nextUserCost = plan.pricePerUser;

  return (
    <div style={{ padding: "16px", maxWidth: "900px", overflowY: "auto", height: "100%" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 400, color: "#fcfcfc", marginBottom: "16px" }}>
        Billing
      </h1>

      {/* Current plan card */}
      <div
        style={{
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "12px",
          background: "#1f1f1f",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            {/* Plan name + badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "rgba(252,252,252,0.5)" }}>
                {plan.name}
              </span>
              <span
                style={{
                  fontSize: "11px", fontWeight: 500, padding: "2px 8px", borderRadius: "9999px",
                  background: "rgba(88,184,54,0.13)", color: "rgb(88,184,54)",
                }}
              >
                Active plan
              </span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{ fontSize: "32px", fontWeight: 600, color: "#fcfcfc", lineHeight: 1 }}>
                ${monthlyTotal}
              </span>
              <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.4)" }}>/month</span>
            </div>

            {/* Per-user breakdown */}
            <p style={{ fontSize: "12px", color: "rgba(252,252,252,0.45)", marginTop: "4px" }}>
              {activeUsers} users × ${plan.pricePerUser}/user · min. {plan.minMembers} members
            </p>

            {/* Next user cost hint */}
            <p style={{ fontSize: "12px", color: "rgba(160,255,121,0.7)", marginTop: "6px", display: "flex", alignItems: "center", gap: "5px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>info</span>
              Adding 1 more user → +${nextUserCost}/month (${monthlyTotal + nextUserCost} total)
            </p>
          </div>

          <button
            style={{
              padding: "7px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.1)", color: "rgba(252,252,252,0.6)",
              background: "transparent", cursor: "pointer", transition: "border-color 0.15s, color 0.15s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.85)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.6)";
            }}
          >
            Change plan
          </button>
        </div>

        {/* Users usage bar */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.6)" }}>Users</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#fcfcfc" }}>
              {activeUsers} / {totalUsers} active
            </span>
          </div>
          <div style={{ height: "6px", borderRadius: "9999px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div
              style={{
                height: "100%", borderRadius: "9999px",
                width: `${(activeUsers / totalUsers) * 100}%`,
                background: "#a0ff79", transition: "width 0.3s",
              }}
            />
          </div>
          <p style={{ fontSize: "11px", color: "rgba(252,252,252,0.4)", marginTop: "6px" }}>
            {totalUsers - activeUsers} pending activation
          </p>
        </div>
      </div>

      {/* Plan comparison (from pricing page) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        {(Object.entries(PLANS) as [keyof typeof PLANS, typeof PLANS[keyof typeof PLANS]][]).map(([key, p]) => {
          const isCurrent = key === CURRENT_PLAN;
          return (
            <div
              key={key}
              style={{
                borderRadius: "10px",
                padding: "20px",
                background: "#1f1f1f",
                border: isCurrent ? "1px solid rgba(160,255,121,0.3)" : "1px solid rgba(255,255,255,0.06)",
                position: "relative",
              }}
            >
              {isCurrent && (
                <span
                  style={{
                    position: "absolute", top: "14px", right: "14px",
                    fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "9999px",
                    background: "rgba(160,255,121,0.13)", color: "#a0ff79", letterSpacing: "0.05em",
                  }}
                >
                  CURRENT
                </span>
              )}
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(252,252,252,0.45)", marginBottom: "6px" }}>
                {p.name}
              </p>
              <p style={{ fontSize: "12px", color: "rgba(252,252,252,0.5)", marginBottom: "16px", lineHeight: 1.5 }}>
                {p.description}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "4px" }}>
                <span style={{ fontSize: "28px", fontWeight: 600, color: "#fcfcfc", lineHeight: 1 }}>
                  ${p.pricePerUser}
                </span>
                <span style={{ fontSize: "12px", color: "rgba(252,252,252,0.4)" }}>/ per month</span>
              </div>
              <p style={{ fontSize: "11px", color: "rgba(252,252,252,0.35)", marginBottom: "16px" }}>
                Minimum {p.minMembers} members
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {p.features.map((feature) => (
                  <div key={feature} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "14px", color: "#a0ff79", fontVariationSettings: '"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24', flexShrink: 0 }}
                    >
                      check
                    </span>
                    <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.75)" }}>{feature}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "14px" }}>
                <button
                  style={{
                    width: "100%", padding: "9px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                    border: "none",
                    background: isCurrent ? "rgba(255,255,255,0.07)" : "#1a1a1a",
                    color: isCurrent ? "rgba(252,252,252,0.5)" : "#fcfcfc",
                    cursor: isCurrent ? "default" : "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.15s",
                  }}
                >
                  {isCurrent ? "Current plan" : "Contact Sales"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* License breakdown table */}
      <div
        style={{
          borderRadius: "10px", overflow: "hidden", marginBottom: "12px",
          background: "#1f1f1f", border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 600, color: "#fcfcfc" }}>License breakdown</h2>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={HEADER_CELL}>User</th>
              <th style={HEADER_CELL}>License</th>
              <th style={HEADER_CELL}>Volt Cloud</th>
              <th style={HEADER_CELL}>HubSpot</th>
              <th style={HEADER_CELL}>Renewal</th>
              <th style={{ ...HEADER_CELL, textAlign: "right" }}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {LICENSE_ROWS.map((row, i) => (
              <tr
                key={row.name}
                style={{ borderBottom: i < LICENSE_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
              >
                <td style={{ padding: "11px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "28px", height: "28px", borderRadius: "50%",
                        background: `rgba(${row.avatarRgb}, 0.2)`,
                        border: `1px solid rgba(${row.avatarRgb}, 0.4)`,
                        color: `rgb(${row.avatarRgb})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "10px", fontWeight: 700, flexShrink: 0,
                      }}
                    >
                      {row.initials}
                    </div>
                    <span style={{ fontSize: "13px", color: "#fcfcfc" }}>{row.name}</span>
                  </div>
                </td>
                <td style={{ padding: "11px 16px" }}>
                  {row.license === "active" ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", padding: "3px 10px", borderRadius: "9999px", fontWeight: 500, background: "rgba(88,184,54,0.13)", color: "rgb(88,184,54)" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "12px", fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}>check_circle</span>
                      Active
                    </span>
                  ) : (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", padding: "3px 10px", borderRadius: "9999px", fontWeight: 500, background: "rgba(217,119,6,0.13)", color: "rgb(217,119,6)" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>pending</span>
                      Pending
                    </span>
                  )}
                </td>
                <td style={{ padding: "11px 16px" }}><CheckOrDash value={row.voltCloud} /></td>
                <td style={{ padding: "11px 16px" }}><CheckOrDash value={row.hubspot} /></td>
                <td style={{ padding: "11px 16px" }}>
                  {row.renewal ? (
                    <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.6)" }}>{row.renewal}</span>
                  ) : (
                    <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.2)" }}>—</span>
                  )}
                </td>
                <td style={{ padding: "11px 16px", textAlign: "right" }}>
                  {row.license === "active" ? (
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "#fcfcfc" }}>
                      ${plan.pricePerUser}/mo
                    </span>
                  ) : (
                    <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.2)" }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Total row */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "12px", color: "rgba(252,252,252,0.4)" }}>
            {activeUsers} active users × ${plan.pricePerUser}
          </span>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#fcfcfc" }}>
            = ${monthlyTotal}/mo
          </span>
        </div>
      </div>

      {/* Payment history */}
      <div
        style={{
          borderRadius: "10px", overflow: "hidden",
          background: "#1f1f1f", border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 600, color: "#fcfcfc" }}>Payment history</h2>
        </div>
        {PAYMENT_HISTORY.map((payment, i) => (
          <div
            key={payment.invoice}
            style={{
              padding: "12px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderBottom: i < PAYMENT_HISTORY.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.6)" }}>{payment.date}</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#fcfcfc" }}>{payment.amount}</span>
              <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "9999px", fontWeight: 500, background: "rgba(88,184,54,0.13)", color: "rgb(88,184,54)" }}>
                Paid
              </span>
            </div>
            <button
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                fontSize: "12px", color: "rgba(252,252,252,0.4)",
                background: "none", border: "none", cursor: "pointer",
                transition: "color 0.15s", fontFamily: "inherit",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.7)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.4)")}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>download</span>
              {payment.invoice}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
