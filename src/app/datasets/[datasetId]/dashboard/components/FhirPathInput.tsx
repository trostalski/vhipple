import React, { useState } from "react";
import FhirPathPreviewMenu from "./FhirPathPreviewMenu";
import { toastError } from "@/app/lib/toasts";
import {
  getPathValuesForResources,
  validateFhirPath,
} from "@/app/datasets/lib/fhirpathUilts";
import { Resource } from "fhir/r4";
import { compile } from "fhirpath";
import FhirPathSelectModal from "./FhirPathSelectModal";
import { FhirPathAlias } from "@/app/datasets/lib/types";
import useFhirPathPreview from "../hooks/useFhirPathPreview";

interface FhirPathInputProps {
  fhirPathAliases: FhirPathAlias[];
  datasetId: string;
  value: string;
  inputLabel: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resources: Resource[];
  enablPreview: boolean;
  enableSelect: boolean;
}

const FhirPathInput = (props: FhirPathInputProps) => {
  const {
    fhirPathAliases,
    datasetId,
    inputLabel,
    onChangeHandler,
    resources,
    value,
    enablPreview,
    enableSelect,
  } = props;

  const [showFhirPathSelect, setShowFhirPathSelect] = useState(false);
  const [showFhirPathPreview, setShowFhirPathPreview] = useState(false);
  const { fhirPathValues, computeFhirPathValues } = useFhirPathPreview();

  const handleSelect = (fhirPathAlias: FhirPathAlias) => {
    onChangeHandler({
      target: {
        value: fhirPathAlias.path,
      },
    } as React.ChangeEvent<HTMLInputElement>);
    setShowFhirPathSelect(false);
  };

  return (
    <div className="flex flex-col w-full relative">
      <label className="text-gray-700" htmlFor="fhirpath">
        {inputLabel}
      </label>
      <div className="relative flex flex-row w-full gap-1">
        <input
          className="rounded-md p-2 border grow"
          type="text"
          name="fhirpath"
          id="fhirpath"
          value={value}
          onChange={onChangeHandler}
        />
        <div className="text-sm w-16">
          {enableSelect && (
            <button
              className="text-primary-button transition hover:underline"
              onClick={() => {
                setShowFhirPathSelect(!showFhirPathSelect);
              }}
            >
              Select
            </button>
          )}
          {enablPreview && (
            <button
              className={`text-secondary-button ${
                !value && "opacity-50 cursor-not-allowed"
              } transition hover:underline`}
              disabled={!value}
              onClick={() => {
                if (validateFhirPath(value)) {
                  computeFhirPathValues(value, resources);
                  setShowFhirPathPreview(!showFhirPathPreview);
                } else {
                  setShowFhirPathPreview(false);
                  toastError("Invalid FHIRPath expression");
                }
              }}
            >
              Preview
            </button>
          )}
        </div>
      </div>
      {showFhirPathPreview && (
        <FhirPathPreviewMenu fhirPathValues={fhirPathValues} />
      )}
      {showFhirPathSelect && (
        <FhirPathSelectModal
          datasetId={datasetId}
          handleSelect={handleSelect}
          fhirPathAliases={fhirPathAliases}
          setShowModal={setShowFhirPathSelect}
          showModal={showFhirPathSelect}
        />
      )}
    </div>
  );
};

export default FhirPathInput;
