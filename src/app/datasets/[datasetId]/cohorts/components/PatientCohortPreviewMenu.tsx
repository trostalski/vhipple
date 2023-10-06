import React from "react";
import { IoClose } from "react-icons/io5";

interface PatientCohortPreviewMenuProps {
  setShowPreviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  patientCohortIds: string[];
}

const PatientCohortPreviewMenu = (props: PatientCohortPreviewMenuProps) => {
  const { setShowPreviewModal, patientCohortIds } = props;
  return (
    <div className="absolute w-1/2 h-1/2 bottom-16 overflow-scroll text-xs rounded-md shadow-lg bg-secondary-button text-white">
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <div className="flex flex-col">
          <span className="text-lg font-bold">Preview Patient Ids</span>
          <span className="text-sm">{patientCohortIds.length} patients</span>
        </div>
        <button
          className="text-white rounded-md bg-cancel-button hover:bg-cancel-button-hover transition"
          onClick={() => setShowPreviewModal(false)}
        >
          <IoClose size={16} />
        </button>
      </div>
      <div className="flex flex-col justify-center px-4">
        {patientCohortIds.map((id) => (
          <div>{id}</div>
        ))}
      </div>
    </div>
  );
};

export default PatientCohortPreviewMenu;
