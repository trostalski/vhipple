import {
  Condition,
  AllergyIntolerance,
  Observation,
  Procedure,
  DiagnosticReport,
  Medication,
} from "fhir/r4";

export type CodedResource =
  | Condition
  | AllergyIntolerance
  | Observation
  | Procedure
  | DiagnosticReport
  | Medication;
