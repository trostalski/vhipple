import { toastError, toastInfo } from "@/app/lib/toasts";
import React, { useState } from "react";
import { ResourceContainer } from "../lib/types";
import {
  getResourceContainersFromBundle,
  isValidBundle,
  isValidJson,
} from "../lib/datasetUtils";

const useBundleUpload = () => {
  const [selectedResources, setSelectedResources] = useState<
    { name: string; resourceContainers: ResourceContainer[] }[]
  >([]);

  const uploadBundles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      toastInfo("No files selected.");
      return;
    }
    const resourceSources: {
      name: string;
      resourceContainers: ResourceContainer[];
    }[] = [];
    const processFile = (index: number) => {
      const file = e.target.files![index];
      const reader = new FileReader();

      reader.onload = async (re) => {
        let resource;
        if (re.target) {
          if (isValidJson(re.target.result as string)) {
            resource = JSON.parse(re.target.result as string);
          } else {
            toastError(
              `File ${file.name} is not a valid JSON file. Please upload a valid JSON file.`
            );
            return;
          }
          if (!isValidBundle(resource)) {
            toastError(
              `File ${file.name} is not a valid FHIR Bundle. Please upload a valid FHIR Bundle.`
            );
            return;
          }
          let resourceContainers = getResourceContainersFromBundle(
            resource,
            file.name
          );
          resourceSources.push({
            name: file.name,
            resourceContainers: resourceContainers,
          });
        }
        if (index + 1 < e.target.files!.length) {
          processFile(index + 1); // Continue with the next file
        } else {
          setSelectedResources((prevSelectedResources) => [
            ...prevSelectedResources,
            ...resourceSources,
          ]);
        }
      };

      reader.readAsText(file);
    };

    processFile(0);
  };

  return {
    selectedResources,
    uploadBundles,
    setSelectedResources,
  };
};

export default useBundleUpload;
