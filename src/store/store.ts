import {create} from 'zustand';

import {Command} from '@/lib/command';

type StoreState = {
  consoleHistory: Command[],
  historyIndex: number,
  clearHistory: () => void,
  addHistory: (command: Command) => void,
  clearIndex: () =>  void,
  changeIndex: (num: number) => void,
}

export const useStore = create<StoreState>((set) => ({
  consoleHistory: [],
  historyIndex: 0,
  clearHistory: () => set(() => ({consoleHistory: []})),
  addHistory: (command: Command) => set((state) => ({consoleHistory: state.consoleHistory.concat(command)})),
  clearIndex: () => set(() => ({historyIndex: 0})),
  changeIndex: (num: number) => set((state) => ({historyIndex: state.historyIndex + num})),
}))