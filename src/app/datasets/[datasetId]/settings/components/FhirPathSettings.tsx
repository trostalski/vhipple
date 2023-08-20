import React from "react";
import FhirPathAliasList from "./FhirPathAliasList";
import { Dataset } from "@/app/datasets/lib/types";
import { IoAdd } from "react-icons/io5";

interface FhirPathSettingsProps {
  dataset: Dataset;
}

const FhirPathSettings = (props: FhirPathSettingsProps) => {
  const { dataset } = props;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2 mt-4">
        <span className="text-xl font-bold">Fhir Path Aliases</span>
        <button
          className="
            bg-primary-button text-white font-bold py-1 px-2 rounded transition hover:bg-primary-button-hover    
        "
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
