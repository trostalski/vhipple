import { Resource } from "fhir/r4";
import { db } from "./db";

export const datasetExists = async (name: string) => {
  try {
    const dataset = await db.datasets.get(name);
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

export const getDatasets = async () => {
  try {
    const datasets = await db.datasets.toArray();
    return datasets;
  } catch (error) {
    console.log(error);
  }
};

export const addDataset = async (dataset: any) => {
  try {
    await db.datasets.add(dataset);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateDataset = async (prevName: string, dataset: any) => {
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

export const addResourceToDataset = async (
  datasetId: string,
  resource: Resource
) => {
  try {
    const dataset = await db.datasets.get(datasetId);
    dataset!.resources.push(resource);
    await db.datasets.update(datasetId, dataset!);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addResourcesToDataset = async (
  datasetId: string,
  resources: Resource[]
) => {
  try {
    const dataset = await db.datasets.get(datasetId);
    dataset!.resources.push(...resources);
    await db.datasets.update(datasetId, dataset!);
    return true;
  } catch (error) {
    console.log(error);
    return false;
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
