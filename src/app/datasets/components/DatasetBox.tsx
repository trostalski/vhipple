import { deleteDataset } from "@/app/db/utils";
import { toastSuccess } from "@/app/lib/toasts";
import React, { useState } from "react";
import { editMode } from "../lib/constants";
import AddDatasetModal from "./AddDatasetModal";
import { Dataset } from "../lib/types";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

interface DatasetBoxProps {
  dataset: Dataset;
  setViewDataset: (dataset: Dataset) => void;
  setMainComp: (mainComp: string) => void;
}

const DatasetBox = (props: DatasetBoxProps) => {
  const [showEditDatasetModal, setShowEditDatasetModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mainHovered, setMainHovered] = useState(false);
  return (
    <div
      className={`flex flex-row gap-4 items-center bg-white rounded-lg shadow-md border border-white ${
        mainHovered ? "border-primary-button " : ""
      }}`}
    >
      <button
        className="flex flex-col h-full justify-center items-center text-primary-button cursor-pointer rounded-l-md hover:bg-primary-button hover:text-white"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
      </button>
      <div
        className="flex flex-col w-11/12 cursor-pointer"
        onMouseMove={() => {
          setMainHovered(true);
          console.log("hovered");
        }}
        onMouseLeave={() => setMainHovered(false)}
      >
        <h1 className="text-2xl font-bold">{props.dataset.name}</h1>
        <p className="text-gray-500 text-sm">{props.dataset.size} Resources</p>
        {expanded && (
          <>
            <div className="flex flex-row justify-between items-center p-4">
              {props.dataset.description ? (
                <p className="text-gray-500">{props.dataset.description}</p>
              ) : (
                <p className="text-gray-500">No description.</p>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-row h-full">
        {/* <button
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              props.setViewDataset(props.dataset);
              props.setMainComp(mainViewComp);
            }}
          >
            View
          </button> */}
        <button
          className="py-2 px-4 h-full hover:bg-secondary-button hover:text-white rounded-md"
          onClick={() => {
            setShowEditDatasetModal(true);
          }}
        >
          <AiFillEdit />
        </button>
        <button
          className="py-2 px-4 h-ful hover:bg-cancel-button hover:text-white rounded-md"
          onClick={async () => {
            const res = await deleteDataset(props.dataset.name);
            if (res) {
              toastSuccess("Dataset deleted successfully.");
            }
          }}
        >
          <AiFillDelete />
        </button>
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
