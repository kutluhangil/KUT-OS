/* ─── Types ─────────────────────────────────────────────────── */

export type FSFile = {
  type: "file";
  name: string;
  content: string;
  size: number;
  modified: Date;
  perms: string;
  binary?: boolean;
};

export type FSDir = {
  type: "dir";
  name: string;
  children: Record<string, FSNode>;
  modified: Date;
};

export type FSNode = FSFile | FSDir;

/* ─── VFS Singleton ──────────────────────────────────────────── */

let _root: FSDir | null = null;

export function getRoot(): FSDir {
  if (!_root) throw new Error("VFS not initialized — call initFS() first");
  return _root;
}

export function setRoot(root: FSDir): void {
  _root = root;
}

/* ─── Path Utilities ─────────────────────────────────────────── */

export function normalizePath(raw: string, cwd: string): string {
  if (raw === "~" || raw === "") return "/home/kut";
  if (raw.startsWith("~/")) return "/home/kut/" + raw.slice(2);
  if (!raw.startsWith("/")) {
    // relative path
    const base = cwd.endsWith("/") ? cwd : cwd + "/";
    raw = base + raw;
  }
  // Resolve . and ..
  const parts = raw.split("/").filter(Boolean);
  const resolved: string[] = [];
  for (const part of parts) {
    if (part === ".") continue;
    if (part === "..") {
      resolved.pop();
    } else {
      resolved.push(part);
    }
  }
  return "/" + resolved.join("/");
}

export function dirname(path: string): string {
  const idx = path.lastIndexOf("/");
  if (idx <= 0) return "/";
  return path.slice(0, idx);
}

export function basename(path: string): string {
  return path.slice(path.lastIndexOf("/") + 1);
}

/* ─── Node Access ────────────────────────────────────────────── */

export function getNode(path: string): FSNode | null {
  const root = getRoot();
  if (path === "/") return root;
  const parts = path.split("/").filter(Boolean);
  let current: FSNode = root;
  for (const part of parts) {
    if (current.type !== "dir") return null;
    const child: FSNode | undefined = current.children[part];
    if (!child) return null;
    current = child;
  }
  return current;
}

export function getDir(path: string): FSDir | null {
  const node = getNode(path);
  if (!node || node.type !== "dir") return null;
  return node;
}

export function getFile(path: string): FSFile | null {
  const node = getNode(path);
  if (!node || node.type !== "file") return null;
  return node;
}

/* ─── Mutations ──────────────────────────────────────────────── */

export function setNode(path: string, node: FSNode): boolean {
  const root = getRoot();
  const parent = dirname(path);
  const name = basename(path);
  if (!name) return false;

  const parentDir = parent === "/" ? root : getDir(parent);
  if (!parentDir) return false;

  parentDir.children[name] = node;
  parentDir.modified = new Date();
  return true;
}

export function deleteNode(path: string): boolean {
  if (path === "/" || path === "/home" || path === "/home/kut") return false;
  const root = getRoot();
  const parent = dirname(path);
  const name = basename(path);
  const parentDir = parent === "/" ? root : getDir(parent);
  if (!parentDir || !parentDir.children[name]) return false;
  delete parentDir.children[name];
  parentDir.modified = new Date();
  return true;
}

/* ─── File helpers ───────────────────────────────────────────── */

export function makeFile(name: string, content: string, perms = "-rw-r--r--"): FSFile {
  return {
    type: "file",
    name,
    content,
    size: new TextEncoder().encode(content).length,
    modified: new Date(),
    perms,
  };
}

export function makeDir(name: string, children: Record<string, FSNode> = {}): FSDir {
  return { type: "dir", name, children, modified: new Date() };
}
