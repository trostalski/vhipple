import React from "react";
import { PatientData } from "../../lib/patientData";
import PatientInfoActive from "./PatientInfoActive";
import PatientObservationGraph from "./PatientObservationGraph";
import PatientResources from "./PatientResources";

interface PatientInfoActiveProps {
  patientData: PatientData;
}

const PatientOverview = (props: PatientInfoActiveProps) => {
  return (
    <div className="flex flex-col gap-4">
      <PatientInfoActive patientData={props.patientData} />
      <PatientResources patientData={props.patientData} />
      <PatientObservationGraph patientData={props.patientData} />
    </div>
  );
};

export default PatientOverview;
