'use client'

import {usePathname} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {useState, KeyboardEvent, Fragment, useRef} from 'react';

const lsContent = [
  {
    name: 'pyssect',
    description: 'Python control flow graph and AST visualizer',
    tech: 'Python / React / NextJS',
    link: 'https://github.com/colejcummins/pyssect',
  },
  {
    name: 'minilang-compiler',
    description: 'A minilang toy compiler writen in Java',
    tech: 'Java / Clang',
    link: 'https://github.com/colejcummins/minilang-compiler',
  },
  {
    name: 'asciizer',
    description: 'Turns images into ascii art',
    tech: 'Typescript',
    link: 'https://github.com/colejcummins/image-to-ascii',
  },
  {
    name: 'react-search-modal',
    description: 'An opinionated search component inspired by cmdk and Github',
    tech: 'React / Elasticsearch',
    link: '',
  },
];

const validCommands = ['help', 'whoami', 'ls', 'clear'];

type Command = {
  name: string;
  location: string;
}

export function Console() {
  const pathname = usePathname();
  const [commandHistory, setCommandHistory] = useState<Command[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(true);
  const ref = useRef<HTMLElement>(null);

  const renderLsContent = () => {
    return (
      <div className="grid grid-cols-2 gap-y-6 gap-x-6 w-full py-4">
        {lsContent.map((val) => (
          <Link key={val.name} href={val.link} target="_blank">
            <div className="flex flex-col font-mono font-normal">
              <div className="flex justify-between">
                <div className="text-slate-50">
                  {val.name}
                </div>
                <div className="text-slate-600">
                  {val.tech}
                </div>
              </div>
              <div className="text-slate-400">
                {val.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  const renderWhoAmIContent = () => {
    return (
      <div className="flex flex-col font-mono py-4">
        <div className="flex items-center gap-8">
          <Image
            className="rounded-full"
            src="/profilepic.png"
            alt="Colejcummins Profile Picture"
            width={70}
            height={70}
          />
          <div className="flex flex-col">
            <div className="text-xl text-slate-50 font-semibold">
              Cole Cummins
            </div>
            <div className="text-slate-600">
              React / Typescript / Python / NextJS / Elasticsearch / Sequelize / Programming Languages
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
    )
  }

  const renderHelp = (command: string) => {
    return (
      <div className="flex flex-col font-mono">
        {command !== 'help' && (
          <div className="text-red-500">{`${command} is not a valid command`}</div>
        )}
        <div className="text-slate-400">
          {`Valid commands: ${validCommands.join(', ')}`}
        </div>
      </div>

    )
  }

  const renderCommand = (command: Command, i: number) => {
    const showHelp = !validCommands.includes(command.name) || command.name === 'help';
    return (
      <Fragment>
        <div key={i} className="flex gap-2 font-mono font-semibold text-blue-500">
          {command.location === '/' ? 'colejcummins' : command.location} &gt;
          <div className="text-slate-50 font-normal">{command.name}</div>
        </div>
        {command.name === 'ls' && renderLsContent()}
        {command.name === 'whoami' && renderWhoAmIContent()}
        {showHelp && renderHelp(command.name)}
      </Fragment>
    );
  }

  const renderCommandHistory = () => {
    return (
      <div className="flex flex-col">
        {commandHistory.map((command, i) => renderCommand(command, i))}
      </div>
    );
  }

  const doCommand = (str: string) => {
    switch (str) {
      case 'clear':
        setCommandHistory([]);
    }
  }

  const handleKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && inputFocused && inputValue !== '') {
      setCommandHistory((prev) => prev.concat({name: inputValue, location: pathname}));
      doCommand(inputValue);
      setInputValue('');
    }
  }

  return (
    <div className="flex flex-col h-[600px] px-2 py-2">
      <div className="justify-self-end overflow-hidden">
        {renderCommandHistory()}
        <div className="flex gap-2 font-mono font-semibold text-blue-500 [overflow-anchor: auto]" ref={ref}>
          {pathname === '/' ? 'colejcummins' : pathname} &gt;
          <input className="text-slate-50 flex-1 font-normal border-none outline-none bg-transparent" value={inputValue} onChange={(evt) => setInputValue(evt.target.value)} onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)} onKeyDown={handleKeyPress}/>
        </div>
      </div>
    </div>
  )
}
