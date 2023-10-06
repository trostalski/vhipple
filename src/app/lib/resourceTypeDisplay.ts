import {
  CodeableConcept,
  Coding,
  Immunization,
  MedicationRequest,
} from "fhir/r4";
import { CodedResource } from "./types";

export const getValueDisplay = (resource: any, includeUnit: boolean) => {
  let result = undefined;
  includeUnit = includeUnit ?? true;
  if (resource.valueQuantity) {
    let value = resource.valueQuantity.value;
    // round value to 2 decimal places
    result = Math.round(value * 100) / 100;
    if (includeUnit) {
      const unit = resource.valueQuantity.unit;
      result = result + " " + unit;
    }
  } else if (resource.valueCodeableConcept) {
    const code = resource.valueCodeableConcept;
    const coding = code?.coding;
    result = getCodedDisplay(code, coding);
  } else if (resource.valueString) {
    result = resource.valueString;
  } else if (resource.valueBoolean) {
    result = resource.valueBoolean;
  } else if (resource.valueInteger) {
    result = resource.valueInteger;
  } else if (resource.valueRange) {
    result =
      resource.valueRange.low!.value + " " + resource.valueRange.low!.unit;
  } else if (resource.valueRatio) {
    result =
      resource.valueRatio.numerator!.value +
      " " +
      resource.valueRatio.numerator!.unit +
      " / " +
      resource.valueRatio.denominator!.value +
      " " +
      resource.valueRatio.denominator!.unit;
  } else if (resource.valueSampledData) {
    result = resource.valueSampledData.data;
  } else if (resource.valueTime) {
    result = resource.valueTime;
  } else if (resource.valueDateTime) {
    result = resource.valueDateTime;
  } else if (resource.valuePeriod) {
    result = resource.valuePeriod.start!;
  }
  return result;
};

const getCodedDisplay = (
  code: CodeableConcept | undefined,
  coding: Coding[] | undefined
) => {
  if (code?.text) {
    return code.text;
  }
  if (coding && coding.length > 0) {
    const primaryCoding = coding[0];
    if (primaryCoding.display) {
      return primaryCoding.display;
    } else if (primaryCoding.code) {
      let result = primaryCoding.code;
      result += primaryCoding.system
        ? ` (${primaryCoding.system})`
        : " (unknown system)";
      return result;
    }
  }
  return "";
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

export const getDisplayForResource = (resource: any): string => {
  let result = "";
  const resourceType = resource.resourceType;
  switch (resourceType) {
    case "Practitioner":
    case "Patient":
    case "RelatedPerson":
      if (resource.name?.length) {
        result = resource.name[0].given?.[0] || "";
        result += " " + resource.name[0].family || "";
      }
      break;
    case "Condition":
    case "Observation":
    case "Procedure":
    case "AllergyIntolerance":
    case "Medication":
    case "DiagnosticReport":
      if (resource.code?.text) {
        result = resource.code.text;
      } else if (resource.code?.coding?.length) {
        result =
          resource.code.coding[0].display || resource.code.coding[0].code;
      }
      break;
    case "Claim":
    case "Encounter":
      if (resource.type?.length) {
        result = resource.type[0].text || resource.type[0].coding[0].display;
      }
      break;
    case "MedicationRequest":
    case "MedicationStatement":
      if (resource.medicationCodeableConcept?.text) {
        result = resource.medicationCodeableConcept.text;
      } else if (resource.medicationCodeableConcept?.coding?.length) {
        result =
          resource.medicationCodeableConcept.coding[0].display ||
          resource.medicationCodeableConcept.coding[0].code;
      }
      break;
    case "Immunization":
      if (resource.vaccineCode?.text) {
        result = resource.vaccineCode.text;
      } else if (resource.vaccineCode?.coding?.length) {
        result =
          resource.vaccineCode.coding[0].display ||
          resource.vaccineCode.coding[0].code;
      }
      break;
    case "Organization":
    case "CareTeam":
    case "Location":
      if (resource.name) {
        result = resource.name;
      }
      break;
    case "ServiceRequest":
    case "ExplanationOfBenefit":
      if (resource.type?.text) {
        result = resource.type.text;
      } else if (resource.type?.coding?.length) {
        result =
          resource.type.coding[0].display || resource.type.coding[0].code;
      }
      break;
    case "CarePlan":
    case "Questionnaire":
      if (resource.title) {
        result = resource.title;
      }
      break;
    case "DocumentReference":
    case "ImagingStudy":
      if (resource.description) {
        result = resource.description;
      }
      break;
    case "RiskAssessment":
      if (resource.condition?.text) {
        result = resource.condition.text;
      } else if (resource.condition?.coding?.length) {
        result =
          resource.condition.coding[0].display ||
          resource.condition.coding[0].code;
      }
      break;
    case "Goal":
      if (resource.description?.text) {
        result = resource.description.text;
      }
      break;
    case "Composition":
      if (resource.title) {
        result = resource.title;
      }
      break;
    default:
      result = resource.resourceType;
      break;
  }
  return result;
};
