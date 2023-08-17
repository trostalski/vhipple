import {
  cardStartHeight,
  cardStartWidth,
  categoricalDataType,
  numerical1DDataType,
  startNumDataPoints,
} from "./constants";
import { DashboardCard } from "./types";

export const baseExampleCard: DashboardCard = {
  id: "",
  title: "Example Card",
  description: "This is an example card.",
  forDatasetId: "",
  positionIndex: 0,
  chartType: "bar",
  valueFhirpath: "",
  labelFhirpath: "",
  cohortColorPalletes: [],
  data: undefined,
  dataType: categoricalDataType,
  numDataPoints: startNumDataPoints,
  showChart: true,
  yMin: undefined,
  yMax: undefined,
  width: cardStartWidth,
  height: cardStartHeight,
  showLegend: true,
  legendPosition: "top",
  showXLables: true,
  showYLables: true,
  createdAt: "",
  updatedAt: "",
};

export const defaultCard: DashboardCard = {
  ...baseExampleCard,
  title: "",
  description: "",
};

const genderCard = {
  ...baseExampleCard,
  title: "Gender Distribution",
  dataType: categoricalDataType,
  description: "Shows the distribution of genders within the datasets.",
  chartType: "bar",
  valueFhirpath: "Patient.gender",
};

const conditionCard = {
  ...baseExampleCard,
  title: "Conditions",
  dataType: categoricalDataType,
  description: "Shows the distribution of Diagnoses within the datasets.",
  chartType: "doughnut",
  valueFhirpath: "Condition.code.coding.display",
};

const allergyCard = {
  ...baseExampleCard,
  title: "Allergies",
  dataType: categoricalDataType,
  description: "Shows the distribution of Allergies within the datasets.",
  chartType: "bar",
  valueFhirpath: "AllergyIntolerance.code.coding.display",
};

const observationCard = {
  ...baseExampleCard,
  title: "Observations",
  dataType: categoricalDataType,
  description: "Shows the distribution of Observations within the datasets.",
  chartType: "bar",
  valueFhirpath: "Observation.code.coding.display",
};

const bodyHeightCard = {
  ...baseExampleCard,
  title: "Body Height",
  dataType: numerical1DDataType,
  description: "Shows the distribution of heights within the datasets.",
  chartType: "violin",
  valueFhirpath:
    "Observation.where(code.coding.code='8302-2').valueQuantity.value",
  labelFhirpath:
    "Observation.where(code.coding.code='8302-2').code.coding.display",
};

const prescriptionCard = {
  ...baseExampleCard,
  title: "Medications",
  dataType: categoricalDataType,
  description: "Shows the distribution of Medications within the datasets.",
  chartType: "polar",
  valueFhirpath: "MedicationRequest.medicationCodeableConcept.coding.display",
};

const ageCard = {
  ...baseExampleCard,
  title: "Age",
  dataType: numerical1DDataType,
  description: "Shows the age distribution within the dataset.",
  chartType: "violin",
};

export const defaultCards: DashboardCard[] = [genderCard];

export const datasetDefaultCards: DashboardCard[] = [
  genderCard,
  conditionCard,
  allergyCard,
  prescriptionCard,
  bodyHeightCard,
  observationCard,
];

export const catExampleCards: DashboardCard[] = [
  genderCard,
  conditionCard,
  allergyCard,
  prescriptionCard,
];

export const num1DExampleCards: DashboardCard[] = [bodyHeightCard];

export const num2DExampleCards: DashboardCard[] = [];

export const availableExampleCards: DashboardCard[] = [
  ...catExampleCards,
  ...num1DExampleCards,
  ...num2DExampleCards,
];
