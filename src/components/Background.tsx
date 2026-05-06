import React, { useCallback } from 'react';
import { throttle } from 'throttle-debounce';

import { useAnimationStore, useAppStore } from '@/store';

export const Background = ({ children }: { children: React.JSX.Element }) => {
  const setMousePos = useAnimationStore((s) => s.setMousePos);
  const lightMode = useAppStore((s) => s.lightMode);

  const handleMouseMove = useCallback(
    throttle(50, (e: React.MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    }),
    []
  );

  const gradientCol = lightMode ? '#f8fafcf5' : '#000000af';

  return (
    <div
      className="absolute w-screen h-screen"
      style={{
        backgroundImage: `radial-gradient(${lightMode ? '#2563eb' : '#e2e8f0'}, ${lightMode ? '#1e293b' : '#1e293b'} 75%)`
      }}
    >
      <div
        onMouseMove={handleMouseMove}
        className="absolute w-screen h-screen bg-[size:24px_24px] flex justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(to right,${gradientCol} 23px,transparent 1px),linear-gradient(to bottom, ${gradientCol} 23px,transparent 2px)`,
          backgroundSize: '24px 24px'
        }}
      >
        {children}
      </div>
    </div>
  );
};
