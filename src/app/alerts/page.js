"use client";

import React, { useMemo, useState } from "react";
import styles from "./page.module.css";

function severityColor(sev) {
  if (sev === "high") return "#E74C3C";
  if (sev === "medium") return "#FFD166";
  return "#2ECC71";
}

// eslint-disable-next-line no-unused-vars
function _LineChart({ points, color = "var(--color-secondary)" }) {
  const width = 720;
  const height = 120;
  const padding = 6;
  const xs = points.map((_, i) => (i / (points.length - 1)) * (width - padding * 2) + padding);
  const ys = points.map((v) => height - padding - (v / Math.max(...points)) * (height - padding * 2));
  const d = xs
    .map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`)
    .join(" ");
  return (
    <svg className={styles.chart} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="forecast chart">
      <path d={d} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function AlertsPage() {
  // simple alert state so the report buttons update counts
  const [alerts, setAlerts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function generateId() {
    return `A-${Date.now().toString().slice(-6)}`;
  }

  function addFloodReport(severity) {
    const newAlert = {
      id: generateId(),
      title: "Inundación reportada",
      severity,
      date: new Date().toISOString(),
      status: "active",
    };
    setAlerts((p) => [newAlert, ...p]);
  }

  const counts = useMemo(() => {
    const high = alerts.filter((a) => a.severity === "high").length;
    const medium = alerts.filter((a) => a.severity === "medium").length;
    const low = alerts.filter((a) => a.severity === "low").length;
    return { high, medium, low };
  }, [alerts]);

  // Example points (normalized) for the two charts
  const precip = [2, 10, 8, 3, 9, 2, 7, 3, 8, 2, 12, 3];
  const temp = [6, 9, 7, 3, 5, 6, 12, 10, 2, 0.5, 8, 6];

  return (
    <div className={styles.page}>
      {/* Simple top nav */}
      <header className={styles.topNav}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label={sidebarOpen ? "Ocultar sidebar" : "Mostrar sidebar"}
            className={styles.toggleBtn}
          >
            {sidebarOpen ? "«" : "☰"}
          </button>
          <div className={styles.brand}>
            <span aria-hidden>■</span>
            <span className="text-body1">Climate Resilience Tool</span>
          </div>
        </div>
        <nav className={styles.navLinks} aria-label="Secondary">
          <a href="/" className={styles.navItem}>Home</a>
          <a href="/alerts" className={styles.navItem}>Alert System</a>
          <a href="/impact" className={styles.navItem}>Data Analysis</a>
          <a href="#" className={styles.navItem}>Reports</a>
        </nav>
      </header>

      {/* Title */}
      <section className={styles.titleBlock}>
        <h1 className="text-h4">Alert System</h1>
        <p className="text-body2">Predictive analysis of climate resilience in Soacha</p>
      </section>

      {/* Layout: sidebar + main content */}
      <div className={`${styles.layout} ${!sidebarOpen ? styles.layoutCollapsed : ""}`}>
        {sidebarOpen && (
          <aside className={styles.sidebar} aria-label="Sidebar" aria-hidden={!sidebarOpen}>
            <div className={styles.brandBlock}>
              <div style={{ fontWeight: 800 }}>Cruz Roja Colombiana</div>
              <div style={{ color: "#cfcfcf", fontSize: 12 }}>Soacha</div>
            </div>


            <div className={styles.levels}>
              <h3 style={{ margin: "6px 0 8px", fontSize: 14 }}>Niveles de alerta</h3>
              <div className={styles.levelItem}>
                <span className={styles.levelDot} style={{ background: "#E74C3C" }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Alto</div>
                  <div style={{ fontSize: 12, color: "#9b9b9b" }}>Inundaciones severas, riesgo inmediato a la vida y propiedades.</div>
                </div>
              </div>

              <div className={styles.levelItem}>
                <span className={styles.levelDot} style={{ background: "#FFD166" }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Medio</div>
                  <div style={{ fontSize: 12, color: "#9b9b9b" }}>Inundaciones locales, posible daño a infraestructura y servicios.</div>
                </div>
              </div>

              <div className={styles.levelItem}>
                <span className={styles.levelDot} style={{ background: "#2ECC71" }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Bajo</div>
                  <div style={{ fontSize: 12, color: "#9b9b9b" }}>Inconvenientes menores, seguimiento recomendado.</div>
                </div>
              </div>
            </div>
          </aside>
        )}

  <main className={styles.main}>
          {/* Dark dashboard tiles: three wide cards with big centered report buttons */}
          <section className={styles.darkGrid} aria-label="Resumen de alertas por severidad">
        {[
          { key: "high", label: "Severidad Alta", color: "#E74C3C", count: 0 },
          { key: "medium", label: "Severidad Media", color: "#FFD166", count: 0 },
          { key: "low", label: "Severidad Baja", color: "#2ECC71", count: 0 },
        ].map((tile) => (
          <article key={tile.key} className={styles.tile}>
            <div className={styles.tileHeader}>
              <div className={styles.tileLabel}>{tile.label}</div>
              <div className={styles.tileCount} style={{ color: severityColor(tile.key) }}>{counts[tile.key]}</div>
            </div>

            <div className={styles.reportWrap}>
              <button
                onClick={() => addFloodReport(tile.key)}
                aria-label={`Reportar inundación ${tile.label}`}
                className={styles.reportBtn}
                style={{ background: tile.color, color: tile.key === "medium" ? "#222" : "#fff" }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{tile.key === "high" ? "🔴" : tile.key === "medium" ? "🟡" : "🟢"}</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 800 }}>Reportar</div>
                  <div style={{ fontWeight: 900 }}>{tile.key === "high" ? "Alto" : tile.key === "medium" ? "Medio" : "Bajo"}</div>
                </div>
              </button>
            </div>
          </article>
        ))}
          </section>
          </main>
        </div>
    </div>
  );
}
