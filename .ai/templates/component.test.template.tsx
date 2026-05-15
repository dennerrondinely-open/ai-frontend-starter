// Template: teste de componente com Vitest + Testing Library + MSW.
// Salve em: src/features/<feature>/components/{{Name}}.test.tsx

import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/test-utils';
import { {{Name}} } from '@/features/<feature>/components/{{Name}}';

describe('{{Name}}', () => {
  it('renderiza estado inicial', () => {
    render(<{{Name}} />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('responde a interação do usuário', async () => {
    const user = userEvent.setup();
    render(<{{Name}} />);

    await user.click(screen.getByRole('button', { name: /clique/i }));

    expect(await screen.findByText(/sucesso/i)).toBeInTheDocument();
  });
});
