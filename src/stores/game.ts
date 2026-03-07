import { create } from "zustand";
import type { Item } from "../types/item";

interface State {
  game: Item | null;
  setGame: (game: Item) => void;
}

export const useGameStore = create<State>((set) => ({
  game: null,
  setGame: (game) => set({ game }),
}));
