import React, { useState } from "react";
import ModalWrapper from "@/app/components/ModalWrapper";
import { AiFillDelete, AiOutlineInfoCircle } from "react-icons/ai";
import {
  PatientCohortCriterium,
  PatientCohortCriteriumType,
} from "../../lib/types";
import { generateUniqueId } from "@/app/lib/utils";
import { IoAdd } from "react-icons/io5";

interface CriteriumInputProps {
  criterium: PatientCohortCriterium;
  criteria: PatientCohortCriterium[];
  setCriteria: (criteria: PatientCohortCriterium[]) => void;
}

const CriteriumInput = (props: CriteriumInputProps) => {
  const { criterium, setCriteria } = props;
  return (
    <div className="flex flex-row items-center gap-4 w-full">
      <div className="flex flex-row items-center gap-2">
        <span className="text-sm">Name</span>
        <input
          className="border rounded-md px-2 py-1"
          value={criterium.name}
          onChange={(e) => {
            const newCriteria = props.criteria.map((c) => {
              if (c.id === criterium.id) {
                return { ...c, name: e.target.value };
              }
              return c;
            });
            setCriteria(newCriteria);
          }}
        />
      </div>
      <div className="flex flex-row items-center gap-2 w-full">
        <span className="text-sm">Path</span>
        <input
          className="border rounded-md px-2 py-1 grow"
          value={criterium.fhirPath}
          onChange={(e) => {
            const newCriteria = props.criteria.map((c) => {
              if (c.id === criterium.id) {
                return { ...c, fhirPath: e.target.value };
              }
              return c;
            });
            setCriteria(newCriteria);
          }}
        />
      </div>
      <div>
        <button
          className="text-primary-button border py-1 px-2 rounded-md transition hover:scale-110"
          onClick={() => {
            const newCriteria = props.criteria.filter(
              (c) => c.id !== criterium.id
            );
            setCriteria(newCriteria);
          }}
        >
          <AiFillDelete size={16} />
        </button>
      </div>
    </div>
  );
};

interface AddPatientCohortModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const AddPatientCohortModal = (props: AddPatientCohortModalProps) => {
  const { showModal, setShowModal } = props;
  const [criteria, setCriteria] = useState<PatientCohortCriterium[]>([
    {
      id: generateUniqueId(),
      name: "",
      fhirPath: "",
      type: "include",
    },
    {
      id: generateUniqueId(),
      name: "",
      fhirPath: "",
      type: "exclude",
    },
  ]);

  const handleAddCriterium = (type: PatientCohortCriteriumType) => {
    const newCriteria = [
      ...criteria,
      {
        id: generateUniqueId(),
        name: "",
        fhirPath: "",
        type,
      },
    ];
    setCriteria(newCriteria);
  };

  return (
    <ModalWrapper
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight="h-full"
    >
      <div className="flex flex-col h-full px-4 py-2 gap-2">
        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl font-bold">Add Patient Cohort</span>
          <AiOutlineInfoCircle className="text-gray-500 ml-2" size={24} />
        </div>
        <div className="flex flex-col gap-4 h-full overflow-scroll">
          <div className="flex flex-row items-center gap-2">
            <span className="text-sm">Patient Cohort Name</span>
            <input className="border rounded-md px-2 py-1 grow" />
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
          <button className="text-secondary-button py-2 px-4 rounded-md border transition hover:scale-110">
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
              setShowModal(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddPatientCohortModal;
