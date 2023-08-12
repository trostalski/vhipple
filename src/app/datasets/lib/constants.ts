import { Dataset } from "./types";

export const mainViewComp = "view";
export const mainListComp = "list";

export const addMode = "add";
export const editMode = "edit";

export const defaultDataset: Dataset = {
  id: "",
  name: "",
  description: "",
  resourceContainers: [],
  updatedAt: "",
  createdAt: "",
  size: 0,
  dashboardColNums: 4,
};
