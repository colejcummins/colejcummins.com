
export type Command = {
  name: string;
  location: string;
}

export const validCommands = ['help', 'man', 'whoami', 'cd', 'ls', 'clear'];
export const validDirs = ['.', '..', 'pyssect', 'minilang-compiler', 'asciizer', 'react-select'];

export const commandMan = {
  'help': 'Duh....',
  'man': 'Mannnnnnn.....',
  'whoami': 'Displays effective user id',
  'cd': 'Navigates to a listed directory',
  'ls': 'Lists directory contents',
  'clear': 'Clears console and command history',
};

export const autocomplete = (input: string): string => {
  const [command, ...args] = input.split(' ').filter((val) => val !== '');

  switch (command) {
    case 'cd':
      const cd = validDirs.find((validDir) => args[0] !== '' && validDir.startsWith(args[0]));
      if (cd) {
        return input + cd.substring(args[0].length);
      }
      break;
    case 'man': {
      const man = Object.keys(commandMan).find((man) => args[0] !== '' && man.startsWith(args[0]));
      if (man) {
        return input + man.substring(args[0].length);
      }
      break;
    }
    default:
      const startsWith = validCommands.find((validC) => command !== '' && validC.startsWith(command));
      if (startsWith) {
        return input + startsWith.substring(input.length);
      }
  }

  return '';
}

export const validateCommand = (input: string): {error?: string, message?: string} | undefined => {
  const [command, ...args] = input.split(' ').filter((val) => val !== '');
  if (!validCommands.includes(command)) {
    return {error: `${command} is not a valid command`, message: `Valid commands: ${validCommands.join(', ')}`};
  }
  if (command === 'man') {
    if (!args || args.length < 1) {
      return {error: `man expects 1 argument`, message: `Valid arguments: ${validCommands.join(', ')}`}
    }
    if (!validCommands.includes(args[0])) {
      return {error: `${args} is not a valid argument`, message: `Valid arguments: ${validCommands.join(', ')}`}
    }
  }
  if (command === 'cd') {
    if (!args || args.length > 1) {
      return {error: `cd expects 1 argument`, message: `Valid arguments: ${validDirs.join(' ')}`}
    }
    if (!validDirs.includes(args[0])) {
      return {error: `${args[0]} is not a valid directory`, message: `Valid Directories: ${validDirs.join(' ')}`}
    }
  }
}