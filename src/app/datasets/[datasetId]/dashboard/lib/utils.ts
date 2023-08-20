import { compile } from "fhirpath";
import {
  availableChartColours,
  availableDataTypes,
  categoricalChartTypes,
  categoricalDataType,
  colourReplaceString,
  numerical1DChartTypes,
  numerical1DDataType,
  numerical2DChartTypes,
  numerical2DDataType,
} from "./constants";
import {
  ChartJsData,
  ChartJsLabels,
  ChartJsDatasetData,
  ChartJsDataset,
  DashboardCard,
} from "./types";
import { Resource } from "fhir/r4";
import { toastError } from "@/app/lib/toasts";
import {
  getPathValuesForCohorts,
  getPathValuesForResources,
} from "@/app/datasets/lib/fhirpathUilts";
import { Dataset, PatientCohort } from "@/app/datasets/lib/types";
import { getAllPatientsAsCohort } from "@/app/datasets/lib/cohortUtils";

export const onlyUnique = (value: any, index: number, array: any) => {
  return array.indexOf(value) === index;
};

export const generateColourPalette = (numColours: number, name?: string) => {
  const index = Math.floor(Math.random() * availableChartColours.length);
  name = name || availableChartColours[index].name;
  const colours: string[] = [];
  const baseColour = availableChartColours.find((c) => c.name === name);
  for (let i = 0; i < numColours; i++) {
    const alpha = 1 - (i - numColours / 4) / numColours;
    if (name === "multi") {
      colours.push(
        `hsla(${(i * 360) / numColours}, 80%, 60%, ${alpha.toString()})`
      );
      continue;
    } else {
      const colour = baseColour?.rgba.replace(
        colourReplaceString,
        alpha.toString()
      );
      colours.push(colour!);
    }
  }
  return colours;
};

export const createCatChartJsData = (
  cohorts: PatientCohort[],
  fhirpath: string,
  dataset: Dataset
) => {
  const chartJsDatasets: ChartJsDataset[] = [];
  const cohortValues = getPathValuesForCohorts(cohorts, fhirpath, dataset);
  const allUniqueValues = cohortValues.flat().filter(onlyUnique);
  for (let i = 0; i < cohorts.length; i++) {
    const cohort = cohorts[i];
    const values = cohortValues[i];
    const datasetData: ChartJsDatasetData = allUniqueValues.map((label) => {
      return values.filter((value) => value === label).length;
    });
    chartJsDatasets.push({
      data: datasetData,
      label: cohort.name,
    });
  }
  let data: ChartJsData = {
    labels: allUniqueValues,
    datasets: chartJsDatasets,
  };
  return data;
};

const createNum1DChartJsDataWithLabels = (
  cohorts: PatientCohort[],
  valueFhirpath: string,
  labelFhipath: string,
  dataset: Dataset
) => {
  const chartJsDatasets: ChartJsDataset[] = [];
  const cohortValues = getPathValuesForCohorts(cohorts, valueFhirpath, dataset);
  const datasetLabels = getPathValuesForCohorts(cohorts, labelFhipath, dataset);
  const allUniqueLabels = datasetLabels.flat().filter(onlyUnique);
  for (let i = 0; i < cohorts.length; i++) {
    const cohort = cohorts[i];
    const values = cohortValues[i];
    const labels = datasetLabels[i];
    let datasetData: any[] = [];
    const zipped = labels.map((label, index) => {
      return [label, values[index]];
    });
    for (let i = 0; i < allUniqueLabels.length; i++) {
      const label = allUniqueLabels[i];
      const filtered = zipped.filter((z) => z[0] === label);
      const filteredValues = filtered.map((f) => f[1]);
      datasetData.push(filteredValues);
    }
    chartJsDatasets.push({
      data: datasetData,
      label: cohort.name,
    });
  }
  const data: ChartJsData = {
    labels: allUniqueLabels,
    datasets: chartJsDatasets,
  };
  return data;
};

const createNum1DChartJsDataWithoutLabels = (
  cohorts: PatientCohort[],
  valueFhirpath: string,
  dataset: Dataset
) => {
  const chartJsDatasets: ChartJsDataset[] = [];
  const cohortValues = getPathValuesForCohorts(cohorts, valueFhirpath, dataset);
  for (let i = 0; i < cohorts.length; i++) {
    const cohort = cohorts[i];
    const values = cohortValues[i];
    chartJsDatasets.push({
      data: [values],
      label: cohort.name,
    });
  }
  const data: ChartJsData = {
    labels: [""],
    datasets: chartJsDatasets,
  };
  return data;
};

export const createNum1DChartJsData = (
  cohorts: PatientCohort[],
  dataset: Dataset,
  valueFhirpath: string,
  labelFhipath?: string
) => {
  if (!labelFhipath || labelFhipath === "") {
    return createNum1DChartJsDataWithoutLabels(cohorts, valueFhirpath, dataset);
  } else {
    return createNum1DChartJsDataWithLabels(
      cohorts,
      valueFhirpath,
      labelFhipath,
      dataset
    );
  }
};

export const createNum2DDataForResources = (
  resources: Resource[],
  xFhirpath: string,
  yFhirpath: string
) => {
  const cohortLabels = getPathValuesForResources(resources, compile(xFhirpath));
  const cohortValues = getPathValuesForResources(resources, compile(yFhirpath));
  const zipped = cohortLabels.map((label, index) => {
    return [label, cohortValues[index]];
  });
  // sort by label
  zipped.sort((a, b) => {
    return (a[0] as string).localeCompare(b[0] as string);
  });
  const data = {
    labels: zipped.map((z) => z[0]) as ChartJsLabels,
    datasets: [
      {
        label: "",
        data: zipped.map((z) => z[1]) as ChartJsDatasetData,
      },
    ],
  };
  return data;
};

export const getChartTypeOptions = (
  dataType: (typeof availableDataTypes)[number]
) => {
  switch (dataType) {
    case categoricalDataType:
      return categoricalChartTypes;
    case numerical1DDataType:
      return numerical1DChartTypes;
    case numerical2DDataType:
      return numerical2DChartTypes;
  }
};

export const sliceChartJsData = (
  data: ChartJsData,
  numDataPoints: number,
  colors?: string[]
): ChartJsData => {
  let displayData: ChartJsData;
  let displayDatasets = [];
  if (numDataPoints === -1) {
    displayData = data;
  } else {
    const labels = data.labels.slice(0, numDataPoints);
    for (let i = 0; i < data.datasets.length; i++) {
      const dataset = data.datasets[i];
      const datasetData = dataset.data.slice(0, numDataPoints);
      const backgroundColor = generateColourPalette(
        datasetData.length,
        colors && colors[i]
      );
      displayDatasets.push({
        ...dataset,
        data: datasetData,
        backgroundColor: backgroundColor,
      });
    }
    displayData = {
      ...data,
      labels: labels,
      datasets: displayDatasets,
    };
  }
  return displayData;
};

export const validateDashboardCardInput = (card: DashboardCard) => {
  if (!card.chartType) {
    toastError("Chart type is required.");
    return false;
  }
  if (!card.valueFhirpath) {
    toastError("FHIRPath is required.");
    return false;
  }
  return true;
};

export const createChartJsDataForDashboardCard = (
  inputCohorts: PatientCohort[],
  card: DashboardCard,
  dataset: Dataset,
  allPatientsWhenEmpty?: boolean
) => {
  let chartJsData: ChartJsData;
  allPatientsWhenEmpty = allPatientsWhenEmpty || false;
  if (allPatientsWhenEmpty && inputCohorts.length === 0) {
    const allPatientsCohort = getAllPatientsAsCohort(dataset);
    inputCohorts = [allPatientsCohort];
  }
  if (card.dataType == categoricalDataType) {
    chartJsData = createCatChartJsData(
      inputCohorts,
      card.valueFhirpath,
      dataset
    );
  } else if (card.dataType == numerical1DDataType) {
    chartJsData = createNum1DChartJsData(
      inputCohorts,
      dataset,
      card.valueFhirpath,
      card.labelFhirpath
    );
  }
  return chartJsData!;
};
