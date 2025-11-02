"use client";

import React, { useMemo, useState, useEffect } from "react";
import styles from "./page.module.css";
import PushNotifications from "@/components/PushNotifications";

function severityColor(sev) {
  if (sev === "high") return "var(--color-error)";      // #C8102E (Cruz Roja red)
  if (sev === "medium") return "var(--color-alert)";    // #FFD700 (yellow)
  return "var(--color-success)";                        // #2E7D32 (green)
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
    
    // Enviar notificación push
    sendPushNotification(severity);
  }

  async function sendPushNotification(severity) {
    try {
      const severityMessages = {
        high: {
          title: "🚨 ALERTA ALTA - Inundación Severa",
          body: "Inundación severa reportada. Riesgo inmediato a vida y propiedades. Active protocolos de evacuación.",
        },
        medium: {
          title: "⚠️ ALERTA MEDIA - Inundación Local",
          body: "Inundación local reportada. Posible daño a infraestructura. Manténgase alerta.",
        },
        low: {
          title: "ℹ️ ALERTA BAJA - Monitoreo",
          body: "Inconvenientes menores detectados. Seguimiento recomendado.",
        },
      };

      const message = severityMessages[severity] || severityMessages.medium;

      await fetch("/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...message,
          severity,
          data: { url: "/alerts", alertId: generateId() },
        }),
      });
    } catch (error) {
      console.error("Error enviando notificación push:", error);
    }
  }

  const counts = useMemo(() => {
    const high = alerts.filter((a) => a.severity === "high").length;
    const medium = alerts.filter((a) => a.severity === "medium").length;
    const low = alerts.filter((a) => a.severity === "low").length;
    return { high, medium, low };
  }, [alerts]);

  // Note: Chart placeholder available via _LineChart; provide points from API if needed.

  // Load the lottie-player web component (LottieFiles player) dynamically on client
  const [lottieReady, setLottieReady] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    // If already defined, mark ready
    if (window.customElements && window.customElements.get && window.customElements.get("lottie-player")) {
      setLottieReady(true);
      return;
    }

    // only add the script once
    let script = document.querySelector('script[data-lottie-player]');
    if (!script) {
      script = document.createElement("script");
      script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      script.async = true;
      script.setAttribute("data-lottie-player", "true");
      document.body.appendChild(script);
    }

    // Wait until the component is defined
    const whenDefined = window.customElements && window.customElements.whenDefined;
    if (whenDefined) {
      window.customElements
        .whenDefined("lottie-player")
        .then(() => setLottieReady(true))
        .catch(() => setLottieReady(false));
    } else {
      // fallback: assume it will be ready shortly
      const t = setTimeout(() => setLottieReady(!!window.customElements && !!window.customElements.get("lottie-player")), 700);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className={styles.page}>

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

      {/* Title */}
      <section className={styles.titleBlock}>
        <h1 className="text-h4">🚨 Sistema de Alertas Climáticas - Soacha</h1>
        <p className="text-body2">Monitoreo de condiciones meteorológicas y alertas preventivas para El Danubio y La María</p>
        
        <div className={styles.climateBanner}>
          <div className={styles.bannerItem}>
            <strong>🌊 Temporada Alta de Riesgo</strong>
            <p>Marzo - Junio, Octubre - Noviembre</p>
          </div>
          <div className={styles.bannerItem}>
            <strong>🌧️ Monitoreo IDEAM</strong>
            <p>Integración conceptual con datos en tiempo real</p>
          </div>
          <div className={styles.bannerItem}>
            <strong>📊 Histórico</strong>
            <p>71% incidencia de inundaciones</p>
          </div>
        </div>
      </section>

      {/* Layout: sidebar + main content */}
      <div className={`${styles.layout} ${!sidebarOpen ? styles.layoutCollapsed : ""}`}>
        {sidebarOpen && (
          <aside className={styles.sidebar} aria-label="Sidebar" aria-hidden={!sidebarOpen}>
            <div className={styles.brandBlock}>
              <div style={{ fontWeight: 800 }}>Cruz Roja Colombiana</div>
              <div style={{ color: "var(--color-text-secondary)", fontSize: 12 }}>Soacha</div>
            </div>


            <div className={styles.levels}>
              <h3 style={{ margin: "6px 0 8px", fontSize: 14 }}>Niveles de alerta</h3>
              <div className={styles.levelItem}>
                <span className={styles.levelDot} style={{ background: "var(--color-error)" }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Alto</div>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Inundaciones severas, riesgo inmediato a la vida y propiedades.</div>
                </div>
              </div>

              <div className={styles.levelItem}>
                <span className={styles.levelDot} style={{ background: "var(--color-alert)" }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Medio</div>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Inundaciones locales, posible daño a infraestructura y servicios.</div>
                </div>
              </div>

              <div className={styles.levelItem}>
                <span className={styles.levelDot} style={{ background: "var(--color-success)" }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Bajo</div>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Inconvenientes menores, seguimiento recomendado.</div>
                </div>
              </div>
            </div>
          </aside>
        )}

  <main className={styles.main}>
          {/* Dark dashboard tiles: three wide cards with big centered report buttons */}
          <section className={styles.darkGrid} aria-label="Resumen de alertas por severidad">
        {[
          { key: "high", label: "Severidad Alta", color: "var(--color-error)", count: 0 },
          { key: "medium", label: "Severidad Media", color: "var(--color-alert)", count: 0 },
          { key: "low", label: "Severidad Baja", color: "var(--color-success)", count: 0 },
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
                style={{ background: tile.color, color: tile.key === "medium" ? "var(--color-text-primary)" : "var(--color-blanco)" }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>
                  {tile.key === "high" ? (
                    // High severity: use the provided Weather-storm Lottie animation with SVG fallback
                    <div className={styles.lottieWrap}>
                      {lottieReady ? (
                        <lottie-player
                          src="/animations/Weather-storm.json"
                          background="transparent"
                          speed="1"
                          style={{ width: 140, height: 140 }}
                          loop
                          autoplay
                          aria-label="storm animation"
                        />
                      ) : (
                        <div className={styles.svgWrap}>
                          <img src="/vectorized.svg" alt="icon severidad alta" width={80} height={80} />
                        </div>
                      )}
                    </div>
                  ) : tile.key === "medium" ? (
                    // Medium severity: Rainy animation
                    <div className={styles.lottieWrap}>
                      {lottieReady ? (
                        <lottie-player
                          src="/animations/Rainy.json"
                          background="transparent"
                          speed="1"
                          style={{ width: 140, height: 140 }}
                          loop
                          autoplay
                          aria-label="rain animation"
                        />
                      ) : (
                        // graceful fallback until player is ready
                        "🟡"
                      )}
                    </div>
                  ) : (
                    // For the low severity tile render the Lottie animation if available.
                    // Place your Lottie JSON at: public/animations/Weather-partly-shower.json
                    <div className={styles.lottieWrap}>
                      {lottieReady ? (
                        <lottie-player
                          src="/animations/Weather-partly-shower.json"
                          background="transparent"
                          speed="1"
                          style={{ width: 140, height: 140 }}
                          loop
                          autoplay
                          aria-label="weather animation"
                        />
                      ) : (
                        // graceful fallback until player is ready
                        "🟢"
                      )}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 800 }}>Reportar</div>
                  <div style={{ fontWeight: 900 }}>{tile.key === "high" ? "Alto" : tile.key === "medium" ? "Medio" : "Bajo"}</div>
                </div>
              </button>
            </div>
          </article>
        ))}
          </section>

          {/* Sección de notificaciones push */}
          <section style={{ marginTop: 32 }}>
            <h2 className="text-h5" style={{ marginBottom: 16 }}>
              🔔 Configurar Notificaciones Push
            </h2>
            <PushNotifications />
          </section>
          </main>
        </div>
    </div>
  );
}
