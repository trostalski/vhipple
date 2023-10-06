"use client";
import React, { useState } from "react";
import { Dataset } from "../../../lib/types";
import CohortOverviewBox from "./CohortOverviewBox";
import SavePatientCohortModal from "./SavePatientCohortModal";
import { addMode } from "../../../lib/constants";

interface CohortListProps {
  dataset: Dataset;
}

const CohortList = (props: CohortListProps) => {
  const { dataset } = props;
  const patientCohorts = dataset.patientCohorts;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        {patientCohorts.map((c) => (
          <CohortOverviewBox cohort={c} dataset={dataset} key={c.id} />
        ))}
      </div>
    </div>
  );
};

export default CohortList;
