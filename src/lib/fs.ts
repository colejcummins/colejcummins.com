export interface FsDirectory {
  type: 'directory',
  name: string;
  tech?: string;
  children: string[];
  parent: string;
}

interface FsFile {
  type: 'file',
  name: string;
  tech?: string;
  link?: string;
  download?: string;
}

export const ROOTNAME = 'colejcummins';

export const fs: Record<string, FsDirectory | FsFile> = {
  colejcummins: {
    type: 'directory',
    name: 'colejcummins',
    parent: 'colejcummins',
    children: [
      'resume.pdf',
      'resume-dark.pdf',
      'pyssect',
      'llvm-syntax-highlighting',
      'minilang-compiler',
      'learn-crypto',
      'image-to-ascii',
      'react-search-modal',
    ],
  },
  'resume.pdf': {
    type: 'file',
    name: 'resume.pdf',
    tech: 'PDF',
    download: 'ColeCumminsResume2024.pdf'
  },
  'resume-dark.pdf': {
    type: 'file',
    name: 'resume-dark.pdf',
    tech: 'PDF',
    download: 'ColeCumminsResume2024Dark.pdf'
  },
  'pyssect': {
    type: 'directory',
    name: 'pyssect',
    parent: 'colejcummins',
    tech: 'Python / React / Nodejs',
    children: ['pyssect/repo', 'pyssect/README.md'],
  },
  'pyssect/repo': {
    type: 'file',
    name: 'repo',
    tech: 'Python / React / Nodejs',
    link: 'https://github.com/colejcummins/pyssect'
  },
  'pyssect/README.md': {
    type: 'file',
    name: 'README.md',
    tech: 'Markdown',
    link: 'https://github.com/colejcummins/pyssect/blob/main/README.md'
  },
  'minilang-compiler': {
    type: 'directory',
    name: 'minilang-compiler',
    parent: 'colejcummins',
    tech: 'Java / Clang',
    children: ['minilang-compiler/repo', 'minilang-compiler/README.md'],
  },
  'minilang-compiler/repo': {
    type: 'file',
    name: 'repo',
    tech: 'Java / Clang',
    link: 'https://github.com/colejcummins/minilang-compiler'
  },
  'minilang-compiler/README.md': {
    type: 'file',
    name: 'README.md',
    tech: 'Markdown',
    link: 'https://github.com/colejcummins/minilang-compiler/blob/main/README.md'
  },
  'llvm-syntax-highlighting': {
    type: 'directory',
    name: 'llvm-syntax-highlighting',
    tech: 'LLVM / JSON',
    parent: 'colejcummins',
    children: ['llvm-syntax-highlighting/repo', 'llvm-syntax-highlighting/README.md']
  },
  'llvm-syntax-highlighting/repo': {
    type: 'file',
    name: 'repo',
    tech: 'LLVM / JSON',
    link: 'https://github.com/colejcummins/llvm-syntax-highlighting'
  },
  'llvm-syntax-highlighting/README.md': {
    type: 'file',
    name: 'README.md',
    tech: 'Markdown',
    link: 'https://github.com/colejcummins/llvm-syntax-highlighting/blob/main/README.md'
  },
  'react-search-modal': {
    type: 'directory',
    name: 'react-search-modal',
    tech: 'React / Elasticsearch',
    parent: 'colejcummins',
    children: [],
  },
  'image-to-ascii': {
    type: 'directory',
    name: 'image-to-ascii',
    tech: 'Python',
    parent: 'colejcummins',
    children: ['image-to-ascii/repo', 'image-to-ascii/README.md']
  },
  'image-to-ascii/repo': {
    type: 'file',
    name: 'repo',
    tech: 'Python',
    link: 'https://github.com/colejcummins/image-to-ascii'
  },
  'image-to-ascii/README.md': {
    type: 'file',
    name: 'README.md',
    tech: 'Markdown',
    link: 'https://github.com/colejcummins/image-to-ascii/blob/main/README.md'
  },
  'learn-crypto': {
    type: 'directory',
    name: 'learn-crypto',
    tech: 'Python / Cryptography',
    parent: 'colejcummins',
    children: ['learn-crypto/repo', 'learn-crypto/README.md']
  },
  'learn-crypto/repo': {
    type: 'file',
    name: 'repo',
    tech: 'Python / Cryptography',
    link: 'https://github.com/colejcummins/learn-crypto',
  },
  'learn-crypto/README.md': {
    type: 'file',
    name: 'README.md',
    tech: 'Markdown',
    link: 'https://github.com/colejcummins/learn-crypto/blob/master/README.md'
  }
};

export const outputPwd = (cur: string) => {
  const outputList = [fs[cur].name];
  while (cur !== 'colejcummins') {
    cur = fs[(fs[cur] as FsDirectory).parent].name;
    outputList.unshift(cur);
  }
  return outputList.join('/');
}

export const getCur = (cur: string): FsDirectory | FsFile => {
  return fs[cur];
}

export const getChildren = (cur: string): Array<FsDirectory | FsFile> => {
  return (fs[cur] as FsDirectory).children.map((child) => fs[child])
}

export const getValidCdTargets = (cur: string): string[] => {
  const defaults = ['colejcummins', '..', '.'];
  return [...defaults, ...getChildren(cur).filter((node) => node.type === 'directory').map((node) => node.name)];
}

export const getParent = (cur: string): FsDirectory | FsFile => {
  return fs[(fs[cur] as FsDirectory).parent];
}

export const getPermissions = (fName: string) => {
  const cur = fs[fName];
  const isDir = cur.type === 'directory';
  const execFlag = isDir ? 'x' : '-';
  return `${isDir ? 'd' : '-'}rw${execFlag}r-${execFlag}r-${execFlag}@`;
}
