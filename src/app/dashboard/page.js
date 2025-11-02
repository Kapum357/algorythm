"use client";

import styles from "./page.module.css";
import InteractiveMap from "@/components/InteractiveMap";

export default function DashboardPrincipal() {
  return (
    <div className={styles.layout}>
      {/* Sidebar nav */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <strong>Cruz Roja Colombiana</strong>
          <small>Soacha</small>
        </div>
        <nav className={styles.menu} aria-label="Secciones">
          <a href="/dashboard">🏠 Inicio</a>
          <a href="/alerts">🔔 Alertas</a>
          <a href="#">🗂️ Reportes</a>
          <a href="/impact">📊 Análisis</a>
          <a href="#">👥 Comunidades</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <header>
          <h1 className="text-h3">Resiliencia Climática Urbana</h1>
        </header>

        <section className={styles.mapCard}>
          <InteractiveMap 
            center={[4.5850, -74.2310]}
            zoom={14}
            height="500px"
            activeLayers={{
              floodRisk: true,
              threats: true,
              capacities: true,
              communities: true
            }}
          />
        </section>

        <section aria-labelledby="resumen">
          <h2 id="resumen" className="text-h5" style={{ marginBottom: 8 }}>
            Resumen
          </h2>
          <div className={styles.stats}>
            <article className={styles.statCard}>
              <div className="text-caption">Impacto Poblacional</div>
              <div className={styles.statValue}>120,000</div>
            </article>
            <article className={styles.statCard}>
              <div className="text-caption">Alertas Activas</div>
              <div className={styles.statValue}>5</div>
            </article>
            <article className={styles.statCard}>
              <div className="text-caption">Reportes Recientes</div>
              <div className={styles.statValue}>20</div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
