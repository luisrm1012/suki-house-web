# Plan: <título de la feature>

- **Fecha:** <YYYY-MM-DD>
- **Encargo original:** <texto literal del usuario>
- **Resumen:** <2–4 frases: qué se va a hacer y por qué>

## Análisis

- **Archivos relevantes:** <rutas con una línea sobre su papel>
- **Convenciones a respetar:** <i18n ES/EN, componentes, estilos, datos en src/data, etc.>
- **Riesgos:** <qué puede romperse>
- **Preguntas abiertas:** <ninguna | lista; marca con [BLOQUEANTE] las que impiden empezar>

## Mini tareas

| ID | Título | Complejidad | Modelo | Esfuerzo | Oleada | Depende de | Archivos |
|----|--------|-------------|--------|----------|--------|------------|----------|
| T1 | … | Simple | sonnet | medium | 1 | — | `src/...` |
| T2 | … | Media | sonnet | high | 1 | — | `src/...` |
| T3 | … | Compleja | opus | high | 2 | T1, T2 | `src/...` |

### T1 — <título>

- **Objetivo:** <qué debe quedar hecho>
- **Por qué este modelo/esfuerzo:** <una línea>
- **Archivos que puede tocar:** <lista cerrada>
- **Pasos:** <lista breve>
- **Criterios de aceptación:** <comprobables>
- **Verificación:** <comando o comprobación concreta>

(repite para cada tarea)

## Oleadas

- **Oleada 1** (paralelo, ≤10): T1, T2
- **Oleada 2** (paralelo, ≤10): T3

Reglas: dentro de una oleada ninguna tarea comparte archivos con otra ni depende de otra.

## Verificación final

- `npm run build`
- <comprobaciones en navegador, páginas ES/EN afectadas>
