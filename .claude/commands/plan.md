---
description: A partir do spec.md atual, gera plan.md técnico (HOW) seguindo .ai/rules/architecture.md.
argument-hint: [NNN-slug opcional; default = última spec sem plan.md]
---

Gere o plan técnico para a spec.

## Passos

1. Determine qual spec usar:
   - Se `$ARGUMENTS` foi passado, use `specs/$ARGUMENTS/spec.md`.
   - Caso contrário, encontre a spec mais recente (maior NNN) que NÃO tenha `plan.md`.
2. **Leia obrigatoriamente** antes de gerar:
   - O `spec.md` da feature
   - `.ai/rules/architecture.md`
   - `.ai/rules/react-patterns.md`
   - `.ai/rules/typescript-rules.md`
3. Liste `src/features/` e `src/shared/` para identificar o que já existe e pode ser reutilizado.
4. Resolva ou pergunte sobre cada `[NEEDS CLARIFICATION: ...]` antes de continuar.
5. Escreva `specs/NNN-slug/plan.md` na estrutura abaixo.

## Estrutura obrigatória do plan.md

```markdown
# Plan: <Título da feature>

**Spec:** ./spec.md
**Created:** YYYY-MM-DD

## Resumo técnico

Frase única descrevendo a abordagem.

## Estrutura proposta

src/features/<feature>/
├── api.ts (ou geração via Orval — citar)
├── schemas.ts
├── hooks/use<Name>.ts
├── store.ts (se necessário)
├── components/<Name>Page.tsx
├── components/<Name>Form.tsx
├── components/<Name>List.tsx
└── index.ts

src/routes/<path>.tsx

## Schemas Zod

Defina shape de cada entidade e input. Cite validações.

## Rotas

- `/<path>` → `<Name>Page`
- Search params validados? (com schema Zod)
- Loaders? (TanStack Router)

## Componentes

Lista com responsabilidade de cada um. Identifique quais virão de `shared/ui` (shadcn) vs novos.

## Estado

- Server state: queries/mutations + keys
- Client state: store (se aplicável)
- Form state: schema RHF + zodResolver

## Dependências externas

Novas libs? Justifique. Prefira reutilizar.

## Testes

- Unit (que funções/schemas)
- Integration (que componentes + MSW handlers)
- E2E (qual fluxo crítico, se algum)

## Riscos / pontos de atenção

- ...

## Reusos identificados

- `src/shared/<x>` já existente — usar
- `src/features/<y>` tem padrão similar — copiar abordagem de `<arquivo>`
```

## Regras

- O plan respeita as regras de import de `.ai/rules/architecture.md`. Se a feature precisa de algo cross-feature, eleve para `shared/`.
- Não invente API. Se a spec não diz, use placeholder e marque `[ASSUMPTION: ...]`.
- Após criar, NÃO rode `/tasks` automaticamente — humano revisa o plano.
