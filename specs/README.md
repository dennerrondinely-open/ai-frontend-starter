# Specs — Spec-Driven Development

Cada feature passa por 4 artefatos antes de ser implementada:

```
specs/NNN-slug/
├── spec.md     # WHAT + WHY (linguagem de produto, sem técnicas)
├── plan.md     # HOW técnico (estrutura, schemas, rotas, testes)
└── tasks.md    # Checklist executável task-a-task
```

## Fluxo

```
/specify "descrição em linguagem natural"
   ↓ (humano revisa spec.md, responde [NEEDS CLARIFICATION])
/plan
   ↓ (humano revisa plan.md)
/tasks
   ↓ (humano revisa granularidade)
/implement   (executa UMA task; rode N vezes até terminar)
```

Cada `/` é um slash command em `.claude/commands/`. Veja também o skill `new-feature` que conduz o ciclo todo.

## Por que SDD?

- **Spec separa o "o quê" do "como"** — quem decide produto não fica refém de quem implementa.
- **Plan revisado evita retrabalho** — descobrimos problemas de design antes de escrever código.
- **Tasks pequenas viabilizam IA** — agentes erram menos em escopo curto e bem definido.
- **Trilha de auditoria** — qualquer mudança grande tem histórico de decisões.

## Convenção

- NNN é zero-padded (001, 042, 100…). Próximo número = `max(NNN existente) + 1`.
- Slug em kebab-case curto (3-5 palavras).
- Status no topo de `spec.md`: `draft | approved | in-progress | done | abandoned`.

## Quando NÃO usar SDD

- Mudança de copy/texto.
- Bug fix pequeno (< 30min).
- Refactor sem mudança de comportamento.
- Ajuste visual isolado.

Para esses casos, faça direto e descreva no commit.

## Exemplo

Veja `000-example/` para uma feature completa de referência.
