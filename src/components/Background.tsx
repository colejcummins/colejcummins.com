import React, {useState, useCallback} from 'react';
import {throttle} from 'throttle-debounce';
import { observer } from 'mobx-react-lite';

import { useAnimationStore, useAppStore } from '@/store';

export const Background = observer(({children}: {children: JSX.Element}) => {
  const {mousePos, setMousePos} = useAnimationStore();
  const { lightMode } = useAppStore();

  const handleMouseMove = useCallback(throttle(50, (e: React.MouseEvent) => {
    setMousePos({x: e.clientX, y: e.clientY});
  }), []);

  const gradientCol = lightMode ? '#fffffff9' : '#000000df';

  return (
    <div className="absolute w-screen h-screen bg-slate-800">
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
});

/**
export const Background = () => {
  return (
      <div className="absolute w-full h-full bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-md" />

    </div>
  );
};
*/

/**
 * <iframe
        title="background"
        loading="lazy"
        src="https://meshbg-1xcve0hlq-chasedavis.vercel.app/embed/0.5627756749092943"
      />
 */
