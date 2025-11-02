"use client";

import { useState } from "react";
import styles from "./page.module.css";
import InteractiveMap from "@/components/InteractiveMap";

export default function Home() {
  const [activeLayers, setActiveLayers] = useState({
    floodRisk: true,
    threats: true,
    capacities: true,
    communities: true
  });

  const [selectedCommunity, setSelectedCommunity] = useState("all");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");

  const toggleLayer = (layer) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const handleZoneClick = (zone) => {
    console.log("Zona seleccionada:", zone);
    // Aquí se puede integrar IA para análisis automático
  };

  return (
    <div className={styles.page}>
      {/* Content */}
      <main className={styles.content}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <section className={styles.section}>
            <h2 className="text-h5">Capas Geoespaciales</h2>
            <label className={styles.checkboxRow}>
              <input 
                type="checkbox" 
                checked={activeLayers.floodRisk}
                onChange={() => toggleLayer('floodRisk')}
              /> 
              🌊 Riesgo de inundación
            </label>
            <label className={styles.checkboxRow}>
              <input 
                type="checkbox" 
                checked={activeLayers.threats}
                onChange={() => toggleLayer('threats')}
              /> 
              ⚠️ Puntos de amenaza
            </label>
            <label className={styles.checkboxRow}>
              <input 
                type="checkbox" 
                checked={activeLayers.capacities}
                onChange={() => toggleLayer('capacities')}
              /> 
              🏛️ Capacidades locales
            </label>
            <label className={styles.checkboxRow}>
              <input 
                type="checkbox" 
                checked={activeLayers.communities}
                onChange={() => toggleLayer('communities')}
              /> 
              🏘️ Límites de barrios
            </label>
          </section>

          <section className={styles.section}>
            <h2 className="text-h5">Filtros</h2>
            <div className={styles.selectWrap}>
              <select 
                aria-label="Comunidad"
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
              >
                <option value="all">Todas las comunidades</option>
                <option value="el_danubio">El Danubio</option>
                <option value="la_maria">La María</option>
              </select>
            </div>
            <div className={styles.selectWrap}>
              <select 
                aria-label="Nivel de riesgo"
                value={selectedRiskLevel}
                onChange={(e) => setSelectedRiskLevel(e.target.value)}
              >
                <option value="all">Todos los niveles</option>
                <option value="high">🔴 Riesgo alto</option>
                <option value="medium">🟠 Riesgo medio</option>
                <option value="low">🟢 Riesgo bajo</option>
              </select>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className="text-h5">Leyenda</h2>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.legendColor} style={{background: '#d32f2f'}}></span>
                <span>Riesgo Alto</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendColor} style={{background: '#ff9800'}}></span>
                <span>Riesgo Medio</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendColor} style={{background: '#4caf50'}}></span>
                <span>Riesgo Bajo</span>
              </div>
            </div>
          </section>
        </aside>

        {/* Main area */}
        <section className={styles.main}>
          <div className={styles.mapCard}>
            <InteractiveMap 
              center={[4.5850, -74.2310]}
              zoom={14}
              height="600px"
              activeLayers={activeLayers}
              onZoneClick={handleZoneClick}
              enableAI={true}
            />
          </div>

          <div className={styles.infoCard}>
            <h3 className="text-h5">📍 Soacha - El Danubio y La María</h3>
            <p className="text-body2">
              Comunidades vulnerables con alto riesgo de inundaciones por desbordamiento 
              del Río Bogotá y la Quebrada Tibanica. Población total: ~4,840 habitantes.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <strong>62%</strong>
                <small>Sin protocolos de evacuación</small>
              </div>
              <div className={styles.stat}>
                <strong>81%</strong>
                <small>Sin ahorros para emergencias</small>
              </div>
              <div className={styles.stat}>
                <strong>71%</strong>
                <small>Incidencia de inundaciones</small>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
