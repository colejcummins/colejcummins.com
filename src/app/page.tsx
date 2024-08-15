'use client';

import React from 'react';

import { Console } from '@/components/Console';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Background } from '@/components/Background';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="flex justify-center items-center w-screen h-screen bg-white dark:bg-slate-950">
        <div
          className="flex flex-col border rounded-lg border-slate-300 dark:border-slate-600 w-4/5 bg-slate-100 dark:bg-slate-900 bg-opacity-70"
          style={{ backdropFilter: 'saturate(200%) blur{20px)' }}
        >
          <div className="flex gap-2 justify-start p-2 border-b border-slate-200 dark:border-slate-700">
            {Array(3)
              .fill(0)
              .map((i) => (
                <div key={i} className="rounded-full h-4 w-4 border border-slate-200 dark:border-slate-700 " />
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
      <div className="flex flex-1 items-center justify-center">
      <Background />
    </div>
 */