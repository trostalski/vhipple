import React from "react";
import FhirPathAliasList from "./FhirPathAliasList";
import { Dataset } from "@/app/datasets/lib/types";
import { IoAdd } from "react-icons/io5";
import { updateDataset } from "@/app/db/utils";
import { generateUniqueId } from "@/app/lib/utils";
import { toastError, toastSuccess } from "@/app/lib/toasts";

interface FhirPathSettingsProps {
  dataset: Dataset;
}

const FhirPathSettings = (props: FhirPathSettingsProps) => {
  const { dataset } = props;

  const handleAdd = async () => {
    const newFhirPathAliases = dataset.fhirPathAliases
      ? [...dataset.fhirPathAliases]
      : [];
    newFhirPathAliases.push({
      id: generateUniqueId(),
      alias: "",
      path: "",
    });
    const res = await updateDataset(dataset.id, {
      ...dataset,
      fhirPathAliases: newFhirPathAliases,
    });
    if (res) {
      toastSuccess("Fhir Path Alias added successfully.");
    } else {
      toastError("Failed to add Fhir Path Alias.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2 mt-4">
        <span className="text-xl font-bold">Fhir Path Aliases</span>
        <button
          className="bg-primary-button text-white font-bold py-1 px-2 rounded transition hover:bg-primary-button-hover"
          onClick={() => handleAdd()}
        >
          <IoAdd className="" size={24} />
        </button>
      </div>
      <div className="bg-white w-full rounded-md shadow-md px-4 py-2">
        <FhirPathAliasList dataset={dataset} />
      </div>
    </div>
  );
};

export default FhirPathSettings;
