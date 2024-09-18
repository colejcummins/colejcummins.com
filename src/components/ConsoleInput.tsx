'use client';

import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useAppStore } from '@/store';
import { autocomplete, execute, validate } from '@/lib/command';
import { getCur } from '@/lib/fs';

const _ConsoleInput = observer(() => {
  const store = useAppStore();
  const { consoleHistory, addHistory, historyIndex, changeIndex, clearIndex, currentNode } = store;
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  const auto = autocomplete(inputValue, store);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    inputRef.current?.setSelectionRange(inputValue.length, inputValue.length);
  }, [historyIndex, inputValue]);

  const handleKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    // For removing the blinking animation while we are typing
    animationRef?.current?.classList.remove('animate-blink');
    void animationRef?.current?.offsetWidth;
    animationRef?.current?.classList.add('animate-blink');

    if (evt.key === 'Enter' && inputValue !== '') {
      const validation = validate(inputValue, store) || '';
      addHistory(inputValue, validation, getCur(currentNode).name);
      if (!validation) {
        execute(inputValue, store);
      }
      setInputValue('');
      clearIndex();
    } else if (evt.key === 'ArrowUp' && consoleHistory && historyIndex < consoleHistory.length) {
      changeIndex(1);
      const { text } = consoleHistory[consoleHistory.length - historyIndex - 1];
      setInputValue(text);
    } else if (evt.key === 'ArrowDown' && consoleHistory && historyIndex > 0) {
      changeIndex(-1);
      const { text } = historyIndex > 1 ? consoleHistory[consoleHistory.length - historyIndex + 1] : { text: '' };
      setInputValue(text);
    } else if (evt.key === 'ArrowRight' && auto) {
      setInputValue(auto);
    }
  };

  return (
    <div className="flex gap-2 px-5 py-5 border-t border-slate-400/50 dark:border-slate-700/75">
      <label className="font-mono font-semibold text-blue-600 dark:text-blue-500" htmlFor="terminal">
        {getCur(currentNode).name} &gt;
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
            ref={animationRef}
            className="absolute h-6 w-1 bg-blue-600 dark:bg-blue-500 rounded-full animate-blink z-20"
            style={{
              left: Math.min(inputValue.length * 9.632, inputRef?.current?.offsetWidth ?? 2000)
            }}
          />
        )}
      </div>
    </div>
  );
});

_ConsoleInput.displayName = 'ConsoleInput';
export { _ConsoleInput as ConsoleInput };
