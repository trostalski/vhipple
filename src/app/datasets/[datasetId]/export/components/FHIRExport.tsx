import React, { useState } from "react";
import DataSelection from "./DataSelection";
import { Dataset, PatientCohort } from "@/app/datasets/lib/types";
import { Bundle } from "fhir/r4";
import { getResourcesForCohort } from "@/app/datasets/lib/cohortUtils";
import { downloadJson } from "../lib/utils";

interface FHIRExportProps {
  dataset: Dataset;
}

const FHIRExport = (props: FHIRExportProps) => {
  const { dataset } = props;
  const [selectedCohorts, setSelectedCohorts] = useState<PatientCohort[]>([]);

  const computeExportBundle = () => {
    const exportBundle: Bundle = {
      resourceType: "Bundle",
      type: "transaction",
      entry: [],
    };
    const entryResources = [];
    if (selectedCohorts.length === 0) {
      for (const rc of dataset.resourceContainers) {
        entryResources.push(rc.resource);
      }
    } else {
      for (const cohort of selectedCohorts) {
        const resources = getResourcesForCohort(cohort, dataset);
        entryResources.push(...resources);
      }
    }
    exportBundle.entry = entryResources;
    return exportBundle;
  };

  const handleDownloadBundle = (jsonData: Object) => {
    const exportBundle = computeExportBundle();
    downloadJson(exportBundle);
  };

  return (
    <div className="flex flex-col h-full w-full mt-2 gap-2">
      <DataSelection
        patientCohorts={dataset.patientCohorts}
        setSelectedCohorts={setSelectedCohorts}
      />
      <div className="flex flex-row w-full justify-end items-center">
        <button
          title="Download CSV"
          className="border bg-white rounded-md px-4 py-2 text-secondary-button transition hover:border-secondary-button"
          onClick={() => {
            const exportBundle = computeExportBundle();
            handleDownloadBundle(exportBundle);
          }}
        >
          Download FHIR
        </button>
      </div>
    </div>
  );
};

export default FHIRExport;
