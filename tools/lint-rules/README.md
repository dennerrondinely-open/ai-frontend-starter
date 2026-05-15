# Custom Lint Rules

Plugins **GritQL** carregados pelo Biome (configurado em `biome.json` → `plugins`).

GritQL é a engine de pattern-matching/rewrite do Biome v2. Cada arquivo `.grit` define UMA regra.

## Anatomia de uma regra

```grit
language js

`<padrão a casar>` where {
  $variavel <: <restrição>,
  register_diagnostic(span = $variavel, message = "Mensagem para o dev")
}
```

- `language js` aplica também a TS/TSX automaticamente.
- Backticks delimitam padrões de código com metavariáveis (`$name`).
- `register_diagnostic` emite o erro/warning. Use `severity = "error"` para bloquear lint.

## Regras existentes

| Arquivo | O que força |
|---------|-------------|
| `no-direct-axios.grit` | Imports de `axios` só são permitidos em `src/shared/lib/http.ts` e `src/shared/api/mutator.ts`. Forças as features a usar o `httpClient` compartilhado. |

## Adicionando uma regra

1. Crie `tools/lint-rules/<nome>.grit`.
2. Adicione o caminho ao array `plugins` em `biome.json`.
3. Documente a regra aqui (uma linha na tabela acima).
4. Rode `npm run lint` para validar.

## Recursos

- GritQL docs: https://docs.grit.io/language/overview
- Biome plugins: https://biomejs.dev/linter/plugins/
