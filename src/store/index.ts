import { createContext, useContext } from 'react';

import { AppStore, HistoryItem } from '@/store/AppStore';

const appStore = new AppStore();
export const AppContext = createContext<AppStore>(appStore);
export const useAppStore = () => {
  return useContext(AppContext);
};

export type { HistoryItem };
export { AppStore };
