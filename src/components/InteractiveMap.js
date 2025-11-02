"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './InteractiveMap.module.css';
import AIAnalysisPanel from './AIAnalysisPanel';

export default function InteractiveMap({ 
  center = [4.5850, -74.2310], 
  zoom = 14,
  height = '600px',
  onZoneClick,
  enableAI = false,
  activeLayers = {
    floodRisk: true,
    threats: true,
    capacities: true,
    communities: true
  }
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [geodata, setGeodata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const layersRef = useRef({});

  // Cargar datos geoespaciales
  useEffect(() => {
    fetch('/data/soacha.geojson')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setGeodata(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error cargando geodata:', err);
        setIsLoading(false);
      });
  }, []);

  // Inicializar mapa
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstance.current) return;

    // Cargar Leaflet dinámicamente (solo en cliente)
    const initMap = async () => {
      const L = (await import('leaflet')).default;
      
      // Fix para iconos de Leaflet
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current).setView(center, zoom);

      // Tile layer OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstance.current = map;
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [center, zoom]);

  // Agregar capas cuando los datos estén disponibles
  useEffect(() => {
    if (!mapInstance.current || !geodata || typeof window === 'undefined') return;

    const updateLayers = async () => {
      const L = (await import('leaflet')).default;
      const map = mapInstance.current;

      // Limpiar capas anteriores (capas y controles)
      Object.values(layersRef.current).forEach(layer => {
        const removeItem = (l) => {
          if (!l) return;
          try {
            // Intentar como capa
            map.removeLayer(l);
          } catch {
            // Si es un control u otro, intentar .remove()
            if (typeof l.remove === 'function') {
              l.remove();
            }
          }
        };

        if (Array.isArray(layer)) {
          layer.forEach(removeItem);
        } else {
          removeItem(layer);
        }
      });
      layersRef.current = {};

      // Soporte para GeoJSON estándar (FeatureCollection)
      if (geodata.type === 'FeatureCollection' && Array.isArray(geodata.features)) {
        if (activeLayers.floodRisk) {
          const riskColor = (nivel) => {
            const v = String(nivel || '').toLowerCase();
            if (v.includes('alta')) return '#d32f2f';
            if (v.includes('media')) return '#ff9800';
            return '#4caf50';
          };

          const gj = L.geoJSON(geodata, {
            style: (feature) => ({
              color: riskColor(feature?.properties?.Nivel_Riesgo),
              weight: 2,
              fillOpacity: 0.25,
            }),
            onEachFeature: (feature, layer) => {
              const barrio = feature?.properties?.Barrio || 'Zona';
              const nivel = feature?.properties?.Nivel_Riesgo || 'N/A';
              const area = feature?.properties?.area_m2;
              layer.bindPopup(`
                <div class="${styles.popup}">
                  <h3>🌊 ${barrio}</h3>
                  <p><strong>Nivel de riesgo:</strong> ${nivel}</p>
                  ${area ? `<p><strong>Área:</strong> ${Number(area).toLocaleString()} m²</p>` : ''}
                </div>
              `);
            }
          }).addTo(map);

          layersRef.current.floodRisk = gj;

          // Leyenda simple de niveles de riesgo
          const legend = L.control({ position: 'bottomright' });
          legend.onAdd = function() {
            const div = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
            div.style.background = 'white';
            div.style.padding = '8px 10px';
            div.style.borderRadius = '8px';
            div.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
            div.innerHTML = `
              <div style="font: 600 12px/1.2 var(--font-family); margin-bottom: 6px;">Riesgo de Inundación</div>
              <div style="display:flex; align-items:center; gap:6px; margin:4px 0;">
                <span style="display:inline-block; width:12px; height:12px; background:#d32f2f; border-radius:2px;"></span>
                <span style="font: 12px var(--font-family);">Alta</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px; margin:4px 0;">
                <span style="display:inline-block; width:12px; height:12px; background:#ff9800; border-radius:2px;"></span>
                <span style="font: 12px var(--font-family);">Media</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px; margin:4px 0;">
                <span style="display:inline-block; width:12px; height:12px; background:#4caf50; border-radius:2px;"></span>
                <span style="font: 12px var(--font-family);">Baja</span>
              </div>
            `;
            return div;
          };
          legend.addTo(map);
          layersRef.current.legend = legend;

          try {
            map.fitBounds(gj.getBounds(), { padding: [16, 16] });
          } catch {
            // Ignorar si no se puede ajustar a los límites
          }
        }

        // No continuar con el flujo de datos personalizado si es GeoJSON estándar
        return;
      }

      // Capa de comunidades (polígonos)
      if (activeLayers.communities && geodata.communities) {
        Object.values(geodata.communities).forEach(community => {
          const polygon = L.polygon(community.boundary, {
            color: '#C8102E',
            weight: 2,
            fillOpacity: 0.1
          }).addTo(map);

          polygon.bindPopup(`
            <div class="${styles.popup}">
              <h3>${community.name}</h3>
              <p><strong>Población:</strong> ${community.population.toLocaleString()} habitantes</p>
              <p><strong>Hogares:</strong> ${community.households.toLocaleString()}</p>
              <hr/>
              <p><small>📊 ${community.vulnerabilities.no_evacuation_knowledge}% sin protocolos evacuación</small></p>
              <p><small>💰 ${community.vulnerabilities.no_emergency_savings}% sin ahorros emergencia</small></p>
              <p><small>🌊 ${community.vulnerabilities.flood_incidence}% incidencia inundaciones</small></p>
            </div>
          `);

          if (!layersRef.current.communities) layersRef.current.communities = [];
          layersRef.current.communities.push(polygon);
        });
      }

      // Capa de zonas de riesgo de inundación
      if (activeLayers.floodRisk && geodata.flood_risk_zones) {
        geodata.flood_risk_zones.forEach(zone => {
          const color = zone.level === 'high' ? '#d32f2f' :
                       zone.level === 'medium' ? '#ff9800' : '#4caf50';
          
          const polygon = L.polygon(zone.coordinates, {
            color: color,
            weight: 2,
            fillOpacity: 0.3
          }).addTo(map);

          const popupContent = `
            <div class="${styles.popup}">
              <h3>🌊 ${zone.name}</h3>
              <p><strong>Nivel:</strong> ${zone.level === 'high' ? '🔴 Alto' : 
                                          zone.level === 'medium' ? '🟠 Medio' : '🟢 Bajo'}</p>
              <p>${zone.description}</p>
              ${enableAI ? '<button class="ai-analyze-btn" data-zone-id="' + zone.id + '">🤖 Analizar con IA</button>' : ''}
            </div>
          `;
          
          polygon.bindPopup(popupContent);

          polygon.on('click', () => {
            if (onZoneClick) onZoneClick(zone);
          });

          // Agregar listener para el botón de IA
          if (enableAI) {
            polygon.on('popupopen', () => {
              const btn = document.querySelector('.ai-analyze-btn');
              if (btn) {
                btn.onclick = (e) => {
                  e.stopPropagation();
                  // Encontrar comunidad asociada si existe
                  let community = null;
                  if (geodata.communities) {
                    Object.values(geodata.communities).forEach(comm => {
                      // Verificar si la zona está dentro o cerca de la comunidad
                      community = comm;
                    });
                  }
                  setSelectedZone(zone);
                  setSelectedCommunity(community);
                  setShowAIPanel(true);
                  map.closePopup();
                };
              }
            });
          }

          if (!layersRef.current.floodRisk) layersRef.current.floodRisk = [];
          layersRef.current.floodRisk.push(polygon);
        });
      }

      // Capa de amenazas
      if (activeLayers.threats && geodata.threat_points) {
        geodata.threat_points.forEach(threat => {
          const icon = L.divIcon({
            className: styles.markerIcon,
            html: `<div class="${styles.threatMarker}" data-severity="${threat.severity}">⚠️</div>`,
            iconSize: [30, 30]
          });

          const marker = L.marker(threat.coordinates, { icon }).addTo(map);

          marker.bindPopup(`
            <div class="${styles.popup}">
              <h3>⚠️ ${threat.name}</h3>
              <p><strong>Tipo:</strong> ${getThreatTypeLabel(threat.type)}</p>
              <p><strong>Severidad:</strong> ${threat.severity === 'critical' ? '🔴 Crítico' :
                                               threat.severity === 'high' ? '🟠 Alto' : '🟡 Medio'}</p>
              <p>${threat.description}</p>
            </div>
          `);

          if (!layersRef.current.threats) layersRef.current.threats = [];
          layersRef.current.threats.push(marker);
        });
      }

      // Capa de capacidades locales
      if (activeLayers.capacities && geodata.capacity_points) {
        geodata.capacity_points.forEach(capacity => {
          const icon = L.divIcon({
            className: styles.markerIcon,
            html: `<div class="${styles.capacityMarker}">${getCapacityIcon(capacity.type)}</div>`,
            iconSize: [30, 30]
          });

          const marker = L.marker(capacity.coordinates, { icon }).addTo(map);

          marker.bindPopup(`
            <div class="${styles.popup}">
              <h3>${getCapacityIcon(capacity.type)} ${capacity.name}</h3>
              <p><strong>Tipo:</strong> ${getCapacityTypeLabel(capacity.type)}</p>
              ${capacity.capacity ? `<p><strong>Capacidad:</strong> ${capacity.capacity} personas</p>` : ''}
              <p>${capacity.description}</p>
            </div>
          `);

          if (!layersRef.current.capacities) layersRef.current.capacities = [];
          layersRef.current.capacities.push(marker);
        });
      }

      // Infraestructura crítica (ríos)
      geodata.critical_infrastructure && geodata.critical_infrastructure.forEach(infra => {
        if (infra.type === 'water' && infra.path) {
          const polyline = L.polyline(infra.path, {
            color: '#1976d2',
            weight: 3,
            opacity: 0.7
          }).addTo(map);

          polyline.bindPopup(`
            <div class="${styles.popup}">
              <h3>💧 ${infra.name}</h3>
              <p>${infra.description}</p>
            </div>
          `);

          if (!layersRef.current.infrastructure) layersRef.current.infrastructure = [];
          layersRef.current.infrastructure.push(polyline);
        }
      });
    };

    updateLayers();
  }, [geodata, activeLayers, onZoneClick]);

  if (isLoading) {
    return (
      <div className={styles.loading} style={{ height }}>
        <p>Cargando mapa interactivo...</p>
      </div>
    );
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div 
        ref={mapRef} 
        className={styles.map}
        style={{ height, width: '100%' }}
      />
      
      {showAIPanel && selectedZone && (
        <AIAnalysisPanel 
          zone={selectedZone}
          community={selectedCommunity}
          onClose={() => {
            setShowAIPanel(false);
            setSelectedZone(null);
            setSelectedCommunity(null);
          }}
        />
      )}
    </>
  );
}

// Helpers
function getThreatTypeLabel(type) {
  const labels = {
    insecurity: 'Inseguridad',
    sewage: 'Alcantarillado',
    waste: 'Residuos Sólidos',
    contamination: 'Contaminación'
  };
  return labels[type] || type;
}

function getCapacityTypeLabel(type) {
  const labels = {
    community_center: 'Salón Comunal',
    sports: 'Instalación Deportiva',
    pharmacy: 'Droguería',
    health: 'Centro de Salud'
  };
  return labels[type] || type;
}

function getCapacityIcon(type) {
  const icons = {
    community_center: '🏛️',
    sports: '⚽',
    pharmacy: '💊',
    health: '🏥'
  };
  return icons[type] || '📍';
}
