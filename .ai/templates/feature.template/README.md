# Feature template

Esqueleto completo de uma feature seguindo `.ai/rules/architecture.md`.

## Como usar (manualmente ou via agent)

1. Copie todo o conteúdo de `.ai/templates/feature.template/` para `src/features/<sua-feature>/`.
2. Substitua `{{Name}}` (PascalCase, ex: `Order`) e `{{name}}` (camelCase, ex: `order`).
3. Adicione a rota em `src/routes/<sua-feature>.tsx` usando `page.template.tsx`.
4. Implemente os TODOs em ordem: schemas → api → hooks → components → page.

## Estrutura

```
<feature>/
├── api.ts            # chamadas HTTP
├── schemas.ts        # Zod schemas + tipos
├── store.ts          # Zustand UI state (opcional)
├── hooks/
│   └── use{{Name}}.ts
├── components/
│   ├── {{Name}}Form.tsx
│   ├── {{Name}}List.tsx
│   └── {{Name}}Page.tsx
└── index.ts          # API pública
```
