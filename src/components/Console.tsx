'use client';

import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useAppStore, HistoryItem } from '@/store';
import { ConsoleInput } from '@/components/ConsoleInput';
import { render } from '@/lib/command';

const Command = observer(({ text, validation, location }: HistoryItem) => {
  const store = useAppStore();
  return (
    <div className="flex flex-col py-6 px-6 font-mono gap-2 text-slate-950 dark:text-slate-50 border-t border-slate-200 dark:border-slate-800">
      <div className="flex gap-2 font-semibold text-slate-300 dark:text-slate-700">
        {location} &gt;
        <div className="font-normal">{text}</div>
      </div>
      {!validation && render(text, location, store)}
      {validation && <div className="text-slate-400 dark:text-slate-400 font-mono">{validation}</div>}
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
      scrollRef.current.scroll({ top: -scrollRef.current.scrollHeight, left: 0 });
    }
  }, [consoleHistory.length, scrollRef]);

  return (
    <div className="flex relative flex-col h-[calc(100%-41px)]">
      <div>
        <ConsoleInput />
      </div>
      <div
        className="rounded-b-lg absolute shadow-white dark:shadow-black pointer-events-none w-full h-full"
        style={{
          boxShadow: 'inset 0 -160px 160px -120px var(--tw-shadow-color)'
        }}
      />
      <div className="flex flex-col overflow-hidden flex-1 overflow-y-hidden">
        <div
          className="flex flex-col-reverse overflow-y-scroll overflow-x-hidden"
          style={{ scrollbarColor: 'none' }}
          ref={scrollRef}
        >
          {consoleHistory.map((item, i) => (
            <Command {...item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
});
