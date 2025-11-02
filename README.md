**RETO: CRUZ ROJA – ANÁLISIS Y VISUALIZACIÓN GEOESPACIAL PARA LA RESILIENCIA CLIMÁTICA URBANA EN SOACHA**
=========================================================================================================

Contexto:El municipio de Soacha enfrenta desafíos significativos asociados al cambio climático y a la urbanización acelerada. Las comunidades de El Danubio y La María, en particular, son altamente vulnerables a inundaciones y altas temperaturas, agravadas por la deficiencia de infraestructura y la falta de acceso a información actualizada sobre el riesgo. La Cruz Roja Colombiana, junto con la Z Zurich Foundation y la Universidad de La Sabana, lidera el Proyecto de Resiliencia Climática Urbana (RCU), con el propósito de fortalecer la capacidad de las comunidades para anticipar, responder y recuperarse ante eventos climáticos extremos.Durante el proyecto, se han recolectado datos valiosos a través de metodologías como el Análisis de Vulnerabilidades y Capacidades Ampliado (AVCA) y la Medición de Resiliencia Climática Comunitaria (CRMC). Sin embargo, estos datos se encuentran dispersos y no permiten una visualización clara del impacto o una planificación preventiva efectiva. Este reto busca transformar dichos datos en una herramienta interactiva y analítica basada en mapas de acceso libre y tecnologías geoespaciales.

**Definición del reto:**
------------------------

El desafío consiste en desarrollar un prototipo funcional (web, dashboard o aplicación) que integre datos georreferenciados y visualizaciones interactivas para analizar, monitorear y comunicar información sobre la resiliencia climática urbana en Soacha. La solución debe permitir identificar las zonas de mayor vulnerabilidad, estimar la cantidad de personas afectadas por una emergencia y generar alertas preventivas basadas en datos ambientales o históricos.Líneas de desarrollo posibles:1. Mapa interactivo con capas georreferenciadas que muestre zonas de riesgo, puntos críticos y rutas seguras.2. Dashboard de impacto poblacional: herramienta que calcule cuántas personas o familias fueron afectadas por cada evento y en qué sectores.3. Sistema de predicción o alerta preventiva mediante IA o análisis estadístico de datos climáticos (precipitación, temperatura, humedad).4. Plataforma de reporte ciudadano o panel de control que permita visualizar actualizaciones de campo, fotografías o registros.

**Condiciones que debe cumplir la solución:**
---------------------------------------------

1\. Georreferenciación:   - Integrar mapas de acceso libre (OpenStreetMap, Leaflet, Google Maps, Mapbox, etc.) para representar información territorial.2. Datos abiertos:   - Usar datos disponibles del proyecto RCU (AVCA y CRMC) o fuentes públicas (IDEAM, OpenWeather, datos demográficos).3. Visualización e impacto:   - Permitir filtrar, visualizar y comparar información por zonas, periodos o tipo de evento.4. Inteligencia Artificial o analítica predictiva:   - Aplicar algoritmos simples para generar alertas tempranas o detectar patrones de riesgo.5. Usabilidad:   - Interfaz intuitiva para voluntarios, líderes comunitarios o instituciones sin conocimientos técnicos.6. Escalabilidad:   - Capacidad de extender el sistema a otras comunidades o municipios.

**Entregable esperado:**
------------------------

\- Prototipo funcional o demo navegable (mapa interactivo, dashboard, app o sistema web).- Pitch de 5.- Descripción técnica del modelo de datos, herramientas utilizadas y posibles integraciones con sistemas institucionales.

---

## 🤖 Integración de IA con Ollama Cloud

Este proyecto ahora incluye **capacidades de Inteligencia Artificial** mediante **Ollama Cloud** para potenciar el análisis de resiliencia climática:

### ✨ Nuevas Funcionalidades AI

- **🔍 Análisis Automático de Vulnerabilidades** - Procesa datos CRMC/AVCA y genera insights accionables
- **🌊 Evaluación Inteligente de Riesgo de Inundación** - Análisis contextual por ubicación
- **🚨 Generación de Planes de Emergencia** - Recomendaciones personalizadas para incidentes
- **📊 Predicción de Patrones de Riesgo** - Identifica períodos críticos basándose en datos históricos

### 🚀 Inicio Rápido con IA

1. **Configura tu API Key de Ollama**:

   ```bash
   # Crea .env.local y agrega:
   OLLAMA_API_KEY=tu_api_key_aqui
   ```

   Obtén tu API key en: [ollama.com/settings/keys](https://ollama.com/settings/keys)

2. **Ejecuta el proyecto**:

   ```bash
   npm install
   npm run dev
   ```

3. **Prueba la demo interactiva**:
   - Visita: [http://localhost:3000/ai-demo](http://localhost:3000/ai-demo)
   - Prueba los 3 casos de uso principales de IA

### 📚 Documentación Completa

- **[README de Ollama](./README_OLLAMA.md)** - Visión general y características
- **[Guía de Configuración](./docs/OLLAMA_SETUP.md)** - Setup paso a paso
- **[Ejemplos de Código](./docs/OLLAMA_EXAMPLES.md)** - Casos de uso prácticos
- **[Quick Start](./docs/QUICKSTART.md)** - Inicio rápido en 5 minutos

### 🛠️ Stack Tecnológico AI

- **Ollama Cloud**: Modelos gpt-oss:120b-cloud y glm-4.6:cloud
- **Next.js 16 API Routes**: Endpoints RESTful para servicios de IA
- **React 19**: Interfaz interactiva y componentes reutilizables
- **OpenStreetMap + Leaflet**: Visualización geoespacial

### 🎯 Impacto

La integración de IA transforma DIR-Soacha de una herramienta de visualización a una **plataforma inteligente de gestión de resiliencia** que:

✅ Reduce el tiempo de análisis de vulnerabilidades de horas a minutos  
✅ Genera recomendaciones contextualizadas basadas en datos locales  
✅ Permite anticipar riesgos en lugar de solo reaccionar a emergencias  
✅ Empodera a líderes comunitarios con insights accionables

---

## 📞 Soporte

Para preguntas sobre la integración de IA: consulta la [documentación](./docs/) o abre un issue en GitHub.
