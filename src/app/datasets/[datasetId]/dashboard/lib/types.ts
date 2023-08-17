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
  title: string;
  description: string;
  positionIndex: number;
  chartType: ChartType;
  cohortColorPalletes: { id: string; chartColour: string; name: string }[];
  dataType: (typeof availableDataTypes)[number];
  valueFhirpath: string;
  labelFhirpath: string;
  width: number;
  height: number;
  yMin?: number | string;
  yMax?: number | string;
  numDataPoints: number;
  showChart: boolean;
  showXLables: boolean;
  showYLables: boolean;
  showLegend: boolean;
  legendPosition: (typeof availableLegendPositions)[number];
  createdAt: string;
  updatedAt: string;
  forDatasetId?: string;
  data?: ChartJsData;
}
