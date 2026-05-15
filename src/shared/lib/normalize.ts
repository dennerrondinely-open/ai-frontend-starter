/**
 * Normaliza string para comparação acento-insensitive e case-insensitive.
 * Use ANTES de comparar termos de busca contra dados.
 */
export function normalizeForSearch(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}
