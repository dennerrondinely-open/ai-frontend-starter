# Testing Rules

Três níveis: **unit (Vitest)**, **integration (Vitest + MSW)**, **e2e (Playwright)**. Pirâmide normal: muitos unit, alguns integration, poucos e2e.

## O que testar onde

| Tipo | Testa | Onde |
|------|-------|------|
| Unit | Função pura, schema Zod, store Zustand isolado | `*.test.ts` ao lado |
| Integration | Componente React + hooks + API mockada (MSW) | `*.test.tsx` ao lado |
| E2E | Fluxo crítico de usuário (login, checkout) | `e2e/*.spec.ts` |

Não escreva e2e para tudo. Escreva e2e só para os 3-5 fluxos que se quebrados, o produto está quebrado.

## Estrutura — AAA

```ts
it('descreve comportamento esperado', async () => {
  // Arrange
  const user = userEvent.setup();
  render(<Component />);

  // Act
  await user.click(screen.getByRole('button', { name: /enviar/i }));

  // Assert
  expect(await screen.findByText(/sucesso/i)).toBeInTheDocument();
});
```

## Queries do Testing Library — prioridade

1. `getByRole` (ARIA — testa acessibilidade de graça)
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (último recurso — adicione `data-testid` só quando os outros não funcionarem)

## MSW

- Handlers em `src/test/msw/handlers.ts`. Compartilhados entre testes Vitest e dev (`VITE_ENABLE_MSW=true`).
- Em `setup.ts`: `server.listen({ onUnhandledRequest: 'error' })` — falha se algum teste fizer fetch não mockado.
- Override por teste: `server.use(http.get('/x', () => HttpResponse.json(...)))`.
- Sem mock de `axios` direto. Sempre via MSW (testa a stack inteira).

## React Hook Form em testes

- Use `userEvent` (não `fireEvent`). RHF lida bem com `userEvent.type`.
- Aguarde validação assíncrona com `waitFor` ou `findBy*`.
- Para schemas Zod assíncronos, considere `await waitFor` antes de assertar erros.

## TanStack Query em testes

- `test-utils.tsx` já fornece `render` com `QueryClient` próprio (sem retry, sem cache).
- Nunca compartilhe `queryClient` entre testes.
- Aguarde com `findBy*` — não com `waitFor` em loop verificando se loading sumiu.

## E2E (Playwright)

- Sempre `await expect(...).toBeVisible()` — Playwright tem auto-wait, sem sleeps manuais.
- `baseURL` configurado. Use rotas relativas: `page.goto('/todos')`.
- Para testes que dependem de dados, prefira seedar via API call no `beforeEach` em vez de UI.
- Não teste browser-specific quirks — Playwright já roda em Chromium por padrão (config).

## Anti-patterns

- ❌ Snapshots de árvore de componente (testar implementação, não comportamento).
- ❌ Mock de `axios`/`fetch` direto no teste (use MSW).
- ❌ `setTimeout` ou `sleep` em teste (use `findBy*`/`waitFor`).
- ❌ `getByTestId` quando `getByRole` funcionaria.
- ❌ Teste que precisa rodar em ordem específica.

## Coverage

- Reports em `coverage/`. Não há threshold mandatório, mas mire em ~80% de linhas em `features/`.
- Não cubra `routeTree.gen.ts`, generated, `main.tsx` (já no exclude).
