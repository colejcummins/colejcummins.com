'use client';

import React from 'react';

import ActiveText from '@/components/active-text';
import { AppStore } from '@/store';
import { fs, ROOT_NAME, FsNode } from '@/lib/filesystem';

interface Command {
  render?: (args: string[], location: string, store: AppStore) => React.JSX.Element | undefined;
  autocomplete?: (args: string[], store: AppStore) => string | undefined;
  validate?: (args: string[], store: AppStore) => string | undefined;
  execute?: (args: string[], store: AppStore) => void;
}

export const commandMan: Record<string, string> = {
  man: 'Man',
  whoami: 'Displays effective user id. Usage:\nwhoami',
  ls: 'Lists directory contents. Usage:\nls [ -l | -a ]',
  clear: 'Clears console and command history. Usage:\nclear',
  mode: 'Changes the current color mode. Usage:\nmode [ light | dark ]',
  pwd: 'Displays the current working directory. Usage:\npwd',
  cd: 'Changes current directory. Usage:\ncd [ . | .. | directory_name ]',
  echo: 'Displays a line of text. Usage:\necho [text]'
};

const renderLsContent = (args: string[], location: string, store: AppStore) => {
  const children = args.includes('-a') ? fs.listWithDots(location) : fs.listAll(location);

  const handleOnClick = (child: FsNode) => {
    return !child.link && !child.download
      ? () => {
          store.addHistory(`cd ${child.label}`, '', location);
          store.goToNode(child.id);
        }
      : () => {};
  };

  if (args.includes('-l')) {
    return (
      <div className="flex flex-col gap-1">
        {children.map((child) => (
          <div key={child.id}>
            <ActiveText onClick={handleOnClick(child)} link={child.link ?? child.download} download={!!child.download}>
              <div className="flex gap-1 md:gap-4" key={child.id}>
                <div className="whitespace-nowrap hidden md:flex">{fs.getPermissions(child.id)}</div>
                <div className="hidden lg:flex">colejcummins</div>
                <div className="w-[20px] hidden lg:flex">{fs.getChildren(child.id).length}</div>
                <div className="flex whitespace-nowrap w-[170px] md:w-[200px] lg:w-[220px]">
                  {child.metadata?.tech || ''}
                </div>
                <div>{child.label}</div>
              </div>
            </ActiveText>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid gap-y-1 gap-x-2 w-full"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
    >
      {children.map((child) => (
        <ActiveText
          key={child.id}
          onClick={handleOnClick(child)}
          link={child.link ?? child.download}
          download={!!child.download}
        >
          {child.label}
        </ActiveText>
      ))}
    </div>
  );
};

const renderCdContent = (args: string[], location: string, store: AppStore) => {
  let newLocation = '';
  if (args.length === 0) {
    newLocation = ROOT_NAME;
  } else if (args[0] === '..') {
    newLocation = fs.getParent(location)?.id ?? ROOT_NAME;
  } else if (args[0] === '.') {
    newLocation = location;
  } else if (fs.getValidCdTargets(location).includes(args[0])) {
    newLocation = args[0];
  }

  return newLocation ? renderLsContent([], newLocation, store) : undefined;
};

const renderWhoAmIContent = () => {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <ActiveText link="https://github.com/colejcummins">
        <div className="flex items-center gap-5">
          <div className="flex flex-col">
            <div className="text-xl font-semibold">Cole Cummins</div>
            <div>React / Typescript / Nodejs / Nextjs / Python / ThreeJS</div>
          </div>
        </div>
      </ActiveText>
    </div>
  );
};

const renderEchoContent = (args: string[]) => {
  return <>{args.join(' ')}</>;
};

const validCommands = ['man', 'whoami', 'ls', 'clear', 'mode', 'cd', 'pwd', 'echo'];
const validlsArgs = ['-a', '-l'];
export const commands: Record<string, Command> = {
  ls: {
    autocomplete: (args: string[]) => {
      return validlsArgs.find((man) => man.startsWith(args[0]));
    },
    validate: (args: string[]) => {
      if (!validlsArgs.includes(args[0])) {
        return `${args} is not a valid argument. Valid arguments:\n${validlsArgs.join(' ')}`;
      }
      return '';
    },
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
      const input = args.length > 0 ? args[0] : 'man';
      return <pre className="font-mono text-foreground">{commandMan[input]}</pre>;
    }
  },
  cd: {
    autocomplete: (args: string[], store: AppStore) => {
      return store.validCdTargets.find((name) => name.startsWith(args[0]));
    },
    validate: (args: string[], store: AppStore) => {
      if (args.length > 0 && !store.validCdTargets.includes(args[0])) {
        return `${args[0]} is not a valid argument. Valid arguments:\n${store.validCdTargets.join(' ')}`;
      }
      return '';
    },
    render: renderCdContent,
    execute: (args: string[], store: AppStore) => {
      if (args.length === 0) {
        store.goToNode(ROOT_NAME);
      } else if (args[0] === '..') {
        store.goToNode(fs.getParent(store.currentNode)?.id ?? ROOT_NAME);
      } else if (args[0] === '.') {
        return;
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
      return args.length > 0 ? ['light', 'dark'].find((mode) => mode.startsWith(args[0])) : '';
    },
    validate: (args: string[]) => {
      if (args.length && !['light', 'dark'].includes(args[0])) {
        return `${args} is not a valid argument\nValid arguments: light, dark`;
      }
      return '';
    },
    execute: (args: string[], store: AppStore) => {
      store.setLightMode(args.length > 0 ? args[0] === 'light' : !store.lightMode);
    }
  },
  pwd: {
    render: (_, location: string) => {
      return <>{fs.getPath(location)}</>;
    }
  },
  echo: {
    render: renderEchoContent,
    validate: () => {
      return '';
    }
  }
};

export const autocomplete = (input: string, store: AppStore) => {
  const [command, ...args] = input.split(' ').filter((str) => str !== '');

  if (!args.length) {
    return validCommands.sort((a, b) => a.localeCompare(b)).find((man) => man.startsWith(command)) ?? '';
  }

  if (command in commands && args.length) {
    const complete = commands[command].autocomplete?.(args, store) ?? '';
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

export const render = (input: string, location: string, store: AppStore) => {
  const [command, ...args] = input.split(' ').filter((str) => str !== '');

  if (command in commands) {
    return commands[command].render?.(args, location, store);
  }
};

export const execute = (input: string, store: AppStore) => {
  const [command, ...args] = input.split(' ').filter((str) => str !== '');

  if (command in commands) {
    return commands[command].execute?.(args, store);
  }
};
