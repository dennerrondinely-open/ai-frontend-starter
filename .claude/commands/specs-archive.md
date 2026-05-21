---
description: Move uma spec done/abandoned para specs/archive/YYYY-Qn/. Regenera INDEX.md ao final.
argument-hint: [NNN-slug] (opcional; se omitido, lista candidatas)
---

Arquive uma spec concluída ou abandonada.

## Passos

1. **Determinar o alvo**:
   - Se `$ARGUMENTS` foi passado, o alvo é `specs/$ARGUMENTS/`.
   - Caso contrário, liste TODAS as specs em `specs/NNN-*/` cujo `Status:` seja `done` (e cuja `Created:` seja > 30 dias) ou `abandoned`. Mostre a lista e PARE — peça ao usuário escolher.

2. **Determinar o destino**:
   - Leia `Status:` e `Created:` da spec.
   - Calcule trimestre baseado em **hoje** (data de arquivamento), no formato `YYYY-Q[1-4]`.
   - Destino: `specs/archive/YYYY-Qn/NNN-slug/`.

3. **Validar**:
   - Spec deve ter `Status: done` ou `Status: abandoned`.
   - Se `Status: done`, exigir `Created:` há mais de 30 dias (ou avisar e confirmar com humano).
   - Se a pasta destino não existir, criar.
   - Se já existe pasta com mesmo nome no destino, ABORTAR e reportar conflito.

4. **Mover**:
   - `mv specs/NNN-slug specs/archive/YYYY-Qn/NNN-slug`
   - Use `git mv` se o repo é git-tracked (preserva histórico).

5. **Regenerar índice**:
   - Rode os passos do command `/specs-index` (não delegue a chamada — executa direto a regeneração).

6. **Reporte**:
   - Caminho de origem e destino.
   - Quantas specs ainda ativas em `specs/`.

## Regras

- NUNCA arquive spec com `Status: in-progress`, `draft` ou `approved` sem confirmação explícita.
- NÃO altere o conteúdo do spec.md ao mover (apenas o caminho).
- NÃO delete nada — só mover.
