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
  createdAt: string;
  updatedAt: string;
  resourceContainers: ResourceContainer[];
}
