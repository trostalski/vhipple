import { CodedResource } from "@/app/lib/types";
import {
  CodeableConcept,
  Coding,
  Condition,
  Immunization,
  MedicationRequest,
  Resource,
} from "fhir/r4";

export const getAge = (birthDate: string) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const m = today.getMonth() - birthDateObj.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
};

const getCodedDisplay = (
  code: CodeableConcept | undefined,
  coding: Coding[] | undefined
) => {
  let result = "";
  if (code) {
    if (code.text) {
      result = code.text;
    } else if (coding && coding.length > 0) {
      if (coding[0].display) {
        result = coding[0].display;
      } else if (coding[0].code) {
        result = coding[0].code;
        if (coding[0].system) {
          result += ` (${coding[0].system})`;
        } else {
          result += ` (unknown system)`;
        }
      }
    }
  }
  return result;
};

export const getCodedResourceDisplay = (resource: CodedResource) => {
  let result = "";
  const code = resource.code;
  const coding = code?.coding;
  result = getCodedDisplay(code, coding);
  return result;
};

export const getImmunizationDisplay = (resource: Immunization) => {
  let result = "";
  const code = resource.vaccineCode;
  const coding = code?.coding;
  result = getCodedDisplay(code, coding);
  return result;
};

export const getMedicationRequestDisplay = (resource: MedicationRequest) => {
  let result = "";
  const code = resource.medicationCodeableConcept;
  const coding = code?.coding;
  result = getCodedDisplay(code, coding);
  return result;
};

export const getYYYYMMDD = (date: string) => {
  let result = "";
  const dateObj = new Date(date);
  result = dateObj.toISOString().split("T")[0];
  return result;
};

export const getOnsetDateDisplay = (resource: any) => {
  let result = undefined;
  if (resource.onsetDateTime) {
    result = new Date(resource.onsetDateTime).toLocaleDateString();
    console.log("onsetDateTime", resource.onsetDateTime, result);
    result = getYYYYMMDD(resource.onsetDateTime);
    console.log("onsetDateTime", resource.onsetDateTime, result);
  } else if (resource.onsetAge) {
    result = resource.onsetAge.value + " " + resource.onsetAge.unit;
  } else if (resource.onsetPeriod) {
    result = resource.onsetPeriod.start!;
  } else if (resource.onsetRange) {
    result =
      resource.onsetRange.low!.value + " " + resource.onsetRange.low!.unit;
  }
  return result;
};

export const getConditionDateDisplay = (condition: Condition) => {
  let result = "";
  result = getOnsetDateDisplay(condition);
  if (!result && condition.recordedDate) {
    result = condition.recordedDate;
  }
  return result;
};

export const getMedicationRequestDateDisplay = (
  resource: MedicationRequest
) => {
  let result = "";
  if (resource.authoredOn) {
    result = resource.authoredOn;
  } else if (resource.meta?.lastUpdated) {
    result = resource.meta.lastUpdated;
  }
  result = getYYYYMMDD(result);
  return result;
};
