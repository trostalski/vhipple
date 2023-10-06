import { datasetDefaultCards } from "@/app/datasets/[datasetId]/dashboard/lib/exampleCards";
import { Dataset, ResourceContainer } from "./types";
import { createChartJsDataForDashboardCard } from "@/app/datasets/[datasetId]/dashboard/lib/utils";
import { generateUniqueId } from "@/app/lib/utils";
import {
  allPatientsCohortId,
  availableChartColours,
} from "../[datasetId]/dashboard/lib/constants";
import { Bundle, Patient, Resource } from "fhir/r4";
import { DatasetInfo } from "../[datasetId]/lib/types";
import { getMostCommonPathValue } from "./fhirpathUilts";
import { getAge } from "../[datasetId]/patients/lib/utils";
import { updateDataset } from "@/app/db/utils";
import { computePatientCohort } from "./cohortUtils";
import { defaultDataset, defaultPatientCohorts } from "./constants";
import { resolveReferencesForDataset } from "./resolveReferences";
import example01 from "../../api/example_data/example_01.json";

const homePageCards = ["Condition.code.coding.display", "Patient.gender"];

export const isValidJson = (json: string) => {
  try {
    JSON.parse(json);
  } catch (error) {
    return false;
  }
  return true;
};

export const isValidBundle = (bundle: Bundle) => {
  if (bundle.resourceType !== "Bundle") {
    return false;
  }
  if (!bundle.entry) {
    return false;
  }
  return true;
};

export const getResourceContainersFromBundle = (
  bundle: Bundle,
  sourceName: string
) => {
  const resourceContainers: ResourceContainer[] = [];
  for (const entry of bundle.entry!) {
    if (!entry.resource) {
      continue;
    }
    resourceContainers.push({
      id: entry.resource.resourceType + "/" + entry.resource!.id,
      fullUrl: entry.fullUrl,
      source: sourceName,
      resource: entry.resource,
      datasetId: "",
      references: [],
      referencedBy: [],
    });
  }
  return resourceContainers;
};

export const getResourceContainerFromResource = (
  resource: Resource,
  sourceName: string
) => {
  const resourceContainer: ResourceContainer = {
    id: resource.resourceType + "/" + resource.id,
    fullUrl: resource.resourceType + "/" + resource.id,
    source: sourceName,
    resource: resource,
    datasetId: "",
    references: [],
    referencedBy: [],
  };
  return resourceContainer;
};

export const getExampleDataset = async () => {
  const bundle = example01 as Bundle;
  const resourceContainers = getResourceContainersFromBundle(bundle, "example");
  const dataset: Dataset = {
    ...defaultDataset,
    id: generateUniqueId(),
    name: "Example Dataset",
    description:
      "11 Synthea Patients from the dataset '1K Sample Synthetic Patient Records, FHIR R4' (https://synthea.mitre.org/downloads).",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dataset.resourceContainers = resourceContainers;
  dataset.size = resourceContainers.length;
  resolveReferencesForDataset(dataset);
  return dataset;
};

export const generateDefaultDatasetDashboardCards = async (
  dataset: Dataset
) => {
  const newCards = [];
  for (let i = 0; i < datasetDefaultCards.length; i++) {
    const newCard = { ...datasetDefaultCards[i] };
    const data = createChartJsDataForDashboardCard([], newCard, dataset, true);
    if (data.labels.length === 0) {
      continue;
    }
    const rndColIdx = Math.floor(Math.random() * availableChartColours.length);
    newCard.forDatasetId = dataset.id;
    newCard.cohortColorPalletes = [
      {
        id: allPatientsCohortId,
        chartColour: availableChartColours[rndColIdx].name,
        name: dataset.name,
      },
    ];
    newCard.data = data;
    newCard.positionIndex = i;
    newCard.createdAt = new Date().toISOString();
    newCard.updatedAt = new Date().toISOString();
    newCard.id = generateUniqueId();
    if (homePageCards.includes(newCard.valueFhirpath)) {
      newCard.showOnHomePage = true;
    }
    newCards.push(newCard);
  }
  dataset.dashboardCards = newCards;
  const res = await updateDataset(dataset.id, dataset);
  return res;
};

export const generateDefaultPatientCohorts = async (dataset: Dataset) => {
  const cohorts = [];
  for (const cohort of defaultPatientCohorts) {
    cohort.id = generateUniqueId();
    cohort.createdAt = new Date().toISOString();
    cohort.updatedAt = new Date().toISOString();
    cohort.patientIds = computePatientCohort(
      dataset,
      cohort.inclusionCriteria.map((c) => c.fhirPath),
      cohort.inclusionCriteria.map((c) => c.type)
    );
    cohorts.push(cohort);
  }
  dataset.patientCohorts = cohorts;
  const res = await updateDataset(dataset.id, dataset);
  return res;
};

export const getConnectedResourcesForResourceContainer = (
  resourceContainer: ResourceContainer,
  includeSource?: boolean
) => {
  includeSource = includeSource || false;
  let connectedResources = [
    ...resourceContainer.referencedBy,
    ...resourceContainer.references,
  ];
  if (includeSource) {
    connectedResources.push(resourceContainer.resource);
  }
  return connectedResources;
};

export const getResourcesForDatasetByType = (
  dataset: Dataset,
  resourceType: string
) => {
  const resources = [];
  for (const resourceContainer of dataset.resourceContainers) {
    if (resourceContainer.resource.resourceType === resourceType) {
      resources.push(resourceContainer.resource);
    }
  }
  return resources;
};

const getResourceCountForType = (dataset: Dataset, resourceType: string) => {
  return dataset.resourceContainers.filter(
    (rc) => rc.resource.resourceType === resourceType
  ).length;
};

const getAgeForPatient = (patient: Patient) => {
  const birthDate = patient.birthDate;
  if (!birthDate) {
    return undefined;
  }
  const age = getAge(patient.birthDate!);
  return age;
};

const getAgeStatisticForDataset = (dataset: Dataset, statistic: string) => {
  statistic = statistic || "mean";
  const ages = [];
  const patients = getResourcesForDatasetByType(dataset, "Patient");
  for (const patient of patients) {
    const age = getAgeForPatient(patient as Patient);
    if (age) {
      ages.push(age);
    }
  }
  if (ages.length === 0) {
    return undefined;
  }
  if (statistic === "mean") {
    return ages.reduce((a, b) => a + b, 0) / ages.length;
  }
  if (statistic === "median") {
    ages.sort((a, b) => a - b);
    const half = Math.floor(ages.length / 2);
    if (ages.length % 2) {
      return ages[half];
    }
    return (ages[half - 1] + ages[half]) / 2.0;
  }
  return undefined;
};

export const computeDatasetInfo = (dataset: Dataset) => {
  const datasetInfo: DatasetInfo = {
    numPatients: getResourceCountForType(dataset, "Patient"),
    numEncounters: getResourceCountForType(dataset, "Encounter"),
    numObservations: getResourceCountForType(dataset, "Observation"),
    numConditions: getResourceCountForType(dataset, "Condition"),
    numProcedures: getResourceCountForType(dataset, "Procedure"),
    numImmunizations: getResourceCountForType(dataset, "Immunization"),
    numMedications: getResourceCountForType(dataset, "MedicationRequest"),
    numAllergies: getResourceCountForType(dataset, "AllergyIntolerance"),
    numCarePlans: getResourceCountForType(dataset, "CarePlan"),
    numDiagnosticReports: getResourceCountForType(dataset, "DiagnosticReport"),
    numImagingStudies: getResourceCountForType(dataset, "ImagingStudy"),
    numPractitioners: getResourceCountForType(dataset, "Practitioner"),
    mostCommonAllergies: getMostCommonPathValue(
      getResourcesForDatasetByType(dataset, "AllergyIntolerance"),
      "AllergyIntolerance.code.coding.display",
      3
    ),
    mostCommonConditions: getMostCommonPathValue(
      getResourcesForDatasetByType(dataset, "Condition"),
      "Condition.code.coding.display",
      3
    ),
    mostCommonMedications: getMostCommonPathValue(
      getResourcesForDatasetByType(dataset, "MedicationRequest"),
      "MedicationRequest.medicationCodeableConcept.coding.display",
      3
    ),
    mostCommonProcedures: getMostCommonPathValue(
      getResourcesForDatasetByType(dataset, "Procedure"),
      "Procedure.code.coding.display",
      3
    ),
    averageAge: getAgeStatisticForDataset(dataset, "mean"),
    medianAge: getAgeStatisticForDataset(dataset, "median"),
  };
  return datasetInfo;
};
