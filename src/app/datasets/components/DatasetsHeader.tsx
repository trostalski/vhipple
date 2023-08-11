import React, { useState } from "react";
import AddDatasetModal from "./AddDatasetModal";
import { addMode } from "../lib/constants";
import { IoAdd } from "react-icons/io5";

interface DatasetsHeaderProps {}

const DatasetsHeader = (props: DatasetsHeaderProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-row justify-between items-center h-12">
      <h1 className="text-3xl font-bold">Datasets</h1>
      <span className="grow" />
      <button
        className="bg-primary-button text-white font-bold py-2 px-4 rounded transition hover:bg-primary-button-hover"
        onClick={() => setShowModal(true)}
      >
        <IoAdd className="" size={24} />
      </button>
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

export default DatasetsHeader;
