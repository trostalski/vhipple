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
import { Dataset } from "@/app/datasets/lib/types";
import {
  ChartJsData,
  ChartJsLabels,
  ChartJsDatasetData,
  ChartJsDataset,
} from "./types";
import { Resource } from "fhir/r4";

export const onlyUnique = (value: any, index: number, array: any) => {
  return array.indexOf(value) === index;
};

export const generateColourPalette = (numColours: number, name?: string) => {
  name = name || "blue";
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

export const validateFhirPath = (fhirpath: string): boolean => {
  if (fhirpath === "" || !fhirpath) {
    return false;
  }
  try {
    compile(fhirpath);
    return true;
  } catch (e) {
    return false;
  }
};

export const evalFhirPathOnResources = (
  resources: any[],
  fpFunc: Compile
): any[] => {
  let values: any[][] = [];
  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];
    const resourceValue = fpFunc(resource);
    if (resourceValue) {
      values.push(resourceValue);
    }
  }
  const flattenedValues = values.flat();
  return flattenedValues;
};

export const evalFhirPathOnDatasets = (
  datasets: Dataset[],
  fhirpath: string
) => {
  const fpFunc = compile(fhirpath);
  const datasetValues: any[][] = [];
  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i];
    const resources = dataset.resourceContainers.map((rc) => rc.resource);
    const values = evalFhirPathOnResources(resources, fpFunc);
    datasetValues.push(values);
  }
  return datasetValues;
};

export const sortChartJsDataByValueSum = (data: ChartJsData) => {
  let summedValues: number[] = [];
  for (let i = 0; i < data.datasets[0].data.length; i++) {
    let sum = 0;
    for (let j = 0; j < data.datasets.length; j++) {
      sum += data.datasets[j].data[i];
    }
    summedValues.push(sum);
  }
  const zipped = data.labels.map((label, index) => {
    return [label, summedValues[index]];
  });
  zipped.sort((a, b) => {
    return (b[1] as number) - (a[1] as number);
  });
  data.labels = zipped.map((z) => z[0]) as ChartJsLabels;
  data.datasets[0].data = zipped.map((z) => z[1]) as ChartJsDatasetData;
  return data;
};

export const createCatChartJsData = (datasets: Dataset[], fhirpath: string) => {
  let chartJsDatasets: ChartJsDataset[] = [];
  const datasetValues = evalFhirPathOnDatasets(datasets, fhirpath);
  const allUniqueValues = datasetValues.flat().filter(onlyUnique);
  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i];
    const values = datasetValues[i];
    let datasetData: ChartJsDatasetData = allUniqueValues.map((label) => {
      return values.filter((value) => value === label).length;
    });
    chartJsDatasets.push({
      data: datasetData,
      label: dataset.name,
    });
  }
  let data: ChartJsData = {
    labels: allUniqueValues,
    datasets: chartJsDatasets,
  };
  data = sortChartJsDataByValueSum(data);
  return data;
};

const createNum1DChartJsDataWithLabels = (
  datasets: Dataset[],
  valueFhirpath: string,
  labelFhipath: string
) => {
  const chartJsDatasets: ChartJsDataset[] = [];
  const datasetValues = evalFhirPathOnDatasets(datasets, valueFhirpath);
  const datasetLabels = evalFhirPathOnDatasets(datasets, labelFhipath);
  const allUniqueLabels = datasetLabels.flat().filter(onlyUnique);
  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i];
    const values = datasetValues[i];
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
      label: dataset.name,
    });
  }
  const data: ChartJsData = {
    labels: allUniqueLabels,
    datasets: chartJsDatasets,
  };
  return data;
};

const createNum1DChartJsDataWithoutLabels = (
  datasets: Dataset[],
  valueFhirpath: string
) => {
  const chartJsDatasets: ChartJsDataset[] = [];
  const datasetValues = evalFhirPathOnDatasets(datasets, valueFhirpath);
  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i];
    const values = datasetValues[i];
    chartJsDatasets.push({
      data: [values],
      label: dataset.name,
    });
  }
  const data: ChartJsData = {
    labels: [""],
    datasets: chartJsDatasets,
  };
  return data;
};

export const createNum1DChartJsData = (
  datasets: Dataset[],
  valueFhirpath: string,
  labelFhipath?: string
) => {
  if (labelFhipath) {
    return createNum1DChartJsDataWithLabels(
      datasets,
      valueFhirpath,
      labelFhipath
    );
  } else {
    return createNum1DChartJsDataWithoutLabels(datasets, valueFhirpath);
  }
};

export const createNum2DDataForResources = (
  resources: Resource[],
  xFhirpath: string,
  yFhirpath: string
) => {
  const datasetLabels = evalFhirPathOnResources(resources, compile(xFhirpath));
  const datasetValues = evalFhirPathOnResources(resources, compile(yFhirpath));
  const zipped = datasetLabels.map((label, index) => {
    return [label, datasetValues[index]];
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
