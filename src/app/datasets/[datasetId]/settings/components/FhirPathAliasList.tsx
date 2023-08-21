import { Dataset } from "@/app/datasets/lib/types";
import React from "react";
import FhirPathAliasBox from "./FhirPathAliasBox";
import { addMode } from "@/app/datasets/lib/constants";

interface FhirPathAliasListProps {
  dataset: Dataset;
}

const FhirPathAliasList = (props: FhirPathAliasListProps) => {
  const { dataset } = props;
  const resources = dataset.resourceContainers.map(
    (resourceContainer) => resourceContainer.resource
  );
  return (
    <div className="flex flex-col gap-2">
      {dataset.fhirPathAliases?.length === 0 ? (
        <span className="text-gray-500">No Fhir Path Aliases.</span>
      ) : (
        dataset.fhirPathAliases?.map((fhirPathAlias) => {
          return (
            <FhirPathAliasBox
              fhirPathAlias={fhirPathAlias}
              resources={resources}
            />
          );
        })
      )}
    </div>
  );
};

export default FhirPathAliasList;
