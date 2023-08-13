import React from "react";
import { Dataset } from "../../lib/types";

interface DatasetHeaderProps {
  dataset: Dataset;
}

const DatasetHeader = (props: DatasetHeaderProps) => {
  const { dataset } = props;
  return (
    <div className="flex flex-row justify-between items-center h-12 shrink-0">
      <h1 className="text-3xl font-bold">{dataset.name}</h1>
      <span className="grow" />
    </div>
  );
};

export default DatasetHeader;
