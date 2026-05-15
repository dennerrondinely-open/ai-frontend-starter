// Template: componente React básico.
// Substitua {{Name}} (PascalCase) e {{name}} (camelCase) ao copiar.
// Salve em: src/features/<feature>/components/{{Name}}.tsx
//   (ou src/shared/ui/{{name}}.tsx se for genérico).

import { cn } from '@/shared/lib/cn';

interface {{Name}}Props {
  className?: string;
  // TODO: defina props específicas
}

export function {{Name}}({ className }: {{Name}}Props) {
  return (
    <div className={cn('', className)}>
      {/* TODO: implementar */}
    </div>
  );
}
