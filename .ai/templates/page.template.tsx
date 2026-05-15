// Template: página (rota) TanStack Router file-based.
// Salve em: src/routes/{{path}}.tsx
// O TanStack Router plugin (vite.config.ts) regenera src/routeTree.gen.ts ao salvar.
// Para rotas com search params validados, descomente o bloco validateSearch.

import { createFileRoute } from '@tanstack/react-router';
// import { z } from 'zod';
import { {{Name}}Page } from '@/features/{{feature}}';

// const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute('/{{path}}')({
  component: {{Name}}Page,
  // validateSearch: searchSchema,
  // loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(...),
});
