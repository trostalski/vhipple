import ModalWrapper from "@/app/components/ModalWrapper";
import { addDataset, datasetExists, updateDataset } from "@/app/db/utils";
import { toastError, toastInfo, toastSuccess } from "@/app/lib/toasts";
import { BundleEntry, Resource } from "fhir/r4";
import React, { useState } from "react";
import { Dataset, ResourceContainer } from "../lib/types";
import { resolveReferencesForDataset } from "../lib/utils";

interface AddDatasetModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  dataset?: Dataset;
  mode: "add" | "edit";
}

const AddDatasetModal = (props: AddDatasetModalProps) => {
  const [dataset, setDataset] = useState<Dataset>(
    props.dataset || {
      name: "",
      description: "",
      resourceContainers: [],
      size: 0,
    }
  );
  const [selectedResources, setSelectedResources] = useState<
    { name: string; resources: ResourceContainer[] }[]
  >([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      toastInfo("No files selected.");
      return;
    }
    const updatedResources: { name: string; resources: ResourceContainer[] }[] =
      [];
    const processFile = (index: number) => {
      const file = e.target.files![index];
      const reader = new FileReader();

      reader.onload = async (re) => {
        if (re.target) {
          const resource = JSON.parse(re.target.result as string);
          if (resource.resourceType === "Bundle") {
            const resources = resource.entry.map(
              (e: BundleEntry) => e.resource
            );
            updatedResources.push({ name: file.name, resources });
          } else {
            updatedResources.push({ name: file.name, resources: [resource] });
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

  const prevName = props.dataset?.name || "";

  const handleSubmit = async () => {
    if (dataset.name === "") {
      toastError("Please enter a name for the dataset.");
      return false;
    }
    const newResources = selectedResources.flatMap((r) => r.resources);
    const newResourceContainers = newResources.map((r) => ({
      id: r.id! + "/" + r.resourceType,
      resource: r,
      references: [],
      referencedBy: [],
    }));
    dataset.resourceContainers = [
      ...dataset.resourceContainers,
      ...newResourceContainers,
    ];
    resolveReferencesForDataset(dataset, newResources);
    dataset.size = dataset.resourceContainers.length;
    if (props.mode === "add") {
      if (await datasetExists(dataset.name)) {
        toastError("Dataset with the same name already exists.");
        return false;
      }
      await addDataset(dataset);
    } else if (props.mode === "edit") {
      await updateDataset(prevName, dataset);
    }
    return true;
  };

  return (
    <ModalWrapper showModal={props.showModal} setShowModal={props.setShowModal}>
      <div className="flex flex-row justify-between items-center py-2 px-4">
        <h1 className="text-2xl font-bold">CREATE DATASET</h1>
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
            Resources
          </label>
          <label
            htmlFor="resource-upload"
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-1 text-center rounded cursor-pointer"
          >
            <input
              id="resource-upload"
              type="file"
              hidden
              multiple
              onChange={(e) => handleUpload(e)}
            />
            Select Resources
          </label>
          <div className="flex flex-col w-full bg-gray-100 h-48 mt-4 border-2 rounded overflow-scroll">
            {selectedResources.map((file) => (
              <div
                key={file.name}
                className="flex flex-row justify-between items-start text-xs p-2"
              >
                <p>{file.name}</p>
                <button
                  className="text-red-500 hover:text-red-600 font-bold py-2 px-4 rounded"
                  onClick={() =>
                    setSelectedResources(
                      selectedResources.filter((f) => f.name !== file.name)
                    )
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-end gap-4 w-full mt-4">
          <button
            className="bg-gray-200 text-gray-700 p-2 rounded-lg"
            onClick={() => props.setShowModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg ml-2"
            onClick={async () => {
              const res = await handleSubmit();
              if (!res) return;
              toastSuccess("Dataset created successfully.");
              props.setShowModal(false);
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
