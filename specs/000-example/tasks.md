# Tasks: Lista de Todos

**Plan:** ./plan.md

## Setup
- [x] T001 Criar `src/features/todos/`
- [x] T002 Criar `src/features/todos/index.ts`

## Schemas e tipos
- [x] T010 `schemas.ts` com `todoSchema` e `createTodoInputSchema`

## API
- [x] T020 `api.ts` (manual; em produção real, gerar via Orval)
- [x] T021 MSW handlers em `src/test/msw/handlers.ts` para GET/POST `/todos`

## Hooks
- [x] T030 `hooks/useTodos.ts` com `todosKeys`, `useTodosList`, `useCreateTodo`

## Store
- [x] T040 `store.ts` com `useTodosUiStore({ filter, setFilter })`

## Componentes
- [x] T050 `components/TodoForm.tsx` (RHF + Zod + Sonner)
- [x] T051 `components/TodoList.tsx` (filtrado)
- [x] T052 `components/TodosPage.tsx` (composição + tabs de filtro)
- [x] T053 `components/TodoForm.test.tsx`

## Rota
- [x] T060 `src/routes/todos.tsx`
- [x] T061 Adicionar link no header (`__root.tsx`)

## E2E
- [x] T070 `e2e/example.spec.ts` (home → /todos)

## Polimento
- [ ] T080 `npm run lint:fix`
- [ ] T081 `npm run typecheck`
- [ ] T082 `npm test`
- [x] T083 `spec.md` marcado como `Status: done`
