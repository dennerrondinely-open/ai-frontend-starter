import { useTodosList } from '@/features/todos/hooks/useTodos';
import { useTodosUiStore } from '@/features/todos/store';
import { Card, CardContent } from '@/shared/ui/card';

export function TodoList() {
  const { data, isPending, isError, error } = useTodosList();
  const filter = useTodosUiStore((s) => s.filter);

  if (isPending) {
    return <p className="text-sm text-muted-foreground">Carregando…</p>;
  }
  if (isError) {
    return (
      <p role="alert" className="text-sm text-destructive">
        Erro ao carregar: {error.message}
      </p>
    );
  }

  const filtered = data.filter((t) =>
    filter === 'all' ? true : filter === 'completed' ? t.completed : !t.completed,
  );

  if (filtered.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhum todo encontrado.</p>;
  }

  return (
    <ul className="space-y-2">
      {filtered.map((todo) => (
        <li key={todo.id}>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>
                {todo.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {todo.completed ? 'feito' : 'pendente'}
              </span>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
