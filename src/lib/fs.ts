export interface FsObject {
  id: string;
  name: string;
  parent: string;
  tech?: string;
  children?: string[];
  link?: string;
  download?: string;
}

export const ROOTNAME = 'colejcummins';
export const DEFAULT_TARGETS = ['.', '..', 'colejcummins'];

export const fs: Record<string, FsObject> = {
  colejcummins: {
    id: 'colejcummins',
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
      'react-search-modal'
    ]
  },
  'resume.pdf': {
    id: 'resume.pdf',
    name: 'resume.pdf',
    parent: 'colejcummins',
    tech: 'PDF',
    download: 'ColeCumminsResume2024.pdf'
  },
  'resume-dark.pdf': {
    id: 'resume-dark.pdf',
    name: 'resume-dark.pdf',
    parent: 'colejcummins',
    tech: 'PDF',
    download: 'ColeCumminsResume2024Dark.pdf'
  },
  pyssect: {
    id: 'pyssect',
    name: 'pyssect',
    parent: 'colejcummins',
    tech: 'Python / React / Nodejs',
    children: ['pyssect/repo', 'pyssect/README.md']
  },
  'pyssect/repo': {
    id: 'pyssect/repo',
    name: 'repo',
    parent: 'pyssect',
    tech: 'Python / React / Nodejs',
    link: 'https://github.com/colejcummins/pyssect'
  },
  'pyssect/README.md': {
    id: 'pyssect/README.md',
    name: 'README.md',
    parent: 'pyssect',
    tech: 'Markdown',
    link: 'https://github.com/colejcummins/pyssect/blob/main/README.md'
  },
  'minilang-compiler': {
    id: 'minilang-compiler',
    name: 'minilang-compiler',
    parent: 'colejcummins',
    tech: 'Java / Clang',
    children: ['minilang-compiler/repo', 'minilang-compiler/README.md']
  },
  'minilang-compiler/repo': {
    id: 'minilang-compiler/repo',
    name: 'repo',
    parent: 'minilang-compiler',
    tech: 'Java / Clang',
    link: 'https://github.com/colejcummins/minilang-compiler'
  },
  'minilang-compiler/README.md': {
    id: 'minilang-compiler/README.md',
    name: 'README.md',
    parent: 'minilang-compiler',
    tech: 'Markdown',
    link: 'https://github.com/colejcummins/minilang-compiler/blob/main/README.md'
  },
  'llvm-syntax-highlighting': {
    id: 'llvm-syntax-highlighting',
    name: 'llvm-syntax-highlighting',
    tech: 'LLVM / JSON',
    parent: 'colejcummins',
    children: ['llvm-syntax-highlighting/repo', 'llvm-syntax-highlighting/README.md']
  },
  'llvm-syntax-highlighting/repo': {
    id: 'llvm-syntax-highlighting/repo',
    name: 'repo',
    parent: 'llvm-syntax-highlighting',
    tech: 'LLVM / JSON',
    link: 'https://github.com/colejcummins/llvm-syntax-highlighting'
  },
  'llvm-syntax-highlighting/README.md': {
    id: 'llvm-syntax-highlighting/README.md',
    name: 'README.md',
    parent: 'llvm-syntax-highlighting',
    tech: 'Markdown',
    link: 'https://github.com/colejcummins/llvm-syntax-highlighting/blob/main/README.md'
  },
  'react-search-modal': {
    id: 'react-search-modal',
    name: 'react-search-modal',
    tech: 'React / Elasticsearch',
    parent: 'colejcummins',
    children: []
  },
  'image-to-ascii': {
    id: 'image-to-ascii',
    name: 'image-to-ascii',
    tech: 'Python',
    parent: 'colejcummins',
    children: ['image-to-ascii/repo', 'image-to-ascii/README.md']
  },
  'image-to-ascii/repo': {
    id: 'image-to-ascii/repo',
    name: 'repo',
    parent: 'image-to-ascii',
    tech: 'Python',
    link: 'https://github.com/colejcummins/image-to-ascii'
  },
  'image-to-ascii/README.md': {
    id: 'image-to-ascii/README.md',
    name: 'README.md',
    parent: 'image-to-ascii',
    tech: 'Markdown',
    link: 'https://github.com/colejcummins/image-to-ascii/blob/main/README.md'
  },
  'learn-crypto': {
    id: 'learn-crypto',
    name: 'learn-crypto',
    tech: 'Python / Cryptography',
    parent: 'colejcummins',
    children: ['learn-crypto/repo', 'learn-crypto/README.md']
  },
  'learn-crypto/repo': {
    id: 'learn-crypto/repo',
    name: 'repo',
    parent: 'learn-crypto',
    tech: 'Python / Cryptography',
    link: 'https://github.com/colejcummins/learn-crypto'
  },
  'learn-crypto/README.md': {
    id: 'learn-crypto/README.md',
    name: 'README.md',
    parent: 'learn-crypto',
    tech: 'Markdown',
    link: 'https://github.com/colejcummins/learn-crypto/blob/master/README.md'
  }
};

export const outputPwd = (cur: string) => {
  const outputList = [fs[cur].name];
  while (cur !== 'colejcummins') {
    cur = fs[fs[cur].parent].name;
    outputList.unshift(cur);
  }
  return outputList.join('/');
};

export const getCur = (cur: string): FsObject => {
  return fs[cur];
};

export const getChildren = (cur: string): FsObject[] => {
  return fs[cur].children?.map((child) => fs[child]) ?? [];
};

export const getLsAChildren = (cur: string): FsObject[] => {
  const renamedCur = { ...fs[cur], name: '.' };
  const renamedParent = { ...fs[fs[cur].parent], name: '..' };

  return [renamedCur, renamedParent, ...getChildren(cur)];
};

export const getValidCdTargets = (cur: string): string[] => {
  return [
    ...DEFAULT_TARGETS,
    ...getChildren(cur)
      .filter((node) => node.children)
      .map((node) => node.name)
  ];
};

export const getParent = (cur: string): FsObject => {
  return fs[fs[cur].parent];
};

export const getPermissions = (cur: string) => {
  const execFlag = fs[cur].children ? 'x' : '-';
  return `${fs[cur].children ? 'd' : '-'}rw${execFlag}r-${execFlag}r-${execFlag}@`;
};
