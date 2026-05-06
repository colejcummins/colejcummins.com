export interface FsNode {
  id: string;
  label: string;
  metadata?: Record<string, string>;
  link?: string;
  download?: string;
}

export interface FsEdge {
  parent: string;
  child: string;
}

export class FileSystem {
  private nodes: Map<string, FsNode> = new Map();
  private children: Map<string, string[]> = new Map();
  private parents: Map<string, string> = new Map();
  readonly root: string;

  constructor(root: string, nodes: FsNode[], edges: FsEdge[]) {
    this.root = root;

    for (const node of nodes) {
      this.nodes.set(node.id, node);
      this.children.set(node.id, []);
    }

    for (const edge of edges) {
      this.children.get(edge.parent)?.push(edge.child);
      this.parents.set(edge.child, edge.parent);
    }
  }

  getNode(id: string): FsNode | undefined {
    return this.nodes.get(id);
  }

  getChildren(id: string): FsNode[] {
    const childIds = this.children.get(id) ?? [];
    return childIds.map((n) => this.nodes.get(n)).filter((n): n is FsNode => n !== undefined);
  }

  getParent(id: string): FsNode | undefined {
    const parentId = this.parents.get(id);
    if (!parentId) return this.nodes.get(this.root);
    return this.nodes.get(parentId);
  }

  isDirectory(id: string): boolean {
    const children = this.children.get(id);
    return children !== undefined && children.length > 0;
  }

  getValidCdTargets(id: string): string[] {
    const dirs = this.getChildren(id)
      .filter((node) => this.isDirectory(node.id))
      .map((node) => node.id);
    return ['.', '..', this.root, ...dirs];
  }

  getPath(id: string): string {
    const parts: string[] = [];
    let current = id;
    while (current !== this.root) {
      const node = this.nodes.get(current);
      if (!node) break;
      parts.unshift(node.label);
      const parent = this.parents.get(current);
      if (!parent) break;
      current = parent;
    }
    const rootNode = this.nodes.get(this.root);
    parts.unshift(rootNode?.label ?? this.root);
    return parts.join('/');
  }

  getPermissions(id: string): string {
    const execFlag = this.isDirectory(id) ? 'x' : '-';
    return `${this.isDirectory(id) ? 'd' : '-'}rw${execFlag}r-${execFlag}r-${execFlag}@`;
  }

  listAll(id: string): FsNode[] {
    return this.getChildren(id);
  }

  listWithDots(id: string): FsNode[] {
    const current = this.nodes.get(id);
    const parent = this.getParent(id);
    const dotEntries: FsNode[] = [];
    if (current) dotEntries.push({ ...current, id: '.', label: '.' });
    if (parent) dotEntries.push({ ...parent, id: '..', label: '..' });
    return [...dotEntries, ...this.getChildren(id)];
  }
}
