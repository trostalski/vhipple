import React, { useState } from "react";
import ModalWrapper from "@/app/components/ModalWrapper";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  Dataset,
  PatientCohort,
  PatientCohortCriterium,
} from "../../lib/types";
import { generateUniqueId } from "@/app/lib/utils";
import { IoAdd } from "react-icons/io5";
import PatientCohortPreviewMenu from "./PatientCohortPreviewMenu";
import CriteriumInput from "./CriteriumInput";
import { updateDataset } from "@/app/db/utils";
import { toastError, toastSuccess } from "@/app/lib/toasts";
import { defaultPatientCohort } from "../dashboard/lib/constants";
import {
  addMode,
  editMode,
  patientIncludeCritriumString,
} from "../../lib/constants";
import { computePatientCohort } from "../../lib/cohortUtils";
import { validateFhirPath } from "../../lib/fhirpathUilts";
import { Resource } from "fhir/r4";

interface SavePatientCohortModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  dataset: Dataset;
  inputPatientCohort?: PatientCohort;
  mode: "add" | "edit";
}

const SavePatientCohortModal = (props: SavePatientCohortModalProps) => {
  const { showModal, setShowModal, dataset, inputPatientCohort, mode } = props;
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [patientIdsForPreview, setPatientIdsForPreview] = useState<string[]>(
    []
  );
  const [patientCohort, setPatientCohort] = useState<PatientCohort>(
    inputPatientCohort || {
      ...defaultPatientCohort,
      inclusionCriteria: [
        {
          id: generateUniqueId(),
          type: patientIncludeCritriumString,
          name: "",
          fhirPath: "",
        },
      ],
      exclusionCriteria: [
        {
          id: generateUniqueId(),
          type: "exclude",
          name: "",
          fhirPath: "",
        },
      ],
    }
  );

  const handleAddIncludeCriterium = () => {
    setPatientCohort({
      ...patientCohort,
      inclusionCriteria: [
        ...patientCohort.inclusionCriteria,
        {
          id: generateUniqueId(),
          type: patientIncludeCritriumString,
          name: "",
          fhirPath: "",
        },
      ],
    });
  };

  const handleAddExcludeCriterium = () => {
    setPatientCohort({
      ...patientCohort,
      exclusionCriteria: [
        ...patientCohort.exclusionCriteria,
        {
          id: generateUniqueId(),
          type: "exclude",
          name: "",
          fhirPath: "",
        },
      ],
    });
  };

  const getCohortPatientIds = () => {
    const includeFhirPaths = patientCohort.inclusionCriteria.map(
      (c) => c.fhirPath
    );
    const excludeFhirPaths = patientCohort.exclusionCriteria.map(
      (c) => c.fhirPath
    );
    for (const fp of [...includeFhirPaths, ...excludeFhirPaths]) {
      const isValid = validateFhirPath(fp);
      if (!isValid && fp !== "") {
        toastError(`Invalid FHIRPath: ${fp}`);
        return false;
      }
    }
    const patientIds = computePatientCohort(
      dataset,
      includeFhirPaths,
      excludeFhirPaths
    );
    return patientIds;
  };

  const handleCreate = async () => {
    const patientIds = getCohortPatientIds();
    if (!patientIds) {
      return;
    }
    const cohort: PatientCohort = {
      ...patientCohort,
      id: generateUniqueId(),
      patientIds: patientIds,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newDataset = {
      ...dataset,
      patientCohorts: [...dataset.patientCohorts, cohort],
    };
    const res = await updateDataset(dataset.id, newDataset);
    if (res) {
      setShowModal(false);
      toastSuccess("Patient cohort added");
    } else {
      toastError("Failed to add patient cohort");
    }
  };

  const handleEdit = async () => {
    const patientIds = getCohortPatientIds();
    if (!patientIds) {
      return;
    }
    const cohort: PatientCohort = {
      ...patientCohort,
      patientIds: patientIds,
      updatedAt: new Date().toISOString(),
    };
    const newDataset = {
      ...dataset,
      patientCohorts: dataset.patientCohorts.map((pc) =>
        pc.id === cohort.id ? cohort : pc
      ),
    };
    const res = await updateDataset(dataset.id, newDataset);
    if (res) {
      setShowModal(false);
      toastSuccess("Patient cohort added");
    } else {
      toastError("Failed to add patient cohort");
    }
  };

  const handleSetIncludeCriteria = (
    value: string,
    propName: string,
    criterium: PatientCohortCriterium
  ) => {
    setPatientCohort({
      ...patientCohort,
      inclusionCriteria: patientCohort.inclusionCriteria.map((c) =>
        c.id === criterium.id
          ? {
              ...c,
              [propName]: value,
            }
          : c
      ),
    });
  };

  const handleSetExcludeCriteria = (
    value: string,
    propName: string,
    criterium: PatientCohortCriterium
  ) => {
    setPatientCohort({
      ...patientCohort,
      exclusionCriteria: patientCohort.exclusionCriteria.map((c) =>
        c.id === criterium.id
          ? {
              ...c,
              [propName]: value,
            }
          : c
      ),
    });
  };

  const handleDeleteIncludeCriteria = (criterium: PatientCohortCriterium) => {
    setPatientCohort({
      ...patientCohort,
      inclusionCriteria: patientCohort.inclusionCriteria.filter(
        (c) => c.id !== criterium.id
      ),
    });
  };

  const handleDeleteExcludeCriteria = (criterium: PatientCohortCriterium) => {
    setPatientCohort({
      ...patientCohort,
      exclusionCriteria: patientCohort.exclusionCriteria.filter(
        (c) => c.id !== criterium.id
      ),
    });
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
              value={patientCohort.name}
              onChange={(e) =>
                setPatientCohort({ ...patientCohort, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <span className="text-lg font-bold">Inclusion Criteria</span>
              <button
                className="text-primary-button border py-1 px-2 rounded-md transition hover:scale-110"
                onClick={() => handleAddIncludeCriterium()}
              >
                <IoAdd size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {patientCohort.inclusionCriteria.map((c) => (
                <CriteriumInput
                  key={c.id}
                  criterium={c}
                  setCriteria={handleSetIncludeCriteria}
                  handleDelete={() => handleDeleteIncludeCriteria(c)}
                  datasetId={dataset.id}
                  fhirPathAliases={dataset.fhirPathAliases}
                  resources={dataset.resourceContainers.map(
                    (rc) => rc.resource
                  )}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <span className="text-lg font-bold">Exclusion Criteria</span>
              <button
                className="text-primary-button border py-1 px-2 rounded-md transition hover:scale-110"
                onClick={() => handleAddExcludeCriterium()}
              >
                <IoAdd size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {patientCohort.exclusionCriteria.map((c) => (
                <CriteriumInput
                  key={c.id}
                  criterium={c}
                  setCriteria={handleSetExcludeCriteria}
                  handleDelete={() => handleDeleteExcludeCriteria(c)}
                  datasetId={dataset.id}
                  fhirPathAliases={dataset.fhirPathAliases}
                  resources={dataset.resourceContainers.map(
                    (rc) => rc.resource
                  )}
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
              const patientIdsRes = getCohortPatientIds();
              if (!patientIdsRes) {
                return;
              }
              setPatientIdsForPreview(patientIdsRes);
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
              if (mode === addMode) {
                handleCreate();
              } else if (mode === editMode) {
                handleEdit();
              }
            }}
          >
            Save
          </button>
        </div>
        {showPreviewModal && (
          <PatientCohortPreviewMenu
            patientCohortIds={patientIdsForPreview}
            setShowPreviewModal={setShowPreviewModal}
          />
        )}
      </div>
    </ModalWrapper>
  );
};

export default SavePatientCohortModal;
