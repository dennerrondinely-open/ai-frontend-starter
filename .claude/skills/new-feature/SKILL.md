---
name: new-feature
description: Use quando o usuário pedir para "criar uma feature", "adicionar funcionalidade nova" ou similar. Conduz o ciclo SDD completo specify → plan → tasks → implement com pausas humanas entre fases.
---

# Skill: new-feature

Conduz uma feature nova do zero seguindo Spec-Driven Development.

## Quando usar

- "Cria uma feature de X"
- "Adiciona funcionalidade Y"
- "Quero implementar Z"

## Fases (PARE ENTRE CADA UMA — humano valida)

### 1. Specify
Use o slash command `/specify <descrição>` ou o agente `spec-writer`.
Saída: `specs/NNN-slug/spec.md`.
**PARE.** Peça ao humano para revisar e responder os `[NEEDS CLARIFICATION]`.

### 2. Plan
Após spec aprovada, use `/plan` ou agente `plan-writer`.
Saída: `specs/NNN-slug/plan.md`.
**PARE.** Humano revisa estrutura, schemas, escolhas técnicas.

### 3. Tasks
Após plan aprovado, use `/tasks`.
Saída: `specs/NNN-slug/tasks.md` com checklist.
**PARE.** Humano revisa granularidade.

### 4. Implement (loop)
Para cada task pendente:
1. Use `/implement` (executa UMA task, marca como `[x]`).
2. Reporte resultado (arquivos criados, lint/test status).
3. Aguarde humano dizer "próxima".
4. Se task falhou: PARE e reporte; não tente próxima.

### 5. Review
Antes de marcar feature como done, invoque o agente `code-reviewer` no diff acumulado.

### 6. Done
- Marcar `spec.md` como `Status: done`.
- Atualizar `CLAUDE.md` se introduziu novo padrão.
- Sugerir mensagem de commit (não rodar `git commit` sem confirmação).

## Princípios

- Não pule fases. Especialmente não pule a spec.
- Não junte fases em um único turno. O valor do SDD vem das pausas.
- Sempre cite o que foi reusado de `shared/` ou de outras features (anti-duplicação).
- Se o pedido é trivial (mudança de uma linha, ajuste visual), DISPENSE este skill — não vale o overhead.

## Quando NÃO usar

- Bug fix pequeno → faça direto.
- Refactor sem mudança de comportamento → não precisa de spec.
- Mudança de copy/texto → direto.
