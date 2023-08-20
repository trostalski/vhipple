import { CSVColumn, CSVColumnType, MultipleValuePolicies } from "./types";

export const availableExportDisplayTabs = ["CSV", "FHIR"];

export const availableCSVColumnTypes: CSVColumnType[] = [
  "string",
  "number",
  "boolean",
  "date",
];

export const availableMultipleValuePolicies: MultipleValuePolicies[] = [
  "sum",
  "average",
  "min",
  "max",
  "first",
  "concatenate",
  "unique",
];

export const defaultCsvColumn: CSVColumn = {
  name: "",
  valueFhirpath: "",
  multipleValuePolicy: "first",
};
