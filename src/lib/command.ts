
export type Command = {
  name: string;
  location: string;
}

export const validCommands = ['help', 'man', 'whoami', 'ls', 'clear'];

export const commandMan = {
  'help': 'Duh....',
  'man': 'Mannnnnnn.....',
  'whoami': 'Displays effective user id',
  'ls': 'Lists directory contents',
  'clear': 'Clears console and command history',
};