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

export const computeCSVTableRows = (
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
  return rows;
};

export const convertRowsToCSV = (data: object[]): string => {
  const csvRows: string[] = [];

  // Get the headers from the first object's keys
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  // Convert each object to a CSV row
  for (const row of data) {
    const values = headers.map((header) => {
      const value = (row as any)[header];
      return typeof value === "string" ? `"${value}"` : value;
    });
    csvRows.push(values.join(","));
  }
  return csvRows.join("\n");
};

export const downloadCSV = (csvContent: string, filename?: string) => {
  filename = filename || `vhi-fhir-export-${Date.now().toString()}.csv`;
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadJson = (jsonContent: Object, filename?: string) => {
  filename = filename || `vhi-fhir-export-${Date.now().toString()}.json`;
  const blob = new Blob([JSON.stringify(jsonContent, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
};
