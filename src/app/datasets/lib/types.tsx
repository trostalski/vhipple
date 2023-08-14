import { Resource } from "fhir/r4";

export interface ResourceContainer {
  id: string;
  source: string;
  resource: Resource;
  references: Resource[];
  referencedBy: Resource[];
  datasetId: string;
  fullUrl?: string;
}

export interface Dataset {
  id: string;
  name: string;
  size: number;
  description?: string;
  patientCohorts: PatientCohort[];
  createdAt: string;
  updatedAt: string;
  dashboardColNums: number;
  resourceContainers: ResourceContainer[];
}

export interface PatientCohort {
  id: string;
  name: string;
  patientIds: string[];
  inclusionCriteria: PatientCohortCriterium[];
  exclusionCriteria: PatientCohortCriterium[];
  createdAt: string;
  updatedAt: string;
}

export type PatientCohortCriteriumType = "include" | "exclude";

export interface PatientCohortCriterium {
  id: string;
  type: PatientCohortCriteriumType;
  name: string;
  fhirPath: string;
}

export interface FhirPathAlias {
  path: string;
  alias: string;
}
