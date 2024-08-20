'use client';

import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useAppStore, HistoryItem } from '@/store';
import { ConsoleInput } from '@/components/ConsoleInput';
import { render, validate } from '@/lib/command';
import { getCur } from '@/lib/fs';

/**
 * TODO
 * Fix scrolling behavior for text box
 *
 * TODO Future
 * light mode
 */

export const Console = observer(() => {
  const store = useAppStore();
  const { consoleHistory, currentNode } = store;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
    }
  }, [consoleHistory.length, scrollRef]);

  const renderValidation = (validation: string) => {
    return validation && <pre className="text-slate-400 dark:text-slate-600 font-mono">{validation}</pre>
  };

  const renderCommand = ({text, validation, location}: HistoryItem, i: number) => {
    return (
      <div className="border-t border-slate-200 dark:border-slate-700 py-5 px-5 font-mono text-slate-950 dark:text-slate-50" key={i}>
        <div className="flex gap-2 font-semibold text-slate-400 dark:text-slate-600">
          {location} &gt;
          <div className="font-normal">{text}</div>
        </div>
        {!validation && render(text, store)}
        {validation && renderValidation(validation)}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[700px]">
      <div className="flex flex-col overflow-hidden flex-1 justify-end">
        <div className="flex flex-col overflow-scroll" ref={scrollRef}>
          {consoleHistory.map((item, i) => renderCommand(item, i))}
        </div>
      </div>
      <div className="justify-self-end">
        <ConsoleInput />
      </div>
    </div>
  );
});
