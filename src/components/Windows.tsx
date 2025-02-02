import React from 'react';

import { useWindowStore } from '@/store/WindowStore';

export const Windows = () => {
  const {windowStack} = useWindowStore();

  return windowStack.map()
}