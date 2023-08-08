import { Resource } from "fhir/r4";
import { db } from "./db";
import { Dataset, ResourceContainer } from "../datasets/lib/types";

export const datasetExists = async (name: string) => {
  try {
    const dataset = await db.datasets.get(name);
    return dataset !== undefined;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getDataset = async (name: string) => {
  try {
    const dataset = await db.datasets.get(name);
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

export const updateDataset = async (prevName: string, dataset: Dataset) => {
  try {
    await db.datasets.update(prevName, dataset);
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
  name: string,
  source: string
) => {
  try {
    const dataset = await db.datasets.get(name);
    dataset!.resourceContainers = dataset!.resourceContainers.filter(
      (rc) => rc.source !== source
    );
    const newSize = dataset!.resourceContainers.length;
    dataset!.size = newSize;
    await db.datasets.update(name, dataset!);
    return true;
  } catch (error) {
    console.log(error);
    return false;
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

export const getPatientsForDataset = async (name: string) => {
  try {
    const dataset = await db.datasets.get(name);
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

export const getDashboardCards = async () => {
  try {
    const cards = await db.dashboardCards.toArray();
    return cards;
  } catch (error) {
    console.log(error);
  }
};

export const dashboardCardExists = async (title: string) => {
  try {
    const card = await db.dashboardCards.get(title);
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

export const updateDashboardCard = async (prevTitle: string, card: any) => {
  try {
    await db.dashboardCards.update(prevTitle, card);
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

export const getDashboardCard = async (title: string) => {
  try {
    const card = await db.dashboardCards.get(title);
    return card;
  } catch (error) {
    console.log(error);
  }
};
