'use client'

import {usePathname} from 'next/navigation';
import {useState, KeyboardEvent, Fragment, useRef} from 'react';
import { useShallow } from 'zustand/react/shallow';

import {useStore} from '@/store/store';

export function ConsoleInput() {
  const pathname = usePathname();
  const [consoleHistory, addHistory, historyIndex, changeIndex] = useStore(
    useShallow((state) => [state.consoleHistory, state.addHistory, state.historyIndex, state.changeIndex])
  )
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();

  const handleKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    console.log(historyIndex)
    if (evt.key === 'Enter' && inputValue !== '') {
      addHistory({name: inputValue, location: pathname});
      setInputValue('');
    }
    else if (evt.key === 'ArrowUp' && consoleHistory && historyIndex < consoleHistory.length - 1) {
      changeIndex(1);
      setInputValue(consoleHistory[consoleHistory.length - historyIndex - 1].name);
    }
    else if (evt.key === 'ArrowDown' && consoleHistory && historyIndex > 0) {
      changeIndex(-1);
      setInputValue(consoleHistory[consoleHistory.length - historyIndex + 1].name);
    }
  }

  return (
    <div className="flex gap-2 font-mono font-semibold text-blue-500">
      {pathname === '/' ? 'colejcummins' : pathname} &gt;
      <input type="text" spellCheck="false" className="text-slate-50 flex-1 font-normal border-none outline-none bg-transparent" ref={inputRef} value={inputValue} onChange={(evt) => setInputValue(evt.target.value)} onKeyDown={handleKeyPress}/>
    </div>
  );
}