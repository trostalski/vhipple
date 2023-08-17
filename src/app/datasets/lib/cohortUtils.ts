import { Patient, Resource } from "fhir/r4";
import { getPathValuesForResources } from "./fhirpathUilts";
import { compile } from "fhirpath";
import { Dataset, PatientCohort } from "./types";
import { getConnectedResourcesForResourceContainer } from "./datasetUtils";

interface PatientResource {
  patient: Patient;
  resources: Resource[];
}

const evaluateFhirPathResultsForCohortCriteria = (input: any[]) => {
  let result = true;
  if (input.length === 0) {
    result = false;
  } else if (input.every((v) => v === false)) {
    result = false;
  }
  return result;
};

const evaluateCriteria = (
  patientResources: PatientResource[],
  fhirPaths: string[],
  include: boolean
) => {
  const patientIds: string[] = [];
  if (fhirPaths.length === 0 && include) {
    patientResources.forEach((pr) => {
      patientIds.push(pr.patient.id!);
    });
  } else if (fhirPaths.length === 0 && !include) {
  } else {
    patientResources.forEach((pr) => {
      const { patient, resources } = pr;
      let patientIsValid = true;
      for (let i = 0; i < fhirPaths.length; i++) {
        const fp = fhirPaths[i];
        const fpFunc = compile(fp);
        const values = getPathValuesForResources(resources, fpFunc);
        patientIsValid = evaluateFhirPathResultsForCohortCriteria(values);
        if (!patientIsValid) {
          break;
        }
      }
      if (patientIsValid) {
        patientIds.push(patient.id!);
      }
    });
  }
  return patientIds;
};

export const createPatienCohortFromCriteria = (
  inludeFhirPaths: string[],
  excludeFhirPaths: string[],
  patientResources: {
    patient: Patient;
    resources: Resource[];
  }[]
) => {
  inludeFhirPaths = inludeFhirPaths.filter((fp) => fp !== "");
  excludeFhirPaths = excludeFhirPaths.filter((fp) => fp !== "");
  const includePatientIds = evaluateCriteria(
    patientResources,
    inludeFhirPaths,
    true
  );
  const excludePatientIds = evaluateCriteria(
    patientResources,
    excludeFhirPaths,
    false
  );
  const cohort = includePatientIds.filter(
    (ip) => !excludePatientIds.includes(ip)
  );
  return cohort;
};

export const getResourcesForCohort = (
  cohort: PatientCohort,
  dataset: Dataset
): Resource[] => {
  const resources: Resource[] = [];
  for (const patientId of cohort.patientIds) {
    const patientContainer = dataset.resourceContainers.find(
      (rc) => rc.resource.id === patientId
    );
    const connectedResources = getConnectedResourcesForResourceContainer(
      patientContainer!,
      true
    );
    resources.push(...connectedResources);
  }
  return resources;
};

export const computePatientCohort = (
  dataset: Dataset,
  includeFhirPaths: string[],
  excludeFhirPaths: string[]
) => {
  const patientResources = dataset.resourceContainers
    .filter((rc) => rc.resource.resourceType === "Patient")
    .map((rc) => {
      return {
        patient: rc.resource as Patient,
        resources: getConnectedResourcesForResourceContainer(rc, true),
      };
    });
  const cohort = createPatienCohortFromCriteria(
    includeFhirPaths,
    excludeFhirPaths,
    patientResources
  );
  return cohort;
};
