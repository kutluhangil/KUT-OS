import { getRoot, setRoot, type FSDir, type FSNode } from "./filesystem";
import { buildSeedFS } from "./seedFiles";

const LS_KEY = "kut-os-fs-overlay";

interface Overlay {
  created: Record<string, { type: "file"; content: string }>;
  deleted: string[];
}

function loadOverlay(): Overlay {
  if (typeof window === "undefined") return { created: {}, deleted: [] };
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : { created: {}, deleted: [] };
  } catch {
    return { created: {}, deleted: [] };
  }
}

function saveOverlay(overlay: Overlay): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(overlay));
}

export function initFS(): void {
  const root = buildSeedFS();
  const overlay = loadOverlay();

  // Apply deletions
  for (const path of overlay.deleted) {
    const parts = path.split("/").filter(Boolean);
    let current: FSNode = root;
    let parent: FSDir | null = null;
    let lastName = "";
    for (const part of parts) {
      if (current.type !== "dir") break;
      parent = current;
      lastName = part;
      current = current.children[part] ?? current;
    }
    if (parent && lastName) {
      delete parent.children[lastName];
    }
  }

  // Apply user-created files
  for (const [path, data] of Object.entries(overlay.created)) {
    const parts = path.split("/").filter(Boolean);
    const fileName = parts[parts.length - 1];
    let current: FSNode = root;
    for (let i = 0; i < parts.length - 1; i++) {
      if (current.type !== "dir") break;
      current = current.children[parts[i]] ?? current;
    }
    if (current.type === "dir" && fileName) {
      current.children[fileName] = {
        type: "file",
        name: fileName,
        content: data.content,
        size: new TextEncoder().encode(data.content).length,
        modified: new Date(),
        perms: "-rw-r--r--",
      };
    }
  }

  setRoot(root);
}

/** Persist a user-created file to localStorage overlay */
export function persistCreatedFile(path: string, content: string): void {
  const overlay = loadOverlay();
  overlay.created[path] = { type: "file", content };
  saveOverlay(overlay);
}

/** Persist a deletion to localStorage overlay */
export function persistDeletion(path: string): void {
  const overlay = loadOverlay();
  overlay.deleted = [...new Set([...overlay.deleted, path])];
  // Remove from created if it was user-created
  delete overlay.created[path];
  saveOverlay(overlay);
}

/** Factory reset — clear user overlay */
export function resetFS(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LS_KEY);
  }
  const fresh = buildSeedFS();
  setRoot(fresh);
}
