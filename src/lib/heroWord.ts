import { useSyncExternalStore } from "react";

/**
 * Which word of the name the particle field is showing. Lives outside React
 * state so the canvas loop can update it without re-rendering the page.
 */
let current = 0;
const listeners = new Set<() => void>();

export function setHeroWord(index: number) {
  if (index === current) return;
  current = index;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const read = () => current;

export function useHeroWord() {
  return useSyncExternalStore(subscribe, read, read);
}
