# CLAUDE.md

Instruções para qualquer agente de IA (Claude Code, Cursor, Copilot etc.) trabalhando neste repo.

## Antes de escrever código, leia

1. `.ai/rules/frontend-rules.md` — princípios gerais, a11y, performance
2. `.ai/rules/architecture.md` — feature-sliced, regras de import
3. `.ai/rules/react-patterns.md` — server vs client state, RHF, Zustand
4. `.ai/rules/tailwind-rules.md` — tokens v4, `cn()`, CVA
5. `.ai/rules/typescript-rules.md` — strict, no `any`, Zod-first
6. `.ai/rules/testing-rules.md` — Vitest + MSW + Playwright

## Antes de criar arquivo novo, copie de

`.ai/templates/`:
- `component.template.tsx` — componente isolado
- `page.template.tsx` — rota TanStack Router
- `hook.template.ts` — query/mutation
- `store.template.ts` — Zustand
- `feature.template/` — esqueleto de feature inteira
- `component.test.template.tsx` — teste integration
- `e2e.template.spec.ts` — teste Playwright

## Para criar feature nova, use SDD

```
/specify "descrição"   →   specs/NNN-slug/spec.md
/plan                  →   specs/NNN-slug/plan.md
/tasks                 →   specs/NNN-slug/tasks.md
/implement             →   executa UMA task de cada vez
```

Veja `specs/README.md` e `specs/000-example/` como referência. Ou invoque o skill `new-feature`.

## Comandos essenciais

```bash
npm run dev          # Vite dev server (porta 5173)
npm run build        # build prod
npm test             # Vitest unit + integration
npm run e2e          # Playwright
npm run lint         # Biome check (incluindo regras GritQL custom)
npm run lint:fix     # corrige automaticamente
npm run typecheck    # tsc --noEmit
npm run api:gen      # Orval: openapi.yaml → src/shared/api/generated
```

## Estrutura de pastas

```
.ai/                 # regras + templates para IA
.claude/             # slash commands, agents, skills, settings
specs/               # SDD: NNN-slug/{spec,plan,tasks}.md
tools/lint-rules/    # plugins GritQL para Biome
src/
├── app/             # bootstrap (providers, router, query client)
├── routes/          # TanStack Router file-based
├── features/        # módulos de negócio (feature-sliced)
└── shared/          # ui (shadcn), lib, api gerada, hooks
e2e/                 # Playwright
```

## Regras-chave (resumo)

- **Server state em TanStack Query**, nunca `useState` para dados de API.
- **Schemas Zod são source of truth** — tipos vêm via `z.infer`.
- **Sem `any`** — use `unknown` + parse Zod.
- **Tokens Tailwind do `@theme`**, sem cores hardcoded.
- **`features/A` nunca importa de `features/B`** — se precisar, eleve para `shared/`.
- **Toda feature exporta via `index.ts`**.
- **Acessibilidade não é opcional** (roles, aria-*, navegação por teclado).

## Convenções de commit

[Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` nova feature
- `fix:` bug
- `refactor:` reorg sem mudar comportamento
- `test:` só testes
- `docs:` só docs
- `chore:` infra/deps

## Quando pedir ajuda em vez de assumir

- Mudança de contrato API → regenerar via Orval, não mockar tipos manualmente.
- Adicionar dependência > 50KB gzip → pergunte.
- Bypass de regra de lint → pergunte e justifique no PR.
- Quebrar boundary de architecture → pergunte primeiro (provavelmente é sinal de promover algo a `shared/`).

## Sobre este template

Repo é template. Ao clonar para projeto novo:
1. Renomeie em `package.json`.
2. Substitua `openapi.yaml` pelo seu contrato real.
3. Atualize `.env.example` e `src/shared/lib/env.ts` com vars reais.
4. Limpe `specs/000-example/` e `src/features/todos/` quando começar a feature 001.
