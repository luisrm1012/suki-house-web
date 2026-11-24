---
name: plan-implement
description: Flujo obligatorio para cualquier cambio de código, nueva feature, mejora o refactor en este proyecto. Primero un subagente planificador (en modo plan, solo lectura) analiza el encargo y lo divide en mini tareas, asignando a cada una modelo (haiku/sonnet/opus) y esfuerzo (low…max) según su complejidad. Después se implementa el plan en oleadas de hasta 10 subagentes en paralelo y se verifica el build.
when_to_use: Úsala siempre que el usuario pida implementar, añadir, cambiar, arreglar o refactorizar algo en el código ("añade una página", "cambia el formulario", "implementa X", "haz la tarea Y del TODO"). No la uses para preguntas, explicaciones o lecturas sin cambios.
argument-hint: "[descripción del cambio o feature]"
allowed-tools: Bash(git status *) Bash(git branch *) Bash(git log *) Bash(date *)
---

# Planificar e implementar con subagentes

Encargo del usuario:

> $ARGUMENTS

Si el encargo está vacío, usa la última petición del usuario en la conversación.

Contexto del repositorio en el momento de invocar la skill:

- Rama: !`git branch --show-current`
- Cambios sin commitear: !`git status --short`
- Últimos commits: !`git log --oneline -5`
- Fecha: !`date +%Y-%m-%d`

Sigue estas fases en orden. Tú (la conversación principal) eres el **orquestador**: no implementas tú mismo las mini tareas, las delegas.

---

## Fase 1 — Planificación (subagente `feature-planner`, modo plan)

1. Lanza **un único** subagente con la herramienta Agent:
   - `subagent_type: "feature-planner"` (definido en `.claude/agents/feature-planner.md`, con `permissionMode: plan`, solo lectura).
   - En el `prompt` incluye: el encargo literal del usuario, el contexto del repositorio de arriba y la instrucción de devolver el plan con el formato de [plan-template.md](plan-template.md) (pega la plantilla en el prompt; el subagente no recibe esta skill).
2. Espera su resultado (no lo lances en segundo plano si tu entorno permite elegir).
3. Revisa el plan que devuelve. Corrígelo tú si:
   - Dos mini tareas de la misma oleada tocan el mismo archivo → muévelas a oleadas distintas o fusiónalas.
   - Una oleada tiene más de 10 tareas → pártela.
   - Falta modelo o esfuerzo, o no siguen la tabla de complejidad de abajo.
   - Una tarea depende de otra de su misma oleada.
4. Guarda el plan final en `.claude/plans/<fecha>-<slug>.md` (créalo con Write).

### Tabla de complejidad → modelo y esfuerzo

| Complejidad | Ejemplos | `model` | `effort` |
|---|---|---|---|
| Trivial | Cambiar un texto, un enlace, un valor de config, renombrar | `haiku` | `low` |
| Simple | Editar un componente existente, añadir un estilo, traducir una cadena, 1–2 archivos con cambios localizados | `sonnet` | `low` o `medium` |
| Media | Nuevo componente o página, lógica moderada, varios archivos relacionados, integración con datos existentes | `sonnet` | `high` |
| Compleja | Arquitectura, cambios transversales (i18n, layouts, rutas), integraciones externas, accesibilidad/SEO de fondo, depuración difícil | `opus` | `high` o `xhigh` |
| Crítica | Seguridad, privacidad/RGPD, migraciones irreversibles, ambigüedad alta que exige razonar mucho | `opus` | `xhigh` o `max` |

Regla general: elige el modelo **más barato que pueda hacerlo bien**; sube el esfuerzo antes que el modelo cuando la tarea es acotada pero delicada.

## Fase 2 — Comprobación antes de implementar

- Muestra al usuario un resumen breve del plan: oleadas, mini tareas con su modelo/esfuerzo y la ruta del archivo del plan.
- Si el planificador dejó **preguntas abiertas que bloquean** alguna tarea, o hay tareas irreversibles (borrar datos, cambios de despliegue, publicar), pregunta al usuario (AskUserQuestion) antes de seguir. Si no, pasa directamente a la Fase 3.

## Fase 3 — Implementación en paralelo (máx. 10 subagentes a la vez)

Para cada oleada, en orden:

1. Lanza **todas las mini tareas de la oleada en un solo mensaje**, una llamada a Agent por tarea, para que se ejecuten en paralelo. **Nunca más de 10 llamadas a la vez.**
2. Cada llamada usa:
   - `subagent_type: "task-implementer"`
   - `model`: el del plan (`haiku`, `sonnet` u `opus`).
   - `effort`: el del plan (`low`, `medium`, `high`, `xhigh`, `max`).
   - `description`: el id y título corto de la tarea (p. ej. `T3 Página aviso legal`).
   - `prompt`: autosuficiente. Incluye objetivo, archivos que **puede** tocar (y que no debe tocar otros), contexto necesario (fragmentos, decisiones del plan, convenciones del proyecto), criterios de aceptación y cómo verificar. El subagente no ve esta conversación.
3. Espera a que terminen todas las de la oleada. Revisa cada informe:
   - Si una tarea falló o quedó incompleta, relánzala (puedes subir modelo o esfuerzo un nivel) o corrígela antes de la siguiente oleada.
   - Si un subagente tocó archivos fuera de su lista, revísalo con `git diff`.
4. Marca la oleada como hecha en el archivo del plan y pasa a la siguiente.

## Fase 4 — Integración y verificación

1. Ejecuta `npm run build` y corrige los errores (delegando si son muchos o complejos).
2. Si el cambio es visible en la web, levanta el servidor con la configuración `astro-dev` de `.claude/launch.json` y compruébalo en el navegador (ES y EN si aplica).
3. Revisa `git diff --stat` para confirmar que solo cambió lo planificado.
4. Si el encargo correspondía a una tarea de `TODO.md`, márcala como hecha.
5. **No hagas commit** salvo que el usuario lo pida.
6. Informa: qué se hizo por tarea (modelo/esfuerzo usado), resultado del build y lo que quede pendiente.
