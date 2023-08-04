import { Resource } from "fhir/r4";
import { availableChartTypes } from "./constants";

export type ChartType = (typeof availableChartTypes)[number];
export type ChartJsDatasetData = number[];
export type ChartJsDataset = {
  data: ChartJsDatasetData;
};
export type ChartJsLabels = string[];
export type ChartJsData = {
  labels: ChartJsLabels;
  datasets: ChartJsDataset[];
};

export interface DashboardCard {
  title: string;
  description: string;
  chartType: ChartType;
  datasetNames: string[];
  fhirpath: string;
  width: number;
  height: number;
  data?: ChartJsData;
}

export interface Dataset {
  name: string;
  size: number;
  description?: string;
  resources: Resource[];
}
