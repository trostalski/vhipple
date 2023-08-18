import { createColumnHelper } from "@tanstack/react-table";
import { CSVColumn, MultipleValuePolicies } from "./types";
import { PatientResource } from "@/app/datasets/lib/cohortUtils";
import {
  getPathValuesForResources,
  validateFhirPath,
} from "@/app/datasets/lib/fhirpathUilts";
import { compile } from "fhirpath";
import { onlyUnique } from "../../dashboard/lib/utils";
import { toastError } from "@/app/lib/toasts";

export const computeTableColumns = (colNames: string[]) => {
  const columnHelper = createColumnHelper<any>();
  return colNames.map((name) =>
    columnHelper.accessor(name, {
      cell: (row) => row.getValue(),
      header: () => {},
    })
  );
};

export const parseValuesAccordingToPolicy = (
  values: string[],
  policy: MultipleValuePolicies
) => {
  switch (policy) {
    case "sum":
      return values.reduce((a, b) => Number(a) + Number(b), 0);
    case "average":
      return values.reduce((a, b) => Number(a) + Number(b), 0) / values.length;
    case "min":
      return Math.min(...values.map((v) => Number(v)));
    case "max":
      return Math.max(...values.map((v) => Number(v)));
    case "first":
      return values[0];
    case "concatenate":
      return values.join(", ");
    case "unique":
      return values.filter(onlyUnique)[0];
    default:
      return values[0];
  }
};

export const computeCSVTableData = (
  csvColumns: CSVColumn[],
  patientResources: PatientResource[]
) => {
  const rows: any[] = [];
  patientResources.forEach((pr) => {
    const row: any = {};
    csvColumns.forEach((csvColumn) => {
      const isValidFp = validateFhirPath(csvColumn.valueFhirpath);
      if (!isValidFp) {
        toastError(
          `Invalid FHIRPath expression: ${csvColumn.valueFhirpath} for column ${csvColumn.name}`
        );
        return;
      }
      const fpFunc = compile(csvColumn.valueFhirpath);
      const values = getPathValuesForResources(pr.resources, fpFunc);
      const value = parseValuesAccordingToPolicy(
        values,
        csvColumn.multipleValuePolicy
      );
      row[csvColumn.name] = value;
    });
    rows.push(row);
  });
  console.log(rows);
  return rows;
};
