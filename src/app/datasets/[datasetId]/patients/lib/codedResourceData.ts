import { Resource } from "fhir/r4";

export class CodedResourceData {
  resource: Resource;
  resourceType: string;
  constructor(resource: Resource) {
    this.resourceType = resource.resourceType;
    this.resource = resource;
  }
}
