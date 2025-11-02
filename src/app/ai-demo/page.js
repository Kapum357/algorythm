/**
 * AI Demo Page - Ollama Integration Demo for DIR-Soacha
 * Demonstrates AI-powered climate resilience analysis
 */

"use client";

import { useState } from 'react';
import OllamaStatus from '@/components/OllamaStatus';
import styles from './page.module.css';

export default function AIDemoPage() {
  const [activeDemo, setActiveDemo] = useState('vulnerability');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState('');
  const [structured, setStructured] = useState(null);

  // Demo 1: Vulnerability Analysis
  const runVulnerabilityAnalysis = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ollama/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noEvacuationProtocol: 62,
          noEmergencySavings: 81,
          foodInsecurity: 27,
          leadershipTrust: 50,
          threats: [
            'Inundaciones por alcantarillado insuficiente',
            'Inseguridad por consumo de SPA',
            'Contaminación por residuos sólidos'
          ]
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Demo 2: Flood Risk Assessment
  const runFloodRiskAssessment = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ollama/flood-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'El Danubio',
          coordinates: '4.5755° N, 74.2167° W',
          waterBodies: ['Río Bogotá', 'Quebrada Tibanica'],
          sewerageType: 'Artesanal',
          soilImpermeability: 'Alto',
          population: 3640,
          season: 'Marzo'
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Demo 3: Emergency Response
  const runEmergencyResponse = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ollama/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Inundación',
          location: 'Barrio La María',
          severity: 'Alta',
          affectedPopulation: 500,
          availableResources: ['Salón comunal', 'Droguería', 'Cancha deportiva'],
          localCapacities: ['Comité de emergencia (10 personas)', 'Voluntarios Cruz Roja (6 personas)']
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Demo 4: Structured JSON Output
  const runStructured = async () => {
    setLoading(true);
    setResult(null);
    setStreamText('');
    setStructured(null);

    try {
      const response = await fetch('/api/ollama/structured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: 'El Danubio',
          threats: ['Inundaciones', 'Contaminación', 'Obstrucción de alcantarillas'],
          indicators: { noEvac: 62, noSavings: 81, foodInsec: 27 }
        })
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Fallo al generar JSON estructurado');
      setStructured(data.result);
      setResult({ timestamp: data.timestamp });
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Demo 5: Web Search + AI Research
  const runWebSearchResearch = async () => {
    setLoading(true);
    setResult(null);
    setStreamText('');
    setStructured(null);

    try {
      const response = await fetch('/api/ollama/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: 'Soacha',
          topic: 'estrategias de adaptación climática y gestión de inundaciones urbanas',
          localContext: 'Comunidades El Danubio y La María con alcantarillado artesanal, alta impermeabilización del suelo, 71% de incidencia de inundaciones'
        })
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Fallo en la investigación web');
      setResult({ 
        synthesis: data.synthesis,
        sources: data.sources,
        timestamp: data.timestamp 
      });
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const demos = {
    vulnerability: {
      title: '🔍 Análisis de Vulnerabilidades',
      description: 'Analiza datos CRMC/AVCA y genera insights accionables',
      action: runVulnerabilityAnalysis,
      data: {
        'Sin protocolos de evacuación': '62%',
        'Sin ahorros de emergencia': '81%',
        'Inseguridad alimentaria': '27%',
        'Confianza en líderes': '50%'
      }
    },
    floodRisk: {
      title: '🌊 Evaluación de Riesgo de Inundación',
      description: 'Evalúa el riesgo para una ubicación específica',
      action: runFloodRiskAssessment,
      data: {
        'Ubicación': 'El Danubio',
        'Población': '3,640 habitantes',
        'Tipo de alcantarillado': 'Artesanal',
        'Impermeabilización': 'Alta'
      }
    },
    emergency: {
      title: '🚨 Recomendaciones de Emergencia',
      description: 'Genera plan de acción para incidentes',
      action: runEmergencyResponse,
      data: {
        'Tipo': 'Inundación',
        'Ubicación': 'La María',
        'Severidad': 'Alta',
        'Afectados': '~500 personas'
      }
    },
    structured: {
      title: '🧩 Salida estructurada JSON',
      description: 'Obten un resumen de riesgo con esquema JSON validado',
      action: runStructured,
      data: {
        'Esquema': 'location, riskLevel, keyFactors[], recommendations[]',
        'Temperatura': '0 (determinístico)'
      }
    },
    webSearch: {
      title: '🌐 Búsqueda Web + IA',
      description: 'Investiga con datos actualizados de internet',
      action: runWebSearchResearch,
      data: {
        'Tema': 'Adaptación climática y gestión de inundaciones',
        'Contexto': 'Soacha: alcantarillado artesanal, 71% inundaciones',
        'Fuentes': 'Búsqueda web en tiempo real'
      }
    }
  };

  const currentDemo = demos[activeDemo];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>🤖 DIR-Soacha AI Demo</h1>
        <p className={styles.subtitle}>
          Demostración de capacidades de IA con Ollama Cloud para análisis de resiliencia climática
        </p>
        <OllamaStatus />
      </header>

      <main className={styles.main}>
        {/* Demo Selector */}
        <nav className={styles.demoSelector}>
          {Object.keys(demos).map((key) => (
            <button
              key={key}
              className={`${styles.demoButton} ${activeDemo === key ? styles.active : ''}`}
              onClick={() => {
                setActiveDemo(key);
                setResult(null);
              }}
            >
              {demos[key].title}
            </button>
          ))}
        </nav>

        {/* Demo Content */}
        <section className={styles.demoContent}>
          <div className={styles.demoInfo}>
            <h2>{currentDemo.title}</h2>
            <p className={styles.description}>{currentDemo.description}</p>

            {/* Input Data Preview */}
            <div className={styles.inputData}>
              <h3>📊 Datos de Entrada</h3>
              <dl className={styles.dataList}>
                {Object.entries(currentDemo.data).map(([key, value]) => (
                  <div key={key} className={styles.dataItem}>
                    <dt>{key}:</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Run Button */}
            <button
              className={styles.runButton}
              onClick={currentDemo.action}
              disabled={loading}
            >
              {loading ? '⏳ Analizando con IA...' : '▶️ Ejecutar Análisis'}
            </button>
          </div>

          {/* Results */}
          {(result || streamText || structured) && (
            <div className={styles.results}>
              {result?.error ? (
                <div className={styles.error}>
                  <h3>❌ Error</h3>
                  <p>{result?.error}</p>
                  <small>
                    Asegúrate de que OLLAMA_API_KEY esté configurada en .env.local
                  </small>
                </div>
              ) : (
                <div className={styles.success}>
                  <h3>✅ Resultados del Análisis</h3>
                  
                  {result?.analysis && (
                    <div className={styles.resultContent}>
                      <h4>Análisis de Vulnerabilidades</h4>
                      <div className={styles.aiResponse}>{result.analysis}</div>
                    </div>
                  )}
                  
                  {result?.assessment && (
                    <div className={styles.resultContent}>
                      <h4>Evaluación de Riesgo - {result.location}</h4>
                      <div className={styles.aiResponse}>{result.assessment}</div>
                    </div>
                  )}
                  
                  {result?.recommendations && (
                    <div className={styles.resultContent}>
                      <h4>Plan de Acción - {result.incident?.type} en {result.incident?.location}</h4>
                      <div className={styles.aiResponse}>{result.recommendations}</div>
                    </div>
                  )}

                  {/* Streaming Report Output */}
                  {(activeDemo === 'report') && (
                    <div className={styles.resultContent}>
                      <h4>Reporte Comunitario</h4>
                      <div className={styles.aiResponse}>
                        {streamText || result?.report}
                      </div>
                    </div>
                  )}

                  {/* Structured JSON Output */}
                  {(activeDemo === 'structured') && structured && (
                    <div className={styles.resultContent}>
                      <h4>JSON Estructurado</h4>
                      <pre className={styles.aiResponse} style={{ whiteSpace: 'pre-wrap' }}>
                        {JSON.stringify(structured, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* Web Search Research Output */}
                  {(activeDemo === 'webSearch') && result?.synthesis && (
                    <div className={styles.resultContent}>
                      <h4>🌐 Investigación Aumentada con Web Search</h4>
                      <div className={styles.aiResponse}>{result.synthesis}</div>
                      {result.sources && result.sources.length > 0 && (
                        <div style={{ marginTop: '1rem', borderTop: '1px solid #e0e0e0', paddingTop: '1rem' }}>
                          <h5 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>📚 Fuentes consultadas:</h5>
                          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem' }}>
                            {result.sources.map((source, idx) => (
                              <li key={idx} style={{ marginBottom: '0.5rem' }}>
                                <a 
                                  href={source.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  style={{ color: '#0066cc', textDecoration: 'none' }}
                                >
                                  [{idx + 1}] {source.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div className={styles.metadata}>
                    {result?.timestamp && (
                      <small>🕒 {new Date(result.timestamp).toLocaleString('es-CO')}</small>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
