import React, { useState } from "react";
import { CSVColumn } from "../lib/types";
import CSVColumnDef from "./CSVColumnDef";
import CSVPreviewTableContainer from "./CSVPreviewTableContainer";
import {
  Dataset,
  PatientCohort,
  ResourceContainer,
} from "@/app/datasets/lib/types";
import DataSelection from "./DataSelection";
import {
  getPatientContainersForCohort,
  getPatientResourcesForResourceContainer,
  getResourcesForCohorts,
} from "@/app/datasets/lib/cohortUtils";
import {
  computeCSVTableRows,
  convertRowsToCSV,
  downloadCSV,
} from "../lib/utils";

interface CSVExportProps {
  dataset: Dataset;
}

const CSVExport = (props: CSVExportProps) => {
  const { dataset } = props;
  const [selectedCohorts, setSelectedCohorts] = useState<PatientCohort[]>([]);
  const [csvColumns, setCSVColumns] = useState<CSVColumn[]>([
    {
      name: "Patient ID",
      valueFhirpath: "Patient.id",
      multipleValuePolicy: "first",
    },
  ]);
  const [tableInputData, setTableInputData] = useState<any[]>([]);

  const computeRows = () => {
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
    const rows = computeCSVTableRows(csvColumns, patientResources);
    return rows;
  };

  const computeTableInput = () => {
    const rows = computeRows();
    setTableInputData(rows);
  };

  const exportCSV = () => {
    const rows = computeRows();
    const csvContent = convertRowsToCSV(rows);
    downloadCSV(csvContent, "export.csv");
  };

  const getResources = () => {
    let resources;
    if (selectedCohorts.length === 0) {
      resources = dataset.resourceContainers.map((container) => {
        return container.resource;
      });
    } else {
      resources = getResourcesForCohorts(selectedCohorts, dataset);
    }

    return resources;
  };

  return (
    <div className="flex flex-col h-full w-full mt-2 gap-2">
      <DataSelection
        patientCohorts={dataset.patientCohorts}
        setSelectedCohorts={setSelectedCohorts}
      />
      <CSVColumnDef
        csvColumns={csvColumns}
        datasetId={dataset.id}
        fhirPathAliases={dataset.fhirPathAliases}
        resources={getResources()}
        setCSVColumns={setCSVColumns}
        setTableInputData={setTableInputData}
      />
      <CSVPreviewTableContainer
        columns={csvColumns}
        tableInputData={tableInputData}
        computeTableInput={computeTableInput}
      />
      <div className="flex flex-row w-full justify-end items-center">
        <button
          title="Download CSV"
          className="border bg-white rounded-md px-4 py-2 text-secondary-button transition hover:border-secondary-button"
          onClick={() => exportCSV()}
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default CSVExport;
