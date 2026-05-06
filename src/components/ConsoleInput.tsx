'use client';

import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';

import { useAppStore, useAnimationStore } from '@/store';
import { autocomplete, execute, validate } from '@/lib/command';
import { fs } from '@/lib/filesystem';

export const ConsoleInput = () => {
  const store = useAppStore();
  const inputFocused = useAnimationStore((s) => s.inputFocused);
  const setInputFocused = useAnimationStore((s) => s.setInputFocused);
  const { consoleHistory, addHistory, historyIndex, changeIndex, clearIndex, currentNode } = store;
  const [inputValue, setInputValue] = useState('');
  const [animationComplete, setAnimationComplete] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  const auto = autocomplete(inputValue, store);

  useEffect(() => {
    inputRef.current?.focus();
  }, [animationComplete]);

  useEffect(() => {
    inputRef.current?.setSelectionRange(inputValue.length, inputValue.length);
  }, [historyIndex, inputValue]);

  const handleKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    animationRef?.current?.classList.remove('animate-blink');
    void animationRef?.current?.offsetWidth;
    animationRef?.current?.classList.add('animate-blink');

    if (evt.key === 'Enter' && inputValue !== '') {
      const validation = validate(inputValue, store) || '';
      const node = fs.getNode(currentNode);
      addHistory(inputValue, validation, node?.label ?? currentNode);
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
    } else if (evt.key === 'Tab') {
      if (auto || inputValue) {
        evt.preventDefault();
        setInputValue(auto);
      }
    }
  };

  const currentLabel = fs.getNode(currentNode)?.label ?? currentNode;

  return (
    <div className="flex text-base gap-2 px-6 py-4 border-t border-border">
      <label className="font-mono font-semibold text-accent shrink-0" htmlFor="terminal">
        {currentLabel} &gt;
      </label>
      <div className="relative flex flex-1">
        <div className="absolute flex gap-2 font-mono whitespace-pre text-foreground-subtle">{auto}</div>
        <input
          id="terminal"
          type="text"
          spellCheck="false"
          autoCapitalize="off"
          className="text-foreground z-10 flex-1 font-mono font-normal border-none outline-none bg-transparent caret-transparent"
          ref={inputRef}
          value={inputValue}
          onChange={(evt) => setInputValue(evt.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => {
            setInputFocused(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 20);
          }}
          onBlur={() => setInputFocused(false)}
        />
        {inputFocused && (
          <div
            ref={animationRef}
            className="absolute h-6 w-1 bg-accent rounded-full animate-blink z-20"
            style={{
              left: Math.min(inputValue.length * 9.632, inputRef?.current?.offsetWidth ?? 2000)
            }}
          />
        )}
      </div>
    </div>
  );
};
