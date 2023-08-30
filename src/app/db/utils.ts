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

export const getDatasetByName = async (name: string) => {
  try {
    const dataset = await db.datasets.get({ name: name });
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
    if (!dataset) {
      return false;
    }
    dataset.resourceContainers = dataset!.resourceContainers.filter(
      (rc) => rc.source !== source
    );
    const newSize = dataset!.resourceContainers.length;
    dataset.size = newSize;
    await db.datasets.update(datasetId, dataset!);
    return true;
  } catch (error) {
    console.log(error);
    return false;
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

export const getPatient = async (id: string, datasetId: string) => {
  try {
    const dataset = await db.datasets.get(datasetId);
    const patient = dataset!.resourceContainers.find(
      (rc) => rc.resource.id === id
    );
    return patient;
  } catch (error) {
    console.log(error);
  }
};
