import { Dataset, FhirPathAlias, PatientCohort } from "./types";
import { allPatientsCohortName } from "../[datasetId]/dashboard/lib/constants";

export const addMode = "add";
export const editMode = "edit";

export const patientIncludeCritriumString = "include";
export const patientExcludeCritriumString = "exclude";

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

export const defaultPatientCohorts: PatientCohort[] = [
  {
    id: "0",
    name: allPatientsCohortName,
    createdAt: "",
    updatedAt: "",
    exclusionCriteria: [],
    inclusionCriteria: [],
    patientIds: [],
  },
  {
    id: "1",
    name: "Male Patients",
    createdAt: "",
    updatedAt: "",
    exclusionCriteria: [],
    inclusionCriteria: [
      {
        id: "0",
        fhirPath: "Patient.gender='male'",
        name: "Only Male",
        type: patientIncludeCritriumString,
      },
    ],
    patientIds: [],
  },
  {
    id: "2",
    name: "Female Patients",
    createdAt: "",
    updatedAt: "",
    exclusionCriteria: [],
    inclusionCriteria: [
      {
        id: "0",
        fhirPath: "Patient.gender='female'",
        name: "Only Female",
        type: patientIncludeCritriumString,
      },
    ],
    patientIds: [],
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
  dashboardColNums: 3,
  fhirPathAliases: defaultFhirPathAliases,
};
