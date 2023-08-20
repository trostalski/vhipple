import { Reference, Resource } from "fhir/r4";
import { Dataset, ResourceContainer } from "./types";

export const resolveReferencesForDataset = (dataset: Dataset) => {
  const resourceContainers = dataset.resourceContainers;
  resourceContainers.forEach((rc) => {
    const targetReferences: Reference[] = getAllReferences(rc.resource);
    const foundResources = getResourcesFromReferences(
      targetReferences,
      resourceContainers
    );
    rc.references = foundResources.map((fr) => fr.resource);
    foundResources.forEach((fr) => {
      fr.referencedBy.push(rc.resource);
    });
  });
};

const tryGetRelativeUrl = (url: string) => {
  // absolute URL: https://example.com/fhir/Patient/123
  // relative URL: Patient/123
  const urlParts = url.split("/");
  if (urlParts.length < 2) {
    return undefined;
  }
  const resourceType = urlParts[urlParts.length - 2];
  const resourceId = urlParts[urlParts.length - 1];
  return `${resourceType}/${resourceId}`;
};

const isRelativeUrl = (url: string) => {
  // Patient/123
  const urlParts = url.split("/");
  if (urlParts.length !== 2) {
    return false;
  }
  const resourceType = urlParts[urlParts.length - 2];
  const resourceId = urlParts[urlParts.length - 1];
  if (resourceType && resourceId) {
    return true;
  }
};

const isInternalReference = (url: string) => {
  return url.startsWith("urn:");
};

const getResourcesFromReferences = (
  references: Reference[],
  resourceContainers: ResourceContainer[]
) => {
  const foundResources: ResourceContainer[] = [];
  for (const reference of references) {
    const referenceValue = reference.reference;
    if (!referenceValue) {
      continue;
    }
    let foundResource: ResourceContainer | undefined;
    if (isInternalReference(referenceValue)) {
      foundResource = resourceContainers.find((rc) => {
        return rc.fullUrl === referenceValue;
      });
    } else if (isRelativeUrl(referenceValue)) {
      foundResource = resourceContainers.find((rc) => {
        return rc.fullUrl === referenceValue;
      });
      if (!foundResource) {
        foundResource = resourceContainers.find((rc) => {
          return rc.id === referenceValue;
        });
      }
    } else {
      const relUrl = tryGetRelativeUrl(referenceValue);
      if (relUrl) {
        foundResource = resourceContainers.find((rc) => {
          return rc.id === relUrl;
        });
      }
    }
    if (foundResource) {
      foundResources.push(foundResource);
    }
  }
  return foundResources;
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
