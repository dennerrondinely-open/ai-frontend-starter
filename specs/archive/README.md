# Archive

Specs concluídas (`Status: done`) há mais de 30 dias e specs abandonadas (`Status: abandoned`) vivem aqui para manter `specs/` enxuto sem perder histórico.

## Estrutura

Agrupado por trimestre da data de conclusão (ou da última atividade, no caso de abandoned):

```
specs/archive/
├── 2026-Q1/
│   ├── 001-filtro-por-texto/
│   └── 002-favoritos/
├── 2026-Q2/
│   └── 003-export-csv/
└── 2025-Q4/
    └── ...
```

## Quando arquivar

- `Status: done` há mais de 30 dias.
- `Status: abandoned` em qualquer momento.
- Spec que perdeu relevância (feature foi removida do produto).

## Como arquivar

Use o slash command `/specs-archive [NNN-slug]` ou mova manualmente:

```bash
mkdir -p specs/archive/$(date +%Y)-Q$(( ($(date +%m) - 1) / 3 + 1 ))
mv specs/NNN-slug specs/archive/2026-Q1/
```

Depois, regenere `specs/INDEX.md` via `/specs-index`.

## Buscar em arquivadas

A IA continua tendo acesso via `grep`/`rg` quando precisa de contexto histórico. Exemplo: ao planejar uma feature similar a uma antiga, busque por palavras-chave em `specs/archive/`.
