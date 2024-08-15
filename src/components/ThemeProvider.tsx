'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';

import {useAppStore} from '@/store';

export const ThemeProvider = observer(({children}: {children: React.JSX.Element}) => {
  const {lightMode} = useAppStore();
  return (
    <div className={lightMode ? "" : "dark"}>
      {children}
    </div>
  )
});