# Frontend Rules

Princípios gerais que valem para QUALQUER código UI deste repo. Todas as outras regras (`architecture.md`, `react-patterns.md`, `tailwind-rules.md`) refinam estes princípios — leia-os depois deste.

## Princípios

1. **Acessibilidade não é opcional.** Toda UI interativa deve ter `role`, `aria-*` correto e ser navegável por teclado.
2. **Performance importa, mas correção primeiro.** Não micro-otimize antes de medir. Use React Devtools Profiler antes de adicionar `memo`/`useMemo`/`useCallback`.
3. **Source of truth única.** Cada pedaço de estado vive em UM lugar (server state em TanStack Query, client state em Zustand, form state em RHF). Nunca duplique.
4. **Schemas Zod são contrato.** Tipos vêm de schemas via `z.infer`, nunca o contrário. Validar entradas externas (API, env, localStorage, URL params).
5. **Sem `any`, sem `as` casual.** `unknown` + parse Zod. `as` só para satisfazer overloads conhecidos com comentário de justificativa.
6. **Code splitting por rota.** Rotas TanStack Router já fazem auto code-splitting (configurado em `vite.config.ts`). Não importe lazy manual.

## Do / Don't rápido

| Do | Don't |
|----|-------|
| `const Schema = z.object({...}); type T = z.infer<typeof Schema>` | `interface T {...}` para dados de API |
| `<button type="button" onClick={...}>` | `<div onClick={...}>` |
| `aria-label` em ícone-only buttons | botões sem rótulo acessível |
| Componente puro recebe props, retorna JSX | Componente acessa `window`/`document` direto sem `useEffect` |
| Erros tratados com `try/catch` + `toast.error` | Erros silenciados ou só `console.log` |

## Acessibilidade — checklist mínimo por componente

- [ ] Foco visível (`focus-visible:ring-2`)
- [ ] Contraste AA (use tokens do `@theme`, não cores hardcoded)
- [ ] Inputs com `<label>` associado (`htmlFor`/`id` ou `<Label>`)
- [ ] Estados de erro com `aria-invalid` + `aria-describedby`
- [ ] Imagens com `alt` (vazio se decorativa)
- [ ] Navegação por Tab funciona na ordem visual

## Quando pedir validação humana

- Mudanças em rotas públicas/auth
- Adição de dependência > 50KB gzip
- Bypass de regra de lint
- Quebra de contrato de API (gerar tipos via `npm run api:gen` resolve a maioria)
