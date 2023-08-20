import { compile } from "fhirpath";
import { Dataset, PatientCohort } from "./types";
import { getResourcesForCohort } from "./cohortUtils";
import { Resource } from "fhir/r4";
import { onlyUnique } from "../[datasetId]/dashboard/lib/utils";

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

export const getPathValuesForResources = (
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

export const getPathValuesForCohorts = (
  cohorts: PatientCohort[],
  fhirpath: string,
  dataset: Dataset
) => {
  const isValid = validateFhirPath(fhirpath);
  if (!isValid) {
    return [];
  }
  const fpFunc = compile(fhirpath);
  const datasetValues: any[][] = [];
  for (let i = 0; i < cohorts.length; i++) {
    const resources = getResourcesForCohort(cohorts[i], dataset);
    const values = getPathValuesForResources(resources, fpFunc);
    datasetValues.push(values);
  }
  return datasetValues;
};

export const getPathValuesForDatasets = (
  datasets: Dataset[],
  fhirpath: string
) => {
  const fpFunc = compile(fhirpath);
  const datasetValues: any[][] = [];
  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i];
    const resources = dataset.resourceContainers.map((rc) => rc.resource);
    const values = getPathValuesForResources(resources, fpFunc);
    datasetValues.push(values);
  }
  return datasetValues;
};

export const getMostCommonPathValue = (
  resources: Resource[],
  fhirPath: string,
  numValues: number
) => {
  const fpIsValid = validateFhirPath(fhirPath);
  if (!fpIsValid) {
    return [];
  }
  const fpFunc = compile(fhirPath);
  const values = getPathValuesForResources(resources, fpFunc);
  const uniqueValues = values.filter(onlyUnique);
  const valueCounts = uniqueValues.map((value) => {
    return {
      value: value,
      count: values.filter((v) => v === value).length,
    };
  });
  valueCounts.sort((a, b) => b.count - a.count);
  return valueCounts.slice(0, numValues);
};
