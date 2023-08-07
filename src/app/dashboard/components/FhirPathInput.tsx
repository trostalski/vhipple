import React, { useState } from "react";
import FhirPathPreviewMenu from "./FhirPathPreviewMenu";
import { evalFhirPathOnDatasets, validateFhirPath } from "../lib/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { getDatasets } from "@/app/db/utils";
import { toastError } from "@/app/lib/toasts";
import { DashboardCard } from "../lib/types";

interface FhirPathInputProps {
  card: DashboardCard;
  setCard: (card: DashboardCard) => void;
  value: string | undefined;
  inputLabel: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FhirPathInput = (props: FhirPathInputProps) => {
  const [showFhirPathPreview, setShowFhirPathPreview] = useState(false);
  const datasets = useLiveQuery(getDatasets) || [];

  return (
    <div className="flex flex-col w-full">
      <label className="text-gray-700" htmlFor="fhirpath">
        {props.inputLabel}
      </label>
      <div className="relative flex flex-row gap-4 w-full">
        <input
          className="border w-full border-gray-300 p-2 rounded-lg"
          type="text"
          name="fhirpath"
          id="fhirpath"
          value={props.value}
          onChange={props.onChangeHandler}
        />
        <button
          className={`p-2 rounded-md text-orange-600 ${
            !props.card.valueFhirpath && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!props.card.valueFhirpath}
          onClick={() => {
            if (validateFhirPath(props.card.valueFhirpath)) {
              setShowFhirPathPreview(!showFhirPathPreview);
            } else {
              toastError("Invalid FHIRPath expression");
            }
          }}
        >
          Preview
        </button>
        {showFhirPathPreview && (
          <FhirPathPreviewMenu
            showMenu={showFhirPathPreview}
            setShowMenu={setShowFhirPathPreview}
            fhirPathResults={evalFhirPathOnDatasets(
              datasets.map((d) => {
                if (props.card.datasets.map((d) => d.name).includes(d.name)) {
                  return d;
                }
                return {
                  ...d,
                  data: [],
                };
              })!,
              props.value!
            )}
            datasetNames={props.card.datasets.map((d) => d.name)}
          />
        )}
      </div>
    </div>
  );
};

export default FhirPathInput;
