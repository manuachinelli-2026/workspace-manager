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
      router.push("/workspace");
    }, 600);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "13px 16px",
    fontSize: "15px",
    color: "#fcfcfc",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
  };

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "#a0ff79";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(160,255,121,0.15)";
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    e.currentTarget.style.boxShadow = "none";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow behind the form */}
      <div
        style={{
          position: "absolute",
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(160,255,121,0.04) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          position: "relative",
          animation: "volt-login-in 0.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <style>{`
          @keyframes volt-login-in {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "36px",
            gap: "10px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo_white.svg" alt="Volt" style={{ height: "40px", width: "auto" }} />
          <p
            style={{
              fontSize: "11px",
              color: "rgba(252,252,252,0.35)",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Workspace Manager
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#282b2e",
            borderRadius: "20px",
            padding: "28px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "rgba(252,252,252,0.5)" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "rgba(252,252,252,0.5)" }}>
                Password
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
                marginTop: "6px",
                width: "100%",
                background: loading ? "rgba(160,255,121,0.6)" : "#a0ff79",
                color: "#1a1a1a",
                fontWeight: 700,
                fontSize: "15px",
                border: "none",
                borderRadius: "9999px",
                padding: "14px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.15s, box-shadow 0.15s",
                fontFamily: "inherit",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLButtonElement).style.background = "#b8ff96";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(160,255,121,0.25)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLButtonElement).style.background = "#a0ff79";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "rgba(252,252,252,0.2)",
            marginTop: "24px",
          }}
        >
          © 2026 Volt · WhatsApp Superpowers
        </p>
      </div>
    </div>
  );
}
