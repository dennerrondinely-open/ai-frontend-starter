# ai-frontend-starter

Template React/Vite otimizado para desenvolvimento assistido por IA com **Spec-Driven Development**.

## Stack

| Camada | Ferramenta |
|--------|------------|
| Framework | React 19 + Vite 8 (SWC) |
| Linguagem | TypeScript 6 (strict) |
| Roteamento | TanStack Router (file-based) |
| Data fetching | TanStack Query + Axios + axios-retry |
| Geração de tipos | Orval (OpenAPI → Zod + hooks Query) |
| Validação | Zod 4 |
| Forms | React Hook Form + zodResolver |
| Estilização | Tailwind CSS v4 (CSS-first) + shadcn/ui + Radix + CVA |
| Ícones | lucide-react |
| Estado client | Zustand |
| Toasts | Sonner |
| Testes unit/integration | Vitest + Testing Library + MSW |
| Testes E2E | Playwright |
| Lint + format | Biome (com plugins GritQL custom) |
| Git hooks | Husky + lint-staged |

## Quick start

```bash
npm install
npx playwright install --with-deps chromium    # primeira vez
npm run dev                                    # http://localhost:5173
```

Variáveis de ambiente: copie `.env.example` para `.env`.

## O que faz este template diferente

### 1. Regras prontas para IA (`.ai/rules/`)
6 documentos curtos cobrindo arquitetura, React, Tailwind, TypeScript, testing e princípios gerais. Qualquer agente lê antes de gerar código.

### 2. Templates de código (`.ai/templates/`)
Esqueletos prontos com placeholders `{{Name}}`. IA copia e adapta em vez de reinventar.

### 3. Spec-Driven Development (`specs/`)
Toda feature passa por `spec.md` (o que/por quê) → `plan.md` (como) → `tasks.md` (passo-a-passo) antes do código. Slash commands `/specify /plan /tasks /implement` automatizam o ciclo. Veja `specs/000-example/` como referência completa.

### 4. Lint rules customizáveis (`tools/lint-rules/`)
Plugins GritQL no Biome — exemplo: proibir `import axios` direto fora do wrapper compartilhado.

### 5. `.claude/` configurado
Settings com permissions sensatas, slash commands SDD, agents (component-builder, spec-writer, plan-writer, code-reviewer) e o skill `new-feature`.

## Estrutura

```
.ai/
├── rules/              # documentos que a IA deve ler
└── templates/          # esqueletos de código

.claude/
├── settings.json       # permissões de tools
├── commands/           # slash commands (/specify, /plan, /tasks, /implement)
├── agents/             # subagentes especializados
└── skills/             # workflows de alto nível (new-feature)

specs/
├── README.md
└── 000-example/        # feature de referência completa

tools/
└── lint-rules/         # plugins GritQL para Biome

src/
├── app/                # bootstrap: providers, router, query client
├── routes/             # TanStack Router file-based
├── features/           # módulos de negócio (feature-sliced)
│   └── todos/          # exemplo
├── shared/
│   ├── ui/             # design system (shadcn/ui)
│   ├── lib/            # http, env, cn
│   ├── api/            # mutator + generated/ (Orval)
│   └── hooks/
└── test/               # setup Vitest + handlers MSW

e2e/                    # specs Playwright
```

## Scripts

```bash
npm run dev              # dev server
npm run build            # build prod (tsc + vite)
npm run preview          # preview do build
npm test                 # Vitest run
npm run test:watch       # Vitest watch
npm run test:ui          # Vitest UI
npm run test:cov         # cobertura
npm run e2e              # Playwright
npm run e2e:ui           # Playwright UI
npm run lint             # Biome check
npm run lint:fix         # Biome check --write
npm run format           # Biome format
npm run typecheck        # tsc --noEmit
npm run api:gen          # Orval: openapi.yaml → src/shared/api/generated/
```

## Como criar uma feature nova

1. `/specify "Quero permitir que usuário X faça Y para Z"`
2. Revise `specs/NNN-slug/spec.md`. Responda os `[NEEDS CLARIFICATION]`.
3. `/plan` → revise estrutura técnica em `plan.md`.
4. `/tasks` → revise granularidade em `tasks.md`.
5. `/implement` (executa UMA task; rode N vezes).
6. Commit: `feat: NNN-slug — descrição curta`.

Veja `CLAUDE.md` e `.ai/rules/` para o conjunto completo de convenções.

## Adaptando para seu projeto

- Renomeie em `package.json`.
- Substitua `openapi.yaml` pelo contrato real e rode `npm run api:gen`.
- Ajuste cores/tokens em `src/index.css` (`@theme {}`).
- Edite `.env.example` e `src/shared/lib/env.ts`.
- Limpe `specs/000-example/` e `src/features/todos/` quando começar a primeira feature real.
- Adicione regras GritQL custom em `tools/lint-rules/` conforme padrões do seu time emergem.

## Licença

MIT — adapte à vontade.
