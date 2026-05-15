---
description: Executa a próxima task pendente do tasks.md atual seguindo as regras .ai/rules.
argument-hint: [NNN-slug opcional; default = última feature com tasks.md aberto]
---

Execute a próxima task pendente.

## Passos

1. Determine a feature alvo (mesma lógica de `/plan`).
2. Leia `tasks.md` e identifique a primeira task `[ ]` (não marcada).
3. Leia obrigatoriamente:
   - `spec.md` e `plan.md` da feature (contexto)
   - As regras de `.ai/rules/` relevantes para essa task (component → react-patterns + tailwind; schema → typescript; teste → testing)
   - Templates relevantes em `.ai/templates/`
4. Implemente a task. Reuse helpers existentes (`@/shared/lib/cn`, `@/shared/lib/http`, `@/shared/ui/*`) sempre que possível.
5. Execute o critério de verificação da task (build, lint, test conforme aplicável).
6. Marque a task como `[x]` em `tasks.md` e pare. **Não execute a próxima sem confirmação humana.**

## Regras

- Uma execução = uma task. Sem batch.
- Se a task estiver bloqueada por algo não previsto no plan, **PARE** e reporte ao humano. Não invente solução.
- Se durante a implementação você precisar editar algo fora do escopo da task atual (refactor de `shared/`, adicionar dep), pare e pergunte primeiro.
- Antes de finalizar, rode `npm run lint:fix` no(s) arquivo(s) tocado(s).
