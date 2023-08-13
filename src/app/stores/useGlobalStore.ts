import { create } from "zustand";
import { availableColorThemes } from "../lib/constants";

interface GlobalStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
}));
