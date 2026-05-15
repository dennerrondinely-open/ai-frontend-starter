# Plan: Filtro por texto na lista de todos

**Spec:** ./spec.md
**Created:** 2026-05-15

## Resumo técnico

Adicionar search param `q` validado via Zod na rota `/todos`, ler o valor com `Route.useSearch()` em `TodosPage`, propagar para `TodoList` que aplica filtro `includes` case-insensitive + acento-insensitive em memória combinando com o filtro de status existente. Helper de normalização novo em `shared/lib`. Botão "x" + atalho Esc para limpar.

## Estrutura proposta

Mudanças incrementais — sem nova feature, estendendo `todos`:

```
src/
├── routes/todos.tsx                          # adicionar validateSearch
├── shared/lib/normalize.ts                   # NOVO — normalizeForSearch()
└── features/todos/
    ├── components/
    │   ├── TodosPage.tsx                     # MOD — ler q, escrever via navigate
    │   ├── TodoSearchInput.tsx               # NOVO — input controlado + clear
    │   ├── TodoList.tsx                      # MOD — aceitar prop `query`
    │   └── TodoSearchInput.test.tsx          # NOVO — teste integration
    └── (sem mudança em api/hooks/store)
```

## Schemas Zod

Schema de search params em `src/routes/todos.tsx`:

```ts
const todosSearchSchema = z.object({
  q: z.string().trim().max(100).default('').catch(''),
});
type TodosSearch = z.infer<typeof todosSearchSchema>;
```

`.catch('')` garante que URL malformada cai pra default sem quebrar a rota.

## Rotas

- `/todos?q=<texto>` — search params validados.
- Atualização do termo via `navigate({ search: (prev) => ({ ...prev, q: novo }) })` (replace para não poluir histórico a cada tecla).

## Componentes

| Componente | Origem | Responsabilidade |
|------------|--------|------------------|
| `TodoSearchInput` | NOVO | Input controlado, botão "x", Esc, `aria-label`, debounce mínimo via `setTimeout` simples (60ms) na escrita da URL |
| `TodosPage` | MOD | Lê `q` de search, passa para `TodoList`, renderiza `TodoSearchInput` antes do nav de status |
| `TodoList` | MOD | Aceita prop opcional `query: string`; aplica filtro combinado (status + texto); empty state contextualizado |
| `Input` | reuso `@/shared/ui/input` | base do `TodoSearchInput` |

`TodoList` mantém o store Zustand para o filtro de status (não migra para URL nesta feature — fora de escopo).

## Estado

- **URL state**: `q` (search param) — fonte de verdade para o termo.
- **Client state**: `filter` continua em `useTodosUiStore`.
- **Server state**: inalterado (`useTodosList`).
- **Form state**: não há form (input controlado puro).

## Helper compartilhado

`src/shared/lib/normalize.ts`:

```ts
export function normalizeForSearch(s: string): string {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
}
```

Usado em duas pontas: termo digitado e cada `todo.title` na hora do `.filter`. Função pura, testável isoladamente.

## Acessibilidade

- `<input aria-label="Buscar todos">`.
- Botão clear com `aria-label="Limpar busca"` e `type="button"`.
- Tecla `Esc` no input → limpar.
- Contagem de resultados em `<div role="status" aria-live="polite">{n} todos</div>` próximo à lista.

## Dependências externas

Nenhuma nova. Já temos `zod`, `@tanstack/react-router`.

## Testes

- **Unit** (`shared/lib/normalize.test.ts`): casos de acento, case, espaços.
- **Integration** (`TodoSearchInput.test.tsx`):
  - digitar filtra a lista renderizada
  - Esc limpa
  - botão "x" limpa
  - busca + filtro de status combinados
  - empty state aparece com a frase correta
- **E2E**: não — comportamento já coberto por testes integration; adicionar e2e seria custo sem benefício novo.

## Riscos / pontos de atenção

- `navigate` por tecla pode acumular history entries — usar `replace: true`.
- `validateSearch` precisa estar 100% tolerante (`.catch('')`) ou link inválido quebra a rota.
- Empty state precisa diferenciar "lista vazia mesmo" vs "sem resultados pra busca" — usar a presença de `q` para decidir a mensagem.

## Reusos identificados

- `@/shared/ui/input` — base do search input.
- `@/shared/lib/cn` — classes condicionais.
- `lucide-react` (já no `package.json`) — ícone `X` no botão clear e `Search` no prefixo do input.
- Padrão de filtro do `TodoList` atual (status) — estender, não duplicar lógica.
