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
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resources: Resource[];
  enablPreview: boolean;
  enableSelect: boolean;
  disabled?: boolean;
}

const FhirPathInput = (props: FhirPathInputProps) => {
  const {
    fhirPathAliases,
    datasetId,
    onChangeHandler,
    resources,
    value,
    enablPreview,
    enableSelect,
    disabled,
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
    <div className="relative flex flex-row w-full gap-1">
      <input
        disabled={disabled || false}
        className={`rounded-md px-2 py-1 border w-full ${
          disabled && "opacity-50"
        }`}
        type="text"
        name="fhirpath"
        id="fhirpath"
        value={value}
        onChange={onChangeHandler}
      />
      <div className="flex flex-col justify-center items-start text-sm w-16">
        {enableSelect && (
          <button
            hidden={!enableSelect}
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
            hidden={!enablPreview}
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
      {showFhirPathPreview && (
        <FhirPathPreviewMenu
          fhirPathValues={fhirPathValues}
          setShowMenu={setShowFhirPathPreview}
        />
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
