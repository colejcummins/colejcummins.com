'use client';

import React, { useRef, useState, useCallback } from 'react';
import { throttle } from 'throttle-debounce';
import { observer } from 'mobx-react-lite';

import { useAnimationStore } from '@/store';

export const Card = observer(({ children }: { children: React.JSX.Element }) => {
  const { mousePos } = useAnimationStore();
  const ref = useRef<HTMLDivElement>(null);

  let angle = 180;
  if (ref.current) {
    const box = ref.current.getBoundingClientRect();
    const middle = (box.left + box.right) / 2;
    const x = mousePos.x - middle;
    const y = box.top + mousePos.y;
    angle = 225 - (135 * Math.atan2(y, x)) / Math.PI;
  }

  return (
    <div
      ref={ref}
      className="rounded-lg md:p-[1px] w-full text-xs md:w-4/5 md:text-sm lg:text-base h-full md:h-[800px] from-slate-300 to-slate-200 dark:from-slate-400 from-5% dark:via-slate-600 via-15% dark:to-slate-900 to-70%"
      style={{
        backgroundImage: `linear-gradient(${angle}deg, var(--tw-gradient-stops))`
      }}
    >
      <div
        className="flex flex-col h-full rounded-[calc(0.5rem-1px)] from-slate-50 to-white dark:from-slate-950 from-5% dark:to-black to-80%"
        style={{
          backgroundImage: `linear-gradient(${angle}deg, var(--tw-gradient-stops))`
        }}
      >
        <div className="flex p-2 items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex gap-2">
            {Array(3)
              .fill(0)
              .map((_, ind) => (
                <div key={ind} className="rounded-full h-4 w-4 border border-slate-200 dark:border-slate-800" />
              ))}
          </div>
          <div className="font-mono text-slate-300 dark:text-slate-800">bash</div>
          <div className="w-[64px]" />
        </div>
        {children}
      </div>
    </div>
  );
});
