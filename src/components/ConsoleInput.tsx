'use client'

import {usePathname} from 'next/navigation';
import {useState, KeyboardEvent, RefObject, useRef, useEffect} from 'react';
import { useShallow } from 'zustand/react/shallow';

import {useStore} from '@/store/store';
import {autocomplete} from '@/lib/command';

export function ConsoleInput({scrollRef}: {scrollRef: RefObject<HTMLDivElement>}) {
  const pathname = usePathname();
  const [consoleHistory, addHistory, historyIndex, changeIndex, clearIndex, clearHistory] = useStore(
    useShallow((state) => [state.consoleHistory, state.addHistory, state.historyIndex, state.changeIndex, state.clearIndex, state.clearHistory])
  )
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const doCommand = (str: string) => {
    switch (str) {
      case 'clear':
        clearHistory();
    }
  }

  const auto = autocomplete(inputValue);

  useEffect(() => {
    inputRef.current?.setSelectionRange(inputValue.length, inputValue.length);
  }, [historyIndex]);

  const handleKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && inputValue !== '') {
      addHistory({name: inputValue, location: pathname});
      doCommand(inputValue);
      setInputValue('');
      clearIndex();
      scrollRef.current?.scrollIntoView();
    }
    else if (evt.key === 'ArrowUp' && consoleHistory && historyIndex < consoleHistory.length) {
      changeIndex(1);
      const newValue = consoleHistory[consoleHistory.length - historyIndex - 1].name;
      setInputValue(newValue);
    }
    else if (evt.key === 'ArrowDown' && consoleHistory && historyIndex > 0) {
      changeIndex(-1);
      const newValue = historyIndex > 1 ? consoleHistory[consoleHistory.length - historyIndex + 1].name : '';
      setInputValue(newValue);
    }
    else if (evt.key === 'ArrowRight' && auto) {
      setInputValue(auto);
    }
  }

  return (
    <div className="flex gap-2 px-5 py-5 border-t border-slate-800">
      <label className="font-mono font-semibold text-blue-500" htmlFor="terminal">{pathname === '/' ? 'colejcummins' : pathname} &gt;</label>
      <div className="relative flex flex-1">
        <div className="absolute font-mono text-slate-600">{auto}</div>
        <input id="terminal" type="text" spellCheck="false" className="text-slate-50 z-10 flex-1 font-mono font-normal border-none outline-none bg-transparent" ref={inputRef} value={inputValue} onChange={(evt) => setInputValue(evt.target.value)} onKeyDown={handleKeyPress}/>
      </div>
    </div>
  );
}