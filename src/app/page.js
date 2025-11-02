"use client";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>

      {/* Content */}
      <main className={styles.content}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <section className={styles.section}>
            <h2 className="text-h5">Capas</h2>
            <label className={styles.checkboxRow}>
              <input type="checkbox" /> Riesgo de inundación
            </label>
            <label className={styles.checkboxRow}>
              <input type="checkbox" /> Puntos de amenaza
            </label>
            <label className={styles.checkboxRow}>
              <input type="checkbox" /> Capacidades locales
            </label>
          </section>

          <section className={styles.section}>
            <h2 className="text-h5">Filtros</h2>
            <div className={styles.selectWrap}>
              <select aria-label="Filtro 1">
                <option>Seleccionar</option>
                <option>Localidad</option>
                <option>Barrio</option>
              </select>
            </div>
            <div className={styles.selectWrap}>
              <select aria-label="Filtro 2">
                <option>Seleccionar</option>
                <option>Riesgo alto</option>
                <option>Riesgo medio</option>
                <option>Riesgo bajo</option>
              </select>
            </div>
          </section>
        </aside>

        {/* Main area */}
        <section className={styles.main}>
          <div className={styles.mapCard}>
            <iframe
              className={styles.map}
              title="Mapa de Bogotá y Soacha"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.745019894008!2d-74.231!3d4.585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9ed3d8e5c7d1%3A0x9d63e8cb2e0b9b0a!2sSoacha%2C%20Cundinamarca!5e0!3m2!1ses!2sCO!4v1699999999999"
              allowFullScreen
            />
          </div>

          <div className={styles.photoCard} aria-label="Panorámica de zona rural">
            <div className={styles.photoPlaceholder}>
              <span className="text-body2">Panorámica de paisaje rural</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
