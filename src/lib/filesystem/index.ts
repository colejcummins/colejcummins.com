import { FileSystem } from './FileSystem';
import { ROOT_NAME, defaultNodes, defaultEdges } from './defaultFs';

export { FileSystem, ROOT_NAME };
export type { FsNode, FsEdge } from './FileSystem';

export const fs = new FileSystem(ROOT_NAME, defaultNodes, defaultEdges);
