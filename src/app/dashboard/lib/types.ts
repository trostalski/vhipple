import {
  availableChartTypes,
  availableDataTypes,
  availableLegendPositions,
} from "./constants";

export type ChartType = (typeof availableChartTypes)[number];
export type ChartJsDatasetData = any;
export type ChartJsDataset = {
  data: ChartJsDatasetData;
  label?: string;
  backgroundColor?: string[];
};
export type ChartJsLabels = string[];
export type ChartJsData = {
  labels: ChartJsLabels;
  datasets: ChartJsDataset[];
};

export interface DashboardCard {
  id: string;
  positionIndex: number;
  title: string;
  description: string;
  chartType: ChartType;
  datasetColorPalletes: { id: string; chartColour: string; name: string }[];
  dataType: (typeof availableDataTypes)[number];
  valueFhirpath: string;
  labelFhirpath: string;
  width: number;
  yMin?: number | string;
  yMax?: number | string;
  // xMin: number;
  // xMax: number;
  numDataPoints: number;
  height: number;
  showChart: boolean;
  showXLables: boolean;
  showYLables: boolean;
  showLegend: boolean;
  legendPosition: (typeof availableLegendPositions)[number];
  forDatasetId?: string;
  data?: ChartJsData;
}
