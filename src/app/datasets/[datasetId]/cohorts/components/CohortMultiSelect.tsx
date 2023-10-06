import { reactSelectStyles } from "@/app/lib/constants";
import { OptionType } from "@/app/lib/types";
import React from "react";
import Select from "react-select";

interface CohortSelectProps {
  handleChangeCohort: (e: OptionType[]) => void;
  patientCohortOptions: OptionType[];
  placeholder?: string;
}

const CohortSelect = (props: CohortSelectProps) => {
  const { handleChangeCohort, patientCohortOptions, placeholder } = props;
  return (
    <Select
      isMulti
      placeholder={placeholder || "Select Cohorts"}
      styles={{
        ...reactSelectStyles,
        control: (provided) => ({ ...provided, height: 40 }),
        valueContainer: (provided) => ({
          ...provided,
          height: 40,
          overflow: "auto",
        }),
      }}
      options={patientCohortOptions}
      onChange={(e) => handleChangeCohort(e as OptionType[])}
    />
  );
};

export default CohortSelect;
