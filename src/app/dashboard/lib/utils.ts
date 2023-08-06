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

export const evalFhirPathOnDatasets = (
  datasets: Dataset[],
  fhirpath: string
) => {
  const fpFunc = compile(fhirpath);
  const datasetValues: any[][] = [];
  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i];
    const resources = dataset.resources;
    let values: any[][] = [];
    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];
      const resourceValue = fpFunc(resource);
      if (resourceValue) {
        values.push(resourceValue);
      }
    }
    const flattenedValues = values.flat();
    datasetValues.push(flattenedValues);
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
  data = sortChartJsData(data);
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
  console.log("createNum1DChartJsDataWithoutLabels fhirpath: ", valueFhirpath);
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
    labels: ["hey"],
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

export const scrollOnMouseEdge = (mouseMoveEvent: MouseEvent) => {
  // scroll when mouse is at the edge of the screen
  if (mouseMoveEvent.clientX < 10) {
    window.scrollBy(-10, 0);
  } else if (mouseMoveEvent.clientX > window.innerWidth - 10) {
    window.scrollBy(10, 0);
  }
  if (mouseMoveEvent.clientY < 10) {
    window.scrollBy(0, -10);
  } else if (mouseMoveEvent.clientY > window.innerHeight - 10) {
    window.scrollBy(0, 10);
  }
};
