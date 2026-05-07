'use client';

import React, { useRef, useEffect } from 'react';

import { useAppStore, HistoryItem } from '@/store';
import { render } from '@/lib/command';

const CommandEntry = ({ text, validation, location }: HistoryItem) => {
  const store = useAppStore();
  return (
    <div className="flex flex-col px-6 py-2 font-mono gap-1 text-foreground-subtle">
      <div className="flex gap-2 font-semibold text-foreground-muted">
        {location} &gt;
        <span className="font-normal">{text}</span>
      </div>
      {!validation && render(text, location, store)}
      {validation && <div className="text-validation font-mono">{validation}</div>}
    </div>
  );
};

export const CommandHistory = () => {
  const consoleHistory = useAppStore((s) => s.consoleHistory);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [consoleHistory.length]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col justify-end py-4 text-xl">
      {consoleHistory.map((item, i) => (
        <CommandEntry {...item} key={i} />
      ))}
    </div>
  );
};
