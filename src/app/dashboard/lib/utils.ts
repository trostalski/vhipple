import {
  ChartJsData,
  ChartJsDataset,
  ChartJsDatasetData,
  ChartJsLabels,
  Dataset,
} from "../../lib/types";
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

const onlyUnique = (value: any, index: number, array: any) => {
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

const getDatasetValues = (datasets: Dataset[], fhirpath: string) => {
  const fpFunc = compile(fhirpath);
  const datasetValues: any[][] = [];
  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i];
    const resources = dataset.resources;
    let values: any[] = [];
    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];
      const resourceValue = fpFunc(resource);
      if (resourceValue) {
        values.push(resourceValue);
      }
    }
    values = values.flat();
    datasetValues.push(values);
  }
  return datasetValues;
};

export const sortChartJsData = (data: ChartJsData) => {
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

export const createChartJsData = (datasets: Dataset[], fhirpath: string) => {
  let chartJsDatasets: ChartJsDataset[] = [];
  const datasetValues = getDatasetValues(datasets, fhirpath);
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
  data = sortChartJsData(data);
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
