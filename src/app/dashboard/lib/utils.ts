import {
  ChartJsData,
  ChartJsDatasetData,
  ChartJsLabels,
  Dataset,
} from "../../lib/types";
import { compile } from "fhirpath";

function onlyUnique(value: any, index: number, array: any) {
  return array.indexOf(value) === index;
}

export const createChartJsData = (datasets: Dataset[], fhirpath: string) => {
  const fpFunc = compile(fhirpath);
  const resources = datasets.flatMap((dataset) => dataset.resources);
  let values: any[] = [];
  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];
    const resourceValue = fpFunc(resource);
    if (resourceValue) {
      values.push(resourceValue);
    }
  }
  values = values.flat();
  const labels: ChartJsLabels = values.filter(onlyUnique);
  // get the count of each label in the values array
  console.log("VALIES: ", values);
  const datasetData: ChartJsDatasetData = labels.map((label) => {
    return values.filter((value) => value === label).length;
  });
  const data: ChartJsData = {
    labels,
    datasets: [
      {
        data: datasetData,
      },
    ],
  };
  console.log(data);
  return data;
};
