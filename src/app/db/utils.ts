import { Resource } from "fhir/r4";
import { toastError } from "../lib/toasts";
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

export const updateDataset = async (dataset: any) => {
  try {
    await db.datasets.update(dataset.id, dataset);
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
