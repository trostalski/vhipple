import { create } from "zustand";
import { Dataset } from "../datasets/lib/types";

interface GlobalStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  dataset: Dataset | undefined;
  setDataset: (dataset: Dataset | undefined) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  dataset: undefined,
  setDataset: (dataset: Dataset | undefined) => set({ dataset: dataset }),
}));
