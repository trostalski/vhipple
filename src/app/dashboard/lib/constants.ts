import { DashboardCard } from "./types";

export const cardStartWidth = 400;
export const cardStartHeight = 300;
export const cardMaxHeight = "90vh";
export const cardMinHeight = 100;
export const cardMaxWidth = "90vw";
export const cardMinWidth = 300;
export const maxNumDataPoints = 100;
export const startNumDataPoints = 20;

export const categoricalDataType = "categorical";
export const numerical1DDataType = "numerical-1-d";
export const numerical2DDataType = "numerical-2-d";

export const baseExampleCard: DashboardCard = {
  id: "",
  title: "Example Card",
  description: "This is an example card.",
  dataType: categoricalDataType,
  chartType: "bar",
  valueFhirpath: "",
  labelFhirpath: "",
  datasetColorPalletes: [],
  data: undefined,
  numDataPoints: startNumDataPoints,
  showChart: true,
  yMin: undefined,
  yMax: undefined,
  width: cardStartWidth,
  height: cardStartHeight,
  showLegend: false,
  legendPosition: "top",
  showXLables: false,
  showYLables: true,
};

export const defaultCard: DashboardCard = {
  ...baseExampleCard,
  title: "",
  description: "",
};

export const catExampleCards: DashboardCard[] = [
  {
    ...baseExampleCard,
    title: "Gender Distribution",
    dataType: categoricalDataType,
    description: "Shows the distribution of genders within the datasets.",
    chartType: "bar",
    valueFhirpath: "Patient.gender",
  },
  {
    ...baseExampleCard,
    title: "Conditions",
    dataType: categoricalDataType,
    description: "Shows the distribution of Diagnoses within the datasets.",
    chartType: "bar",
    valueFhirpath: "Condition.code.coding.display",
  },
  {
    ...baseExampleCard,
    title: "Observations",
    dataType: categoricalDataType,
    description: "Shows the distribution of Observations within the datasets.",
    chartType: "bar",
    valueFhirpath: "Observation.code.coding.display",
  },
];

export const num1DExampleCards: DashboardCard[] = [
  {
    ...baseExampleCard,
    title: "Body Height",
    dataType: numerical1DDataType,
    description: "Shows the distribution of heights within the datasets.",
    chartType: "boxplot",
    valueFhirpath:
      "Observation.where(code.coding.code='8302-2').valueQuantity.value",
    labelFhirpath:
      "Observation.where(code.coding.code='8302-2').code.coding.display",
  },
];

export const num2DExampleCards: DashboardCard[] = [
  {
    ...baseExampleCard,
    title: "Weight",
    dataType: numerical2DDataType,
    description: "Shows the course of weight for a patient.",
    chartType: "line",
    valueFhirpath:
      "Observation.where(code.coding.code='8302-2').valueQuantity.value",
    labelFhirpath:
      "Observation.where(code.coding.code='8302-2').code.coding.display",
  },
];

export const availableExampleCards: DashboardCard[] = [
  ...catExampleCards,
  ...num1DExampleCards,
  ...num2DExampleCards,
];

export const categoricalChartTypes = [
  "bar",
  "pie",
  "doughnut",
  "polar",
  "radar",
];
export const numerical1DChartTypes = ["boxplot"];
export const numerical2DChartTypes = ["scatter", "line"];
export const availableChartTypes = [
  ...categoricalChartTypes,
  ...numerical1DChartTypes,
  ...numerical2DChartTypes,
];
export const availableLegendPositions = [
  "top",
  "left",
  "bottom",
  "right",
  "chartArea",
];

export const availableDataTypes = [
  categoricalDataType,
  numerical1DDataType,
  numerical2DDataType,
];

export const colourReplaceString = "__COLOUR__";
export const availableChartColours = [
  { name: "red", rgba: `rgba(255, 99, 132, ${colourReplaceString})` },
  { name: "blue", rgba: `rgba(54, 162, 235, ${colourReplaceString})` },
  { name: "orange", rgba: `rgba(255, 159, 64, ${colourReplaceString})` },
  { name: "purple", rgba: `rgba(153, 102, 255, ${colourReplaceString})` },
  { name: "green", rgba: `rgba(75, 192, 192, ${colourReplaceString})` },
  { name: "grey", rgba: `rgba(201, 203, 207, ${colourReplaceString})` },
  { name: "indigo", rgba: `rgba(75, 0, 130, ${colourReplaceString})` },
  { name: "yellow", rgba: `rgba(255, 205, 86, ${colourReplaceString})` },
  { name: "pink", rgba: `rgba(255, 99, 132, ${colourReplaceString})` },
  { name: "brown", rgba: `rgba(139, 69, 19, ${colourReplaceString})` },
  { name: "teal", rgba: `rgba(0, 128, 128, ${colourReplaceString})` },
  { name: "cyan", rgba: `rgba(0, 255, 255, ${colourReplaceString})` },
  { name: "lime", rgba: `rgba(0, 255, 0, ${colourReplaceString})` },
  { name: "amber", rgba: `rgba(255, 191, 0, ${colourReplaceString})` },
  { name: "deep orange", rgba: `rgba(255, 87, 34, ${colourReplaceString})` },
  { name: "light blue", rgba: `rgba(3, 169, 244, ${colourReplaceString})` },
  { name: "light green", rgba: `rgba(139, 195, 74, ${colourReplaceString})` },
  { name: "deep purple", rgba: `rgba(103, 58, 183, ${colourReplaceString})` },
  { name: "blue grey", rgba: `rgba(96, 125, 139, ${colourReplaceString})` },
  { name: "black", rgba: `rgba(0, 0, 0, ${colourReplaceString})` },
  { name: "multi", rgba: "" },
];
