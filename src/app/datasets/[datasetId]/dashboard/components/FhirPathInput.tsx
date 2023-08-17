import React, { useEffect, useState } from "react";
import FhirPathPreviewMenu from "./FhirPathPreviewMenu";
import { toastError } from "@/app/lib/toasts";
import { DashboardCard } from "../lib/types";
import {
  getPathValuesForCohorts,
  getPathValuesForResources,
  validateFhirPath,
} from "@/app/datasets/lib/fhirpathUilts";
import { Dataset } from "@/app/datasets/lib/types";
import { Resource } from "fhir/r4";
import { compile } from "fhirpath";

interface FhirPathInputProps {
  value: string;
  inputLabel: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resources: Resource[];
}

const FhirPathInput = (props: FhirPathInputProps) => {
  const { inputLabel, onChangeHandler, value, resources } = props;
  const [showFhirPathPreview, setShowFhirPathPreview] = useState(false);
  const [fhirPathValues, setFhirpathValues] = useState<string[]>([]);

  const computeFhirPathValues = () => {
    const fhirPathValues = getPathValuesForResources(resources, compile(value));
    setFhirpathValues(fhirPathValues);
  };

  return (
    <div className="flex flex-col w-full">
      <label className="text-gray-700" htmlFor="fhirpath">
        {inputLabel}
      </label>
      <div className="relative flex flex-row gap-4 w-full">
        <input
          className="rounded-md p-2 border"
          type="text"
          name="fhirpath"
          id="fhirpath"
          value={value}
          onChange={onChangeHandler}
        />
        <button
          className={`p-1 text-md rounded-md text-secondary-button ${
            !value && "opacity-50 cursor-not-allowed"
          } transition hover:scale-110`}
          disabled={!value}
          onClick={() => {
            if (validateFhirPath(value)) {
              computeFhirPathValues();
              setShowFhirPathPreview(!showFhirPathPreview);
            } else {
              setShowFhirPathPreview(false);
              toastError("Invalid FHIRPath expression");
            }
          }}
        >
          Preview
        </button>
        {showFhirPathPreview && (
          <FhirPathPreviewMenu fhirPathValues={fhirPathValues} />
        )}
      </div>
    </div>
  );
};

export default FhirPathInput;
