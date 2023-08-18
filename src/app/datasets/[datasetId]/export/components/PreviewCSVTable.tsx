import React from "react";
import { CSVColumn } from "../lib/types";
import CSVTable from "./CSVTable";
import { getPatientResourcesForDataset } from "@/app/datasets/lib/cohortUtils";
import { Dataset } from "@/app/datasets/lib/types";
import { computeCSVTableData } from "../lib/utils";

interface PreviewCSVTableProps {
  columns: CSVColumn[];
  dataset: Dataset;
  tableInputData: any[];
  setTableInputData: React.Dispatch<React.SetStateAction<any[]>>;
}

const PreviewCSVTable = (props: PreviewCSVTableProps) => {
  const { columns, dataset, tableInputData, setTableInputData } = props;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2 mt-4">
        <span className="text-xl font-bold">Preview</span>
        <button
          title="Show Preview"
          className="border bg-white rounded-md px-2 py-1 text-secondary-button transition hover:border-secondary-button"
          onClick={() => {
            const patientResources = getPatientResourcesForDataset(dataset);
            const tableInputData = computeCSVTableData(
              columns,
              patientResources
            );
            setTableInputData(tableInputData);
          }}
        >
          Compute Data
        </button>
      </div>
      <CSVTable csvColumns={columns} inputData={tableInputData} />
    </div>
  );
};

export default PreviewCSVTable;
