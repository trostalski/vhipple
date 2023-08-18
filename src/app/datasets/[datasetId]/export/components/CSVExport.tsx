import React, { useState } from "react";
import { CSVColumn } from "../lib/types";
import CSVColumnDef from "./CSVColumnDef";
import PreviewCSVTable from "./PreviewCSVTable";
import { Dataset, PatientCohort } from "@/app/datasets/lib/types";
import CSVDataSelection from "./CSVDataSelection";

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

  return (
    <div className="flex flex-col h-full w-full mt-2 gap-2">
      <CSVDataSelection
        patientCohorts={dataset.patientCohorts}
        setSelectedCohorts={setSelectedCohorts}
      />
      <CSVColumnDef
        csvColumns={csvColumns}
        setCSVColumns={setCSVColumns}
        setTableInputData={setTableInputData}
      />
      <PreviewCSVTable
        columns={csvColumns}
        dataset={dataset}
        tableInputData={tableInputData}
        setTableInputData={setTableInputData}
      />
    </div>
  );
};

export default CSVExport;
