"use client";

const LOOKER_IFRAME_SRC =
  "https://lookerstudio.google.com/embed/reporting/029a49ca-596f-481e-84ae-741e750729b8/page/faxdF";

export default function LookerPage() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--color-background)",
        /* Force light theme tokens for this page */
        "--color-background": "#FFFFFF",
        "--color-surface": "#F8F8F8",
        "--color-text-primary": "#333333",
        "--color-text-secondary": "#6E6E6E",
        "--color-primary": "#C8102E",
        "--color-primary-hover": "#FF4136",
        "--color-secondary": "#007BFF",
        "--color-secondary-hover": "#005BB5",
        "--color-border": "#DADADA",
        "--color-alert": "#FFD700",
        "--color-info": "#007BFF",
        "--color-error": "#C8102E",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: "var(--color-surface)",
          color: "var(--color-text-primary)",
          padding: "24px 16px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>Cruz Roja Colombiana</div>
          <a href="#" style={{ color: "var(--color-primary)", textDecoration: "none", fontSize: 13 }}>
            Soacha
          </a>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <a href="#" style={{ color: "var(--color-text-primary)", textDecoration: "none" }}>🏠 Inicio</a>
          <a href="/alertas" style={{ color: "var(--color-text-primary)", textDecoration: "none" }}>🔔 Alertas</a>
          <a href="#" style={{ color: "var(--color-text-primary)", textDecoration: "none" }}>📊 Reportes</a>
          <a href="#" style={{ color: "var(--color-text-primary)", textDecoration: "none" }}>🔎 Análisis</a>
          <a href="#" style={{ color: "var(--color-text-primary)", textDecoration: "none" }}>👥 Comunidades</a>
        </nav>
      </aside>

      {/* Main content */}
  <main style={{ flex: 1, padding: 20, boxSizing: "border-box", color: "var(--color-text-primary)", display: "flex", flexDirection: "column" }}>
        <header style={{ marginBottom: 20 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "var(--color-text-primary)" }}>Resiliencia Climática Urbana</h1>
        </header>

        <section
          role="region"
          aria-label="Looker embed"
          style={{
            background: "var(--color-surface)",
            borderRadius: 8,
            padding: 12,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.03)",
            marginBottom: 20,
            /* allow this section to grow so iframe can fill available space */
            display: "flex",
            flex: 1,
            overflow: "hidden",
          }}
        >
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "stretch" }}>
            <iframe
              width="100%"
              height="100%"
              src={LOOKER_IFRAME_SRC}
              frameBorder="0"
              style={{ border: 0, maxWidth: 1000, minHeight: 560 }}
              title="Looker Studio Report"
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        </section>

  <section aria-label="Resumen" style={{ display: "flex", gap: 16, marginTop: 20 }}>
          <div
            style={{
              flex: 1,
              background: "var(--color-surface)",
              borderRadius: 8,
              padding: 20,
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
            }}
          >
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Impacto Poblacional</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8, color: "var(--color-text-primary)" }}>120,000</div>
          </div>

          <div
            style={{
              flex: 1,
              background: "var(--color-surface)",
              borderRadius: 8,
              padding: 20,
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
            }}
          >
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Alertas Activas</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8, color: "var(--color-text-primary)" }}>5</div>
          </div>

          <div
            style={{
              flex: 1,
              background: "var(--color-surface)",
              borderRadius: 8,
              padding: 20,
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
            }}
          >
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Reportes Recientes</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8, color: "var(--color-text-primary)" }}>20</div>
          </div>
        </section>
      </main>
    </div>
  );
}
