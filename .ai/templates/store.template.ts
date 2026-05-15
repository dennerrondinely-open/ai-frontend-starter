// Template: Zustand store de UI state da feature.
// Salve em: src/features/<feature>/store.ts
// Lembre: NÃO armazenar server state aqui (vai em TanStack Query).

import { create } from 'zustand';

interface {{Name}}UiState {
  // TODO: state shape
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const use{{Name}}UiStore = create<{{Name}}UiState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}));
