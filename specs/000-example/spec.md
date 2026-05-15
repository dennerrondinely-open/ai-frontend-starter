# Feature: Lista de Todos

**Status:** done
**Created:** 2026-05-15

## Why

Demonstrar o fluxo SDD ponta-a-ponta com uma feature simples mas completa: input validado, lista, persistência via API, filtragem client-side, testes. Serve de espelho para novas features do projeto.

## What (escopo)

Página `/todos` onde o usuário vê todos cadastrados, cria novos e filtra por status.

### Em escopo
- Listar todos (vindos da API).
- Criar novo todo via formulário com validação.
- Filtrar lista por: todos / ativos / concluídos.
- Feedback visual de sucesso/erro nas operações.

### Fora de escopo
- Editar título de um todo existente.
- Deletar todos.
- Marcar como concluído (todos vêm prontos do mock).
- Sincronização offline.
- Auth.

## User stories

- Como visitante, quero ver a lista atual de todos, para entender o estado da minha agenda.
- Como visitante, quero criar um todo digitando o título e clicando em "Adicionar", para registrar uma nova tarefa.
- Como visitante, quero filtrar por status, para focar apenas no que está pendente.

## Critérios de aceitação

- **Cenário 1 — Listar**: GIVEN existem 2 todos no servidor, WHEN entro em `/todos`, THEN vejo os 2 títulos.
- **Cenário 2 — Validação**: GIVEN estou em `/todos`, WHEN clico em "Adicionar" sem digitar nada, THEN vejo a mensagem "Título é obrigatório" e o request NÃO é enviado.
- **Cenário 3 — Criar**: GIVEN digitei "Estudar Spec Kit" no input, WHEN clico em "Adicionar", THEN o todo aparece na lista, o input fica vazio e um toast de sucesso é exibido.
- **Cenário 4 — Filtrar**: GIVEN há 1 todo concluído e 1 pendente, WHEN clico no filtro "concluídos", THEN só o concluído aparece.

## Restrições e suposições

- API segue contrato OpenAPI mínimo (`openapi.yaml`).
- Em dev/teste, MSW mocka as rotas — não depende de backend real.
- Acessibilidade AA (foco visível, labels, aria-invalid em erro).

## Pontos a clarificar

(nenhum — feature de exemplo)
