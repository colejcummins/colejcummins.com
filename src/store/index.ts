import { createContext, useContext } from 'react';

import { AppStore } from '@/store/AppStore';

export const AppContext = createContext<AppStore>(new AppStore());
export const useAppStore = () => {
  return useContext(AppContext);
};

export { AppStore };
