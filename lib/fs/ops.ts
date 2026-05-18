import {
  getNode,
  getDir,
  getFile,
  setNode,
  deleteNode,
  normalizePath,
  makeFile,
  makeDir,
  type FSNode,
  type FSDir,
} from "./filesystem";
import { persistCreatedFile, persistDeletion } from "./persist";
import { formatBytes } from "@/lib/utils/format";

export type OpsResult = { ok: true; data: string } | { ok: false; error: string };

/* ─── ls ─────────────────────────────────────────────────────── */

export function ls(path: string, cwd: string, showHidden: boolean, longForm: boolean): OpsResult {
  const resolved = normalizePath(path, cwd);
  const node = getNode(resolved);

  if (!node) return { ok: false, error: `ls: ${path}: no such file or directory` };

  if (node.type === "file") {
    return { ok: true, data: formatEntry(node, resolved, longForm) };
  }

  const dir = node as FSDir;
  const entries = Object.values(dir.children)
    .filter((n) => showHidden || !n.name.startsWith("."))
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

  if (entries.length === 0) return { ok: true, data: "" };

  if (longForm) {
    const lines = entries.map((n) => formatEntry(n, resolved, true));
    return { ok: true, data: lines.join("\n") };
  }

  const names = entries.map((n) => {
    const isDir = n.type === "dir";
    const color = isDir ? `\x1b[34m${n.name}/\x1b[0m` : n.name;
    return color;
  });
  return { ok: true, data: "  " + names.join("  ") };
}

function formatEntry(node: FSNode, parentPath: string, long: boolean): string {
  if (!long) return node.name;
  const isDir = node.type === "dir";
  const perms = isDir ? "drwxr-xr-x" : ((node as { perms?: string }).perms ?? "-rw-r--r--");
  const size = isDir ? "-" : formatBytes((node as { size: number }).size);
  const date = new Date(node.modified).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
  const name = isDir ? `\x1b[34m${node.name}/\x1b[0m` : node.name;
  return `  ${perms}  ${size.padStart(6)}  ${date}  ${name}`;
}

/* ─── cd ─────────────────────────────────────────────────────── */

export function cd(path: string, cwd: string): OpsResult & { newCwd?: string } {
  const resolved = normalizePath(path, cwd);
  const node = getNode(resolved);
  if (!node) return { ok: false, error: `cd: ${path}: no such file or directory` };
  if (node.type !== "dir") return { ok: false, error: `cd: ${path}: not a directory` };
  return { ok: true, data: resolved, newCwd: resolved };
}

/* ─── cat ────────────────────────────────────────────────────── */

export function cat(path: string, cwd: string): OpsResult {
  const resolved = normalizePath(path, cwd);
  const node = getNode(resolved);
  if (!node) return { ok: false, error: `cat: ${path}: no such file or directory` };
  if (node.type !== "file") return { ok: false, error: `cat: ${path}: is a directory` };
  if (node.binary) {
    return { ok: true, data: node.content };
  }
  return { ok: true, data: node.content };
}

/* ─── pwd ────────────────────────────────────────────────────── */

export function pwd(cwd: string): OpsResult {
  return { ok: true, data: cwd };
}

/* ─── mkdir ──────────────────────────────────────────────────── */

export function mkdir(name: string, cwd: string): OpsResult {
  const resolved = normalizePath(name, cwd);
  if (getNode(resolved)) {
    return { ok: false, error: `mkdir: ${name}: file exists` };
  }
  const dir = makeDir(name.split("/").pop() ?? name);
  const created = setNode(resolved, dir);
  if (!created) return { ok: false, error: `mkdir: ${name}: no such file or directory` };
  return { ok: true, data: "" };
}

/* ─── touch ──────────────────────────────────────────────────── */

export function touch(name: string, cwd: string): OpsResult {
  const resolved = normalizePath(name, cwd);
  const existing = getNode(resolved);
  if (existing) {
    (existing as { modified: Date }).modified = new Date();
    return { ok: true, data: "" };
  }
  const fileName = name.split("/").pop() ?? name;
  const file = makeFile(fileName, "");
  const created = setNode(resolved, file);
  if (!created) return { ok: false, error: `touch: ${name}: no such file or directory` };
  persistCreatedFile(resolved, "");
  return { ok: true, data: "" };
}

/* ─── rm ─────────────────────────────────────────────────────── */

export function rm(
  path: string,
  cwd: string,
  recursive: boolean
): OpsResult & { isRootNuke?: boolean } {
  const resolved = normalizePath(path, cwd);

  // Special: rm -rf /
  if (resolved === "/" && recursive) {
    return { ok: true, data: "", isRootNuke: true };
  }

  const node = getNode(resolved);
  if (!node) return { ok: false, error: `rm: ${path}: no such file or directory` };
  if (node.type === "dir" && !recursive) {
    return { ok: false, error: `rm: ${path}: is a directory (use -r to remove)` };
  }

  // Protect seed directories
  const PROTECTED = ["/home/kut", "/home", "/etc", "/var"];
  if (PROTECTED.includes(resolved)) {
    return { ok: false, error: `rm: ${path}: permission denied` };
  }

  deleteNode(resolved);
  persistDeletion(resolved);
  return { ok: true, data: "" };
}

/* ─── mv ─────────────────────────────────────────────────────── */

export function mv(src: string, dst: string, cwd: string): OpsResult {
  const srcResolved = normalizePath(src, cwd);
  const dstResolved = normalizePath(dst, cwd);
  const node = getNode(srcResolved);
  if (!node) return { ok: false, error: `mv: ${src}: no such file or directory` };
  setNode(dstResolved, { ...node, name: dst.split("/").pop() ?? dst });
  deleteNode(srcResolved);
  return { ok: true, data: "" };
}

/* ─── cp ─────────────────────────────────────────────────────── */

export function cp(src: string, dst: string, cwd: string): OpsResult {
  const srcResolved = normalizePath(src, cwd);
  const dstResolved = normalizePath(dst, cwd);
  const node = getNode(srcResolved);
  if (!node) return { ok: false, error: `cp: ${src}: no such file or directory` };
  setNode(dstResolved, { ...node, name: dst.split("/").pop() ?? dst });
  return { ok: true, data: "" };
}

/* ─── tree ───────────────────────────────────────────────────── */

export function tree(path: string, cwd: string): OpsResult {
  const resolved = normalizePath(path || ".", cwd);
  const node = getNode(resolved);
  if (!node) return { ok: false, error: `tree: ${path}: no such file or directory` };
  if (node.type !== "dir") return { ok: false, error: `tree: ${path}: not a directory` };

  const lines: string[] = [resolved];
  renderTree(node as FSDir, "", lines);
  return { ok: true, data: lines.join("\n") };
}

function renderTree(dir: FSDir, prefix: string, lines: string[]): void {
  const entries = Object.values(dir.children)
    .filter((n) => !n.name.startsWith("."))
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

  entries.forEach((node, i) => {
    const isLast = i === entries.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const childPrefix = isLast ? "    " : "│   ";
    const name = node.type === "dir" ? `${node.name}/` : node.name;
    lines.push(prefix + connector + name);
    if (node.type === "dir") {
      renderTree(node, prefix + childPrefix, lines);
    }
  });
}
