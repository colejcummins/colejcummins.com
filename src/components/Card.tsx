'use client';

import React, { useRef, useState, useCallback } from 'react';
import { throttle } from 'throttle-debounce';

export const Card = ({ children }: { children: React.JSX.Element }) => {
  const [angle, setAngle] = useState(180);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    throttle(50, (e: React.MouseEvent) => {
      if (ref.current) {
        const box = ref.current.getBoundingClientRect();
        const middle = (box.left + box.right) / 2;
        const x = e.clientX - middle;
        const y = box.top + e.clientY;

        setAngle(225 - (90 * Math.atan2(y, x)) / Math.PI);
      }
    }),
    []
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="rounded-lg p-[1px] w-4/5 from-slate-300 to-slate-200 dark:from-slate-500 from-5% dark:via-slate-600 via-10% dark:to-slate-900 to-70%"
      style={{
        backgroundImage: `linear-gradient(${angle}deg, var(--tw-gradient-stops))`
      }}
    >
      <div
        className="flex flex-col rounded-[calc(0.5rem-1px)] from-slate-50 to-white dark:from-slate-950 from-5% dark:to-black to-80%"
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
};
