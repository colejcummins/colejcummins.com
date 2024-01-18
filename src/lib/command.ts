
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

export const validateCommand = (input: string): {error?: string, message?: string} | undefined => {
  const [command, ...args] = input.split(' ').filter((val) => val !== '');
  if (!validCommands.includes(command)) {
    return {error: `${command} is not a valid command`, message: `Valid commands: ${validCommands.join(', ')}`};
  }
  if (command === 'man') {
    if (!args || args.length > 1) {
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