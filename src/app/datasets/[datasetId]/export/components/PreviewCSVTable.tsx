import React from "react";
import { CSVColumn } from "../lib/types";
import CSVTable from "./CSVTable";
import {
  getPatientContainersForCohort,
  getPatientResourcesForResourceContainer,
} from "@/app/datasets/lib/cohortUtils";
import {
  Dataset,
  PatientCohort,
  ResourceContainer,
} from "@/app/datasets/lib/types";
import { computeCSVTableData } from "../lib/utils";

interface PreviewCSVTableProps {
  columns: CSVColumn[];
  dataset: Dataset;
  tableInputData: any[];
  selectedCohorts: PatientCohort[];
  setTableInputData: React.Dispatch<React.SetStateAction<any[]>>;
}

const PreviewCSVTable = (props: PreviewCSVTableProps) => {
  const {
    columns,
    dataset,
    selectedCohorts,
    tableInputData,
    setTableInputData,
  } = props;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2 mt-4">
        <span className="text-xl font-bold">Preview</span>
        <button
          title="Show Preview"
          className="border bg-white rounded-md px-2 py-1 text-secondary-button transition hover:border-secondary-button"
          onClick={() => {
            let resourceContainers: ResourceContainer[] = [];
            if (selectedCohorts.length === 0) {
              resourceContainers = dataset.resourceContainers;
            } else {
              for (const cohort of selectedCohorts) {
                resourceContainers = [
                  ...resourceContainers,
                  ...getPatientContainersForCohort(cohort, dataset),
                ];
              }
            }
            const patientResources =
              getPatientResourcesForResourceContainer(resourceContainers);
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
