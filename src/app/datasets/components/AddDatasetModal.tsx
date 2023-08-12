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
import { generateUniqueId } from "@/app/lib/utils";
import { addMode, defaultDataset, editMode } from "../lib/constants";
import useBundleUpload from "../hooks/useBundleUpload";
import { generateDefaultDatasetDashboardCards } from "../lib/utils";

interface AddDatasetModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  dataset?: Dataset;
  mode: "add" | "edit";
}

const AddDatasetModal = (props: AddDatasetModalProps) => {
  const { showModal, setShowModal, mode, dataset: initialDataset } = props;
  const { selectedResources, uploadBundles, setSelectedResources } =
    useBundleUpload();
  const [dataset, setDataset] = useState<Dataset>(
    initialDataset || defaultDataset
  );

  // previous dataset name when editing
  const prevDatasetId = dataset?.id || "";

  // previous sources for displaying file names when editing
  const prevSources =
    dataset?.resourceContainers.map((rc) => rc.source).filter(onlyUnique) || [];

  const handleSubmit = async () => {
    const newResourceContainers = selectedResources.flatMap(
      (r) => r.resourceContainers
    );
    dataset.resourceContainers = [
      ...dataset.resourceContainers,
      ...newResourceContainers,
    ];
    dataset.resourceContainers = dataset.resourceContainers.map((rc) => {
      rc.datasetId = dataset.id;
      return rc;
    });
    resolveReferencesForDataset(dataset, newResourceContainers);
    dataset.size = dataset.resourceContainers.length;
    if (mode === addMode) {
      dataset.createdAt = new Date().toISOString();
      dataset.updatedAt = new Date().toISOString();
      dataset.id = generateUniqueId();
      generateDefaultDatasetDashboardCards(dataset);
      await addDataset(dataset);
    } else if (mode === editMode) {
      dataset.updatedAt = new Date().toISOString();
      await updateDataset(prevDatasetId, dataset);
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
            htmlFor="bundle-upload"
            className="bg-secondary-button text-white py-1 text-center rounded cursor-pointer transition hover:bg-secondary-button-hover"
          >
            <input
              id="bundle-upload"
              type="file"
              hidden
              multiple
              onChange={(e) => uploadBundles(e)}
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
