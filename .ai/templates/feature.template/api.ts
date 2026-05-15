import { httpClient } from '@/shared/lib/http';
import { {{name}}Schema, type Create{{Name}}Input, type {{Name}} } from './schemas';
import { z } from 'zod';

// Se você já tem OpenAPI, prefira gerar via Orval (npm run api:gen)
// e descartar este arquivo.

export const {{name}}Api = {
  list: async (): Promise<{{Name}}[]> => {
    const { data } = await httpClient.get<unknown>('/{{name}}s');
    return z.array({{name}}Schema).parse(data);
  },
  create: async (input: Create{{Name}}Input): Promise<{{Name}}> => {
    const { data } = await httpClient.post<unknown>('/{{name}}s', input);
    return {{name}}Schema.parse(data);
  },
};
