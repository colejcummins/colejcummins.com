'use client';

import React from 'react';

import { ThemeProvider } from '@/components/ThemeProvider';
import { ConsoleInput } from '@/components/ConsoleInput';
import { CommandHistory } from '@/components/commands/CommandHistory';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="flex flex-col w-screen h-screen bg-background">
        <CommandHistory />
        <ConsoleInput />
      </div>
    </ThemeProvider>
  );
}
