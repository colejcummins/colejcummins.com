'use client'

import {usePathname} from 'next/navigation';
import {useState, KeyboardEvent, Fragment, useRef} from 'react';
import { useShallow } from 'zustand/react/shallow';

import {useStore} from '@/store/store';
import {validCommands} from '@/lib/command';

export function ConsoleInput() {
  const pathname = usePathname();
  const [consoleHistory, addHistory, historyIndex, changeIndex, clearIndex] = useStore(
    useShallow((state) => [state.consoleHistory, state.addHistory, state.historyIndex, state.changeIndex, state.clearIndex])
  )
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    console.log(historyIndex, consoleHistory)
    if (evt.key === 'Enter' && inputValue !== '') {
      addHistory({name: inputValue, location: pathname});
      setInputValue('');
      clearIndex();
    }
    else if (evt.key === 'ArrowUp' && consoleHistory && historyIndex < consoleHistory.length) {
      changeIndex(1);
      const newValue = consoleHistory[consoleHistory.length - historyIndex - 1].name;
      setInputValue(newValue);
      inputRef.current?.setSelectionRange(newValue.length, newValue.length);
    }
    else if (evt.key === 'ArrowDown' && consoleHistory && historyIndex > 0) {
      changeIndex(-1);
      const newValue = consoleHistory[consoleHistory.length - historyIndex + 1].name;
      setInputValue(newValue);
      inputRef.current?.setSelectionRange(newValue.length, newValue.length);
    }
  }

  return (
    <div className="flex gap-2 font-mono font-semibold text-blue-500">
      {pathname === '/' ? 'colejcummins' : pathname} &gt;
      <input type="text" spellCheck="false" className="text-slate-50 flex-1 font-normal border-none outline-none bg-transparent" ref={inputRef} value={inputValue} onChange={(evt) => setInputValue(evt.target.value)} onKeyDown={handleKeyPress}/>
    </div>
  );
}