"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "CRM View",      href: "/crm",     icon: "table_chart" },
  { label: "Equipo",        href: "/team",    icon: "group" },
  { label: "App Store",     href: "/apps",    icon: "extension" },
  { label: "Facturación",   href: "/billing", icon: "credit_card" },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("wm_auth");
    router.push("/login");
  }

  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "220px",
        flexShrink: 0,
        background: "#1a1a1a",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "14px 12px 14px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            color: "#a0ff79",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          ⚡
        </span>
        <span style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1 }}>
          <span style={{ color: "#fcfcfc" }}>Workspace</span>{" "}
          <span style={{ color: "#a0ff79" }}>Manager</span>
        </span>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "8px 6px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          overflowY: "auto",
        }}
      >
        {NAV_ITEMS.map(({ label, href, icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "0 10px",
                height: "34px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                transition: `background ${0.15}s, color ${0.15}s`,
                background: active ? "rgba(255,255,255,0.08)" : "transparent",
                color: active ? "#fcfcfc" : "rgba(252,252,252,0.55)",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(252,252,252,0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(252,252,252,0.55)";
                }
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "18px",
                  color: active ? "#a0ff79" : "inherit",
                  fontVariationSettings: active
                    ? '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24'
                    : '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
                }}
              >
                {icon}
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div
        style={{
          padding: "12px 12px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "#a0ff79",
            color: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          MA
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#fcfcfc",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.3,
            }}
          >
            Manuel Achinelli
          </p>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 500,
              padding: "1px 6px",
              borderRadius: "9999px",
              background: "rgba(160,255,121,0.12)",
              color: "#a0ff79",
              lineHeight: 1.6,
              display: "inline-block",
            }}
          >
            Admin
          </span>
        </div>
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          style={{
            background: "none",
            border: "none",
            padding: "4px",
            borderRadius: "6px",
            color: "rgba(252,252,252,0.3)",
            display: "flex",
            alignItems: "center",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.7)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.3)")
          }
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            logout
          </span>
        </button>
      </div>
    </aside>
  );
}
