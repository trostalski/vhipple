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
  patientCohorts: [],
  updatedAt: "",
  createdAt: "",
  size: 0,
  dashboardColNums: 2,
};

export const patientIncludeCritriumString = "include";
export const patientExcludeCritriumString = "exclude";
