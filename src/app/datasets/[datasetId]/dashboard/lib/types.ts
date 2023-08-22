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
  yMin?: number | string;
  yMax?: number | string;
  numDataPoints: number;
  showXLabels: boolean;
  showYLabels: boolean;
  showLegend: boolean;
  legendPosition: (typeof availableLegendPositions)[number];
  createdAt: string;
  updatedAt: string;
  showOnHomePage?: boolean;
  forDatasetId?: string;
  data?: ChartJsData;
}
