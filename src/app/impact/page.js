"use client";

import styles from "./page.module.css";

const neighborhoods = [
  { name: "Neighborhood A", total: 3500, children: 900, seniors: 500 },
  { name: "Neighborhood B", total: 2800, children: 750, seniors: 400 },
  { name: "Neighborhood C", total: 2500, children: 600, seniors: 350 },
  { name: "Neighborhood D", total: 2000, children: 500, seniors: 300 },
  { name: "Neighborhood E", total: 1700, children: 450, seniors: 250 },
];

export default function ImpactDashboard() {
  const total = 12500;
  const children = 3200;
  const seniors = 1800;

  // simple sparkline heights scaled from mock values
  const events = [9000, 10000, 11300, 12500];
  const max = Math.max(...events);

  return (
    <main className={styles.container}>
      {/* Sidebar with map and areas */}
      <aside className={styles.sidebar}>
        <div className={styles.mapThumb}>
          <iframe
            title="Soacha overview map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.35%2C4.48%2C-74.16%2C4.65&layer=mapnik&marker=4.585%2C-74.231"
          />
        </div>
        <h3 className="text-h6" style={{ marginTop: 12 }}>Risk Areas</h3>
        <div className={styles.riskList}>
          <div className={styles.riskItem}>Area 1: Flood Zone</div>
          <div className={styles.riskItem}>Area 2: Landslide Risk</div>
          <div className={styles.riskItem}>Area 3: Drought Prone</div>
        </div>
      </aside>

      <section className={styles.main}>
        {/* Title */}
        <header className={styles.titleWrap}>
          <div className={styles.titleRow}>
            <h1 className="text-h3">Climate Impact Analysis in Soacha</h1>
          </div>
          <p className={`text-body2 ${styles.subtitle}`}>
            Detailed analysis of climate resilience in Soacha, Colombia, focusing on population
            impact and historical event comparison.
          </p>
        </header>

        {/* Top stats */}
        <div className={styles.statsGrid}>
          <article className={styles.statCard}>
            <div className="text-caption">Total Population Affected</div>
            <div className={styles.statValue}>{total.toLocaleString()}</div>
          </article>
          <article className={styles.statCard}>
            <div className="text-caption">Children (0-14)</div>
            <div className={styles.statValue}>{children.toLocaleString()}</div>
          </article>
          <article className={styles.statCard}>
            <div className="text-caption">Seniors (65+)</div>
            <div className={styles.statValue}>{seniors.toLocaleString()}</div>
          </article>
        </div>

        {/* Table by neighborhood */}
        <section className={styles.sectionCard} aria-labelledby="by-neighborhood">
          <div className={styles.sectionHeader}>
            <h2 id="by-neighborhood" className="text-h5">
              Impact by Neighborhood
            </h2>
          </div>
          <div className={styles.sectionBody}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Neighborhood</th>
                  <th>Total Affected</th>
                  <th>Children (0-14)</th>
                  <th>Seniors (65+)</th>
                </tr>
              </thead>
              <tbody>
                {neighborhoods.map((n) => (
                  <tr key={n.name}>
                    <td>
                      <a href="#" aria-label={`Open details for ${n.name}`}>
                        {n.name}
                      </a>
                    </td>
                    <td>{n.total.toLocaleString()}</td>
                    <td>{n.children.toLocaleString()}</td>
                    <td>{n.seniors.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Comparison */}
        <section className={styles.sectionCard} aria-labelledby="historical-compare">
          <div className={styles.sectionHeader}>
            <h2 id="historical-compare" className="text-h5">
              Historical Event Comparison
            </h2>
          </div>
          <div className={`${styles.sectionBody} ${styles.compareWrap}`}>
            <input
              className={styles.chipInput}
              placeholder="Search or filter historical events"
              aria-label="Search historical events"
            />

            <div className={styles.kpiCard}>
              <div>
                <div className="text-caption">Population Impact Comparison</div>
                <div className={styles.kpiValue}>
                  {total.toLocaleString()}
                  <span className={styles.trend}>
                    2023 <span style={{ color: "var(--color-success, var(--color-info))" }}>+10%</span>
                  </span>
                </div>
              </div>
              <div>
                <div className={styles.sparkline} role="img" aria-label="Bar chart of events">
                  {events.map((v, i) => {
                    const h = Math.max(8, Math.round((v / max) * 56));
                    const isLast = i === events.length - 1;
                    return (
                      <span
                        key={i}
                        className={`${styles.bar} ${isLast ? "" : styles.dim}`}
                        style={{ height: h }}
                      />
                    );
                  })}
                </div>
                <div className={styles.footerTicks} aria-hidden>
                  <span>Event 1</span>
                  <span>Event 2</span>
                  <span>Event 3</span>
                  <span>2023</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
