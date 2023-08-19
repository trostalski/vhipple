"use client";
import { PatientCohort } from "@/app/datasets/lib/types";
import React from "react";
import Select from "react-select";
import { allPatientsCohortName } from "../../dashboard/lib/constants";
import CohortSingleSelect from "../../components/CohortSingleSelect";

interface PatientsHeaderProps {
  patientCohorts: PatientCohort[];
  selectedPatientCohort: string | undefined;
  setSelectedPatientCohort: (patientCohortId: string) => void;
}

const PatientsHeader = (props: PatientsHeaderProps) => {
  const { patientCohorts, setSelectedPatientCohort, selectedPatientCohort } =
    props;

  const handleSelectChange = (selectedOption: any | undefined) => {
    if (!selectedOption) return;
    setSelectedPatientCohort(selectedOption.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4 justify-between items-center h-12">
        <h1 className="text-3xl font-bold">Patients</h1>
        <span className="grow" />
        <CohortSingleSelect
          handleSelectChange={handleSelectChange}
          patientCohorts={patientCohorts}
          selectedPatientCohort={selectedPatientCohort}
        />
      </div>
      <div className="flex flex-row"></div>
    </div>
  );
};

export default PatientsHeader;
