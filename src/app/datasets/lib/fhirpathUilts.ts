import { compile } from "fhirpath";
import { Dataset } from "./types";

export const validateFhirPath = (fhirpath: string): boolean => {
  if (fhirpath === "" || !fhirpath) {
    return false;
  }
  try {
    compile(fhirpath);
    return true;
  } catch (e) {
    return false;
  }
};

export const evalFhirPathOnResources = (
  resources: any[],
  fpFunc: Compile
): any[] => {
  let values: any[][] = [];
  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];
    const resourceValue = fpFunc(resource);
    if (resourceValue) {
      values.push(resourceValue);
    }
  }
  const flattenedValues = values.flat();
  return flattenedValues;
};

export const evalFhirPathOnDatasets = (
  datasets: Dataset[],
  fhirpath: string
) => {
  const fpFunc = compile(fhirpath);
  const datasetValues: any[][] = [];
  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i];
    const resources = dataset.resourceContainers.map((rc) => rc.resource);
    const values = evalFhirPathOnResources(resources, fpFunc);
    datasetValues.push(values);
  }
  return datasetValues;
};
