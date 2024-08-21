'use client';

import React from 'react';

import { Console } from '@/components/Console';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Background } from '@/components/Background';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="relative flex justify-center items-center w-screen h-screen bg-transparent">
        <Background />
        <div className="flex flex-col rounded-lg w-4/5 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700">
          <div className="flex gap-2 justify-start p-2 border-b border-slate-200 dark:border-slate-800">
            {Array(3)
              .fill(0)
              .map((i) => (
                <div key={i} className="rounded-full h-4 w-4 border border-slate-200 dark:border-slate-800" />
              ))}
          </div>
          <Console />
        </div>
      </div>
    </ThemeProvider>
  );
}

/**
 *
export default function Home() {
  return (
    <ThemeProvider>
      <div className="relative flex justify-center items-center w-screen h-screen bg-transparent">
        <Background />
        <div className="flex flex-col rounded-lg w-4/5 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700">
          <div className="flex gap-2 justify-start p-2 border-b border-slate-200 dark:border-slate-800">
            {Array(3)
              .fill(0)
              .map((i) => (
                <div key={i} className="rounded-full h-4 w-4 border border-slate-200 dark:border-slate-800" />
              ))}
          </div>
          <Console />
        </div>
      </div>
    </ThemeProvider>
  );
}
 */

/**
 * export default function Home() {
  return (
    <ThemeProvider>
      <div className="flex justify-center items-center w-screen h-screen bg-white dark:bg-black">
        <div className="rounded-lg p-px w-4/5 bg-gradient-to-b from-slate-700 to-slate-900">
          <div className="flex flex-col rounded-[calc(0.5rem-1px)] bg-gradient-to-br from-slate-50 dark:from-slate-900 to-slate-100 dark:to-slate-950">
            <div className="flex gap-2 justify-start p-2 border-b border-slate-200 dark:border-slate-800">
              {Array(3)
                .fill(0)
                .map((i) => (
                  <div key={i} className="rounded-full h-4 w-4 border border-slate-200 dark:border-slate-800" />
                ))}
            </div>
            <Console />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
 */

