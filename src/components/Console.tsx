'use client'

import Image from 'next/image';
import {Fragment, useRef} from 'react';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';

import {useStore} from '@/store/store';
import {ConsoleInput} from '@/components/ConsoleInput';
import {Command, validateCommand} from '@/lib/command';
import Link from '@/components/Link';

export const rootContent = [
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

/**
 * TODO
 * Fix scrolling behavior for text box
 * Add cd command
 *
 * TODO Future
 * Make custom cursor for web page
 * Add moving gradient background
 * light mode
 */

const LsContent = () => {

  return (
    <div className="grid grid-cols-2 gap-y-6 gap-x-6 w-full py-4">
      {rootContent.map((val) => (
        <Link key={val.name} href={val.link} target="_blank">
          <div className="flex flex-col font-mono font-normal">
            <div className="flex justify-between">
              <div className="text-slate-50">
                {val.name}
              </div>
              <div className="text-slate-50">
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

export function Console() {
  const [consoleHistory] = useStore(
    useShallow((state) => [state.consoleHistory])
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const renderWhoAmIContent = () => {
    return (
      <div className="flex flex-col font-mono py-8">
        <div className="flex items-center justify-center gap-8">
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
            <div className="text-slate-400">
              React / Typescript / Python / NextJS / Elasticsearch / Express
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
    )
  }

  const renderValidation = (validation: {error?: string, message?: string}) => {
    return (
      <div className="flex flex-col font-mono">
        {validation.error && (
          <div className="text-red-500">{validation.error}</div>
        )}
        {validation.message && (
          <div className="text-slate-400">{validation.message}</div>
        )}
      </div>
    )
  }

  const renderCommand = (command: Command, i: number) => {
    const validation = validateCommand(command.name);
    return (
      <div className="border-t border-slate-800 py-5 px-5" key={i}>
        <div className="flex gap-2 font-mono font-semibold text-slate-600">
          {command.location === '/' ? 'colejcummins' : command.location} &gt;
          <div className="text-slate-600 font-normal">{command.name}</div>
        </div>
        {command.name === 'ls' && <LsContent />}
        {command.name === 'whoami' && renderWhoAmIContent()}
        {command.name === 'help' && renderValidation({message: ``})}
        {validation && renderValidation(validation)}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[700px]">
      <div className="flex flex-col overflow-hidden flex-1 justify-end">
        <div className="flex flex-col overflow-scroll">
          {consoleHistory.map((command, i) => renderCommand(command, i))}
        </div>
        <div ref={scrollRef}/>
      </div>
      <div className="justify-self-end">
        <ConsoleInput scrollRef={scrollRef}/>
      </div>
    </div>
  )
}
