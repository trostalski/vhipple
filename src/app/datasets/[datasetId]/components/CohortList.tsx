import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Dataset } from "../../lib/types";
import AddPatientCohortModal from "./AddPatientCohortModal";

interface CohortListProps {
  dataset: Dataset;
}

const CohortList = (props: CohortListProps) => {
  const { dataset } = props;
  const [showModal, setShowModal] = useState(false);
  const patientCohorts = dataset.patientCohorts;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <span className="text-xl font-bold">Patient Cohorts</span>
        <button
          className="bg-primary-button text-white font-bold py-1 px-2 rounded transition hover:bg-primary-button-hover"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <IoAdd className="" size={24} />
        </button>
      </div>
      {showModal && (
        <AddPatientCohortModal
          showModal={showModal}
          setShowModal={setShowModal}
          dataset={dataset}
        />
      )}
    </div>
  );
};

export default CohortList;
