'use client';

import React, { useRef, useEffect, memo } from 'react';
import { observer } from 'mobx-react-lite';

import { useAppStore, HistoryItem } from '@/store';
import { ConsoleInput } from '@/components/ConsoleInput';
import { render } from '@/lib/command';

/**
 * TODO
 * Fix scrolling behavior for text box
 *
 * TODO Future
 * light mode
 */

const Command = memo(({ text, validation, location }: HistoryItem) => {
  return (
    <div className="border-t border-slate-200 dark:border-slate-800 py-5 px-5 font-mono text-slate-950 dark:text-slate-50">
      <div className="flex gap-2 font-semibold text-slate-400 dark:text-slate-600">
        {location} &gt;
        <div className="font-normal">{text}</div>
      </div>
      {!validation && render(text, location)}
      {validation && <div className="text-slate-400 dark:text-slate-600 font-mono">{validation}</div>}
    </div>
  );
});
Command.displayName = 'Command';

export const Console = observer(() => {
  const store = useAppStore();
  const { consoleHistory } = store;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
    }
  }, [consoleHistory.length, scrollRef]);

  return (
    <div className="flex flex-col h-[700px]">
      <div className="flex flex-col overflow-hidden flex-1 justify-end">
        <div className="flex flex-col overflow-scroll" ref={scrollRef}>
          {consoleHistory.map((item, i) => (
            <Command {...item} key={i} />
          ))}
        </div>
      </div>
      <div className="justify-self-end">
        <ConsoleInput />
      </div>
    </div>
  );
});
