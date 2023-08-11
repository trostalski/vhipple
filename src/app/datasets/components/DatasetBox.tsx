import { deleteDataset } from "@/app/db/utils";
import { toastSuccess } from "@/app/lib/toasts";
import React, { useState } from "react";
import { editMode, mainViewComp } from "../lib/constants";
import AddDatasetModal from "./AddDatasetModal";
import { Dataset } from "../lib/types";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { getYYYYMMDD } from "@/app/patients/lib/utils";
import { useRouter } from "next/navigation";

interface DatasetBoxProps {
  dataset: Dataset;
}

const DatasetBox = (props: DatasetBoxProps) => {
  const { dataset } = props;
  const [showEditDatasetModal, setShowEditDatasetModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mainHovered, setMainHovered] = useState(false);
  const router = useRouter();
  return (
    <div
      className={`flex flex-row gap-4 items-center bg-white rounded-lg shadow-md ${
        mainHovered ? "shadow-xl " : ""
      }}`}
    >
      <button
        className="flex flex-col h-full justify-center items-center text-primary-button cursor-pointer rounded-l-md transition hover:bg-primary-button hover:text-white"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
      </button>
      <div
        className="flex flex-col flex-grow cursor-pointer"
        onMouseMove={() => {
          setMainHovered(true);
          console.log("hovered");
        }}
        onMouseLeave={() => setMainHovered(false)}
        onClick={() => {
          router.push(`/datasets/${dataset.name}`);
        }}
      >
        <h1 className="text-2xl font-bold">{dataset.name}</h1>
        <p className="text-gray-500 text-sm">{dataset.size} Resources</p>
        {expanded && (
          <>
            <div className="flex flex-row justify-between items-center">
              {dataset.description ? (
                <p className="text-gray-500">{dataset.description}</p>
              ) : (
                <p className="text-gray-500">No description.</p>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-row items-center h-full">
        <div className="flex flex-col">
          <span className="text-gray-500" title="">
            {getYYYYMMDD(dataset.updatedAt)}
          </span>{" "}
        </div>
        <button
          className="py-2 px-4 h-full transition hover:bg-secondary-button hover:text-white rounded-md"
          onClick={() => {
            setShowEditDatasetModal(true);
          }}
        >
          <AiFillEdit />
        </button>
        <button
          className="py-2 px-4 h-full transition hover:bg-cancel-button hover:text-white rounded-md"
          onClick={async () => {
            // alert diaslog
            const confirm = window.confirm(
              `Are you sure you want to delete ${dataset.name}?`
            );
            if (!confirm) {
              return;
            }
            const res = await deleteDataset(dataset.name);
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
          dataset={dataset}
          mode={editMode}
        />
      )}
    </div>
  );
};

export default DatasetBox;
