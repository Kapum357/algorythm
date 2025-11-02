"use client";

import styles from "./page.module.css";

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
  // Example points (normalized) for the two charts
  const precip = [2, 10, 8, 3, 9, 2, 7, 3, 8, 2, 12, 3];
  const temp = [6, 9, 7, 3, 5, 6, 12, 10, 2, 0.5, 8, 6];

  return (
    <div className={styles.page}>
      {/* Simple top nav */}
      <header className={styles.topNav}>
        <div className={styles.brand}>
          <span aria-hidden>■</span>
          <span className="text-body1">Climate Resilience Tool</span>
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

      {/* Current Alerts */}
      <section className={styles.grid2}>
        <article className={styles.card} aria-labelledby="current-alerts">
          <div className={styles.cardHeader}>
            <h2 id="current-alerts" className="text-h6">Current Alerts</h2>
          </div>
          <div className={styles.cardBody}>
            <p className="text-h6">High Precipitation Alert</p>
            <p className="text-body2" style={{ marginTop: 4 }}>
              Moderate risk of flooding in low-lying areas. Take precautions.
            </p>
          </div>
        </article>
        <div>
          <img
            className={styles.photo}
            alt="Flooded street in a neighborhood"
            src="https://images.unsplash.com/photo-1601905394887-05e2e4fe89a1?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
      </section>

      {/* Predictive Analysis */}
      <section>
        <h2 className="text-h6">Predictive Analysis</h2>
        <div className={styles.tabs}>
          <div className={styles.pill} aria-current="page">Precipitation</div>
          <div className={styles.pill} role="button" tabIndex={0}>Temperature</div>
        </div>
        <div className={styles.ranges}>
          <div className={styles.range}>24 Hours</div>
          <div className={styles.range} aria-current="true">48 Hours</div>
          <div className={styles.range}>72 Hours</div>
        </div>

        {/* Precipitation card */}
        <div className={styles.forecastCard}>
          <div className="text-caption">Precipitation Forecast</div>
          <div className={styles.kpi}>
            <div className={styles.kpiValue}>15mm</div>
            <span className="text-caption">Next 48 Hours <span style={{ color: "var(--color-info)" }}>+10%</span></span>
          </div>
          <_LineChart points={precip} />
          <div className={styles.axis} aria-hidden>
            <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span><span>30h</span><span>36h</span>
          </div>
        </div>

        {/* Temperature card */}
        <div className={styles.forecastCard} style={{ marginTop: 16 }}>
          <div className="text-caption">Temperature Forecast</div>
          <div className={styles.kpi}>
            <div className={styles.kpiValue}>22°C</div>
            <span className="text-caption">Next 48 Hours <span style={{ color: "var(--color-info)" }}>+2°C</span></span>
          </div>
          <_LineChart points={temp} color="var(--color-primary)" />
          <div className={styles.axis} aria-hidden>
            <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span><span>30h</span><span>36h</span>
          </div>
        </div>
      </section>
    </div>
  );
}
