import { getPathValuesForResources } from "@/app/datasets/lib/fhirpathUilts";
import { Resource } from "fhir/r4";
import { compile } from "fhirpath";
import React, { useState } from "react";

const useFhirPathPreview = () => {
  const [fhirPathValues, setFhirpathValues] = useState<string[]>([]);
  const computeFhirPathValues = (
    inputFhirPath: string,
    resources: Resource[]
  ) => {
    const fhirPathValues = getPathValuesForResources(
      resources,
      compile(inputFhirPath)
    );
    setFhirpathValues(fhirPathValues);
  };

  return {
    fhirPathValues,
    setFhirpathValues,
    computeFhirPathValues,
  };
};

export default useFhirPathPreview;
