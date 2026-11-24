---
name: commit-push
description: Sube los cambios a GitHub (commit + push) separándolos en varios commits lógicos, uno por tema, cada uno con un mensaje breve que describe lo que lleva. Lo ejecuta el subagente sencillo git-committer (haiku).
when_to_use: Úsala cuando el usuario pida subir, commitear, hacer push, "sube los cambios", "súbelo a GitHub", "haz commit y push". No la uses para hacer un único commit sin push si el usuario lo pide así expresamente.
argument-hint: "[indicaciones opcionales, p. ej. 'solo lo de la página legal']"
context: fork
agent: git-committer
background: false
allowed-tools: Bash(git status *) Bash(git diff *) Bash(git log *) Bash(git branch *) Bash(git add *) Bash(git restore --staged *) Bash(git commit *) Bash(git push *) Bash(git pull --rebase *) Bash(git rebase --abort *)
---

# Commit y push en commits lógicos

Indicaciones del usuario (pueden estar vacías): $ARGUMENTS

Estado actual del repositorio:

- Rama: !`git branch --show-current`
- Cambios (la primera línea indica si vas por delante/detrás de `origin`):

```!
git status -sb
```

- Resumen del diff:

```!
git diff --stat
```

- Estilo de mensajes reciente:

```!
git log --oneline -8
```

## Tarea

1. Si no hay cambios ni commits pendientes de subir, informa y termina.
2. Agrupa los cambios en commits lógicos según tus instrucciones de agente (un tema por commit, rutas explícitas en `git add`, mensaje `tipo: descripción breve` en español).
3. Si el usuario dio indicaciones, respétalas (p. ej. subir solo una parte y dejar el resto sin commitear).
4. Haz push de la rama actual, sin forzar nunca.
5. Devuelve el informe: commits creados (hash, mensaje, archivos), resultado del push y archivos que dejaste fuera.
