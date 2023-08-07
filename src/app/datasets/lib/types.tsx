import { Resource } from "fhir/r4";

export interface ResourceContainer {
  id: string;
  source: string;
  resource: Resource;
  references: Resource[];
  referencedBy: Resource[];
  fullUrl?: string;
}

export interface Dataset {
  name: string;
  size: number;
  description?: string;
  resourceContainers: ResourceContainer[];
}
