import { DashboardCard } from "@/app/lib/types";

export const cardStartWidth = 400;
export const cardStartHeight = 300;
export const cardMaxHeight = 600;
export const cardMinHeight = 200;
export const cardMaxWidth = 1000;
export const cardMinWidth = 300;

export const exampleCards: DashboardCard[] = [
  {
    title: "Gender Distribution",
    description: "Shows the distribution of genders within the datasets.",
    chartType: "bar",
    fhirpath: "Patient.gender",
    datasetNames: [],
    data: undefined,
    width: cardStartWidth,
    height: cardStartHeight,
  },
  {
    title: "Conditions",
    description: "Shows the distribution of Diagnoses within the datasets.",
    chartType: "bar",
    fhirpath: "Condition.code.coding.display",
    datasetNames: [],
    data: undefined,
    width: cardStartWidth,
    height: cardStartHeight,
  },
  {
    title: "Observations",
    description: "Shows the distribution of Observaitnos within the datasets.",
    chartType: "bar",
    fhirpath: "Observation.code.coding.display",
    datasetNames: [],
    data: undefined,
    width: cardStartWidth,
    height: cardStartHeight,
  },
];

export const defaultCard: DashboardCard = {
  title: "",
  description: "",
  chartType: "bar",
  datasetNames: [],
  data: undefined,
  fhirpath: "",
  width: cardStartWidth,
  height: cardStartHeight,
};
