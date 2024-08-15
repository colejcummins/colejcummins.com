import { createContext, useContext } from 'react';

import { AppStore } from '@/store/AppStore';

const appStore = new AppStore()
export const AppContext = createContext<AppStore>(appStore);
export const useAppStore = () => {
  return useContext(AppContext);
};

(window as any).appStore = appStore

export { AppStore };
