import React, { use, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Dataset, PatientCohort } from "../../lib/types";
import { updateDataset } from "@/app/db/utils";
import CohortSettingsMenu from "./CohortSettingsMenu";
import SavePatientCohortModal from "./SavePatientCohortModal";
import { editMode } from "../../lib/constants";
import { useRouter } from "next/navigation";

interface CohortOverviewBoxProps {
  cohort: PatientCohort;
  dataset: Dataset;
}

const CohortOverviewBox = (props: CohortOverviewBoxProps) => {
  const { cohort, dataset } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [mainIsHovered, setMainIsHovered] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    const newPatientCohorts = dataset.patientCohorts.filter(
      (c) => c.id !== cohort.id
    );
    const newDataset = {
      ...dataset,
      patientCohorts: newPatientCohorts,
    };
    await updateDataset(dataset.id, newDataset);
  };

  const handleMainClick = () => {
    router.push(`/datasets/${dataset.id}/patients?cohortId=${cohort.id}`);
  };

  return (
    <div
      className={`bg-white w-1/2 rounded-md relative flex flex-col px-4 py-2 ${
        mainIsHovered ? "shadow-xl cursor-pointer" : "shadow-md"
      }`}
      onMouseEnter={() => setMainIsHovered(true)}
      onMouseLeave={() => setMainIsHovered(false)}
      onClick={handleMainClick}
    >
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-col">
          <span className="font-bold">{cohort.name}</span>
          <span className="text-gray-500">
            {cohort.patientIds.length + " " + "Patients"}
          </span>
        </div>
        <div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="transition hover:scale-110"
          >
            <CiMenuKebab size={24} />
          </button>
          {showMenu && (
            <CohortSettingsMenu
              setShowMenu={setShowMenu}
              handleDelete={handleDelete}
              setShowEditModal={setShowEditModal}
            />
          )}
        </div>
        {showEditModal && (
          <SavePatientCohortModal
            dataset={dataset}
            mode={editMode}
            setShowModal={setShowEditModal}
            showModal={showEditModal}
            inputPatientCohort={cohort}
          />
        )}
      </div>
    </div>
  );
};

export default CohortOverviewBox;
