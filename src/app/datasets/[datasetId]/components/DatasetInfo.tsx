import React, { useMemo } from "react";
import { Dataset } from "../../lib/types";
import { computeDatasetInfo } from "../../lib/datasetUtils";
import DashboardCardBox from "../dashboard/components/DashboardCardBox";
import { useLiveQuery } from "dexie-react-hooks";
import { getDashboardCards } from "@/app/db/utils";

export interface DatasetInfoProps {
  dataset: Dataset;
}

export const DatasetInfo = (props: DatasetInfoProps) => {
  const { dataset } = props;
  const dashboardCards = useLiveQuery(() => getDashboardCards(dataset.id));
  const datasetInfo = useMemo(() => {
    return computeDatasetInfo(dataset);
  }, [dataset]);

  if (!dashboardCards) {
    return null;
  }

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
          {props.list
            .sort((a, b) => b.count - a.count)
            .map((item) => (
              <span key={item.value} className="font-bold text-xs">
                {item.value + " (" + item.count + ")"}
              </span>
            ))}
        </div>
      </div>
    );
  };

  let resourceNums = [
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

  const filteredMostCommons = mostCommons.filter(
    (mostCommon) => mostCommon.list.length > 0
  );

  console.log("filteredMostCommons", filteredMostCommons.length);

  return (
    <div className="flex flex-col gap-2">
      <div className="">
        <span className="text-xl font-bold">Dataset Info</span>
      </div>
      <div className="bg-white px-4 py-2 w-full rounded-md shadow-md">
        <div className="flex flex-col">
          <span className="font-bold text-lg">Resource Counts</span>
          <div className="grid grid-cols-4">
            {resourceNums
              .sort((a, b) => b.num - a.num)
              .map((resourceNum) => (
                <ResourceNum
                  key={resourceNum.resource}
                  resource={resourceNum.resource}
                  num={resourceNum.num}
                />
              ))}
          </div>
        </div>
      </div>
      {filteredMostCommons.length > 0 && (
        <div className="bg-white px-4 py-2 w-full rounded-md shadow-md">
          <div className="flex flex-col">
            <span className="font-bold text-lg">Most Common</span>
            <div className="grid grid-cols-4">
              {mostCommons
                .filter((mostCommon) => mostCommon.list.length !== 0)
                .map((mostCommon) => (
                  <MostCommon
                    key={mostCommon.resource}
                    resource={mostCommon.resource}
                    list={mostCommon.list}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-start items-center gap-4">
        {dashboardCards
          .filter((card) => card.showOnHomePage)
          .map((card) => (
            <div key={card.id} className="h-[50vh] w-5/12">
              <DashboardCardBox
                card={card}
                datasetId={dataset.id}
                expandedId=""
                setExpandedId={() => {}}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
