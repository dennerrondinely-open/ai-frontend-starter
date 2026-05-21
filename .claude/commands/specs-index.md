---
description: Regenera specs/INDEX.md lendo o Status de cada spec.md (ativas + arquivadas).
---

Regenere `specs/INDEX.md` agrupando specs por status.

## Passos

1. Liste todas as specs ativas: `specs/NNN-*/spec.md` (ignorar `archive/`, `README.md`, `INDEX.md`).
2. Liste todas as specs arquivadas: `specs/archive/*/NNN-*/spec.md`.
3. Para cada spec, leia o cabeçalho e extraia:
   - `# Feature: <título>` (linha 1)
   - `**Status:** <status>` (linhas iniciais)
   - `**Created:** YYYY-MM-DD`
4. Agrupe por status e escreva `specs/INDEX.md` na estrutura abaixo.
5. Atualize `**Última atualização:** <hoje>` no topo.

## Estrutura obrigatória do INDEX.md

```markdown
# Specs Index

Visão geral das specs do projeto. Regenerado por `/specs-index`.

**Última atualização:** YYYY-MM-DD

## In progress

| ID | Feature | Iniciada |
|----|---------|----------|
| NNN | [Título](NNN-slug/spec.md) | YYYY-MM-DD |

## Approved (próximas a implementar)

| ID | Feature | Aprovada |
|----|---------|----------|
| ... | ... | ... |

## Draft (em elaboração)

| ID | Feature | Criada |
|----|---------|--------|
| ... | ... | ... |

## Done (últimos 30 dias)

| ID | Feature | Concluída |
|----|---------|-----------|
| ... | ... | ... |

## Archived

| ID | Feature | Trimestre |
|----|---------|-----------|
| 001 | [Filtro texto](archive/2026-Q1/001-filtro-texto/spec.md) | 2026-Q1 |

---

## Convenção de status
| Status | Significado |
|--------|-------------|
| `draft` | Em elaboração, ainda tem `[NEEDS CLARIFICATION]` |
| `approved` | Pronta para `/plan` |
| `in-progress` | `/implement` rodando |
| `done` | Feature em produção |
| `abandoned` | Cancelada ou substituída |
```

## Regras

- Seções vazias devem mostrar `_(nenhuma)_` em itálico.
- Done > 30 dias atrás vai para "Archived" se já estiver fisicamente em `archive/`. Se ainda estiver em `specs/NNN-*/` mas com data antiga, sugira ao usuário rodar `/specs-archive`.
- Não toque no conteúdo das specs — só leia.
- Após escrever o INDEX, reporte: total ativas / arquivadas, e qual seção ficou vazia.
