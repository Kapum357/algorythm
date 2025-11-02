"use client";

import styles from "./page.module.css";

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
          <iframe
            className={styles.map}
            title="Mapa de Soacha"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.745019894008!2d-74.231!3d4.585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9ed3d8e5c7d1%3A0x9d63e8cb2e0b9b0a!2sSoacha%2C%20Cundinamarca!5e0!3m2!1ses!2sCO!4v1699999999999"
            allowFullScreen
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
