'use client';

import React from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import { ConsoleInput } from '@/components/console-input';
import { CommandHistory } from '@/components/commands/command-history';

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
