import { createPatienCohortFromCriteria } from "@/app/datasets/lib/cohortUtils";
import {
  Dataset,
  PatientCohortCriterium,
  PatientCohortCriteriumType,
} from "@/app/datasets/lib/types";
import { getConnectedResourcesForResourceContainer } from "@/app/datasets/lib/datasetUtils";
import { generateUniqueId } from "@/app/lib/utils";
import { Patient } from "fhir/r4";
import { useState } from "react";

const usePatientCohortCriteria = () => {
  const [patientCohortIds, setPatientCohortIds] = useState<string[]>([]);
  const [criteria, setCriteria] = useState<PatientCohortCriterium[]>([
    {
      id: generateUniqueId(),
      name: "",
      fhirPath: "",
      type: "include",
    },
    {
      id: generateUniqueId(),
      name: "",
      fhirPath: "",
      type: "exclude",
    },
  ]);

  const handleAddCriterium = (type: PatientCohortCriteriumType) => {
    const newCriteria = [
      ...criteria,
      {
        id: generateUniqueId(),
        name: "",
        fhirPath: "",
        type,
      },
    ];
    setCriteria(newCriteria);
  };

  const computePatientCohort = (dataset: Dataset) => {
    const includeFhirPaths = criteria
      .filter((c) => c.type === "include")
      .map((c) => c.fhirPath);
    const excludeFhirPaths = criteria
      .filter((c) => c.type === "exclude")
      .map((c) => c.fhirPath);
    const patientResources = dataset.resourceContainers
      .filter((rc) => rc.resource.resourceType === "Patient")
      .map((rc) => {
        return {
          patient: rc.resource as Patient,
          resources: getConnectedResourcesForResourceContainer(rc, true),
        };
      });
    const cohort = createPatienCohortFromCriteria(
      includeFhirPaths,
      excludeFhirPaths,
      patientResources
    );
    return cohort;
  };

  return {
    patientCohortIds,
    setPatientCohortIds,
    criteria,
    setCriteria,
    handleAddCriterium,
    computePatientCohort,
  };
};

export default usePatientCohortCriteria;
