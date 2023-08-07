import { deleteDataset } from "@/app/db/utils";
import { toastSuccess } from "@/app/lib/toasts";
import React, { useState } from "react";
import { editMode, mainViewComp } from "../lib/constants";
import AddDatasetModal from "./AddDatasetModal";
import { Dataset } from "../lib/types";

interface DatasetBoxProps {
  dataset: Dataset;
  setViewDataset: (dataset: Dataset) => void;
  setMainComp: (mainComp: string) => void;
}

const DatasetBox = (props: DatasetBoxProps) => {
  const [showEditDatasetModal, setShowEditDatasetModal] = useState(false);
  return (
    <div className="flex flex-col w-full bg-white rounded-lg shadow-md">
      <div className="flex flex-row justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold">{props.dataset.name}</h1>
          <p className="text-gray-500">{props.dataset.size} Resources</p>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              props.setViewDataset(props.dataset);
              props.setMainComp(mainViewComp);
            }}
          >
            View
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setShowEditDatasetModal(true);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
              const res = await deleteDataset(props.dataset.name);
              if (res) {
                toastSuccess("Dataset deleted successfully.");
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center p-4">
        {props.dataset.description ? (
          <p className="text-gray-500">{props.dataset.description}</p>
        ) : (
          <p className="text-gray-500">No description.</p>
        )}
      </div>
      {showEditDatasetModal && (
        <AddDatasetModal
          showModal={showEditDatasetModal}
          setShowModal={setShowEditDatasetModal}
          dataset={props.dataset}
          mode={editMode}
        />
      )}
    </div>
  );
};

export default DatasetBox;
