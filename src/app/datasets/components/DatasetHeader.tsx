import React, { useState } from "react";
import AddDatasetModal from "./AddDatasetModal";
import { addMode, mainListComp, mainViewComp } from "../lib/constants";
import { IoArrowBack } from "react-icons/io5";

interface DatasetHeaderProps {
  setMainComp: (mainComp: string) => void;
  mainComp: string;
}

const DatasetHeader = (props: DatasetHeaderProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-row justify-between items-center h-12">
      <h1 className="text-3xl font-bold">Datasets</h1>
      <span className="grow" />
      {props.mainComp === mainListComp && (
        <button
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          New Dataset
        </button>
      )}
      {props.mainComp === mainViewComp && (
        <button
          onClick={() => {
            props.setMainComp(mainListComp);
          }}
        >
          <IoArrowBack className="inline-block mr-2" size={48} />
        </button>
      )}
      {showModal && (
        <AddDatasetModal
          showModal={showModal}
          setShowModal={setShowModal}
          mode={addMode}
        />
      )}
    </div>
  );
};

export default DatasetHeader;
