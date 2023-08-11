import React from "react";

interface DatasetHeaderProps {
  datasetName: string;
}

const DatasetHeader = (props: DatasetHeaderProps) => {
  const { datasetName } = props;
  return (
    <div className="flex flex-row justify-between items-center h-12">
      <h1 className="text-3xl font-bold">{datasetName}</h1>
      <span className="grow" />
    </div>
  );
};

export default DatasetHeader;
