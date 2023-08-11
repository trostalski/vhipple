import ModalWrapper from "@/app/components/ModalWrapper";
import {
  addDataset,
  datasetExists,
  removeResourcesFromDatasetBySource,
  updateDataset,
} from "@/app/db/utils";
import {
  toastError,
  toastInfo,
  toastPromise,
  toastSuccess,
} from "@/app/lib/toasts";
import React, { useState } from "react";
import { Dataset, ResourceContainer } from "../lib/types";
import { resolveReferencesForDataset } from "../lib/resolveReferences";
import { onlyUnique } from "@/app/dashboard/lib/utils";
import { AiFillDelete } from "react-icons/ai";
import { getYYYYMMDD } from "@/app/patients/lib/utils";

interface AddDatasetModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  dataset?: Dataset;
  mode: "add" | "edit";
}

const AddDatasetModal = (props: AddDatasetModalProps) => {
  const { showModal, setShowModal, mode, dataset: initialDataset } = props;
  const [dataset, setDataset] = useState<Dataset>(
    initialDataset || {
      name: "",
      description: "",
      resourceContainers: [],
      updatedAt: "",
      createdAt: "",
      size: 0,
    }
  );
  const [selectedResources, setSelectedResources] = useState<
    { name: string; resourceContainers: ResourceContainer[] }[]
  >([]);

  // previous dataset name when editing
  const prevDatasetName = dataset?.name || "";

  // previous sources for displaying file names when editing
  const prevSources =
    dataset?.resourceContainers.map((rc) => rc.source).filter(onlyUnique) || [];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                datasetName: "",
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

  const handleSubmit = async () => {
    if (dataset.name === "") {
      toastError("Please enter a name for the dataset.");
      return false;
    }
    const newResourceContainers = selectedResources.flatMap(
      (r) => r.resourceContainers
    );
    dataset.resourceContainers = [
      ...dataset.resourceContainers,
      ...newResourceContainers,
    ];
    dataset.resourceContainers = dataset.resourceContainers.map((rc) => {
      rc.datasetName = dataset.name;
      return rc;
    });
    resolveReferencesForDataset(dataset, newResourceContainers);
    dataset.size = dataset.resourceContainers.length;
    if (mode === "add") {
      if (await datasetExists(dataset.name)) {
        toastError("Dataset with the same name already exists.");
        return false;
      }
      const date = getYYYYMMDD(new Date().toISOString());
      dataset.createdAt = new Date().toISOString();
      dataset.updatedAt = new Date().toISOString();
      await addDataset(dataset);
    } else if (mode === "edit") {
      dataset.updatedAt = new Date().toISOString();
      await updateDataset(prevDatasetName, dataset);
    }
    return true;
  };

  return (
    <ModalWrapper showModal={showModal} setShowModal={setShowModal}>
      <div className="flex flex-row justify-between items-center py-2 px-4">
        <h1 className="text-2xl font-bold">Create Dataset</h1>
      </div>
      <div className="flex flex-col justify-between items-center py-2 px-4">
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            className="border border-gray-300 p-2 rounded-lg"
            type="text"
            name="name"
            id="name"
            value={dataset.name}
            onChange={(e) => setDataset({ ...dataset, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            className="border border-gray-300 p-2 rounded-lg max-h-32 resize-none"
            rows={2}
            name="description"
            id="description"
            value={dataset.description}
            onChange={(e) =>
              setDataset({ ...dataset, description: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="description">
            Bundles
          </label>
          <label
            htmlFor="resource-upload"
            className="bg-secondary-button text-white py-1 text-center rounded cursor-pointer transition hover:bg-secondary-button-hover"
          >
            <input
              id="resource-upload"
              type="file"
              hidden
              multiple
              onChange={(e) => handleUpload(e)}
            />
            Select Bundles
          </label>
          <div className="flex flex-col w-full bg-gray-100 h-48 mt-4 border-2 rounded overflow-scroll">
            {prevSources.map((source) => (
              <div
                key={source}
                className="flex flex-row justify-between items-start text-xs p-2"
              >
                <p>{source}</p>
                <button
                  className="text-red-500 font-bold py-2 px-4 rounded transition hover:text-red-600"
                  onClick={async () =>
                    toastPromise(
                      removeResourcesFromDatasetBySource(dataset.name, source),
                      "Removing resources from dataset...",
                      "Resources removed from dataset successfully.",
                      "Failed to remove resources from dataset."
                    )
                  }
                >
                  Remove
                </button>
              </div>
            ))}
            {selectedResources.map((file) => (
              <div
                key={file.name}
                className="flex flex-row justify-between items-center text-xs p-2"
              >
                <p>{file.name}</p>
                <button
                  className="font-bold py-2 px-4 rounded transition hover:scale-125"
                  onClick={() =>
                    setSelectedResources(
                      selectedResources.filter((f) => f.name !== file.name)
                    )
                  }
                >
                  <AiFillDelete size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-end gap-4 w-full mt-4">
          <button
            className="bg-cancel-button text-white py-2 px-12 rounded-lg transition hover:bg-cancel-button-hover"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary-button text-white py-2 px-12 rounded-md transition hover:bg-primary-button-hover"
            onClick={async () => {
              const res = await handleSubmit();
              if (!res) return;
              toastSuccess("Dataset created successfully.");
              setShowModal(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddDatasetModal;
