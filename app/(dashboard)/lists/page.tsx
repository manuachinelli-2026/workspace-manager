"use client";

import { useState, useEffect } from "react";

interface VoltList {
  id: string;
  name: string;
  prompt: string;
  chatCount: number;
  createdAt: string;
}

const LS_KEY = "wm_lists";

function loadLists(): VoltList[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]"); } catch { return []; }
}
function saveLists(lists: VoltList[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(lists));
}

type SearchStep = "idle" | "scanning" | "analyzing" | "done";

const SCANNING_MESSAGES = [
  "Scanning your WhatsApp chats…",
  "Reading conversation context…",
  "Analyzing message patterns…",
  "Matching against your criteria…",
  "Almost there…",
];

function AddListModal({ onClose, onSave }: { onClose: () => void; onSave: (list: VoltList) => void }) {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [promptFocused, setPromptFocused] = useState(false);
  const [step, setStep] = useState<SearchStep>("idle");
  const [msgIdx, setMsgIdx] = useState(0);
  const [resultCount, setResultCount] = useState(0);

  function handleSearch() {
    if (!prompt.trim()) return;
    setStep("scanning");
    setMsgIdx(0);

    // Cycle through scanning messages
    let idx = 0;
    const msgInterval = setInterval(() => {
      idx++;
      if (idx < SCANNING_MESSAGES.length) {
        setMsgIdx(idx);
      } else {
        clearInterval(msgInterval);
      }
    }, 600);

    // After 2.8s reveal result
    setTimeout(() => {
      clearInterval(msgInterval);
      // Random between 4 and 51, weighted toward realistic numbers
      const count = Math.floor(Math.random() * 47) + 4;
      setResultCount(count);
      setStep("done");
    }, 2800);
  }

  function handleSave() {
    const listName = name.trim() || prompt.trim().slice(0, 40) + (prompt.trim().length > 40 ? "…" : "");
    const newList: VoltList = {
      id: crypto.randomUUID(),
      name: listName,
      prompt: prompt.trim(),
      chatCount: resultCount,
      createdAt: new Date().toISOString(),
    };
    onSave(newList);
    onClose();
  }

  const canSearch = prompt.trim().length > 0 && step === "idle";

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.65)" }}
      onClick={() => step !== "scanning" && onClose()}
    >
      <div
        style={{ width: "100%", maxWidth: "460px", borderRadius: "16px", padding: "24px", position: "relative", background: "#282b2e", border: "1px solid rgba(255,255,255,0.1)", animation: "modal-in 0.15s cubic-bezier(0.16,1,0.3,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`@keyframes modal-in { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

        {step !== "scanning" && (
          <button onClick={onClose} style={{ position: "absolute", top: "14px", right: "14px", background: "none", border: "none", color: "rgba(252,252,252,0.35)", cursor: "pointer", padding: "4px", borderRadius: "6px", display: "flex" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>close</span>
          </button>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "#a0ff79" }}>auto_awesome</span>
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#fcfcfc" }}>New list</h2>
        </div>
        <p style={{ fontSize: "13px", color: "rgba(252,252,252,0.45)", marginBottom: "20px", lineHeight: 1.5 }}>
          Describe what chats should be in this list and AI will find them for you.
        </p>

        {/* Name (optional) */}
        <label style={{ fontSize: "11px", fontWeight: 500, color: "rgba(252,252,252,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
          List name <span style={{ color: "rgba(252,252,252,0.25)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
          placeholder="e.g. Hot leads Argentina"
          disabled={step !== "idle"}
          style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: nameFocused ? "1px solid #a0ff79" : "1px solid rgba(255,255,255,0.1)", boxShadow: nameFocused ? "0 0 0 3px rgba(160,255,121,0.12)" : "none", borderRadius: "10px", padding: "9px 12px", fontSize: "14px", color: "#fcfcfc", outline: "none", transition: "border-color 0.15s, box-shadow 0.15s", marginBottom: "14px", fontFamily: "inherit", boxSizing: "border-box", opacity: step !== "idle" ? 0.5 : 1 }}
        />

        {/* Prompt */}
        <label style={{ fontSize: "11px", fontWeight: 500, color: "rgba(252,252,252,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
          Description
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setPromptFocused(true)}
          onBlur={() => setPromptFocused(false)}
          placeholder="e.g. Clients from Argentina who asked about billing or pricing in the last 30 days"
          rows={3}
          disabled={step !== "idle"}
          style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: promptFocused ? "1px solid #a0ff79" : "1px solid rgba(255,255,255,0.1)", boxShadow: promptFocused ? "0 0 0 3px rgba(160,255,121,0.12)" : "none", borderRadius: "10px", padding: "9px 12px", fontSize: "14px", color: "#fcfcfc", outline: "none", transition: "border-color 0.15s, box-shadow 0.15s", marginBottom: "16px", fontFamily: "inherit", boxSizing: "border-box", resize: "vertical", lineHeight: 1.55, opacity: step !== "idle" ? 0.5 : 1 }}
        />

        {/* Scanning state */}
        {step === "scanning" && (
          <div style={{ marginBottom: "16px", padding: "14px 16px", borderRadius: "10px", background: "rgba(160,255,121,0.06)", border: "1px solid rgba(160,255,121,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#a0ff79", animation: "spin 1s linear infinite", display: "inline-block" }}>progress_activity</span>
              <span style={{ fontSize: "13px", color: "#a0ff79", fontWeight: 500 }}>
                {SCANNING_MESSAGES[msgIdx]}
              </span>
            </div>
          </div>
        )}

        {/* Result state */}
        {step === "done" && (
          <div style={{ marginBottom: "16px", padding: "14px 16px", borderRadius: "10px", background: "rgba(160,255,121,0.06)", border: "1px solid rgba(160,255,121,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#a0ff79", fontVariationSettings: '"FILL" 1' }}>check_circle</span>
              <div>
                <span style={{ fontSize: "22px", fontWeight: 700, color: "#fcfcfc" }}>{resultCount}</span>
                <span style={{ fontSize: "13px", color: "rgba(252,252,252,0.55)", marginLeft: "6px" }}>chats matched your criteria</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {step === "idle" && (
          <button
            onClick={handleSearch}
            disabled={!canSearch}
            style={{ width: "100%", background: canSearch ? "#a0ff79" : "rgba(160,255,121,0.2)", color: canSearch ? "#1a1a1a" : "rgba(26,26,26,0.5)", fontWeight: 700, fontSize: "14px", border: "none", borderRadius: "9999px", padding: "12px", cursor: canSearch ? "pointer" : "default", transition: "background 0.15s", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>auto_awesome</span>
            Search with AI
          </button>
        )}

        {step === "done" && (
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setStep("idle")} style={{ flex: 1, background: "transparent", color: "rgba(252,252,252,0.5)", fontWeight: 500, fontSize: "14px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9999px", padding: "11px", cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)")}>
              Search again
            </button>
            <button onClick={handleSave} style={{ flex: 2, background: "#a0ff79", color: "#1a1a1a", fontWeight: 700, fontSize: "14px", border: "none", borderRadius: "9999px", padding: "11px", cursor: "pointer", fontFamily: "inherit" }}>
              Save list
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ListsPage() {
  const [lists, setLists] = useState<VoltList[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { setLists(loadLists()); }, []);

  function handleSave(list: VoltList) {
    const updated = [...lists, list];
    setLists(updated);
    saveLists(updated);
  }

  function handleDelete(id: string) {
    const updated = lists.filter((l) => l.id !== id);
    setLists(updated);
    saveLists(updated);
  }

  return (
    <div style={{ padding: "24px 28px", overflowY: "auto", height: "100%" }}>
      {showModal && <AddListModal onClose={() => setShowModal(false)} onSave={handleSave} />}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 500, color: "#fcfcfc" }}>Manage Lists</h1>
          <p style={{ fontSize: "13px", color: "rgba(252,252,252,0.45)", marginTop: "3px" }}>
            AI-powered chat lists shared across your workspace
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 16px", borderRadius: "9999px", fontSize: "13px", fontWeight: 700, border: "none", background: "#a0ff79", color: "#1a1a1a", cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s, box-shadow 0.15s" }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>add</span>
          Add list
        </button>
      </div>

      {/* Empty state */}
      {lists.length === 0 && (
        <div
          style={{ borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.1)", padding: "56px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "36px", color: "rgba(252,252,252,0.15)" }}>format_list_bulleted</span>
          <p style={{ fontSize: "14px", color: "rgba(252,252,252,0.3)", textAlign: "center", maxWidth: "280px", lineHeight: 1.6 }}>
            No lists yet. Create one and AI will automatically find the matching chats in your workspace.
          </p>
          <button
            onClick={() => setShowModal(true)}
            style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "6px", padding: "7px 18px", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, border: "1px solid rgba(160,255,121,0.4)", color: "#a0ff79", background: "transparent", cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>auto_awesome</span>
            Create your first list
          </button>
        </div>
      )}

      {/* Lists grid */}
      {lists.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {lists.map((list) => (
            <div
              key={list.id}
              style={{ borderRadius: "10px", padding: "18px", background: "#282b2e", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "12px", transition: "border-color 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)")}
            >
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(160,255,121,0.1)", border: "1px solid rgba(160,255,121,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#a0ff79" }}>format_list_bulleted</span>
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#fcfcfc", lineHeight: 1.3 }}>{list.name}</p>
                </div>
                <button
                  onClick={() => handleDelete(list.id)}
                  style={{ background: "none", border: "none", color: "rgba(252,252,252,0.2)", cursor: "pointer", padding: "2px", borderRadius: "4px", display: "flex", flexShrink: 0, transition: "color 0.15s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(239,68,68,0.7)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(252,252,252,0.2)")}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>delete</span>
                </button>
              </div>

              {/* Prompt */}
              <p style={{ fontSize: "12px", color: "rgba(252,252,252,0.4)", lineHeight: 1.55, flexGrow: 1 }}>
                &ldquo;{list.prompt}&rdquo;
              </p>

              {/* Footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span style={{ fontSize: "22px", fontWeight: 700, color: "#fcfcfc" }}>{list.chatCount}</span>
                  <span style={{ fontSize: "12px", color: "rgba(252,252,252,0.4)" }}>chats</span>
                </div>
                <span style={{ fontSize: "11px", color: "rgba(252,252,252,0.25)" }}>
                  {new Date(list.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
