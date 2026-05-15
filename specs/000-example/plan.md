# Plan: Lista de Todos

**Spec:** ./spec.md
**Created:** 2026-05-15

## Resumo técnico

Feature client-side em `src/features/todos/` consumindo `/todos` (mockada via MSW em dev/teste, via OpenAPI/Orval em prod). Form com RHF + Zod, lista com TanStack Query, filtro com Zustand UI store.

## Estrutura proposta

```
src/features/todos/
├── api.ts                          # GET/POST /todos
├── schemas.ts                      # Zod: todoSchema, createTodoInputSchema
├── hooks/useTodos.ts               # useTodosList, useCreateTodo + todosKeys
├── store.ts                        # useTodosUiStore (filter)
├── components/
│   ├── TodoForm.tsx                # RHF + Zod
│   ├── TodoList.tsx                # render lista filtrada
│   ├── TodoForm.test.tsx
│   └── TodosPage.tsx
└── index.ts                        # exporta TodosPage

src/routes/todos.tsx                # createFileRoute('/todos')
src/test/msw/handlers.ts            # GET/POST /todos
```

## Schemas Zod

- `todoSchema`: `{ id: string, title: string (1-200 chars), completed: boolean }`
- `createTodoInputSchema`: `{ title: string (1-200) }` com mensagens em PT-BR.
- Tipos via `z.infer`.

## Rotas

- `/todos` → `TodosPage`. Sem search params nesta versão. Sem loader (Query client busca on-mount).

## Componentes

| Componente | Origem | Função |
|------------|--------|--------|
| `Button`, `Input`, `Card` | `src/shared/ui/` | reuso (shadcn) |
| `TodoForm` | novo | input + submit |
| `TodoList` | novo | render filtrado |
| `TodosPage` | novo | layout + filtros + composição |

## Estado

- Server: `useTodosList` (queryKey `['todos','list']`), `useCreateTodo` (otimista via `setQueryData`).
- Client: `useTodosUiStore({ filter })`.
- Form: RHF + zodResolver(`createTodoInputSchema`).

## Dependências externas

Nenhuma nova — todas já estão no `package.json` base.

## Testes

- **Unit**: schemas Zod (rejeita título vazio).
- **Integration**: `TodoForm.test.tsx` cobre validação vazia + submit happy path (com MSW).
- **E2E**: `e2e/example.spec.ts` cobre nav home → /todos.

## Riscos / pontos de atenção

- MSW precisa estar ativo nos testes (`server.listen` no setup) — já está.
- Tokens de cor devem vir do `@theme` em `index.css`.

## Reusos identificados

- `@/shared/ui/{button,input,card}` — base shadcn.
- `@/shared/lib/cn` — concat de classes.
- `@/test/test-utils` — `render` com QueryClientProvider de teste.
