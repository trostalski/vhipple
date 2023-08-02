import ModalWrapper from "@/app/components/ModalWrapper";
import { Dataset } from "@/app/lib/types";
import React, { useState } from "react";

interface AddDatasetModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const AddDatasetModal = (props: AddDatasetModalProps) => {
  const [dataset, setDataset] = useState<Dataset>({
    id: "",
    name: "",
    description: "",
    resources: [],
    size: 0,
  });
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  return (
    <ModalWrapper showModal={props.showModal} setShowModal={props.setShowModal}>
      <div className="flex flex-col w-full bg-white rounded-lg shadow-md">
        <div className="flex flex-row justify-between items-center p-4">
          <h1 className="text-2xl font-bold">CREATE DATASET</h1>
        </div>
        <div className="flex flex-col justify-between items-center p-4">
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
                onChange={(e) => {}}
              />
              Select Resources
            </label>
            <div className="flex flex-row w-full bg-gray-100 h-48 flex-wrap gap-4 mt-4 border-2 rounded">
              {selectedResources.map((resource) => (
                <div className="flex flex-row justify-between items-center p-2 bg-gray-300 rounded-lg">
                  <p>{resource}</p>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-end gap-4 w-full mt-4">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => props.setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => props.setShowModal(false)}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddDatasetModal;
