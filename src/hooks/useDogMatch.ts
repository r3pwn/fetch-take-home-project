import { create } from "zustand";

interface MatchState {
  matches: string[];
  addMatch: (match: string) => void;
  removeMatch: (match: string) => void;
}

export const useDogMatch = create<MatchState>((set) => ({
  matches: [],
  addMatch: (match: string) =>
    set((state) => ({ matches: [...state.matches, match] })),
  removeMatch: (match: string) =>
    set((state) => ({ matches: state.matches.filter((m) => m !== match) })),
}));
