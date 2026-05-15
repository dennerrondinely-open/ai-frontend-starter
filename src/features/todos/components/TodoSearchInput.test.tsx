import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { TodoSearchInput } from '@/features/todos/components/TodoSearchInput';

async function setup(initialQuery = '') {
  const rootRoute = createRootRoute({ component: () => <Outlet /> });
  const todosRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/todos',
    component: () => <TodoSearchInput />,
    validateSearch: z.object({
      q: z.string().trim().max(100).default('').catch(''),
    }),
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([todosRoute]),
    history: createMemoryHistory({
      initialEntries: [`/todos${initialQuery ? `?q=${initialQuery}` : ''}`],
    }),
  });
  await router.load();
  const queryClient = new QueryClient();
  const utils = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  await waitFor(() => expect(utils.container.querySelector('input')).not.toBeNull());
  return { router, ...utils };
}

describe('TodoSearchInput', () => {
  it('atualiza ?q= conforme o usuário digita', async () => {
    const user = userEvent.setup();
    const { router } = await setup();

    await user.type(screen.getByRole('searchbox', { name: /buscar todos/i }), 'comprar');

    await waitFor(() => expect(router.state.location.search).toEqual({ q: 'comprar' }));
  });

  it('Esc limpa a busca', async () => {
    const user = userEvent.setup();
    const { router } = await setup('reuniao');

    const input = screen.getByRole('searchbox', { name: /buscar todos/i });
    await user.click(input);
    await user.keyboard('{Escape}');

    await waitFor(() => expect(router.state.location.search).toEqual({ q: '' }));
  });

  it('botão "Limpar busca" limpa a busca', async () => {
    const user = userEvent.setup();
    const { router } = await setup('algo');

    await user.click(screen.getByRole('button', { name: /limpar busca/i }));

    await waitFor(() => expect(router.state.location.search).toEqual({ q: '' }));
  });

  it('botão de limpar não aparece quando a busca está vazia', async () => {
    await setup();

    expect(screen.queryByRole('button', { name: /limpar busca/i })).not.toBeInTheDocument();
  });
});
