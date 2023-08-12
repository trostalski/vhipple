import { toastError, toastInfo } from "@/app/lib/toasts";
import React, { useState } from "react";
import { ResourceContainer } from "../lib/types";

const useBundleUpload = () => {
  const [selectedResources, setSelectedResources] = useState<
    { name: string; resourceContainers: ResourceContainer[] }[]
  >([]);

  const uploadBundles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      toastInfo("No files selected.");
      return;
    }
    const updatedResources: {
      name: string;
      resourceContainers: ResourceContainer[];
    }[] = [];
    const processFile = (index: number) => {
      const file = e.target.files![index];
      const reader = new FileReader();

      reader.onload = async (re) => {
        if (re.target) {
          const resource = JSON.parse(re.target.result as string);
          if (resource.resourceType === "Bundle") {
            let resourceContainers: ResourceContainer[] = [];
            for (const entry of resource.entry) {
              resourceContainers.push({
                id: entry.resource.id,
                fullUrl: entry.fullUrl,
                source: file.name,
                resource: entry.resource,
                datasetId: "",
                references: [],
                referencedBy: [],
              });
            }
            updatedResources.push({
              name: file.name,
              resourceContainers: resourceContainers,
            });
          } else {
            toastError(
              `File ${file.name} is not a valid FHIR Bundle. Please upload a valid FHIR Bundle.`
            );
          }
        }

        if (index + 1 < e.target.files!.length) {
          processFile(index + 1); // Continue with the next file
        } else {
          setSelectedResources((prevSelectedResources) => [
            ...prevSelectedResources,
            ...updatedResources,
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
