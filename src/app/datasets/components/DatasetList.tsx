import { getDatasets } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import DatasetBox from "./DatasetBox";

interface DatasetListProps {}

const DatasetList = (props: DatasetListProps) => {
  const datasets = useLiveQuery(getDatasets);
  return (
    <div
      className="flex flex-col w-full h-full flex-wrap gap-4 mt-4"
      id="ds-list"
    >
      {!datasets || datasets?.length === 0 ? (
        <div className="flex flex-row gap-4 items-center bg-white rounded-lg shadow-md p-4">
          <span className="text-gray-500">No dataset found.</span>
        </div>
      ) : (
        datasets.map((dataset) => (
          <DatasetBox key={dataset.name} dataset={dataset} />
        ))
      )}
    </div>
  );
};

export default DatasetList;
