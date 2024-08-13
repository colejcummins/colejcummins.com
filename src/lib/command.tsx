import Image from 'next/image';

import Link from '@/components/Link';
import { AppStore } from '@/store';

interface Command {
  render?: (args: string[]) => JSX.Element;
  autocomplete?: (args: string[]) => string | undefined;
  validate?: (args: string[]) => string | undefined;
  execute?: (args: string[], store: AppStore) => void;
}

export const commandMan: Record<string, string> = {
  man: 'Man',
  whoami: 'Displays effective user id',
  open: 'Opens a new tab navigating to a listed project',
  ls: 'Lists directory contents',
  clear: 'Clears console and command history'
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

const renderLsContent = () => {
  return (
    <div className="grid grid-cols-2 gap-y-8 gap-x-12 w-full py-4">
      {lsContent.map((val) => (
        <Link key={val.name} href={val.link} target="_blank">
          <div className="flex flex-col font-mono font-normal">
            <div className="flex justify-between">
              <div>{val.name}</div>
              <div>{val.tech}</div>
            </div>
            {val.description}
          </div>
        </Link>
      ))}
    </div>
  );
};

const renderWhoAmIContent = () => {
  return (
    <div className="flex flex-1 flex-col justify-center font-mono py-8">
      <Link href="https://github.com/colejcummins" target="_blank">
        <div className="flex items-center gap-8">
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

const validCommands = ['man', 'whoami', 'open', 'ls', 'clear'];
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
      return validCommands.find((man) => args[0] !== '' && man.startsWith(args[0]));
    },
    validate: (args: string[]) => {
      if (args.length !== 1) {
        return `man expects 1 argument\nValid arguments: ${validCommands.join(',')}`;
      }
      if (!validCommands.includes(args[0])) {
        return `${args} is not a valid argument\nValid arguments: ${validCommands.join(', ')}`;
      }
      return '';
    },
    render: (args: string[]) => {
      return <div className="font-mono text-slate-300">{commandMan[args[0]]}</div>;
    }
  },
  open: {
    autocomplete: (args: string[]) => {
      return validDirs.find((open) => args[0] !== '' && open.startsWith(args[0]));
    },
    validate: (args: string[]) => {
      if (args.length !== 1) {
        return `open expects 1 argument\nValid arguments: ${validDirs.join(',')}`;
      }
      if (!validDirs.includes(args[0])) {
        return `${args} is not a valid argument\nValid arguments: ${validDirs.join(', ')}`;
      }
      return '';
    },
    execute: (args: string[]) => {
      window.open(lsContent.find((f) => f.name === args[0])?.link);
    }
  },
  clear: {
    execute: (_, store: AppStore) => {
      store.clearHistory();
    }
  }
};

export const autocomplete = (input: string) => {
  const [command, ...args] = input.split(' ').filter((str) => str !== '');

  if (!args.length) {
    return validCommands.find((man) => args[0] !== '' && man.startsWith(args[0])) || '';
  }

  if (command in commands && args.length) {
    return commands[command].autocomplete?.(args) || '';
  }

  return '';
};

export const validate = (input: string) => {
  const [command, ...args] = input.split(' ').filter((str) => str !== '');

  if (!(command in commands)) {
    return `${command} is not recognized. Valid commands ${validCommands.join(', ')}`;
  }

  if (command in commands && args.length) {
    return commands[command].validate?.(args);
  }
};

export const render = (input: string) => {
  const [command, ...args] = input.split(' ').filter((str) => str !== '');

  if (command in commands) {
    return commands[command].render?.(args);
  }
};

export const execute = (input: string, store: AppStore) => {
  const [command, ...args] = input.split(' ').filter((str) => str !== '');

  if (command in commands) {
    return commands[command].execute?.(args, store);
  }
};
