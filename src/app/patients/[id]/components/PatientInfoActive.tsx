import React from "react";
import { PatientData } from "../../lib/patientData";
import {
  getCodedResourceDisplay,
  getMedicationRequestDisplay,
} from "../../lib/utils";

interface PatientInfoActiveProps {
  patientData: PatientData;
}

const PatientInfoActive = (props: PatientInfoActiveProps) => {
  return (
    <div className="flex flex-col bg-white rounded-md shadow-md p-4">
      <h1 className="text-3xl font-bold">Current</h1>
      <div className="grid grid-cols-3 ">
        <div className="flex flex-col">
          <span className="font-bold">Conditions</span>
          {props.patientData.activeConditions.length === 0 ? (
            <span className="text-gray-500 text-xs">No active conditions.</span>
          ) : (
            props.patientData.activeConditions.map((condition) => (
              <span className="text-xs">
                {getCodedResourceDisplay(condition)}
              </span>
            ))
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Prescriptions</span>
          {props.patientData.activeMedications.length === 0 ? (
            <span className="text-gray-500 text-xs">
              No active medications.
            </span>
          ) : (
            props.patientData.activeMedicationRequests.map((medication) => (
              <span className="text-xs">
                {getMedicationRequestDisplay(medication)}
              </span>
            ))
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Allergies</span>
          {props.patientData.allergies.length === 0 ? (
            <span className="text-gray-500 text-xs">No active allergies.</span>
          ) : (
            props.patientData.allergies.map((allergy) => (
              <span className="text-xs">
                {getCodedResourceDisplay(allergy)}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientInfoActive;
