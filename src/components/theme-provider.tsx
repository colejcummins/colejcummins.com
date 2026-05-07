'use client';

import React from 'react';

import { useAppStore } from '@/store';

export const ThemeProvider = ({ children }: { children: React.JSX.Element }) => {
  const lightMode = useAppStore((s) => s.lightMode);
  return <div className={lightMode ? '' : 'dark'}>{children}</div>;
};
