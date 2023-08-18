import React, { useMemo } from "react";
import { Dataset } from "../../lib/types";
import { computeDatasetInfo } from "../../lib/datasetUtils";

export interface DatasetInfoProps {
  dataset: Dataset;
}

export const DatasetInfo = (props: DatasetInfoProps) => {
  const { dataset } = props;
  const datasetInfo = useMemo(() => {
    return computeDatasetInfo(dataset);
  }, [dataset]);

  const ResourceNum = (props: { resource: string; num: number }) => {
    return (
      <div className="flex flex-row gap-2 items-center">
        <span className="text-gray-500 text-sm">{props.resource + ": "}</span>
        <span className="font-bold text-xs">{props.num}</span>
      </div>
    );
  };

  const MostCommon = (props: {
    resource: string;
    list: { value: string; count: number }[];
  }) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-500">{props.resource + ": "}</span>
        <div className="flex flex-col">
          {props.list.map((item) => (
            <span className="font-bold text-xs">
              {item.value + " (" + item.count + ")"}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const resourceNums = [
    { resource: "Patients", num: datasetInfo.numPatients },
    { resource: "Observations", num: datasetInfo.numObservations },
    { resource: "Conditions", num: datasetInfo.numConditions },
    { resource: "Prescriptions", num: datasetInfo.numMedications },
    { resource: "Procedures", num: datasetInfo.numProcedures },
    { resource: "Immunizations", num: datasetInfo.numImmunizations },
    { resource: "CarePlans", num: datasetInfo.numCarePlans },
    { resource: "Encounters", num: datasetInfo.numEncounters },
  ];

  const mostCommons = [
    {
      resource: "Conditions",
      list: datasetInfo.mostCommonConditions,
    },
    {
      resource: "Prescriptions",
      list: datasetInfo.mostCommonMedications,
    },
    {
      resource: "Procedures",
      list: datasetInfo.mostCommonProcedures,
    },
    {
      resource: "AllergyIntolerances",
      list: datasetInfo.mostCommonAllergies,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="">
        <span className="text-xl font-bold">Dataset Info</span>
      </div>
      <div className="bg-white px-4 py-2 w-full rounded-md shadow-md">
        <div className="flex flex-col">
          <span className="font-bold text-lg">Resource Counts</span>
          <div className="grid grid-cols-4">
            {resourceNums.map((resourceNum) => (
              <ResourceNum
                resource={resourceNum.resource}
                num={resourceNum.num}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white px-4 py-2 w-full rounded-md shadow-md">
        <div className="flex flex-col">
          <span className="font-bold text-lg">Most Common</span>
          <div className="grid grid-cols-4">
            {mostCommons.map((mostCommon) => (
              <MostCommon
                resource={mostCommon.resource}
                list={mostCommon.list}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};