// Template: custom hook (Query/Mutation ou state derivado).
// Salve em: src/features/<feature>/hooks/use{{Name}}.ts
//   (ou src/shared/hooks/use{{Name}}.ts se for genérico).

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { {{name}}Api } from '@/features/<feature>/api';
// import type { {{Input}}, {{Output}} } from '@/features/<feature>/schemas';

export const {{name}}Keys = {
  all: ['{{name}}'] as const,
  list: () => [...{{name}}Keys.all, 'list'] as const,
  detail: (id: string) => [...{{name}}Keys.all, 'detail', id] as const,
};

export function use{{Name}}List() {
  return useQuery({
    queryKey: {{name}}Keys.list(),
    queryFn: () => {
      // TODO: chamar API
      throw new Error('not implemented');
    },
  });
}

export function useCreate{{Name}}() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (_input: unknown) => {
      // TODO: chamar API
      throw new Error('not implemented');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: {{name}}Keys.all });
    },
  });
}
