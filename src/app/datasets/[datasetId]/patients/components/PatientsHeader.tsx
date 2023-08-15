"use client";
import { PatientCohort } from "@/app/datasets/lib/types";
import React from "react";
import Select from "react-select";

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

  let selectOptions = patientCohorts.map((pc) => ({
    label: pc.name,
    value: pc.id,
  }));

  selectOptions = [
    {
      label: "All Cohorts",
      value: "",
    },
    ...selectOptions,
  ];

  const selectValue = selectOptions.find(
    (so) => so.value === selectedPatientCohort
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4 justify-between items-center h-12">
        <h1 className="text-3xl font-bold">Patients</h1>
        <span className="grow" />
        <Select
          value={selectValue}
          options={selectOptions}
          onChange={handleSelectChange}
          placeholder="Select Patient Cohort"
          className="w-[30vw]"
        />
      </div>
      <div className="flex flex-row"></div>
    </div>
  );
};

export default PatientsHeader;
