---
description: Cria uma nova spec (WHAT + WHY) em specs/NNN-slug/spec.md a partir de uma descrição livre.
argument-hint: <descrição da feature em linguagem natural>
---

Crie uma nova spec seguindo o padrão Spec-Driven Development.

Descrição da feature: $ARGUMENTS

## Passos

1. Liste `specs/` E `specs/archive/` recursivamente. Próximo NNN = `max(NNN existente em ambos) + 1`, zero-padded com 3 dígitos.
2. Gere um slug em kebab-case curto a partir da descrição.
3. Crie o diretório `specs/NNN-<slug>/`.
4. Escreva `specs/NNN-<slug>/spec.md` seguindo a estrutura abaixo.
5. Atualize `specs/INDEX.md` adicionando a nova entrada na seção "Draft" (mantendo ordem decrescente por NNN).
6. Reporte o caminho criado e os pontos de incerteza marcados como `[NEEDS CLARIFICATION: ...]`.

## Estrutura obrigatória do spec.md

```markdown
# Feature: <Título>

**Status:** draft
**Created:** YYYY-MM-DD

## Why

Problema ou oportunidade que esta feature resolve. Quem é impactado? Qual a dor atual?

## What (escopo)

O que faz parte desta feature em linguagem de usuário/negócio. **Sem solução técnica.**

### Em escopo
- ...

### Fora de escopo
- ...

## User stories

- Como <papel>, quero <ação>, para <benefício>.

## Critérios de aceitação

Cenários Given/When/Then concretos e testáveis.

- **Cenário X**: GIVEN ... WHEN ... THEN ...

## Restrições e suposições

- Suposições explícitas
- Limites técnicos conhecidos (compliance, perf, a11y)

## Pontos a clarificar

- [NEEDS CLARIFICATION: pergunta específica para quem decide]
```

## Regras

- Spec é WHAT + WHY. Não escreva HOW (sem rotas, schemas, nomes de componente).
- Marque qualquer ambiguidade com `[NEEDS CLARIFICATION: ...]` em vez de assumir.
- Use linguagem que um stakeholder não-técnico entenda.
- Após criar, NÃO rode `/plan` automaticamente — espere o humano revisar a spec primeiro.
