import React from "react";
import { Patient } from "fhir/r4";
import { getAge } from "../../lib/utils";

interface PatientHeaderProps {
  patient: Patient;
}

const PatientHeader = (props: PatientHeaderProps) => {
  const patient = props.patient;

  return (
    <div className="flex flex-col justify-between shrink-0">
      <div className="flex flex-row items-center">
        <h1 className="text-3xl font-bold">
          {patient.name && patient.name[0].given && (
            <span>
              {patient.name[0].given[0]} {patient.name[0].family}
            </span>
          )}
        </h1>
        <span className="flex-grow" />
        <div className="grid grid-cols-2 w-1/2 bg-white text-xs rounded-md shadow-md p-2">
          <div>
            <span className="font-bold">Age: </span>
            {patient.birthDate && <span>{getAge(patient.birthDate)}</span>}
          </div>
          <div>
            <span className="font-bold">Gender: </span>
            {patient.gender && <span>{patient.gender}</span>}
          </div>
          <div>
            <span className="font-bold">Birthdate: </span>
            {patient.birthDate && <span>{patient.birthDate}</span>}
          </div>
          <div>
            <span className="font-bold">Phone: </span>
            {patient.telecom && patient.telecom[0] && (
              <span>{patient.telecom[0].value}</span>
            )}
          </div>
          <div className="">
            <span className="font-bold">Country </span>
            {patient.address && patient.address[0] && (
              <span>{patient.address[0].country}</span>
            )}
          </div>
          <div>
            <span className="font-bold">City: </span>
            {patient.address && patient.address[0] && (
              <span>{patient.address[0].city}</span>
            )}
          </div>
          <div>
            <span className="font-bold">Postal Code: </span>
            {patient.address && patient.address[0] && (
              <span>{patient.address[0].postalCode}</span>
            )}
          </div>
          <div>
            <span className="font-bold">Street: </span>
            {patient.address && patient.address[0] && (
              <span>{patient.address[0].line}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
