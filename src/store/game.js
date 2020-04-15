import { writable } from 'svelte/store';

function createGame() {
  const { subscribe, set, update } = writable(false);

  return {
    subscribe,
    start: () => set(true),
    stop: () => set(false)
  };
}

export const game = createGame();
