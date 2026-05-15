# Tasks: Filtro por texto na lista de todos

**Plan:** ./plan.md

Marque tasks com `[x]` ao concluir. Mantenha ordem — dependências fluem de cima para baixo.

## Helper compartilhado
- [x] T001 `src/shared/lib/normalize.ts` — `normalizeForSearch(s: string): string` (NFD + remove diacritics + lowercase + trim)
- [x] T002 `src/shared/lib/normalize.test.ts` — casos: acento, case, espaços, string vazia, unicode combinados
- [x] T003 Verificar: `npm test -- normalize` (6/6 ✅)

## Rota
- [x] T010 `src/routes/todos.tsx` — adicionar `validateSearch` com `todosSearchSchema` (`q: string trim max(100) default('') catch('')`)
- [x] T011 Verificar: `npm run typecheck` ✅ (após `vite build` regerar `routeTree.gen.ts`)

## Componente de busca
- [x] T020 `src/features/todos/components/TodoSearchInput.tsx` — input controlado, ícone Search à esquerda (lucide), botão X à direita quando há valor, Esc limpa, `aria-label`, escreve em `?q=` via `navigate({ search, replace: true })`
- [x] T021 `src/features/todos/components/TodoSearchInput.test.tsx` — 4/4 ✅ (digitar, Esc, botão X, ausência do botão sem busca)

## Lista
- [x] T030 `src/features/todos/components/TodoList.tsx` — prop `query?: string`, filtro combinado com `normalizeForSearch`, empty state contextual, contagem `aria-live` em sr-only
- [x] T031 (skip — sem teste prévio; cobertura virá pelo teste integration de `TodosPage` se necessário)

## Página
- [x] T040 `src/features/todos/components/TodosPage.tsx` — `Route.useSearch()` lê `q`, `<TodoSearchInput />` entre `TodoForm` e nav de filtros, `query={q}` propagado para `<TodoList />`

## Polimento
- [x] T080 `npm run lint:fix` ✅ (0 alterações)
- [x] T081 `npm run typecheck` ✅
- [x] T082 `npm test` ✅ 12/12 passaram (3 suites)
- [x] T083 Spec marcada como `Status: done`
