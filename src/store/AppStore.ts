import { create } from 'zustand';
import { fs, ROOT_NAME } from '@/lib/filesystem';

export interface HistoryItem {
  text: string;
  validation: string;
  location: string;
}

export interface AppStore {
  consoleHistory: HistoryItem[];
  historyIndex: number;
  lightMode: boolean;
  currentNode: string;
  validCdTargets: string[];
  clearIndex: () => void;
  clearHistory: () => void;
  addHistory: (text: string, validation: string, location: string) => void;
  changeIndex: (num: number) => void;
  setLightMode: (lightMode: boolean) => void;
  goToNode: (nodeName: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  consoleHistory: [],
  historyIndex: 0,
  lightMode: false,
  currentNode: ROOT_NAME,
  validCdTargets: fs.getValidCdTargets(ROOT_NAME),
  clearIndex: () => set({ historyIndex: 0 }),
  clearHistory: () => set({ consoleHistory: [] }),
  addHistory: (text, validation, location) =>
    set((state) => ({ consoleHistory: [...state.consoleHistory, { text, validation, location }] })),
  changeIndex: (num) => set((state) => ({ historyIndex: state.historyIndex + num })),
  setLightMode: (lightMode) => set({ lightMode }),
  goToNode: (nodeName) => set({ currentNode: nodeName, validCdTargets: fs.getValidCdTargets(nodeName) })
}));
