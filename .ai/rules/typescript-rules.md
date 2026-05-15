# TypeScript Rules

## Configuração

- `strict: true` + `noUnusedLocals` + `noUnusedParameters` + `noImplicitOverride` + `noUncheckedSideEffectImports` (ver `tsconfig.app.json`).
- `verbatimModuleSyntax: true` → use `import type` para tipos.
- `moduleResolution: bundler`.

## Regras

1. **Sem `any`.** Use `unknown` e estreite com `instanceof`/`typeof`/Zod parse.
2. **Schemas Zod são source of truth.** Tipos de domínio vêm de `z.infer<typeof schema>`.
3. **`import type` para imports puramente de tipos.** Linter força.
4. **Discriminated unions sobre flags booleanas opcionais**:

```ts
// ❌
type State = { loading?: boolean; error?: Error; data?: T };

// ✅
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: T };
```

5. **Não use `as` casual.** Permitido só:
   - `as const` (literais readonly)
   - `as unknown as T` com comentário explicando porque o type system não pode inferir
   - Refining após type guard
6. **Funções públicas têm tipo de retorno explícito.** Internas podem inferir.
7. **`Pick`/`Omit`/`Partial`** > redeclarar interface.
8. **Genéricos só quando agregam valor.** Se você só usa `T` uma vez, provavelmente não precisa.

## Validação em fronteiras

Sempre parse com Zod ao receber dado de:
- API HTTP (mesmo se gerado, valide na primeira vez se houver dúvida do backend)
- `localStorage` / `sessionStorage`
- URL search params
- `import.meta.env` (já feito em `shared/lib/env.ts`)
- Mensagens de WebSocket / postMessage

## Tipos do React

- Componente: `function Foo(props: FooProps)`. Sem `React.FC`.
- Children: `children: React.ReactNode`.
- Ref: `forwardRef<HTMLButtonElement, ButtonProps>(...)`.
- Eventos: `React.MouseEvent<HTMLButtonElement>` (usar o tipo nativo do elemento).

## `unknown` vs `any`

```ts
// ❌
function parse(json: any) { return json.foo.bar; }

// ✅
function parse(json: unknown): Foo {
  return fooSchema.parse(json);
}
```

## Module augmentation

Permitido para extender tipos de bibliotecas (TanStack Router já faz em `app/router.tsx`). Mantenha próximo do uso, não em arquivos `*.d.ts` espalhados.
