# Feature: Filtro por texto na lista de todos

**Status:** done
**Created:** 2026-05-15

## Why

A lista de todos hoje só permite filtrar por status (todos / ativos / concluídos). Quando há muitos itens, achar um específico exige rolar a lista. Um campo de busca textual reduz o tempo de localização e é o mecanismo de filtragem mais natural para usuários acostumados com listas.

## What (escopo)

Adicionar um campo de busca acima da lista que filtra os todos exibidos pelo título conforme o usuário digita.

### Em escopo
- Campo de input de busca visível na página `/todos`.
- Filtragem cliente-side, em tempo real, sobre o `title` dos todos já carregados.
- Combinação com o filtro de status existente (busca por texto E status, ambos aplicados).
- Limpar a busca rapidamente (botão "x" ou tecla Esc).
- Estado vazio quando a busca não retorna resultados ("Nenhum todo encontrado para 'xyz'").

### Fora de escopo
- Busca no servidor (paginação/grandes volumes).
- Busca por outros campos (id, completed).
- Histórico de buscas.
- Highlight do termo casado no resultado.
- Persistir a busca entre navegações.

## User stories

- Como usuário com muitos todos, quero digitar parte do título para filtrar a lista, para encontrar rapidamente o que procuro.
- Como usuário, quero limpar a busca em um clique, para voltar à lista completa sem apagar caractere por caractere.
- Como usuário, quero que a busca combine com o filtro de status, para focar (ex.) "ativos contendo 'reunião'".

## Critérios de aceitação

- **Cenário 1 — Filtragem básica**: GIVEN existem 3 todos com títulos "Comprar pão", "Ler livro", "Comprar leite", WHEN digito "comprar" no campo de busca, THEN vejo apenas "Comprar pão" e "Comprar leite".
- **Cenário 2 — Case insensitive**: GIVEN existe o todo "Estudar Spec Kit", WHEN digito "spec", THEN o todo aparece (busca não diferencia maiúsculas).
- **Cenário 3 — Busca + filtro de status**: GIVEN existem "Reunião com time" (ativo) e "Reunião antiga" (concluído), e o filtro está em "ativos", WHEN digito "reunião", THEN vejo só "Reunião com time".
- **Cenário 4 — Sem resultados**: GIVEN não existe todo cujo título contenha "xyz", WHEN digito "xyz", THEN vejo a mensagem "Nenhum todo encontrado para 'xyz'".
- **Cenário 5 — Limpar**: GIVEN há texto no campo de busca, WHEN clico no botão de limpar (ou pressiono Esc), THEN o campo fica vazio e a lista volta a aplicar só o filtro de status.

## Restrições e suposições

- Volume típico esperado: dezenas a poucas centenas de todos por usuário (filtragem em memória é viável).
- Acessibilidade: o input deve ter `aria-label`, suportar Esc para limpar e expor a contagem de resultados via `aria-live` para screen readers.
- O campo de busca não tem debounce — a filtragem é local e barata.

## Decisões

- **URL state**: termo de busca persiste em `/todos?q=texto`, validado por schema Zod (TanStack Router `validateSearch`).
- **Match**: `includes` (qualquer posição), case-insensitive.
- **Normalização**: ignora acentos via NFD + remoção de combining marks. Aplicado tanto no termo quanto no título antes de comparar.
