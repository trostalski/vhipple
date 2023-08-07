import { Reference, Resource } from "fhir/r4";
import { Dataset } from "./types";

export const resolveReferencesForDataset = (
  dataset: Dataset,
  newResources: Resource[]
) => {
  const oldResources = dataset.resourceContainers.map((rc) => rc.resource);
  const allResources = [...oldResources, ...newResources];
  for (const resource of newResources) {
    const targetReferences: Reference[] = getAllReferences(resource);
    const validIds = getValidIdsFromReferences(targetReferences);
    console.log(targetReferences);
  }
};

const getValidIdsFromReferences = (references: Reference[]) => {
  // Reference.reference is eiher an absolute URL, relative URL to Service Base URL
  //
  const validIds: string[] = [];
  for (const reference of references) {
    if (isAbsoluteReference(reference.reference)) {
    }
  }
  return validIds;
};

const isAbsoluteReference = (reference?: string) => {
  if (!reference) {
    return false;
  }
  return reference.startsWith("http://") || reference.startsWith("https://");
};

const getAllReferences = (resource: Resource) => {
  const references: Reference[] = [];

  function extractReferences(obj: any) {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        extractReferences(item);
      }
    } else if (typeof obj === "object" && obj !== null) {
      for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (key === "reference") {
          references.push({ reference: value, display: obj["display"] });
        } else {
          extractReferences(value);
        }
      }
    }
  }

  extractReferences(resource);
  return references;
};
