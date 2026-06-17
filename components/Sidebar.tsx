"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart2,
  Users,
  PlugZap,
  CreditCard,
  LogOut,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "CRM View", href: "/crm", icon: BarChart2 },
  { label: "Equipo", href: "/team", icon: Users },
  { label: "App Store", href: "/apps", icon: PlugZap },
  { label: "Facturación", href: "/billing", icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("wm_auth");
    router.push("/login");
  }

  return (
    <aside
      className="flex flex-col h-full w-[220px] shrink-0"
      style={{
        background: "#1a1a1a",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-[#58b836]" fill="#58b836" />
          <span className="text-sm font-semibold tracking-tight">
            <span className="text-[#fcfcfc]">Workspace </span>
            <span className="text-[#58b836]">Manager</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors relative"
              style={{
                background: active ? "rgba(88,184,54,0.12)" : "transparent",
                color: active ? "#58b836" : "rgba(252,252,252,0.65)",
                borderLeft: active ? "2px solid #58b836" : "2px solid transparent",
              }}
            >
              <Icon size={16} />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div
        className="px-4 py-4 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-3"
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: "#58b836", color: "#fff" }}
        >
          MA
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#fcfcfc] truncate">Manuel Achinelli</p>
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded"
            style={{ background: "rgba(88,184,54,0.2)", color: "#58b836" }}
          >
            Admin
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-[rgba(252,252,252,0.3)] hover:text-[rgba(252,252,252,0.7)] transition-colors"
          title="Cerrar sesión"
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}
