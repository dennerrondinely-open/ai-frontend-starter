# Specs — Spec-Driven Development

Cada feature passa por 3 artefatos antes de ser implementada:

```
specs/NNN-slug/
├── spec.md     # WHAT + WHY (linguagem de produto, sem técnicas)
├── plan.md     # HOW técnico (estrutura, schemas, rotas, testes)
└── tasks.md    # Checklist executável task-a-task
```

## Navegação

- [`INDEX.md`](INDEX.md) — visão por status (in-progress, approved, draft, done, archived). Regerado por `/specs-index`.
- [`archive/`](archive/) — specs done há > 30 dias ou abandoned, agrupadas por trimestre. Veja [archive/README.md](archive/README.md).

## Fluxo

```
/specify "descrição em linguagem natural"
   ↓ (humano revisa spec.md, responde [NEEDS CLARIFICATION])
/plan
   ↓ (humano revisa plan.md)
/tasks
   ↓ (humano revisa granularidade)
/implement   (executa UMA task; rode N vezes até terminar)
   ↓ (após Status: done há > 30 dias)
/specs-archive [NNN-slug]   →   move para archive/YYYY-Qn/
```

Cada `/` é um slash command em `.claude/commands/`. Veja também o skill `new-feature` que conduz o ciclo todo.

### Outros commands de manutenção

- `/specs-index` — regenera `INDEX.md` lendo o `Status:` de cada spec.
- `/specs-archive [NNN-slug]` — arquiva uma spec done/abandoned.

## Por que SDD?

- **Spec separa o "o quê" do "como"** — quem decide produto não fica refém de quem implementa.
- **Plan revisado evita retrabalho** — descobrimos problemas de design antes de escrever código.
- **Tasks pequenas viabilizam IA** — agentes erram menos em escopo curto e bem definido.
- **Trilha de auditoria** — qualquer mudança grande tem histórico de decisões.

## Convenção

- NNN é zero-padded (001, 042, 100…). Próximo número = `max(NNN existente em specs/ E archive/) + 1`.
- Slug em kebab-case curto (3-5 palavras).
- Status no topo de `spec.md`: `draft | approved | in-progress | done | abandoned`.
- Após criar/atualizar uma spec, rode `/specs-index` para manter o `INDEX.md` em sincronia.

## Quando NÃO usar SDD

- Mudança de copy/texto.
- Bug fix pequeno (< 30min).
- Refactor sem mudança de comportamento.
- Ajuste visual isolado.

Para esses casos, faça direto e descreva no commit.

## Exemplo

Veja `000-example/` para uma feature completa de referência.
