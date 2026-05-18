const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

let progress = 0;
let onActivate: (() => void) | null = null;

function handleKey(e: KeyboardEvent) {
  if (e.key === SEQUENCE[progress]) {
    progress++;
    if (progress === SEQUENCE.length) {
      progress = 0;
      onActivate?.();
    }
  } else {
    progress = e.key === SEQUENCE[0] ? 1 : 0;
  }
}

export function listenKonami(callback: () => void): () => void {
  onActivate = callback;
  window.addEventListener("keydown", handleKey);
  return () => {
    window.removeEventListener("keydown", handleKey);
    onActivate = null;
    progress = 0;
  };
}
