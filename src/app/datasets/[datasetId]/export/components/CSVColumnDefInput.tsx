import React from "react";
import { CSVColumn } from "../lib/types";
import { availableMultipleValuePolicies } from "../lib/constants";
import { AiFillDelete } from "react-icons/ai";
import { toastError } from "@/app/lib/toasts";
import FhirPathInput from "../../dashboard/components/FhirPathInput";
import { FhirPathAlias } from "@/app/datasets/lib/types";
import { Resource } from "fhir/r4";

interface CSVColumnDefInputProps {
  column: CSVColumn;
  datasetId: string;
  setCSVColumns: React.Dispatch<React.SetStateAction<CSVColumn[]>>;
  csvColumns: CSVColumn[];
  fhirPathAliases: FhirPathAlias[];
  resources: Resource[];
}

const CSVColumnDefInput = (props: CSVColumnDefInputProps) => {
  const {
    column,
    setCSVColumns,
    datasetId,
    csvColumns,
    fhirPathAliases,
    resources,
  } = props;

  const isPatientIdCol = column.name === "Patient ID";

  const handleDelete = () => {
    return () => {
      if (isPatientIdCol) {
        toastError("Cannot delete Patient ID column");
        return;
      }
      setCSVColumns((prevColumns) => {
        return prevColumns.filter((prevColumn) => {
          return prevColumn.name !== column.name;
        });
      });
    };
  };

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCSVColumns((prevColumns) => {
      return prevColumns.map((prevColumn) => {
        if (prevColumn.name === column.name) {
          return { ...prevColumn, [e.target.name]: e.target.value };
        }
        return prevColumn;
      });
    });
  };

  return (
    <>
      <input
        value={column.name}
        disabled={isPatientIdCol}
        name="name"
        className={`border border-gray-300 bg-white rounded-md px-2 py-1 ${
          isPatientIdCol && "opacity-50"
        }`}
        onChange={(e) => handleOnChange(e)}
      />
      <div className="col-span-2">
        <FhirPathInput
          fhirPathAliases={fhirPathAliases}
          name="valueFhirpath"
          resources={resources}
          datasetId={datasetId}
          enablPreview={false}
          enableSelect={true}
          value={column.valueFhirpath}
          onChangeHandler={(e) => handleOnChange(e)}
          disabled={isPatientIdCol}
        />
      </div>
      <select
        className={`border border-gray-300 bg-white rounded-md px-2 py-1 ${
          isPatientIdCol && "opacity-50"
        }`}
        name="multipleValuePolicy"
        disabled={isPatientIdCol}
        value={column.multipleValuePolicy}
        onChange={(e) => handleOnChange(e)}
      >
        {availableMultipleValuePolicies.map((policy) => {
          return <option key={policy}>{policy}</option>;
        })}
      </select>
      <button
        className={`border border-gray-300 bg-white w-12 rounded-md px-2 py-1 ${
          isPatientIdCol
            ? "opacity-50"
            : "transition hover:text-secondary-button"
        }`}
        disabled={isPatientIdCol}
        onClick={handleDelete()}
      >
        <AiFillDelete size={20} className="mx-auto" />
      </button>
    </>
  );
};

export default CSVColumnDefInput;
