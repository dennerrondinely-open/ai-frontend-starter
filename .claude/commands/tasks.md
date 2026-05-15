---
description: A partir de plan.md, gera tasks.md com checklist executável passo-a-passo.
argument-hint: [NNN-slug opcional; default = última spec com plan.md mas sem tasks.md]
---

Quebre o plan em tasks executáveis.

## Passos

1. Determine qual feature usar (mesma lógica de `/plan`).
2. Leia `plan.md`.
3. Escreva `specs/NNN-slug/tasks.md` no formato abaixo.

## Estrutura obrigatória do tasks.md

```markdown
# Tasks: <Título>

**Plan:** ./plan.md

Marque tasks com `[x]` ao concluir. Mantenha ordem — dependências fluem de cima para baixo.

## Setup
- [ ] T001 Criar estrutura de pastas `src/features/<feature>/`
- [ ] T002 Criar arquivo `index.ts` da feature

## Schemas e tipos
- [ ] T010 `schemas.ts` — Zod schemas (referenciar plan §Schemas)
- [ ] T011 Verificar: `npm run typecheck`

## API
- [ ] T020 Implementar `api.ts` (OU rodar `npm run api:gen` se houver OpenAPI)
- [ ] T021 MSW handler em `src/test/msw/handlers.ts` para a nova rota

## Hooks
- [ ] T030 `hooks/use<Name>.ts` — query keys factory + Query/Mutation
- [ ] T031 Teste unit do hook (se houver lógica não-trivial além de Query)

## Store (se aplicável)
- [ ] T040 `store.ts` — Zustand UI state

## Componentes
- [ ] T050 `components/<Name>Form.tsx` (RHF + zodResolver)
- [ ] T051 `components/<Name>List.tsx`
- [ ] T052 `components/<Name>Page.tsx`
- [ ] T053 Teste integration de `<Name>Form` (validação + submit happy path)

## Rota
- [ ] T060 `src/routes/<path>.tsx`
- [ ] T061 Verificar: `npm run dev` e abrir a rota

## E2E (se crítico)
- [ ] T070 `e2e/<feature>.spec.ts` cobrindo fluxo principal

## Polimento
- [ ] T080 `npm run lint:fix`
- [ ] T081 `npm run typecheck`
- [ ] T082 `npm test`
- [ ] T083 Atualizar `spec.md` para `Status: done`
```

## Regras

- Cada task é pequena (15-45 min de trabalho).
- Cada task deve ter um critério verificável (arquivo criado, comando passa, teste verde).
- Se uma task da spec parece grande demais, quebre.
- Não pule a fase de testes — está no plano por design.
