import { toastError, toastInfo } from "@/app/lib/toasts";
import React, { useState } from "react";
import { ResourceContainer, ResourceContainersWithSource } from "../lib/types";
import {
  getResourceContainerFromResource,
  getResourceContainersFromBundle,
  isValidBundle,
  isValidJson,
} from "../lib/datasetUtils";
import { getFileTypeFromName } from "../lib/gloablUtils";

const useBundleUpload = () => {
  const [selectedResourceContainers, setSelectedResourceContainers] = useState<
    ResourceContainer[]
  >([]);

  const handleJson = (
    re: ProgressEvent<FileReader>,
    fileName: string,
    resourceContainers: ResourceContainer[]
  ) => {
    const target = re.target!;
    let resource;
    if (isValidJson(target.result as string)) {
      resource = JSON.parse(target.result as string);
    } else {
      toastError(
        `File ${fileName} is not a valid JSON file. Please upload a valid JSON file.`
      );
      return;
    }
    if (!isValidBundle(resource)) {
      toastError(
        `File ${fileName} is not a valid FHIR Bundle. Please upload a valid FHIR Bundle.`
      );
      return;
    }
    let newResourceContainers = getResourceContainersFromBundle(
      resource,
      fileName
    );
    resourceContainers.push(...newResourceContainers);
  };

  const handleNDJson = (
    re: ProgressEvent<FileReader>,
    fileName: string,
    resourceContainers: ResourceContainer[]
  ) => {
    const target = re.target!;
    const lines = (target.result as string).split("\n");
    for (const line of lines) {
      if (line.trim() === "") {
        continue;
      }
      let resource;
      if (isValidJson(line)) {
        resource = JSON.parse(line);
      } else {
        toastError(
          `File ${fileName} is not a valid NDJSON file. Please upload a valid NDJSON file.`
        );
        return;
      }
      let newResourceContainers = getResourceContainerFromResource(
        resource,
        fileName
      );
      resourceContainers.push(newResourceContainers);
    }
  };

  const uploadBundles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      toastInfo("No files selected.");
      return;
    }
    const resourceContainers: ResourceContainer[] = [];
    const processFile = (index: number) => {
      const file = e.target.files![index];
      const fileType = getFileTypeFromName(file.name);
      const reader = new FileReader();

      reader.onload = async (re) => {
        if (re.target) {
          switch (fileType) {
            case "json":
              handleJson(re, file.name, resourceContainers);
              break;
            case "ndjson":
              handleNDJson(re, file.name, resourceContainers);
              break;
            default:
              break;
          }
        }
        if (index + 1 < e.target.files!.length) {
          processFile(index + 1); // Continue with the next file
        } else {
          setSelectedResourceContainers((prevSelectedRC) => [
            ...prevSelectedRC,
            ...resourceContainers,
          ]);
        }
      };

      reader.readAsText(file);
    };

    processFile(0);
  };

  return {
    uploadBundles,
    selectedResourceContainers,
    setSelectedResourceContainers,
  };
};

export default useBundleUpload;
