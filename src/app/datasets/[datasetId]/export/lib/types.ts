export type NumericMultipleValuePolicies = "sum" | "average" | "min" | "max";
export type CategoicalMultipleValuePolicies =
  | "first"
  | "concatenate"
  | "unique";

export type MultipleValuePolicies =
  | NumericMultipleValuePolicies
  | CategoicalMultipleValuePolicies;

export type CSVColumnType = "string" | "number" | "boolean" | "date";

export interface CSVColumn {
  name: string;
  valueFhirpath: string;
  multipleValuePolicy: MultipleValuePolicies;
}

export interface CSVExportColumns {
  id: string;
  columns: CSVColumn[];
}
