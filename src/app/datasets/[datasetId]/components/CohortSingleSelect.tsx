import React from "react";
import Select from "react-select";
import { PatientCohort } from "../../lib/types";
import { allPatientsCohortName } from "../dashboard/lib/constants";

interface CohortSingleSelectProps {
  patientCohorts: PatientCohort[];
  selectedPatientCohort: string | undefined;
  handleSelectChange: any;
}

const CohortSingleSelect = (props: CohortSingleSelectProps) => {
  const { patientCohorts, handleSelectChange, selectedPatientCohort } = props;
  let selectOptions = patientCohorts.map((pc) => ({
    label: pc.name,
    value: pc.id,
  }));

  selectOptions = [
    {
      label: allPatientsCohortName,
      value: "",
    },
    ...selectOptions,
  ];

  const selectValue = selectOptions.find(
    (so) => so.value === selectedPatientCohort
  );

  return (
    <Select
      value={selectValue}
      options={selectOptions}
      onChange={handleSelectChange}
      placeholder="Select Patient Cohort"
      className="w-[30vw]"
    />
  );
};

export default CohortSingleSelect;
