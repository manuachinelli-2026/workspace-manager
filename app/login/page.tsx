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

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">⚡</span>
            <span className="text-2xl font-bold tracking-tight text-[#fcfcfc]">Volt</span>
          </div>
          <p className="text-sm text-[rgba(252,252,252,0.5)]">Volt para WhatsApp</p>
        </div>

        {/* Card */}
        <div className="bg-[#282b2e] rounded-2xl p-8 border border-[rgba(255,255,255,0.08)]">
          <h1 className="text-xl font-semibold text-[#fcfcfc] mb-1">Workspace Manager</h1>
          <p className="text-sm text-[rgba(252,252,252,0.5)] mb-6">Iniciá sesión en tu cuenta</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[rgba(252,252,252,0.6)] uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-3.5 py-2.5 text-sm text-[#fcfcfc] placeholder:text-[rgba(252,252,252,0.3)] focus:outline-none focus:border-[#58b836] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[rgba(252,252,252,0.6)] uppercase tracking-wider">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.1)] rounded-lg px-3.5 py-2.5 text-sm text-[#fcfcfc] placeholder:text-[rgba(252,252,252,0.3)] focus:outline-none focus:border-[#58b836] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-[#58b836] hover:bg-[#4ea32e] text-white font-semibold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[rgba(252,252,252,0.3)] mt-6">
          © 2026 Volt · WhatsApp Superpowers
        </p>
      </div>
    </div>
  );
}
