"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("wm_auth", "true");
      router.push("/crm");
    }, 600);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "13px 14px",
    fontSize: "15px",
    color: "#fcfcfc",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
  };

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "#a0ff79";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(160,255,121,0.18)";
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    e.currentTarget.style.boxShadow = "none";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#282b2e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          animation: "volt-login-in 0.18s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <style>{`
          @keyframes volt-login-in {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "32px",
            gap: "6px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "28px", lineHeight: 1 }}>⚡</span>
            <span style={{ fontSize: "22px", fontWeight: 600, color: "#fcfcfc", lineHeight: 1 }}>
              Volt
            </span>
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(252,252,252,0.5)",
              fontWeight: 500,
              letterSpacing: "0.01em",
            }}
          >
            Workspace Manager
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(252,252,252,0.55)",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@empresa.com"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(252,252,252,0.55)",
              }}
            >
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "4px",
              width: "100%",
              background: loading ? "rgba(160,255,121,0.6)" : "#a0ff79",
              color: "#1a1a1a",
              fontWeight: 600,
              fontSize: "15px",
              border: "none",
              borderRadius: "12px",
              padding: "14px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.15s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              if (!loading)
                (e.currentTarget as HTMLButtonElement).style.background = "#b8ff96";
            }}
            onMouseLeave={(e) => {
              if (!loading)
                (e.currentTarget as HTMLButtonElement).style.background = "#a0ff79";
            }}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "rgba(252,252,252,0.25)",
            marginTop: "24px",
          }}
        >
          © 2026 Volt · WhatsApp Superpowers
        </p>
      </div>
    </div>
  );
}
