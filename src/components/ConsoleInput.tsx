'use client';

import { usePathname } from 'next/navigation';
import React, { useState, KeyboardEvent, RefObject, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useAppStore } from '@/store';
import { autocomplete, execute, validate } from '@/lib/command';

export const ConsoleInput = observer(() => {
  const pathname = usePathname();
  const store = useAppStore();
  const { consoleHistory, addHistory, historyIndex, changeIndex, clearIndex } = store;
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const auto = autocomplete(inputValue);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    inputRef.current?.setSelectionRange(inputValue.length, inputValue.length);
  }, [historyIndex, inputValue]);

  const handleKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && inputValue !== '') {
      addHistory(inputValue);
      if (!validate(inputValue)) {
        execute(inputValue, store);
      }
      setInputValue('');
      clearIndex();
    } else if (evt.key === 'ArrowUp' && consoleHistory && historyIndex < consoleHistory.length) {
      changeIndex(1);
      const newValue = consoleHistory[consoleHistory.length - historyIndex - 1];
      setInputValue(newValue);
    } else if (evt.key === 'ArrowDown' && consoleHistory && historyIndex > 0) {
      changeIndex(-1);
      const newValue = historyIndex > 1 ? consoleHistory[consoleHistory.length - historyIndex + 1] : '';
      setInputValue(newValue);
    } else if (evt.key === 'ArrowRight' && auto) {
      setInputValue(auto);
    }
  };

  return (
    <div className="flex gap-2 px-5 py-5 border-t border-slate-200 dark:border-slate-700">
      <label className="font-mono font-semibold text-blue-600 dark:text-blue-500" htmlFor="terminal">
        {pathname === '/' ? 'colejcummins' : pathname} &gt;
      </label>
      <div className="relative flex flex-1">
        <div className="absolute flex gap-2 font-mono whitespace-pre text-slate-400 dark:text-slate-600">{auto}</div>
        <input
          id="terminal"
          type="text"
          spellCheck="false"
          className="text-slate-950 dark:text-slate-50 z-10 flex-1 font-mono font-normal border-none outline-none bg-transparent caret-transparent"
          ref={inputRef}
          value={inputValue}
          onChange={(evt) => setInputValue(evt.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        {inputFocused && (
          <div
            className="absolute h-6 w-0.5 bg-blue-600 dark:bg-blue-500 rounded-full animate-blink"
            style={{
              left: `calc(${inputValue.length} * 0.602rem)`
            }}
          />
        )}
      </div>
    </div>
  );
});
