# React Patterns

## Server vs Client state

| Tipo | Onde mora | Exemplo |
|------|-----------|---------|
| Vem do servidor | TanStack Query | lista de todos, detalhes do usuário |
| UI local de feature | Zustand store da feature | filtro selecionado, modal aberto |
| Form temporário | React Hook Form | dados antes de submeter |
| URL | Router search params | filtros que devem ser shareable |
| Componente isolado | `useState` | toggle de tooltip, hover |

**Regra de ouro**: se o dado vem da rede, ele NÃO vai em `useState`. Sempre Query.

## TanStack Query

- Sempre exporte um `xxxKeys` factory: `{ all, list(), detail(id) }`.
- `staleTime` default global é 30s (`app/query-client.ts`). Override por hook se justificado.
- Mutations atualizam cache via `setQueryData` (otimista) ou `invalidateQueries` (refetch).
- `useSuspenseQuery` para rotas com `loader`. Combine com Error Boundary.

## React Hook Form + Zod

```tsx
const form = useForm<Input>({
  resolver: zodResolver(inputSchema),
  defaultValues: { ... },
});
```

- Nunca controle inputs manualmente. Use `register` ou `Controller`.
- Erros vêm de `formState.errors`. Renderize com `aria-invalid` + `aria-describedby`.
- Submit assíncrono: `handleSubmit(async (data) => { ... })`. Use `isSubmitting` para disable.

## Zustand

- Um store por feature, em `store.ts`.
- Selector pattern: `useTodosUiStore((s) => s.filter)` em vez de `useTodosUiStore()` (evita re-render do componente todo).
- Não armazene server state. Não armazene derived state que pode ser computado.
- Sem middleware desnecessário. `persist` só se realmente precisa cross-session.

## Componentes

- **Funcionais + hooks**, sempre. Sem class components.
- **Props com TypeScript explícito**: `function Foo({ x }: { x: string })`. Sem `React.FC`.
- **Componentes pequenos**. Se passa de 150 linhas, considere quebrar.
- **Children-as-data sobre render-props**. Composição via `<Card.Header>` é melhor que `<Card render={(h) => ...} />`.
- **Sem `useEffect` para derivar state**. Calcule no render. `useEffect` é só para sincronizar com sistemas externos.

## Anti-patterns

- ❌ `const [data, setData] = useState(); useEffect(() => fetch().then(setData), [])`
  → Use `useQuery`.
- ❌ `useMemo` em valor primitivo barato.
  → Não otimize sem profile.
- ❌ Componente que aceita `onClick` E `onSelect` E `onChange` para a mesma ação.
  → Escolha um nome consistente.
- ❌ Estado global para tudo.
  → Comece local, eleve quando 2+ componentes precisarem.
- ❌ `key={index}` em lista que pode reordenar.
  → Use ID estável.

## Suspense + Error Boundaries

- Rotas TanStack Router suportam `errorComponent` e `pendingComponent` por arquivo. Use-os.
- Para fetch dentro de componente: `useSuspenseQuery` + `<Suspense>` + `<ErrorBoundary>` no nível certo.
