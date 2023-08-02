import { Dataset } from "@/app/lib/types";
import React from "react";

interface DatasetBoxProps {
  dataset: Omit<Dataset, "resources">;
}

const DatasetBox = (props: DatasetBoxProps) => {
  return (
    <div className="flex flex-col w-full bg-white rounded-lg shadow-md">
      <div className="flex flex-row justify-between items-center p-4">
        <h1 className="text-2xl font-bold">{"NAME"}</h1>
        <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">
          View
        </button>
      </div>
      <div className="flex flex-row justify-between items-center p-4"></div>
    </div>
  );
};

export default DatasetBox;
