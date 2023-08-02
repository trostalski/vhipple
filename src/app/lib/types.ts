import { Resource } from "fhir/r4";

export interface Dataset {
  id: string;
  name: string;
  description: string;
  size: number;
  resources: Resource[];
}
