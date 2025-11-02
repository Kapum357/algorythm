"use client";

import { useState } from "react";
import styles from "./page.module.css";

const recent = [
  { id: 12345, title: "Reporte #12345", type: "Alcantarilla obstruida", ago: "Hace 2 horas" },
  { id: 12346, title: "Reporte #12346", type: "Acumulación de residuos", ago: "Hace 4 horas" },
  { id: 12347, title: "Reporte #12347", type: "Alcantarilla obstruida", ago: "Hace 6 horas" },
  { id: 12348, title: "Reporte #12348", type: "Acumulación de residuos", ago: "Hace 8 horas" },
];

export default function CommunityReports() {
  const [form, setForm] = useState({ tipo: "", descripcion: "", estado: "", foto: null });
  const [status, setStatus] = useState("");

  function onChange(e) {
    const { name, value, files } = e.target;
    setForm((f) => ({ ...f, [name]: files ? files[0] : value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    // Minimal client-side validation
    if (!form.tipo || !form.descripcion || !form.estado) {
      setStatus("Por favor completa los campos obligatorios.");
      return;
    }
    setStatus("Reporte enviado (demo). ¡Gracias por contribuir!");
  }

  return (
    <div className={styles.layout}>
      {/* Sidebar: recent reports and filters */}
      <aside className={styles.sidebar}>
        <h2 className="text-h6">Reportes Recientes</h2>
        <input className={styles.filterInput} placeholder="Filtrar" aria-label="Filtrar" />
        <input className={styles.filterInput} placeholder="Filtrar" aria-label="Filtrar" />
        <input className={styles.filterInput} placeholder="Filtrar" aria-label="Filtrar" />

        {recent.map((r) => (
          <div key={r.id} className={styles.reportItem}>
            <div className={styles.reportTitle}>{r.title}</div>
            <div className={styles.reportType}>{r.type}</div>
            <div className={styles.reportTime}>{r.ago}</div>
          </div>
        ))}
      </aside>

      {/* Main: map + form */}
      <main className={styles.main}>
        <h1 className={`text-h4 ${styles.title}`}>Módulo de Reporte y Monitoreo Comunitario</h1>

        <section className={styles.mapCard}>
          <iframe
            className={styles.map}
            title="Mapa de Soacha para reportes"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.745019894008!2d-74.231!3d4.585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9ed3d8e5c7d1%3A0x9d63e8cb2e0b9b0a!2sSoacha%2C%20Cundinamarca!5e0!3m2!1ses!2sCO!4v1699999999999"
            allowFullScreen
          />
        </section>

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.field}>
            <label htmlFor="tipo" className="text-body2">Tipo de incidente</label>
            <select id="tipo" name="tipo" value={form.tipo} onChange={onChange} className={styles.select}>
              <option value="">Seleccionar</option>
              <option>Alcantarilla obstruida</option>
              <option>Acumulación de residuos</option>
              <option>Inundación</option>
              <option>Árbol caído</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="descripcion" className="text-body2">Descripción</label>
            <textarea id="descripcion" name="descripcion" value={form.descripcion} onChange={onChange} className={styles.textarea} placeholder="Describe el incidente..." />
          </div>

          <div className={styles.field}>
            <label className="text-body2">Añadir fotografía</label>
            <div className={styles.dropzone}>
              <input id="foto" name="foto" type="file" accept="image/*" onChange={onChange} style={{ display: "none" }} />
              <label htmlFor="foto" style={{ cursor: "pointer" }}>
                Haz clic para añadir una imagen
              </label>
              {form.foto ? (
                <div className="text-caption" style={{ marginTop: 8 }}>Seleccionado: {form.foto.name}</div>
              ) : null}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="estado" className="text-body2">Estado</label>
            <select id="estado" name="estado" value={form.estado} onChange={onChange} className={styles.select}>
              <option value="">Seleccionar</option>
              <option>Reportado</option>
              <option>En proceso</option>
              <option>Resuelto</option>
            </select>
          </div>

          {status && <div className="text-body2" role="status">{status}</div>}

          <div className={styles.actions}>
            <button className={styles.button} type="submit">Enviar Reporte</button>
          </div>
        </form>
      </main>
    </div>
  );
}
