import { Resource } from "fhir/r4";
import { db } from "./db";
import { Dataset, ResourceContainer } from "../datasets/lib/types";

export const datasetExists = async (id: string) => {
  try {
    const dataset = await db.datasets.get(id);
    return dataset !== undefined;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getDataset = async (id: string) => {
  try {
    const dataset = await db.datasets.get(id);
    return dataset;
  } catch (error) {
    console.log(error);
  }
};

export const getDatasetNames = async () => {
  try {
    const datasetNames = await db.datasets.toCollection().primaryKeys();
    return datasetNames;
  } catch (error) {
    console.log(error);
  }
};

export const getDatasets = async () => {
  try {
    const datasets = await db.datasets.toArray();
    return datasets;
  } catch (error) {
    console.log(error);
  }
};

export const addDataset = async (dataset: Dataset) => {
  try {
    await db.datasets.add(dataset);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateDataset = async (prevId: string, dataset: Dataset) => {
  try {
    await db.datasets.update(prevId, dataset);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteDataset = async (id: string) => {
  try {
    await db.datasets.delete(id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeResourcesFromDatasetBySource = async (
  datasetId: string,
  source: string
) => {
  try {
    const dataset = await db.datasets.get(datasetId);
    dataset!.resourceContainers = dataset!.resourceContainers.filter(
      (rc) => rc.source !== source
    );
    const newSize = dataset!.resourceContainers.length;
    dataset!.size = newSize;
    await db.datasets.update(datasetId, dataset!);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getConnectedResources = async (
  datasetId: string,
  resourceId: string
) => {
  try {
    const dataset = await db.datasets.get(datasetId);
    const resource = dataset!.resourceContainers.find(
      (rc) => rc.resource.id === resourceId
    );
    if (!resource) {
      return [];
    }
    const connectedResources = [
      ...resource.referencedBy,
      ...resource.references,
    ];
    return connectedResources;
  } catch (error) {
    console.log(error);
  }
};

export const getTargetResources = async (
  datasetId: string,
  resourceId: string
) => {
  try {
    const dataset = await db.datasets.get(datasetId);
    const resourceContainer = dataset!.resourceContainers.find(
      (rc) => rc.resource.id === resourceId
    );
    if (!resourceContainer) {
      return [];
    }
    const targetResources = resourceContainer.references;
    return targetResources;
  } catch (error) {
    console.log(error);
  }
};

export const addResourceToDataset = async (
  datasetId: string,
  resourceContainer: ResourceContainer
) => {
  try {
    const dataset = await db.datasets.get(datasetId);
    dataset!.resourceContainers.push(resourceContainer);
    await db.datasets.update(datasetId, dataset!);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addResourcesToDataset = async (
  datasetId: string,
  resourceContainers: ResourceContainer[]
) => {
  try {
    const dataset = await db.datasets.get(datasetId);
    dataset!.resourceContainers.push(...resourceContainers);
    await db.datasets.update(datasetId, dataset!);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getPatientsForDataset = async (id: string) => {
  try {
    const dataset = await db.datasets.get(id);
    const patients = dataset!.resourceContainers.filter(
      (rc) => rc.resource.resourceType === "Patient"
    );
    return patients;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPatients = async () => {
  try {
    const datasets = await db.datasets.toArray();
    const patients = datasets
      .map((dataset) => dataset.resourceContainers)
      .flat()
      .filter((rc) => rc.resource.resourceType === "Patient");
    return patients;
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (id: string, datasetName: string) => {
  try {
    const dataset = await db.datasets.get(datasetName);
    const patient = dataset!.resourceContainers.find(
      (rc) => rc.resource.id === id
    );
    return patient;
  } catch (error) {
    console.log(error);
  }
};

export const getDashboardCards = async () => {
  try {
    const cards = await db.dashboardCards.toArray();
    return cards;
  } catch (error) {
    console.log(error);
  }
};

export const dashboardCardExists = async (id: string) => {
  try {
    const card = await db.dashboardCards.get(id);
    return card !== undefined;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addDashboardCard = async (card: any) => {
  try {
    await db.dashboardCards.add(card);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateDashboardCard = async (id: string, card: any) => {
  try {
    await db.dashboardCards.update(id, card);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteDashboardCard = async (id: string) => {
  try {
    await db.dashboardCards.delete(id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getDashboardCard = async (id: string) => {
  try {
    const card = await db.dashboardCards.get(id);
    return card;
  } catch (error) {
    console.log(error);
  }
};
