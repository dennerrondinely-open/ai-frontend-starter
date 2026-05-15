# Tailwind Rules (v4)

Este projeto usa **Tailwind CSS v4 CSS-first**. Configuração vive em `src/index.css` via `@theme {}`. **Não há `tailwind.config.ts`**.

## Tokens

Use APENAS classes que mapeiam para tokens do `@theme`. Cores hardcoded são proibidas:

```tsx
// ❌
<div className="bg-[#0f172a] text-[hsl(0_0%_100%)]">

// ✅
<div className="bg-primary text-primary-foreground">
```

Tokens disponíveis (ver `src/index.css`): `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `destructive-foreground`, `border`, `input`, `ring`.

Se precisa de cor que não existe, **adicione um token** ao `@theme` em vez de usar valor arbitrário.

## `cn()` para condicional

```tsx
import { cn } from '@/shared/lib/cn';

<button className={cn('rounded px-3 py-1', isActive && 'bg-primary text-primary-foreground', className)}>
```

`cn` faz `clsx` + `tailwind-merge` (resolve conflitos como `p-2 p-4` corretamente).

## Variantes com CVA

Componentes do design system com variantes (button, badge) **devem** usar `class-variance-authority`. Veja `src/shared/ui/button.tsx` como referência.

```tsx
const variants = cva('base-classes', {
  variants: {
    intent: { primary: '...', secondary: '...' },
    size: { sm: '...', lg: '...' },
  },
  defaultVariants: { intent: 'primary', size: 'sm' },
});
```

## Dark mode

`@custom-variant dark (&:is(.dark *))` está configurado. Toggle adicionando/removendo classe `dark` no `<html>`. Use `dark:` nos componentes.

## Layout — preferências

- **Flex/grid sobre absolute**. Posicionamento absoluto só para overlays/tooltips.
- **`gap-*` sobre `space-x-*`**. `gap` funciona em flex E grid; é mais previsível.
- **`container mx-auto px-4`** para wrappers de página (já usado em `__root.tsx`).
- Mobile-first. Sem prefixo = mobile; `sm:`/`md:`/`lg:` adicionam.

## Anti-patterns

- ❌ Classes inline com mais de 6-7 utilities sem CVA → quebre em variantes.
- ❌ `style={{ color: '#fff' }}` → use classe Tailwind ou token.
- ❌ Classe `!important` (`!bg-red-500`) → resolva o problema de especificidade.
- ❌ Misturar Tailwind com CSS module → escolha um.

## Quando escapar do Tailwind

Animações complexas, keyframes customizados ou estilos verdadeiramente únicos vão em `src/index.css` dentro de `@layer components`. Mas tente primeiro com utilities — quase sempre dá.
