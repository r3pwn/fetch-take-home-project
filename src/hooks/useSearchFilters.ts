import { create } from "zustand";

interface FilterState {
  selectedBreeds: string[];
  sortOrder: string;
  sortBy: string;
  setSelectedBreeds: (selectedBreeds: string[]) => void;
  setSortOrder: (sortOrder: string) => void;
  setSortBy: (sortBy: string) => void;
}

export const useSearchFilters = create<FilterState>((set) => ({
  selectedBreeds: [],
  sortOrder: "asc",
  sortBy: "breed",
  setSelectedBreeds: (selectedBreeds: string[]) => set({ selectedBreeds }),
  setSortOrder: (sortOrder: string) => set({ sortOrder }),
  setSortBy: (sortBy: string) => set({ sortBy }),
}));
