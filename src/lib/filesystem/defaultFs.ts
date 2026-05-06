import { FsNode, FsEdge } from './FileSystem';

export const ROOT_NAME = 'colejcummins';

export const defaultNodes: FsNode[] = [
  { id: 'colejcummins', label: 'colejcummins' },
  { id: 'resume.pdf', label: 'resume.pdf', metadata: { type: 'PDF' }, download: 'ColeCumminsResume2024.pdf' },
  {
    id: 'resume-dark.pdf',
    label: 'resume-dark.pdf',
    metadata: { type: 'PDF' },
    download: 'ColeCumminsResume2024Dark.pdf'
  },
  { id: 'pyssect', label: 'pyssect', metadata: { tech: 'Python / React / Nodejs' } },
  {
    id: 'pyssect/repo',
    label: 'repo',
    metadata: { tech: 'Python / React / Nodejs' },
    link: 'https://github.com/colejcummins/pyssect'
  },
  {
    id: 'pyssect/README.md',
    label: 'README.md',
    metadata: { tech: 'Markdown' },
    link: 'https://github.com/colejcummins/pyssect/blob/main/README.md'
  },
  { id: 'minilang-compiler', label: 'minilang-compiler', metadata: { tech: 'Java / Clang' } },
  {
    id: 'minilang-compiler/repo',
    label: 'repo',
    metadata: { tech: 'Java / Clang' },
    link: 'https://github.com/colejcummins/minilang-compiler'
  },
  {
    id: 'minilang-compiler/README.md',
    label: 'README.md',
    metadata: { tech: 'Markdown' },
    link: 'https://github.com/colejcummins/minilang-compiler/blob/main/README.md'
  },
  { id: 'llvm-syntax-highlighting', label: 'llvm-syntax-highlighting', metadata: { tech: 'LLVM / JSON' } },
  {
    id: 'llvm-syntax-highlighting/repo',
    label: 'repo',
    metadata: { tech: 'LLVM / JSON' },
    link: 'https://github.com/colejcummins/llvm-syntax-highlighting'
  },
  {
    id: 'llvm-syntax-highlighting/README.md',
    label: 'README.md',
    metadata: { tech: 'Markdown' },
    link: 'https://github.com/colejcummins/llvm-syntax-highlighting/blob/main/README.md'
  },
  { id: 'image-to-ascii', label: 'image-to-ascii', metadata: { tech: 'Python' } },
  {
    id: 'image-to-ascii/repo',
    label: 'repo',
    metadata: { tech: 'Python' },
    link: 'https://github.com/colejcummins/image-to-ascii'
  },
  {
    id: 'image-to-ascii/README.md',
    label: 'README.md',
    metadata: { tech: 'Markdown' },
    link: 'https://github.com/colejcummins/image-to-ascii/blob/main/README.md'
  },
  { id: 'learn-crypto', label: 'learn-crypto', metadata: { tech: 'Python / Cryptography' } },
  {
    id: 'learn-crypto/repo',
    label: 'repo',
    metadata: { tech: 'Python / Cryptography' },
    link: 'https://github.com/colejcummins/learn-crypto'
  },
  {
    id: 'learn-crypto/README.md',
    label: 'README.md',
    metadata: { tech: 'Markdown' },
    link: 'https://github.com/colejcummins/learn-crypto/blob/master/README.md'
  }
];

export const defaultEdges: FsEdge[] = [
  { parent: 'colejcummins', child: 'resume.pdf' },
  { parent: 'colejcummins', child: 'resume-dark.pdf' },
  { parent: 'colejcummins', child: 'pyssect' },
  { parent: 'colejcummins', child: 'llvm-syntax-highlighting' },
  { parent: 'colejcummins', child: 'minilang-compiler' },
  { parent: 'colejcummins', child: 'learn-crypto' },
  { parent: 'colejcummins', child: 'image-to-ascii' },
  { parent: 'pyssect', child: 'pyssect/repo' },
  { parent: 'pyssect', child: 'pyssect/README.md' },
  { parent: 'minilang-compiler', child: 'minilang-compiler/repo' },
  { parent: 'minilang-compiler', child: 'minilang-compiler/README.md' },
  { parent: 'llvm-syntax-highlighting', child: 'llvm-syntax-highlighting/repo' },
  { parent: 'llvm-syntax-highlighting', child: 'llvm-syntax-highlighting/README.md' },
  { parent: 'image-to-ascii', child: 'image-to-ascii/repo' },
  { parent: 'image-to-ascii', child: 'image-to-ascii/README.md' },
  { parent: 'learn-crypto', child: 'learn-crypto/repo' },
  { parent: 'learn-crypto', child: 'learn-crypto/README.md' }
];
