import { generateUniqueId } from "@/app/lib/utils";
import { Dataset, FhirPathAlias, PatientCohort } from "./types";

export const addMode = "add";
export const editMode = "edit";

const defaultFhirPathAliases: FhirPathAlias[] = [
  {
    alias: "patient gender",
    path: "Patient.gender",
    id: "0",
  },
  {
    alias: "male patients",
    path: "Patient.gender='male'",
    id: "1",
  },
  {
    alias: "female patients",
    path: "Patient.gender='female'",
    id: "2",
  },
  {
    alias: "patient birth date",
    path: "Patient.birthDate",
    id: "3",
  },
  {
    alias: "diagnoses display",
    path: "Condition.code.coding.display",
    id: "4",
  },
];

export const defaultDataset: Dataset = {
  id: "",
  name: "",
  description: "",
  resourceContainers: [],
  dashboardCards: [],
  patientCohorts: [],
  updatedAt: "",
  createdAt: "",
  size: 0,
  dashboardColNums: 2,
  fhirPathAliases: defaultFhirPathAliases,
};

export const patientIncludeCritriumString = "include";
export const patientExcludeCritriumString = "exclude";
