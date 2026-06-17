"use client";

import { useState, useEffect, useCallback } from "react";
import type { WorkspaceMember } from "@/lib/voltApiScraper";

type HubspotStatus = "linked" | "pending" | null;
interface StaticOverride { hubspot: HubspotStatus; hoursSaved: number | null; lastActive: string | null }

const STATIC_OVERRIDES: Record<string, StaticOverride> = {
  "5493512336517": { hubspot: "linked", hoursSaved: 14,   lastActive: "2h ago"  },
  "5214442636319": { hubspot: "linked", hoursSaved: 11,   lastActive: "4h ago"  },
  "5492643163809": { hubspot: null,     hoursSaved: 9,    lastActive: "1h ago"  },
  "5491176245144": { hubspot: null,     hoursSaved: 8,    lastActive: "3d ago"  },
  "5215618576462": { hubspot: null,     hoursSaved: 7,    lastActive: "6h ago"  },
  "50241065409":   { hubspot: null,     hoursSaved: null, lastActive: "1d ago"  },
  "553298164313":  { hubspot: null,     hoursSaved: null, lastActive: "5h ago"  },
  "5511991026609": { hubspot: "linked", hoursSaved: null, lastActive: "30m ago" },
  "5527998074545": { hubspot: null,     hoursSaved: null, lastActive: "20m ago" },
  "5214792180485": { hubspot: null,     hoursSaved: null, lastActive: "45m ago" },
};

const AVATAR_RGBS = [
  "88, 184, 54", "59, 130, 246", "139, 92, 246", "13, 148, 136",
  "217, 119, 6",  "234, 88, 12",  "120, 124, 130", "219, 39, 119",
  "71, 105, 134", "88, 184, 54",
];

function avatarRgb(idx: number) { return AVATAR_RGBS[idx % AVATAR_RGBS.length]; }
function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

interface DisplayMember extends WorkspaceMember {
  hubspot: HubspotStatus;
  hoursSaved: number | null;
  lastActive: string | null;
  avatarRgb: string;
  initials: string;
}

interface PendingInvite { phone: string; addedAt: string }

const LS_KEY = "wm_pending_invites";

function loadPending(): PendingInvite[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]"); } catch { return []; }
}
function savePending(list: PendingInvite[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

// ── shared UI primitives ──────────────────────────────────────────────────────

function Pill({ rgb, label, icon }: { rgb: string; label: string; icon?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", borderRadius: "9999px", padding: "3px 10px", fontSize: "12px", fontWeight: 500, background: `rgba(${rgb}, 0.13)`, color: `rgb(${rgb})`, whiteSpace: "nowrap" }}>
      {icon && <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>{icon}</span>}
      {label}
    </span>
  );
}

function VoltCloudCell({ value }: { value: "connected" | "disconnected" }) {
  if (value === "connected")
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#a0ff79", fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}>check_circle</span>
        <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.65)" }}>Connected</span>
      </div>
    );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "rgba(252,252,252,0.2)" }}>radio_button_unchecked</span>
      <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.35)" }}>Not connected</span>
    </div>
  );
}

function HubSpotCell({ value }: { value: HubspotStatus }) {
  if (value === null) return <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.2)" }}>—</span>;
  if (value === "linked")
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#a0ff79", fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24' }}>check_circle</span>
        <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.65)" }}>Linked</span>
      </div>
    );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "rgb(217, 119, 6)" }}>pending</span>
      <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.35)" }}>Pending</span>
    </div>
  );
}

// ── Invite modal ──────────────────────────────────────────────────────────────

interface InviteModalProps {
  onClose: () => void;
  onPending: (phone: string) => void;
  onAdded: () => void;
}

type InviteState = "idle" | "loading" | "added" | "pending" | "error";

function InviteModal({ onClose, onPending, onAdded }: InviteModalProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [state, setState] = useState<InviteState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSend() {
    const phone = value.trim().replace(/\D/g, "");
    if (!phone) return;
    setState("loading");
    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.status === "added") {
        setState("added");
        onAdded();
        setTimeout(onClose, 1500);
      } else if (data.status === "pending") {
        setState("pending");
        onPending(phone);
        setTimeout(onClose, 2000);
      } else {
        setState("error");
        setErrorMsg(data.message ?? "Something went wrong");
      }
    } catch {
      setState("error");
      setErrorMsg("Network error");
    }
  }

  const stateColor: Record<InviteState, string> = {
    idle: "#a0ff79", loading: "rgba(160,255,121,0.5)", added: "#a0ff79",
    pending: "rgb(217,119,6)", error: "rgb(239,68,68)",
  };
  const stateLabel: Record<InviteState, string> = {
    idle: "Send invitation", loading: "Looking up user…", added: "Added to workspace!",
    pending: "Waiting for signup…", error: "Try again",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div style={{ width: "100%", maxWidth: "380px", borderRadius: "16px", padding: "24px", position: "relative", background: "#282b2e", border: "1px solid rgba(255,255,255,0.1)", animation: "volt-login-in 0.15s cubic-bezier(0.16,1,0.3,1)" }} onClick={(e) => e.stopPropagation()}>
        <style>{`@keyframes volt-login-in { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }`}</style>
        <button onClick={onClose} style={{ position: "absolute", top: "14px", right: "14px", background: "none", border: "none", color: "rgba(252,252,252,0.35)", cursor: "pointer", display: "flex", padding: "4px", borderRadius: "6px" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>close</span>
        </button>

        <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#fcfcfc", marginBottom: "4px" }}>Invite user</h2>
        <p style={{ fontSize: "13px", color: "rgba(252,252,252,0.5)", marginBottom: "16px", lineHeight: 1.5 }}>
          Enter the phone number. If the user already has Volt, they&apos;ll be added instantly — otherwise they&apos;ll appear as pending until they sign up.
        </p>

        <input
          value={value}
          onChange={(e) => { setValue(e.target.value); if (state === "error") setState("idle"); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
          placeholder="+54 9 351 234 5678"
          disabled={state === "loading" || state === "added" || state === "pending"}
          style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: focused ? "1px solid #a0ff79" : "1px solid rgba(255,255,255,0.1)", boxShadow: focused ? "0 0 0 3px rgba(160,255,121,0.18)" : "none", borderRadius: "10px", padding: "11px 14px", fontSize: "14px", color: "#fcfcfc", outline: "none", transition: "border-color 0.15s, box-shadow 0.15s", marginBottom: errorMsg ? "6px" : "12px", fontFamily: "inherit", boxSizing: "border-box" }}
        />

        {state === "error" && (
          <p style={{ fontSize: "12px", color: "rgb(239,68,68)", marginBottom: "10px" }}>{errorMsg}</p>
        )}

        <button
          onClick={handleSend}
          disabled={state === "loading" || state === "added" || state === "pending"}
          style={{ width: "100%", background: stateColor[state], color: "#1a1a1a", fontWeight: 700, fontSize: "14px", border: "none", borderRadius: "9999px", padding: "12px", cursor: (state === "loading" || state === "added" || state === "pending") ? "default" : "pointer", fontFamily: "inherit", transition: "background 0.15s" }}
        >
          {state === "loading"
            ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "16px", animation: "spin 1s linear infinite" }}>progress_activity</span>
                {stateLabel[state]}
              </span>
            : stateLabel[state]}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    </div>
  );
}

// ── skeleton ──────────────────────────────────────────────────────────────────

const TH: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: "11px", fontWeight: 500, color: "rgba(252,252,252,0.4)", whiteSpace: "nowrap", borderBottom: "1px solid rgba(255,255,255,0.06)", textTransform: "uppercase", letterSpacing: "0.05em" };

function SkeletonRow() {
  return (
    <tr>
      {[200, 80, 130, 100, 80, 70, 80].map((w, i) => (
        <td key={i} style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ height: "13px", width: `${w}px`, borderRadius: "6px", background: "rgba(255,255,255,0.06)", animation: "pulse 1.5s ease-in-out infinite" }} />
        </td>
      ))}
    </tr>
  );
}

const DASH = <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.2)" }}>—</span>;

// ── page ──────────────────────────────────────────────────────────────────────

export default function WorkspacePage() {
  const [showInvite, setShowInvite] = useState(false);
  const [members, setMembers] = useState<DisplayMember[]>([]);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const loadMembers = useCallback(async () => {
    try {
      const res = await fetch("/api/workspace", { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      const data: { members: WorkspaceMember[]; updatedAt: string } = await res.json();
      const display: DisplayMember[] = data.members.map((m, i) => {
        const overrides = STATIC_OVERRIDES[m.phone] ?? { hubspot: null, hoursSaved: null, lastActive: null };
        return { ...m, hubspot: overrides.hubspot, hoursSaved: overrides.hoursSaved, lastActive: overrides.lastActive, avatarRgb: avatarRgb(i), initials: initials(m.name) };
      });
      setMembers(display);
      setUpdatedAt(data.updatedAt);
    } catch { /* keep existing state */ }
    finally { setLoading(false); }
  }, []);

  const checkPendingInvites = useCallback(async () => {
    const pending = loadPending();
    if (pending.length === 0) return;

    try {
      const res = await fetch("/api/invite/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phones: pending.map((p) => p.phone) }),
      });
      const data: { resolved: Array<{ phone: string }>; stillPending: string[] } = await res.json();
      if (data.resolved.length > 0) {
        const newPending = pending.filter((p) => data.stillPending.includes(p.phone));
        savePending(newPending);
        setPendingInvites(newPending);
        // Refresh members since new ones were added
        await loadMembers();
      }
    } catch { /* silent — retry next interval */ }
  }, [loadMembers]);

  useEffect(() => {
    // Load pending from localStorage
    setPendingInvites(loadPending());

    loadMembers();
    checkPendingInvites();

    const interval = setInterval(() => {
      loadMembers();
      checkPendingInvites();
    }, 60_000);
    return () => clearInterval(interval);
  }, [loadMembers, checkPendingInvites]);

  function handlePendingAdded(phone: string) {
    const updated = [...loadPending(), { phone, addedAt: new Date().toISOString() }];
    savePending(updated);
    setPendingInvites(updated);
  }

  function removePending(phone: string) {
    const updated = loadPending().filter((p) => p.phone !== phone);
    savePending(updated);
    setPendingInvites(updated);
  }

  const activeMembers = members.filter((m) => m.plan === "Premium" || m.plan === "Business");
  const totalHours = members.reduce((s, m) => s + (m.hoursSaved ?? 0), 0);
  const avgHours = activeMembers.length > 0 ? (totalHours / activeMembers.length).toFixed(1) : "0";
  const connectedCloud = members.filter((m) => m.voltCloud === "connected").length;

  return (
    <div style={{ padding: "24px 28px", overflowY: "auto", height: "100%" }}>
      <style>{`@keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }`}</style>

      {showInvite && (
        <InviteModal
          onClose={() => setShowInvite(false)}
          onPending={handlePendingAdded}
          onAdded={loadMembers}
        />
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 500, color: "#fcfcfc" }}>Workspace</h1>
          {updatedAt && (
            <span style={{ fontSize: "11px", color: "rgba(252,252,252,0.3)" }}>
              Updated {new Date(updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>
        <button onClick={() => setShowInvite(true)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 16px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, border: "1px solid rgba(160,255,121,0.4)", color: "#a0ff79", background: "transparent", cursor: "pointer", transition: "background 0.15s, box-shadow 0.15s", fontFamily: "inherit" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(160,255,121,0.1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 1px rgba(160,255,121,0.3)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}>
          <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>person_add</span>
          Invite
        </button>
      </div>

      {/* Live stats bar */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", padding: "14px 16px", borderRadius: "10px", background: "#282b2e", border: "1px solid rgba(255,255,255,0.06)" }}>
        {[
          { value: loading ? "—" : String(members.length), label: "members" },
          { value: loading ? "—" : String(activeMembers.length), label: "Premium licenses" },
          { value: loading ? "—" : `${connectedCloud}/${members.length}`, label: "Volt Cloud active" },
          { value: loading ? "—" : `${totalHours}h`, label: "saved this week" },
          { value: loading ? "—" : `${avgHours}h`, label: "avg / user" },
        ].map((stat, i, arr) => (
          <div key={stat.label} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ padding: i === 0 ? "0 24px 0 0" : "0 24px" }}>
              <span style={{ fontSize: "20px", fontWeight: 600, color: "#fcfcfc" }}>{stat.value}</span>
              <span style={{ fontSize: "12px", color: "rgba(252,252,252,0.45)", marginLeft: "5px" }}>{stat.label}</span>
            </div>
            {i < arr.length - 1 && <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.08)" }} />}
          </div>
        ))}
      </div>

      {/* Section title */}
      <p style={{ fontSize: "11px", fontWeight: 500, color: "rgba(252,252,252,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
        MEMBERS · {loading ? "…" : members.length + pendingInvites.length}
      </p>

      {/* Table */}
      <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={TH}>Member</th>
              <th style={TH}>Role</th>
              <th style={TH}>Volt Cloud</th>
              <th style={TH}>HubSpot</th>
              <th style={TH}>License</th>
              <th style={TH}>Lists</th>
              <th style={TH}>Hours saved</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              : <>
                  {members.map((m) => (
                    <tr key={m.userId} style={{ transition: "background 0.12s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "rgba(255,255,255,0.03)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `rgba(${m.avatarRgb}, 0.18)`, border: `1px solid rgba(${m.avatarRgb}, 0.3)`, color: `rgb(${m.avatarRgb})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                            {m.initials}
                          </div>
                          <div>
                            <p style={{ fontSize: "13px", fontWeight: 500, color: "#fcfcfc", lineHeight: 1.2 }}>{m.name}</p>
                            {m.phone && <p style={{ fontSize: "11px", color: "rgba(252,252,252,0.35)", marginTop: "1px" }}>+{m.phone}</p>}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "13px", color: "rgba(252,252,252,0.6)" }}>{m.role}</td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}><VoltCloudCell value={m.voltCloud} /></td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}><HubSpotCell value={m.hubspot} /></td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {m.plan === "Premium" || m.plan === "Business" ? <Pill rgb="88, 184, 54" label={m.plan} icon="check_circle" /> : <Pill rgb="217, 119, 6" label="Free" />}
                      </td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "13px", color: m.listCount > 0 ? "rgba(252,252,252,0.7)" : "rgba(252,252,252,0.25)" }}>
                        {m.listCount > 0 ? m.listCount : "—"}
                      </td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "13px", color: m.hoursSaved != null ? "rgba(252,252,252,0.7)" : "rgba(252,252,252,0.25)" }}>
                        {m.hoursSaved != null ? `${m.hoursSaved}h` : "—"}
                      </td>
                    </tr>
                  ))}

                  {/* Pending invite rows */}
                  {pendingInvites.map((inv) => (
                    <tr key={inv.phone} style={{ opacity: 0.7 }}>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(120,124,130,0.15)", border: "1px solid rgba(120,124,130,0.25)", color: "rgba(252,252,252,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>phone</span>
                          </div>
                          <div>
                            <p style={{ fontSize: "13px", fontWeight: 500, color: "rgba(252,252,252,0.5)", lineHeight: 1.2 }}>+{inv.phone}</p>
                            <p style={{ fontSize: "11px", color: "rgba(252,252,252,0.25)", marginTop: "1px" }}>Invited {new Date(inv.addedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{DASH}</td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{DASH}</td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{DASH}</td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <Pill rgb="120, 124, 130" label="Waiting signup" />
                      </td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{DASH}</td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <button onClick={() => removePending(inv.phone)} title="Remove pending invite" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(252,252,252,0.25)", display: "flex", alignItems: "center", padding: "2px", borderRadius: "4px", transition: "color 0.12s" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(239,68,68,0.7)")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.25)")}>
                          <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>close</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
            }
          </tbody>
        </table>
      </div>

      {!loading && members.length === 0 && pendingInvites.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 16px", color: "rgba(252,252,252,0.35)", fontSize: "13px" }}>
          Could not load workspace data. Check your connection.
        </div>
      )}
    </div>
  );
}
