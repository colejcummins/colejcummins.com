'use client';

import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';

import { useAppStore } from '@/store';
import { ConsoleInput } from '@/components/ConsoleInput';
import { render, validate } from '@/lib/command';

/**
 * TODO
 * Fix scrolling behavior for text box
 *
 * TODO Future
 * light mode
 */

export const Console = observer(() => {
  const { consoleHistory } = useAppStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const renderValidation = (validation: string) => {
    return (
      <div className="flex flex-col font-mono">{validation && <div className="text-slate-600">{validation}</div>}</div>
    );
  };

  const renderCommand = (command: string, i: number) => {
    const validation = validate(command);
    return (
      <div className="border-t border-t-slate-700 py-5 px-5" key={i}>
        <div className="flex gap-2 font-mono font-semibold text-slate-600">
          colejcummins &gt;
          <div className="text-slate-600 font-normal">{command}</div>
        </div>
        {!validation && render(command)}
        {validation && renderValidation(validation)}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[700px]">
      <div className="flex flex-col overflow-hidden flex-1 justify-end">
        <div className="flex flex-col overflow-scroll">
          {consoleHistory.map((command, i) => renderCommand(command, i))}
        </div>
        <div ref={scrollRef} />
      </div>
      <div className="justify-self-end">
        <ConsoleInput scrollRef={scrollRef} />
      </div>
    </div>
  );
});
