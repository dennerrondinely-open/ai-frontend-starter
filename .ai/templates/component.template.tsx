// Template: componente React básico.
// Substitua {{Name}} (PascalCase) e {{name}} (camelCase) ao copiar.
//
// Onde salvar — escolha a camada certa:
//   src/features/<feature>/components/{{Name}}.tsx   → lógica de negócio ou específico de feature
//   src/shared/ui/atoms/{{name}}.tsx                 → primitivo shadcn/Radix (Button, Badge…)
//   src/shared/ui/molecules/{{name}}.tsx             → composição de átomos sem lógica (InputWithLabel…)
//   src/shared/ui/organisms/{{name}}.tsx             → seção complexa reutilizável (DataTable, Modal…)
//
// Consumers sempre importam de '@/shared/ui', nunca de sublayers diretamente.

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
