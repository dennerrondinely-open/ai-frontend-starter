# Architecture

Modelo: **feature-sliced** com camadas explícitas. Toda nova capacidade vive em `src/features/<feature>/`.

## Camadas

```
src/
├── app/         # bootstrap (providers, router, query client). Único lugar com efeitos globais.
├── routes/      # TanStack Router file-based. Apenas adapta rota → feature.
├── features/    # módulos de negócio. Self-contained.
│   └── <name>/
│       ├── api.ts             # chamadas HTTP da feature (ou re-export de generated/)
│       ├── schemas.ts         # Zod schemas + tipos inferidos
│       ├── hooks/             # useXxx — Query/Mutation/derived state
│       ├── store.ts           # Zustand UI state (opcional)
│       ├── components/        # componentes da feature (Page no topo)
│       └── index.ts           # API pública — só exporta o necessário
└── shared/      # reutilizável entre features
    ├── ui/      # design system (shadcn/ui + componentes próprios genéricos)
    ├── lib/     # http, env, cn, formatters
    ├── api/     # mutator + generated/ (Orval)
    └── hooks/   # useDebounce, useMediaQuery etc — sem regra de negócio
```

## Regras de import (ENFORCEABLE)

1. `features/A` **NUNCA** importa de `features/B`. Compartilhe via `shared/` ou eleve para `app/`.
2. `shared/` **NUNCA** importa de `features/`.
3. `routes/` importa só de `features/<name>` (via `index.ts`) e `shared/`.
4. `app/` orquestra; pode importar de tudo.
5. Externamente, sempre via `index.ts` da feature: `import { TodosPage } from '@/features/todos'`.

Violar isso geralmente significa que você está fazendo cross-feature ou que falta promover algo para `shared/`.

## Camada de dados

- **Server state**: TanStack Query. Hooks em `features/<name>/hooks/`. Query keys hierárquicas: `['todos', 'list']`, `['todos', 'detail', id]`. Centralize em `todosKeys`.
- **Client state global**: Zustand. Um store por feature em `store.ts`. Sem cross-store.
- **Form state**: React Hook Form + zodResolver. Nunca controle inputs com `useState`.
- **URL state**: TanStack Router search params (com schema Zod). Nunca `useState` para algo que deveria estar na URL.

## Geração de tipos (Orval)

- Spec em `openapi.yaml` (raiz) → `npm run api:gen` → `src/shared/api/generated/`.
- Hooks gerados (`useGetTodos`, `useCreateTodo`) e schemas Zod (`getGetTodosResponse`).
- Use os hooks gerados em vez de escrever `api.ts` manual sempre que houver spec OpenAPI.
- O exemplo `features/todos/api.ts` é didático — em produção, descarte e use os hooks do Orval.

## Nomenclatura

- Arquivos: `kebab-case.ts` para utils, `PascalCase.tsx` para componentes.
- Hooks: `useXxx`.
- Stores: `useXxxStore` ou `useXxxUiStore` (quando é puro UI state).
- Schemas: `xxxSchema`, tipo: `Xxx`.
- Query keys: factory exportada como `xxxKeys`.

## Decisões padrão

- **Onde colocar este código?** Se é específico de uma feature → dentro dela. Se 2+ features usam → `shared/`. Se é orquestração de provider → `app/`.
- **Devo criar feature nova?** Sim, se tem rota própria E entidade de negócio própria. Não, se é só componente reutilizável.
- **Posso pular o `index.ts`?** Não. É o boundary contratual da feature.
