import React, { useState } from "react";
import AddDatasetModal from "./AddDatasetModal";
import { addMode, defaultDataset } from "../lib/constants";
import { IoAdd } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";
import SettingsModal from "./SettingsModal";
import { generateUniqueId } from "@/app/lib/utils";

interface DatasetsHeaderProps {}

const DatasetsHeader = (props: DatasetsHeaderProps) => {
  const [showAddDatasetModal, setShowAddDatasetModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  return (
    <div className="flex flex-row justify-between items-center h-12 shrink-0">
      <div className="flex flex-row gap-2">
        <h1 className="text-3xl font-bold">Datasets</h1>
        <button
          className="text-primary-button bg-white border rounded-md transition px-2 py-1 hover:scale-110"
          onClick={() => setShowSettingsModal(true)}
        >
          <AiOutlineSetting size={28} />
        </button>
      </div>
      <span className="grow" />
      <button
        className="bg-primary-button text-white font-bold py-2 px-4 rounded transition hover:bg-primary-button-hover"
        onClick={() => setShowAddDatasetModal(true)}
      >
        <IoAdd className="" size={24} />
      </button>
      {showSettingsModal && (
        <SettingsModal
          setShowModal={setShowSettingsModal}
          showModal={showSettingsModal}
        />
      )}
      {showAddDatasetModal && (
        <AddDatasetModal
          dataset={{ ...defaultDataset }}
          showModal={showAddDatasetModal}
          setShowModal={setShowAddDatasetModal}
          mode={addMode}
        />
      )}
    </div>
  );
};

export default DatasetsHeader;
