'use client';

import Image from 'next/image';
import React from 'react';

import Link from '@/components/Link';
import { AppStore } from '@/store';
import { getChildren, ROOTNAME, getParent } from '@/lib/fs';

interface Command {
  render?: (args: string[], store: AppStore) => React.JSX.Element;
  autocomplete?: (args: string[], store: AppStore) => string | undefined;
  validate?: (args: string[], store: AppStore) => string | undefined;
  execute?: (args: string[], store: AppStore) => void;
}

export const commandMan: Record<string, string> = {
  man: 'Man',
  whoami: 'Displays effective user id. Usage:\nwhoami',
  open: 'Opens a new tab navigating to a listed project',
  ls: 'Lists directory contents. Usage:\nls [ -l | -a ]',
  clear: 'Clears console and command history. Usage:\nclear',
  mode: 'Changes the current color mode. Usage:\nmode [ light | dark ]',
  pwd: 'Displays the current working directory. Usage:\npwd',
  cd: 'Changes current directory. Usage:\ncd [ . | .. | directory_name ]'
};

export const lsContent = [
  {
    name: 'pyssect',
    description: 'Python control flow graph and AST visualizer',
    tech: 'Python / React / Express',
    link: 'https://github.com/colejcummins/pyssect'
  },
  {
    name: 'minilang-compiler',
    description: 'A minilang toy compiler writen in Java',
    tech: 'Java / Clang',
    link: 'https://github.com/colejcummins/minilang-compiler'
  },
  {
    name: 'llvm-syntax-highlighting',
    description: 'LLVM parser and syntax highlighter written for VSCode',
    tech: 'LLVM / JSON',
    link: 'https://github.com/colejcummins/llvm-syntax-highlighting'
  },
  {
    name: 'react-search-modal',
    description: 'An opinionated search component inspired by cmdk and Github',
    tech: 'React / Elasticsearch',
    link: ''
  }
];

const renderLsContent = (args: string[], store: AppStore) => {
  const children = getChildren(store.currentNode);
  return (
    <div className="grid grid-cols-6 gap-y-8 gap-x-12 w-full py-4">
      {children.map((child) => (
        <Link key={child.name} href={""} >
          <div className="text-blue-500 dark:text-blue-300">
            {child.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

const renderWhoAmIContent = () => {
  return (
    <div className="flex flex-1 flex-col justify-center py-5">
      <Link href="https://github.com/colejcummins">
        <div className="flex items-center gap-5">
          <Image
            className="rounded-full"
            src="/profilepic.png"
            alt="Colejcummins Profile Picture"
            width={70}
            height={70}
          />
          <div className="flex flex-col">
            <div className="text-xl font-semibold">Cole Cummins</div>
            <div>React / Typescript / Nodejs / Nextjs / Python / ThreeJS</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const validCommands = ['man', 'whoami', 'open', 'ls', 'clear', 'mode', 'cd', 'pwd'];
const validDirs = ['pyssect', 'minilang-compiler', 'asciizer', 'react-select'];
export const commands: Record<string, Command> = {
  ls: {
    render: renderLsContent
  },
  whoami: {
    render: renderWhoAmIContent
  },
  man: {
    autocomplete: (args: string[]) => {
      return validCommands.find((man) => man.startsWith(args[0]));
    },
    validate: (args: string[]) => {
      if (args.length !== 1) {
        return `man expects 1 argument. Valid arguments:\n${validCommands.join(' ')}`;
      }
      if (!validCommands.includes(args[0])) {
        return `${args} is not a valid argument. Valid arguments:\n${validCommands.join(' ')}`;
      }
      return '';
    },
    render: (args: string[]) => {
      return <pre className="font-mono text-slate-950 dark:text-slate-50">{commandMan[args[0]]}</pre>;
    }
  },
  open: {
    autocomplete: (args: string[]) => {
      return validDirs.find((open) => open.startsWith(args[0]));
    },
    validate: (args: string[]) => {
      if (args.length !== 1) {
        return `open expects 1 argument. Valid arguments:\n${validDirs.join(' ')}`;
      }
      if (!validDirs.includes(args[0])) {
        return `${args} is not a valid argument. Valid arguments:\n${validDirs.join(' ')}`;
      }
      return '';
    },
    execute: (args: string[]) => {
      window.open(lsContent.find((f) => f.name === args[0])?.link);
    }
  },
  cd: {
    autocomplete: (args: string[], store: AppStore) => {
      return store.validCdTargets.find((name) => name.startsWith(args[0]));
    },
    validate: (args: string[], store: AppStore) => {
      if (args.length > 0 && !store.validCdTargets.includes(args[0])) {
        return `${args[0]} is not a valid argument. Valid arguments:\n${store.validCdTargets.join(' ')}`
      }
      return '';
    },
    execute: (args: string[], store: AppStore) => {
      if (args.length === 0) {
        store.goToNode(ROOTNAME);
      } else if (args[0] === '..') {
        store.goToNode(getParent(store.currentNode).name);
      } else {
        store.goToNode(args[0]);
      }
    }
  },
  clear: {
    execute: (_, store: AppStore) => {
      store.clearHistory();
      store.clearIndex();
    }
  },
  mode: {
    autocomplete: (args: string[]) => {
      return args.length > 0 ? ['light', 'dark'].find((mode) => mode.startsWith(args[0])): ''
    },
    validate: (args: string[]) => {
      if (args.length && !['light', 'dark'].includes(args[0])) {
        return `${args} is not a valid argument\nValid arguments: light, dark`
      }
      return ''
    },
    execute: (args: string[], store: AppStore) => {
      store.setLightMode(args.length > 0 ? args[0] === 'light' : !store.lightMode)
    }
  },
};

export const autocomplete = (input: string, store: AppStore) => {
  const [command, ...args] = input.split(' ').filter((str) => str !== '');

  if (!args.length) {
    return validCommands.sort((a, b) => a.localeCompare(b)).find((man) => man.startsWith(command)) || '';
  }

  if (command in commands && args.length) {
    const complete = commands[command].autocomplete?.(args, store) || '';
    return input.replace(new RegExp(args[0] + '$'), complete);
  }

  return '';
};

export const validate = (input: string, store: AppStore) => {
  const [command, ...args] = input.split(' ').filter((str) => str !== '');

  if (!(command in commands)) {
    return `${command} is not recognized. Valid commands:\n${validCommands.join(' ')}`;
  }

  if (command in commands && args.length) {
    return commands[command].validate?.(args, store);
  }
};

export const render = (input: string, store: AppStore) => {
  const [command, ...args] = input.split(' ').filter((str) => str !== '');

  if (command in commands) {
    return commands[command].render?.(args, store);
  }
};

export const execute = (input: string, store: AppStore) => {
  const [command, ...args] = input.split(' ').filter((str) => str !== '');

  if (command in commands) {
    return commands[command].execute?.(args, store);
  }
};
