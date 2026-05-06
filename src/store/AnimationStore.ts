import { create } from 'zustand';

export interface AnimationStore {
  inputFocused: boolean;
  mousePos: { x: number; y: number };
  setInputFocused: (inputFocused: boolean) => void;
  setMousePos: (pos: { x: number; y: number }) => void;
}

export const useAnimationStore = create<AnimationStore>((set) => ({
  inputFocused: false,
  mousePos: { x: 0, y: 0 },
  setInputFocused: (inputFocused) => set({ inputFocused }),
  setMousePos: (mousePos) => set({ mousePos })
}));
