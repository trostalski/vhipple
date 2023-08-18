import React from "react";
import { CSVColumn } from "../lib/types";
import CSVTable from "./CSVTable";

interface CSVPreviewTableContainerProps {
  columns: CSVColumn[];
  tableInputData: any[];
  computeTableInput: () => void;
}

const CSVPreviewTableContainer = (props: CSVPreviewTableContainerProps) => {
  const { columns, tableInputData, computeTableInput } = props;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center gap-2 mt-4">
        <span className="text-xl font-bold">Preview</span>
        <button
          title="Show Preview"
          className="border bg-white rounded-md px-2 py-1 text-secondary-button transition hover:border-secondary-button"
          onClick={() => computeTableInput()}
        >
          Compute Data
        </button>
      </div>
      <CSVTable csvColumns={columns} inputData={tableInputData} />
    </div>
  );
};

export default CSVPreviewTableContainer;
