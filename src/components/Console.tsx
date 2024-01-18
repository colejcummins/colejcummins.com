'use client'

import Image from 'next/image';
import {Fragment, useState} from 'react';
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
  const [hovering, setHovering] = useState('');

  const hoveringColor = (name: string, color: string) => hovering === name ? 'text-blue-400' : color;

  return (
    <div className="grid grid-cols-2 gap-y-6 gap-x-6 w-full py-4">
      {rootContent.map((val) => (
        <Link key={val.name} href={val.link} target="_blank" onMouseEnter={() => setHovering(val.name)} onMouseLeave={() => setHovering('')}>
          <div className="flex flex-col font-mono font-normal">
            <div className="flex justify-between">
              <div className={hoveringColor(val.name, "text-slate-50")}>
                {val.name}
              </div>
              <div className={hoveringColor(val.name, "text-slate-600")}>
                {val.tech}
              </div>
            </div>
            <div className={hoveringColor(val.name, "text-slate-400")}>
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
      <Fragment key={i}>
        <div className="flex gap-2 font-mono font-semibold text-blue-500">
          {command.location === '/' ? 'colejcummins' : command.location} &gt;
          <div className="text-slate-50 font-normal">{command.name}</div>
        </div>
        {command.name === 'ls' && <LsContent />}
        {command.name === 'whoami' && renderWhoAmIContent()}
        {command.name === 'help' && renderValidation({message: ``})}
        {validation && renderValidation(validation)}
      </Fragment>
    );
  }

  const renderConsoleHistory = () => {
    return (
      <div className="flex flex-col">
        {consoleHistory.map((command, i) => renderCommand(command, i))}
      </div>
    );
  }



  return (
    <div className="flex flex-col h-[600px] px-2 py-2">
      <div className="justify-self-end overflow-hidden">
        {renderConsoleHistory()}
        <ConsoleInput />
      </div>
    </div>
  )
}
