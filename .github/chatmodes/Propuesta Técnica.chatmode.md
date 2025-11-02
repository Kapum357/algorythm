---
description: 'Plataforma Geoespacial para la Resiliencia Climática Urbana en Soacha'
tools: []
---

1. Introducción y Planteamiento Estratégico de la Solución

Análisis del Mandato: La urbanización acelerada y los efectos adversos del cambio climático han exacerbado las vulnerabilidades en el municipio de Soacha, creando un escenario de riesgo crítico para comunidades como El Danubio y La María. El desafío presentado por la Cruz Roja consiste en abordar esta problemática mediante la transformación de la valiosa información cualitativa y cuantitativa, recolectada a través del proyecto de Resiliencia Climática Urbana (RCU) y las metodologías AVCA y CRMC, en una herramienta de inteligencia geoespacial. El objetivo estratégico es convertir estos datos en un activo dinámico que facilite la toma de decisiones preventivas, la planificación de la resiliencia a nivel comunitario e institucional y el fortalecimiento de las capacidades locales para anticipar y responder a los crecientes riesgos climáticos, especialmente las inundaciones.

Visión General de la Solución: La solución propuesta es el desarrollo de un prototipo funcional de un panel de control interactivo (dashboard). Su propósito fundamental es centralizar, visualizar y analizar de manera intuitiva toda la información georreferenciada sobre amenazas, vulnerabilidades y capacidades de las comunidades. Esta herramienta está diseñada para empoderar a líderes comunitarios, voluntarios de la Cruz Roja y entidades institucionales, proporcionándoles una visión clara y accionable del territorio que les permita fortalecer su capacidad de anticipación y respuesta, optimizar la asignación de recursos y diseñar intervenciones de impacto para construir una resiliencia sostenible desde la base.

Este documento detalla la justificación y el diseño de la solución, comenzando por un análisis profundo del contexto de vulnerabilidad que la fundamenta.

2. Análisis del Contexto y Diagnóstico de Vulnerabilidades

Una solución tecnológica efectiva debe estar profundamente arraigada en la comprensión de las realidades locales y las necesidades sentidas de la comunidad. Por ello, esta sección analiza los hallazgos clave del "Diagnóstico Comunitario AVCA – CRMC" para fundamentar cada componente del diseño de la herramienta propuesta, asegurando que responda directamente a las vulnerabilidades identificadas.

2.1. El Desafío Climático y Social en Soacha

El municipio de Soacha enfrenta una combinación de desafíos que lo hacen particularmente susceptible a los impactos del cambio climático. Con una alta incidencia de inundaciones que alcanza el 71.07%, la presencia de cuerpos hídricos como el Río Bogotá y la Quebrada Tibanica, y los efectos agravados por fenómenos como La Niña, el riesgo hidrometeorológico es una amenaza constante. Este contexto geográfico y climático, sumado a una rápida y a menudo desordenada expansión urbana, crea un escenario complejo que requiere un análisis detallado a nivel de barrio.

2.2. Perfiles de Vulnerabilidad: Comunidades El Danubio y La María

El diagnóstico participativo revela un panorama multidimensional de vulnerabilidades que afectan de manera diferenciada a las comunidades de El Danubio y La María. La siguiente tabla sintetiza los hallazgos más críticos:

Comunidad El Danubio	Comunidad La María
Población Aproximada: ~3,640 habitantes.	Población Aproximada: ~1,200 habitantes en 470 viviendas.
Amenazas Principales Percibidas: Inundaciones por alcantarillado artesanal insuficiente y colapsado, inseguridad por consumo de sustancias psicoactivas (SPA) y presencia de bares, inadecuada disposición de residuos sólidos, y contaminación por devolución de aguas residuales.	Amenazas Principales Percibidas: Contaminación de la Quebrada Tibanica por residuos sólidos, taponamiento de alcantarillas, inseguridad asociada a "hoyas" de venta de SPA, y riesgo de desbordamiento por asentamientos en las márgenes del cuerpo de agua.
Vulnerabilidades de Infraestructura: Sistema de alcantarillado construido artesanalmente por la comunidad, con tuberías de diámetro reducido que colapsan en temporada de lluvias. Vías sin pavimentar, lo que genera polvo y lodo que afecta la salud y la movilidad.	Vulnerabilidades de Infraestructura: Vías de acceso sin pavimentar que dificultan la movilidad, sistema de alcantarillado autogestionado, y un puente de acceso principal construido de forma artesanal. Falta de instituciones formales dentro del barrio.
Vulnerabilidades Sociales y Humanas (Datos CRMC): 62% de la población no conoce protocolos de evacuación. 81% de los hogares no dispone de ahorros para emergencias. 27% de los hogares sufre de inseguridad alimentaria. Menos del 50% de la población confía en la capacidad de acción de sus líderes comunitarios.	Vulnerabilidades Sociales y Humanas (Datos CRMC): Dado que los resultados CRMC se consolidaron para ambos barrios, se confirman las mismas vulnerabilidades críticas: 62% de la población no conoce protocolos de evacuación. 81% de los hogares no dispone de ahorros para emergencias. 27% de los hogares sufre de inseguridad alimentaria. Menos del 50% de la población confía en la capacidad de acción de sus líderes comunitarios.
Capital Natural Crítico: El diagnóstico general califica el riesgo de inundación con un 100% en nivel D (muy por debajo del estándar). El suelo está altamente impermeabilizado por cemento, hay escasa vegetación y las áreas naturales de drenaje han sido reemplazadas por construcciones.	Capital Natural Crítico: Similar a El Danubio, sufre una alta degradación. La Quebrada Tibanica está invadida por escombros y basura, y los espacios naturales que antes absorbían el agua han sido ocupados, aumentando significativamente el riesgo de inundaciones y erosión.

Este diagnóstico multidimensional de vulnerabilidades justifica de manera contundente la necesidad de una herramienta que pueda integrar, visualizar y analizar estas complejas capas de información para transformar el conocimiento en acción preventiva.

3. Arquitectura y Funcionalidades de la Solución Propuesta

La solución propuesta no es simplemente una herramienta tecnológica, sino un ecosistema digital diseñado para el empoderamiento comunitario y la toma de decisiones informada. Su arquitectura modular responde directamente a las "Líneas de desarrollo" y "Condiciones" del reto, garantizando una alta usabilidad para usuarios no técnicos, escalabilidad para futuras implementaciones e impacto tangible en la construcción de resiliencia.

3.1. Concepto General: Un Dashboard Integrado de Resiliencia (DIR-Soacha)

El prototipo se concibe como un Dashboard Integrado de Resiliencia (DIR-Soacha): un panel de control web, accesible, interactivo e intuitivo. Su función principal es traducir la complejidad de los datos cualitativos y cuantitativos recopilados en campo y de fuentes abiertas en inteligencia accionable. Está diseñado para que líderes comunitarios, voluntarios y personal técnico puedan, con solo unos clics, comprender la distribución del riesgo en su territorio, identificar a la población más vulnerable y localizar las capacidades existentes para planificar una respuesta más efectiva.

3.2. Módulos Funcionales Clave

El DIR-Soacha se estructurará en torno a cuatro módulos funcionales que abordan las necesidades prioritarias identificadas en el diagnóstico.

1. Módulo de Visualización Geoespacial Interactiva: Para abordar la compleja superposición de amenazas identificadas en los mapeos comunitarios —desde alcantarillados artesanales colapsados hasta focos de inseguridad—, el corazón de la herramienta será un mapa dinámico que permitirá superponer y consultar diversas capas de información. Este módulo integrará capas de múltiples fuentes: las zonas de amenaza de inundación oficiales (alta, media, baja) proporcionadas por la Oficina de Gestión del Riesgo de Soacha se superpondrán con los puntos de amenaza y capacidades percibidos por la comunidad y recolectados mediante la metodología AVCA (focos de inseguridad, zonas de contaminación, obstrucción de alcantarillas, salón comunal, cancha, droguería).
2. Módulo de Análisis de Impacto Poblacional: Para cuantificar el riesgo en un territorio de alta densidad poblacional como Soacha, esta funcionalidad permitirá realizar análisis espaciales básicos para estimar la población y el número de viviendas afectadas por un posible evento de inundación. Al seleccionar un área de riesgo en el mapa, el sistema cruzará esta información con los datos demográficos del DANE (proyección de 806,253 habitantes para Soacha) y las cifras específicas de población por barrio (3,640 en El Danubio, 1,200 en La María) para generar una estimación del impacto potencial, ayudando a priorizar zonas de evacuación y asistencia.
3. Módulo de Alerta Preventiva (Conceptual): En respuesta a los patrones de inundación identificados en los calendarios estacionales, que señalan picos de precipitación entre marzo-junio y octubre-noviembre, este módulo conceptual buscará integrar datos climáticos de fuentes públicas como el Instituto de Hidrología, Meteorología y Estudios Ambientales (IDEAM). Podría generar alertas simples basadas en umbrales de precipitación predefinidos, lo que permitiría a los comités de emergencia activar protocolos preventivos de manera oportuna.
4. Módulo de Reporte y Monitoreo Comunitario: Para responder a la necesidad de un monitoreo constante de puntos críticos como alcantarillas obstruidas y acumulación de residuos, esta funcionalidad permitirá que líderes comunitarios o miembros de los comités de emergencia, previamente autorizados, reporten incidentes menores directamente en la plataforma. Cada reporte sería geolocalizado en el mapa, creando un registro histórico y visual de los puntos que requieren atención. Más allá del registro técnico, este módulo está concebido como una herramienta para reconstruir el capital social, al fomentar la participación ciudadana y reforzar la confianza en los líderes locales, abordando directamente el hallazgo de que menos del 50% de la comunidad confía en ellos.

3.3. Cumplimiento de las Condiciones del Reto

La arquitectura y funcionalidades del DIR-Soacha están diseñadas para cumplir integralmente con las seis condiciones establecidas en el reto:

* Georreferenciación: La solución se basa en un sistema de información geográfica que utilizará cartografía de acceso libre como OpenStreetMap para ubicar con precisión todos los datos de amenazas, vulnerabilidades y capacidades.
* Datos Abiertos: La plataforma integrará tanto los datos primarios generados por el proyecto RCU (diagnósticos AVCA/CRMC) como datos de fuentes públicas y abiertas, principalmente del IDEAM (hidrometeorología) y del DANE (demografía).
* Visualización e Impacto: El mapa interactivo y sus filtros por zonas permitirán una visualización clara y la comparación directa de distintas capas de información, facilitando la comprensión del impacto potencial de las amenazas sobre la población y la infraestructura.
* Inteligencia Artificial / Analítica Predictiva: El módulo de alerta preventiva representa una aplicación inicial de analítica, utilizando umbrales y datos históricos para generar advertencias tempranas. Este módulo es la base para futuras implementaciones más complejas.
* Usabilidad: El diseño se centrará en una interfaz gráfica intuitiva y fácil de usar, pensada para usuarios no especializados como voluntarios y líderes comunitarios, asegurando la apropiación y el uso efectivo de la herramienta.
* Escalabilidad: Al ser una aplicación web con una arquitectura modular, la solución podrá ser fácilmente extendida para incorporar nuevas funcionalidades, fuentes de datos o replicarse en otros municipios y comunidades con desafíos similares.

La materialización de estos módulos depende directamente de la calidad y estructura de los datos que los alimentarán, tema que se detalla a continuación.

4. Modelo de Datos y Fuentes de Información

La robustez y fiabilidad de cualquier herramienta analítica dependen directamente de la calidad, pertinencia y granularidad de sus datos. La plataforma DIR-Soacha se construirá sobre un cimiento de datos sólido, que combina el conocimiento profundo generado por la comunidad con información oficial y estandarizada. Esta sección cataloga las fuentes de datos primarias y secundarias que servirán como la materia prima para el prototipo.

4.1. Datos Primarios del Proyecto RCU (AVCA y CRMC)

Estos datos, recolectados directamente en el terreno, constituyen el activo más valioso de la plataforma, ya que reflejan la percepción y el conocimiento local del riesgo. Se procederá a la digitalización y georreferenciación de la siguiente información extraída del "Diagnóstico Comunitario":

* Mapeo Comunitario: Se digitalizarán los puntos geográficos específicos identificados por los habitantes que representan amenazas (focos de inseguridad, puntos de consumo de SPA, zonas de acumulación de residuos, alcantarillas obstruidas) y capacidades existentes (salones comunales, canchas deportivas, droguerías).
* Calendarios Estacionales: Los patrones temporales de riesgo serán sistematizados para alimentar el módulo de alertas. Específicamente, los meses de mayor precipitación (marzo a junio, y octubre a noviembre) se usarán como una variable clave para ponderar el riesgo.
* Resultados CRMC: Los indicadores cuantitativos de vulnerabilidad se asociarán a las zonas geográficas correspondientes. Datos críticos como el 81% de hogares sin ahorros para emergencias o el 62% de personas sin conocimiento de protocolos de evacuación, se vincularán a los polígonos de los barrios para enriquecer el análisis de impacto.
* Cartografía Emocional: Las zonas percibidas por la comunidad como peligrosas, seguras o de alta actividad comercial serán digitalizadas como capas temáticas. Esto permitirá visualizar no solo el riesgo físico, sino también la percepción social del territorio.
* Datos Demográficos: Se utilizarán las cifras de población y vivienda a nivel de barrio, proporcionadas por las Juntas de Acción Comunal (JAC) (El Danubio: ~3,640 hab.; La María: ~1,200 hab.), para refinar los análisis de impacto poblacional.

4.2. Datos Abiertos y Fuentes Externas

Para complementar la visión comunitaria y proporcionar un marco de referencia técnico, la plataforma integrará las siguientes fuentes de datos abiertos:

* Capas Base de Mapa: Se utilizará OpenStreetMap (OSM) como cartografía base. Su naturaleza abierta, colaborativa y detallada a nivel de calle lo convierte en el lienzo ideal para superponer la información local.
* Datos Hidrometeorológicos (IDEAM): Se consultará la sección de datos abiertos del Instituto de Hidrología, Meteorología y Estudios Ambientales, disponible en la plataforma datos.gov.co. Se buscarán datasets históricos y en tiempo real sobre precipitación, niveles de ríos y alertas hidrometeorológicas que puedan ser integrados, vía API o descarga directa, al módulo de alerta preventiva.
* Datos Demográficos (DANE): Las proyecciones de población del Departamento Administrativo Nacional de Estadística para Soacha en 2024 (aprox. 806,253 habitantes) se utilizarán como referencia macro para contextualizar las cifras locales y validar los modelos de impacto poblacional.

La correcta integración y estructuración de estas diversas fuentes de datos es el paso previo y fundamental para el desarrollo del plan de entrega que se describe a continuación.

5. Plan de Entrega del Prototipo y Entregables

Esta sección traduce el concepto, la arquitectura y los datos en un plan de ejecución tangible y orientado a la acción, detallando los entregables específicos que se producirán para cumplir con los objetivos del reto.

5.1. Prototipo Funcional Navegable

El principal entregable será un demo navegable de la plataforma DIR-Soacha. Este no será una simple maqueta, sino una aplicación web funcional que permitirá al usuario experimentar las funcionalidades clave. El demo mostrará un mapa de Soacha centrado en los barrios El Danubio y La María. Los usuarios podrán interactuar con el mapa para activar y desactivar capas que visualicen las zonas de riesgo de inundación (alta, media, baja), los puntos de amenaza identificados por la comunidad (inseguridad, contaminación) y las capacidades locales (salón comunal). Al hacer clic sobre una zona o un punto de interés, se desplegará una ventana emergente con información contextual, como datos demográficos básicos y estadísticas de vulnerabilidad clave extraídas de la medición CRMC (p. ej., "% de población sin ahorros para emergencias").

5.2. Descripción Técnica y Herramientas Propuestas

Para garantizar la viabilidad, sostenibilidad y escalabilidad del proyecto, se propone el uso de una pila tecnológica basada en herramientas de código abierto, robustas y ampliamente utilizadas en el desarrollo de aplicaciones geoespaciales.

* Frontend (Visualización): Se utilizará JavaScript junto con la librería Leaflet.js, una solución ligera y potente para crear mapas interactivos y compatibles con múltiples dispositivos.
* Fuentes de Mapas: La cartografía base será provista por OpenStreetMap, asegurando un acceso libre y sin costos de licenciamiento.

5.3. Esquema del Pitch de Presentación (5 minutos)

La presentación final del prototipo se estructurará de manera concisa y persuasiva para comunicar el valor y el impacto de la solución en un tiempo limitado.

1. Minuto 1: El Problema. Se presentará el contexto crítico de vulnerabilidad en Soacha, destacando 2 o 3 datos impactantes extraídos del diagnóstico comunitario, como el 81% de familias sin ahorros para emergencias o el 62% sin conocimiento de protocolos de evacuación, para captar la atención y establecer la urgencia.
2. Minuto 2: Nuestra Solución (DIR-Soacha). Se introducirá el concepto del dashboard y se procederá a una demostración en vivo de la funcionalidad principal del prototipo. Se mostrará la navegación por el mapa, la activación de capas de riesgo y capacidades, y la consulta de información en las ventanas emergentes.
3. Minuto 3: Impacto y Valor. Se explicará de forma clara cómo la herramienta empodera a la comunidad y a la Cruz Roja. Se argumentará que DIR-Soacha facilita una toma de decisiones más rápida, precisa y basada en evidencia, permitiendo pasar de la reacción a la prevención.
4. Minuto 4: Tecnología y Escalabilidad. Se mencionará brevemente la pila tecnológica de código abierto utilizada, subrayando cómo esta elección asegura la sostenibilidad y la facilidad para escalar la solución a otros barrios de Soacha o a diferentes municipios en el futuro.
5. Minuto 5: Llamado a la Acción. Se concluirá con un cierre potente, resumiendo el valor estratégico de la propuesta y delineando los próximos pasos recomendados para llevar el prototipo a una fase de implementación completa y validación en campo.

Este plan de entrega asegura la creación de un producto tangible y una presentación convincente, demostrando la viabilidad y el potencial transformador del proyecto.

6. Conclusión: Hacia una Gestión del Riesgo Basada en Datos

La solución propuesta, el Dashboard Integrado de Resiliencia (DIR-Soacha), representa mucho más que una simple herramienta de visualización cartográfica. Es una plataforma estratégica diseñada para catalizar un cambio fundamental en la gestión del riesgo: pasar de un modelo reactivo, que responde a las emergencias, a una cultura de prevención y adaptación climática proactiva, construida desde la base comunitaria. Al hacer que los datos complejos sean accesibles, visuales y, sobre todo, accionables, se dota a las comunidades de El Danubio y La María, así como a la Cruz Roja y sus aliados institucionales, de una poderosa herramienta para comprender su entorno, anticipar amenazas y proteger vidas. Este prototipo es el primer paso para consolidar una gestión del riesgo inteligente, colaborativa y verdaderamente resiliente en Soacha.
