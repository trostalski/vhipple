import { CodedResource } from "@/app/lib/types";
import {
  CodeableConcept,
  Coding,
  Condition,
  Immunization,
  MedicationRequest,
  Observation,
  Procedure,
  Resource,
} from "fhir/r4";
import { VisTimelineData } from "./types";

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
    result = getYYYYMMDD(resource.onsetDateTime);
  } else if (resource.onsetAge) {
    result = resource.onsetAge.value + " " + resource.onsetAge.unit;
  } else if (resource.onsetPeriod) {
    if (resource.onsetPeriod.start) {
      result = getYYYYMMDD(resource.onsetPeriod.start);
    } else if (resource.onsetPeriod.end) {
      result = getYYYYMMDD(resource.onsetPeriod.end);
    }
  } else if (resource.onsetRange) {
    result =
      resource.onsetRange.low!.value + " " + resource.onsetRange.low!.unit;
  }
  return result;
};

export const getEffectiveDateDisplay = (resource: any) => {
  let result = undefined;
  if (resource.effectiveDateTime) {
    result = getYYYYMMDD(resource.effectiveDateTime);
  } else if (resource.effectivePeriod) {
    if (resource.effectivePeriod.start) {
      result = getYYYYMMDD(resource.effectivePeriod.start);
    } else if (resource.effectivePeriod.end) {
      result = getYYYYMMDD(resource.effectivePeriod.end);
    }
  } else if (resource.effectiveTiming) {
    result = resource.effectiveTiming.repeat!.boundsPeriod!.start!;
  } else if (resource.effectiveInstant) {
    result = resource.effectiveInstant;
  }
  return result;
};

export const getOccurrenceDateDisplay = (resource: any) => {
  let result = undefined;
  if (resource.occurrenceDateTime) {
    result = getYYYYMMDD(resource.occurrenceDateTime);
  } else if (resource.occurrencePeriod) {
    if (resource.occurrencePeriod.start) {
      result = getYYYYMMDD(resource.occurrencePeriod.start);
    } else if (resource.occurrencePeriod.end) {
      result = getYYYYMMDD(resource.occurrencePeriod.end);
    }
  } else if (resource.occurrenceTiming) {
    result = resource.occurrenceTiming.repeat!.boundsPeriod!.start!;
  } else if (resource.occurrenceInstant) {
    result = resource.occurrenceInstant;
  } else if (resource.occurrenceAge) {
    result = resource.occurrenceAge.value + " " + resource.occurrenceAge.unit;
  } else if (resource.occurrenceRange) {
    result =
      resource.occurrenceRange.low!.value +
      " " +
      resource.occurrenceRange.low!.unit;
  } else if (resource.occurrenceString) {
    result = resource.occurrenceString;
  }
  return result;
};

export const getPerformedDateDisplay = (resource: Procedure) => {
  let result = undefined;
  if (resource.performedDateTime) {
    result = getYYYYMMDD(resource.performedDateTime);
  } else if (resource.performedPeriod) {
    if (resource.performedPeriod.start) {
      result = getYYYYMMDD(resource.performedPeriod.start);
    } else if (resource.performedPeriod.end) {
      result = getYYYYMMDD(resource.performedPeriod.end);
    }
  } else if (resource.performedRange) {
    result =
      resource.performedRange.low!.value +
      " " +
      resource.performedRange.low!.unit;
  } else if (resource.performedString) {
    result = resource.performedString;
  } else if (resource.performedAge) {
    result = resource.performedAge.value + " " + resource.performedAge.unit;
  }
  return result;
};

export const getConditionDateDisplay = (condition: Condition) => {
  let result = undefined;
  result = getOnsetDateDisplay(condition);
  if (!result && condition.recordedDate) {
    result = condition.recordedDate;
  }
  return result;
};

export const getObservationDateDisplay = (observation: Observation) => {
  let result = undefined;
  result = getEffectiveDateDisplay(observation);
  if (!result && observation.issued) {
    result = observation.issued;
  }
  return result;
};

export const getMedicationRequestDateDisplay = (
  resource: MedicationRequest
) => {
  let result = undefined;
  if (resource.authoredOn) {
    result = resource.authoredOn;
  } else if (resource.meta?.lastUpdated) {
    result = resource.meta.lastUpdated;
  }
  result = result ? getYYYYMMDD(result) : "";
  return result;
};

export const getDateDisplayForResource = (resource: Resource) => {
  switch (resource.resourceType) {
    case "Condition":
      return getConditionDateDisplay(resource as Condition);
    case "Procedure":
      return getPerformedDateDisplay(resource as Procedure);
    case "Observation":
      return getObservationDateDisplay(resource as Observation);
    case "MedicationRequest":
      return getMedicationRequestDateDisplay(resource as MedicationRequest);
    default:
      return undefined;
  }
};

export const convertResourcesToVisTimeline = (resources: Resource[]) => {
  resources = resources.filter((r) => {
    if (r.resourceType && r.id && getDateDisplayForResource(r)) {
      return true;
    }
  });

  const result: VisTimelineData[] = resources.map((r) => {
    const id = r.id!;
    const content = r.resourceType;
    const start = getDateDisplayForResource(r);
    const className = r.resourceType;
    return { id, content, start, className };
  });

  return result || [];
};
