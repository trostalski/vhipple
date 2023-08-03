import { getDatasets } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import DatasetBox from "./DatasetBox";
import { Dataset } from "@/app/lib/types";

interface DatasetListProps {
  setMainComp: (comp: string) => void;
  setViewDataset: (dataset: Dataset) => void;
}

const DatasetList = (props: DatasetListProps) => {
  const datasets = useLiveQuery(getDatasets);
  return (
    <div className="flex flex-row flex-wrap gap-4 mt-4">
      {!datasets || datasets?.length === 0 ? (
        <span className="text-gray-500">No dataset found.</span>
      ) : (
        datasets.map((dataset) => (
          <DatasetBox
            key={dataset.name}
            dataset={dataset}
            setMainComp={props.setMainComp}
            setViewDataset={props.setViewDataset}
          />
        ))
      )}
    </div>
  );
};

export default DatasetList;
