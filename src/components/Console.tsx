'use client';

import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useAppStore, HistoryItem } from '@/store';
import { ConsoleInput } from '@/components/ConsoleInput';
import { render } from '@/lib/command';

const Command = observer(({ text, validation, location }: HistoryItem) => {
  const store = useAppStore();
  return (
    <div className="py-5 px-5 font-mono text-slate-950 dark:text-slate-50 border-t border-slate-200 dark:border-slate-800">
      <div className="py-1 flex gap-2 font-semibold text-slate-300 dark:text-slate-800">
        {location} &gt;
        <div className="font-normal">{text}</div>
      </div>
      {!validation && render(text, location, store)}
      {validation && <div className="text-slate-400 dark:text-slate-500 font-mono">{validation}</div>}
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
        <div
          className="flex flex-col overflow-y-scrol overflow-x-hidden"
          style={{ scrollbarColor: 'none' }}
          ref={scrollRef}
        >
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
