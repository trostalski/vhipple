import { Dataset, FhirPathAlias } from "@/app/datasets/lib/types";
import React from "react";
import FhirPathAliasBox from "./FhirPathAliasBox";
import { updateDataset } from "@/app/db/utils";
import { toastSuccess } from "@/app/lib/toasts";

interface FhirPathAliasListProps {
  dataset: Dataset;
}

const FhirPathAliasList = (props: FhirPathAliasListProps) => {
  const { dataset } = props;
  const resources = dataset.resourceContainers.map(
    (resourceContainer) => resourceContainer.resource
  );
  const handleDelete = async (id: string) => {
    const newFhirPathAliases = dataset.fhirPathAliases?.filter(
      (fhirPathAlias) => fhirPathAlias.id !== id
    );
    const res = await updateDataset(dataset.id, {
      ...dataset,
      fhirPathAliases: newFhirPathAliases,
    });
    if (res) {
      toastSuccess("Fhir Path Alias deleted successfully.");
    } else {
      toastSuccess("Failed to delete Fhir Path Alias.");
    }
  };

  const handleUpdate = async (fhirPathAlias: FhirPathAlias) => {
    const newFhirPathAliases = dataset.fhirPathAliases?.map((fpa) => {
      if (fpa.id === fhirPathAlias.id) {
        return fhirPathAlias;
      }
      return fpa;
    });
    const res = await updateDataset(dataset.id, {
      ...dataset,
      fhirPathAliases: newFhirPathAliases,
    });
    if (res) {
      toastSuccess("Fhir Path Alias updated successfully.");
    } else {
      toastSuccess("Failed to update Fhir Path Alias.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {dataset.fhirPathAliases?.length === 0 ? (
        <span className="text-gray-500">No Fhir Path Aliases.</span>
      ) : (
        dataset.fhirPathAliases
          ?.sort((a, b) => a.alias.localeCompare(b.alias))
          .map((fhirPathAlias) => {
            return (
              <FhirPathAliasBox
                key={fhirPathAlias.id}
                fhirPathAlias={fhirPathAlias}
                resources={resources}
                handleDetete={handleDelete}
                handleUpdate={handleUpdate}
              />
            );
          })
      )}
    </div>
  );
};

export default FhirPathAliasList;
