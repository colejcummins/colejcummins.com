import { createContext, useContext } from 'react';

import { AppStore, HistoryItem } from '@/store/AppStore';
import { AnimationStore } from '@/store/AnimationStore';

const appStore = new AppStore();
export const AppContext = createContext<AppStore>(appStore);
export const useAppStore = () => {
  return useContext(AppContext);
};

const animationStore = new AnimationStore();
export const AnimationContext = createContext<AnimationStore>(animationStore);
export const useAnimationStore = () => {
  return useContext(AnimationContext);
};

export type { HistoryItem };
export { AppStore, AnimationStore };
