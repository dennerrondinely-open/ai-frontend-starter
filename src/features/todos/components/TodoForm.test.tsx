import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TodoForm } from '@/features/todos/components/TodoForm';
import { render } from '@/test/test-utils';

describe('TodoForm', () => {
  it('exibe erro quando título está vazio', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    await user.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(await screen.findByText(/obrigatório/i)).toBeInTheDocument();
  });

  it('cria todo via API mockada e limpa o input', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByPlaceholderText(/precisa ser feito/i);
    await user.type(input, 'Estudar Spec Kit');
    await user.click(screen.getByRole('button', { name: /adicionar/i }));

    await waitFor(() => expect(input).toHaveValue(''));
  });
});
