import React from "react";
import { OptionType } from "@/app/lib/types";
import { PatientCohort } from "@/app/datasets/lib/types";
import CohortSelect from "../../cohorts/components/CohortMultiSelect";

interface DataSelectionProps {
  patientCohorts: PatientCohort[];
  setSelectedCohorts: React.Dispatch<React.SetStateAction<PatientCohort[]>>;
}

const DataSelection = (props: DataSelectionProps) => {
  const { patientCohorts, setSelectedCohorts } = props;

  const patientCohortOptions = patientCohorts.map((cohort) => {
    return {
      label: cohort.name,
      value: cohort.id,
    };
  });

  const handleChangeCohort = (e: OptionType[]) => {
    const selectedCohortIds = e.map((cohort) => cohort.value);
    const selectedCohorts = patientCohorts.filter((cohort) =>
      selectedCohortIds.includes(cohort.id)
    );
    setSelectedCohorts(selectedCohorts);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2 mt-4">
        <span className="text-xl font-bold">Data Selection</span>
      </div>
      <div>
        <CohortSelect
          placeholder="Filter by Cohorts"
          patientCohortOptions={patientCohortOptions}
          handleChangeCohort={handleChangeCohort}
        />
      </div>
    </div>
  );
};

export default DataSelection;
