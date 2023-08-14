import React, { useState } from "react";
import ModalWrapper from "@/app/components/ModalWrapper";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  Dataset,
  PatientCohort,
  PatientCohortCriterium,
  PatientCohortCriteriumType,
} from "../../lib/types";
import { generateUniqueId } from "@/app/lib/utils";
import { IoAdd } from "react-icons/io5";
import { getConnectedResources } from "../../lib/utils";
import { createPatienCohortFromCriteria } from "../../lib/cohortUtils";
import { Patient } from "fhir/r4";
import PatientCohortPreviewMenu from "./PatientCohortPreviewMenu";
import CriteriumInput from "./CriteriumInput";
import usePatientCohortCriteria from "../dashboard/hooks/usePatientCohortCriteria";
import { updateDataset } from "@/app/db/utils";
import { toastSuccess } from "@/app/lib/toasts";

interface AddPatientCohortModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  dataset: Dataset;
}

const AddPatientCohortModal = (props: AddPatientCohortModalProps) => {
  const { showModal, setShowModal, dataset } = props;
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [cohortName, setCohortName] = useState("");
  const {
    computePatientCohort,
    criteria,
    handleAddCriterium,
    patientCohortIds,
    setCriteria,
    setPatientCohortIds,
  } = usePatientCohortCriteria();

  const handleSave = async () => {
    const cohort: PatientCohort = {
      id: generateUniqueId(),
      name: cohortName,
      inclusionCriteria: criteria.filter((c) => c.type === "include"),
      exclusionCriteria: criteria.filter((c) => c.type === "exclude"),
      patientIds: patientCohortIds,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newDataset = {
      ...dataset,
      patientCohorts: [...dataset.patientCohorts, cohort],
    };
    await updateDataset(dataset.id, newDataset);
    toastSuccess("Patient cohort added");
  };

  return (
    <ModalWrapper
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight="h-full"
    >
      <div className="relative flex flex-col h-full px-4 py-2 gap-2">
        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl font-bold">Add Patient Cohort</span>
          <AiOutlineInfoCircle className="text-gray-500 ml-2" size={24} />
        </div>
        <div className="flex flex-col gap-4 h-full overflow-scroll">
          <div className="flex flex-row items-center gap-2">
            <span className="text-sm">Patient Cohort Name</span>
            <input
              className="border rounded-md px-2 py-1 grow"
              value={cohortName}
              onChange={(e) => setCohortName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <span className="text-lg font-bold">Inclusion Criteria</span>
              <button
                className="text-primary-button border py-1 px-2 rounded-md transition hover:scale-110"
                onClick={() => handleAddCriterium("include")}
              >
                <IoAdd size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {criteria
                .filter((c) => c.type === "include")
                .map((c) => (
                  <CriteriumInput
                    key={c.id}
                    criterium={c}
                    setCriteria={setCriteria}
                    criteria={criteria}
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <span className="text-lg font-bold">Exclusion Criteria</span>
              <button
                className="text-primary-button border py-1 px-2 rounded-md transition hover:scale-110"
                onClick={() => handleAddCriterium("exclude")}
              >
                <IoAdd size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {criteria
                .filter((c) => c.type === "exclude")
                .map((c) => (
                  <CriteriumInput
                    key={c.id}
                    criterium={c}
                    setCriteria={setCriteria}
                    criteria={criteria}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="grow" />
        <div className="flex flex-row items-center gap-2">
          <button
            className="text-secondary-button py-2 px-4 rounded-md border transition hover:scale-110"
            onClick={() => {
              const cohort = computePatientCohort(dataset);
              setPatientCohortIds(cohort);
              setShowPreviewModal(!showPreviewModal);
            }}
          >
            Preview
          </button>
          <div className="grow" />
          <button
            className="mt-4 bg-cancel-button text-white py-2 px-4 rounded-md transition hover:bg-cancel-button-hover"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="mt-4 bg-primary-button text-white py-2 px-4 rounded-md transition hover:bg-primary-button-hover"
            onClick={(e) => {
              e.preventDefault();
              handleSave();
              setShowModal(false);
            }}
          >
            Save
          </button>
        </div>
        {showPreviewModal && (
          <PatientCohortPreviewMenu
            patientCohortIds={patientCohortIds}
            setShowPreviewModal={setShowPreviewModal}
          />
        )}
      </div>
    </ModalWrapper>
  );
};

export default AddPatientCohortModal;
