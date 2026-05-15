import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Frontend Starter</h1>
        <p className="text-muted-foreground">
          Template React/Vite com Spec-Driven Development e regras prontas para IA.
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2">
        <Card title="Specs (SDD)" body="Crie features com /specify, /plan, /tasks, /implement." />
        <Card title="Regras de IA" body="Veja .ai/rules antes de escrever código novo." />
        <Card
          title="Templates"
          body="Esqueletos prontos em .ai/templates para componentes, hooks e features."
        />
        <Card title="Ferramental" body="Vite, Vitest, Playwright, Biome, Orval, MSW, TanStack." />
      </ul>
      <Link
        to="/todos"
        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Ver feature de exemplo
      </Link>
    </section>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <li className="rounded-lg border p-4">
      <h2 className="font-medium">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </li>
  );
}
