"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "Workspace",     href: "/workspace", icon: "group" },
  { label: "CRM View",      href: "/crm",       icon: "table_chart" },
  { label: "App Store",     href: "/apps",      icon: "extension" },
  { label: "Manage Lists",  href: "/lists",     icon: "format_list_bulleted" },
  { label: "Billing",       href: "/billing",   icon: "credit_card" },
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
        background: "#111111",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px 16px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "7px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo_white.svg" alt="Volt" style={{ height: "32px", width: "auto", display: "block", marginBottom: "8px" }} />
        <span style={{ fontSize: "10px", fontWeight: 500, color: "rgba(252,252,252,0.28)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block" }}>
          Workspace Manager
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
                gap: "9px",
                padding: "0 10px 0 9px",
                height: "34px",
                borderRadius: "7px",
                fontSize: "13.5px",
                fontWeight: active ? 500 : 400,
                textDecoration: "none",
                transition: "background 0.12s, color 0.12s",
                background: active ? "rgba(160,255,121,0.07)" : "transparent",
                color: active ? "#fcfcfc" : "rgba(252,252,252,0.48)",
                borderLeft: active ? "2px solid #a0ff79" : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(252,252,252,0.72)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(252,252,252,0.48)";
                }
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "17px",
                  color: active ? "#a0ff79" : "inherit",
                  fontVariationSettings: active
                    ? '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24'
                    : '"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24',
                  flexShrink: 0,
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
          borderTop: "1px solid rgba(255,255,255,0.06)",
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
            background: "rgba(160,255,121,0.12)",
            border: "1px solid rgba(160,255,121,0.3)",
            color: "#a0ff79",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          LL
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
            Lucia Leal
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
            Owner
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
