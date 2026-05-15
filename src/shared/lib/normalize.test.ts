import { describe, expect, it } from 'vitest';
import { normalizeForSearch } from '@/shared/lib/normalize';

describe('normalizeForSearch', () => {
  it('remove acentos', () => {
    expect(normalizeForSearch('Reunião')).toBe('reuniao');
    expect(normalizeForSearch('café')).toBe('cafe');
    expect(normalizeForSearch('São Paulo')).toBe('sao paulo');
  });

  it('é case-insensitive', () => {
    expect(normalizeForSearch('FOO')).toBe('foo');
    expect(normalizeForSearch('FoO')).toBe('foo');
  });

  it('aparas espaços em branco nas pontas', () => {
    expect(normalizeForSearch('  hello  ')).toBe('hello');
  });

  it('aceita string vazia', () => {
    expect(normalizeForSearch('')).toBe('');
    expect(normalizeForSearch('   ')).toBe('');
  });

  it('preserva espaços internos', () => {
    expect(normalizeForSearch('hello world')).toBe('hello world');
  });

  it('lida com unicode combinado (decomposto)', () => {
    // 'á' como caractere combinado: 'a' + U+0301 (combining acute accent)
    const combined = `a${String.fromCharCode(0x0301)}`;
    expect(normalizeForSearch(combined)).toBe('a');
  });
});
