"use client";

import React, { useMemo, useState } from "react";

// start with an empty alerts list (no seeded alerts)

function severityColor(sev) {
  if (sev === "high") return "var(--color-error)";
  if (sev === "medium") return "var(--color-primary)";
  return "var(--color-secondary)";
}

export default function AlertasPage() {
  const [alerts, setAlerts] = useState([]);

  function generateId() {
    return `A-${Date.now().toString().slice(-6)}`;
  }

  function addFloodReport(severity) {
    const newAlert = {
      id: generateId(),
      title: "Inundación reportada",
      severity,
      location: "Ubicación desconocida",
      date: new Date().toISOString(),
      status: "active",
      description: "Reporte de inundación enviado desde la interfaz.",
    };
    setAlerts((prev) => [newAlert, ...prev]);
  }

  // (no list view required — we show only counts and per-tile actions)

  const counts = useMemo(() => {
    const high = alerts.filter((a) => a.severity === "high").length;
    const medium = alerts.filter((a) => a.severity === "medium").length;
    const low = alerts.filter((a) => a.severity === "low").length;
    return { high, medium, low };
  }, [alerts]);

  function toggleResolved(id) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === "active" ? "resolved" : "active" } : a))
    );
  }
  return (
    <div style={{ padding: 24, background: "#0b0b0b", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ margin: 0, fontSize: 28, marginBottom: 18, color: "#fff", fontWeight: 800 }}>Alertas</h1>

      {/* Dark dashboard: three wide cards with large centered colored buttons */}
      <section aria-label="Resumen de alertas por severidad" style={{ display: "flex", gap: 20 }}>
        {[
          { key: "high", label: "Severidad Alta", color: "#E74C3C", count: counts.high },
          { key: "medium", label: "Severidad Media", color: "#FFD166", count: counts.medium },
          { key: "low", label: "Severidad Baja", color: "#2ECC71", count: counts.low },
        ].map((tile) => (
          <div
            key={tile.key}
            style={{
              flex: 1,
              background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.12))",
              borderRadius: 10,
              padding: 18,
              border: "1px solid rgba(255,255,255,0.04)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.7)",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 13, color: "#cfcfcf" }}>{tile.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: severityColor(tile.key) }}>{tile.count}</div>
            </div>

            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <button
                onClick={() => addFloodReport(tile.key)}
                aria-label={`Reportar inundación ${tile.label}`}
                style={{
                  width: "100%",
                  height: 180,
                  borderRadius: 12,
                  border: "none",
                  background: tile.color,
                  color: tile.key === "medium" ? "#222" : "#fff",
                  cursor: "pointer",
                  fontWeight: 900,
                  fontSize: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{tile.key === "high" ? "🔴" : tile.key === "medium" ? "🟡" : "🟢"}</div>
                <div style={{ textAlign: "center", lineHeight: 1 }}>
                  <div style={{ fontWeight: 800 }}>Reportar</div>
                  <div style={{ fontWeight: 900 }}>{tile.key === "high" ? "Alto" : tile.key === "medium" ? "Medio" : "Bajo"}</div>
                </div>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
